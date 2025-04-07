<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">聯絡表單(已修改)</h1>
    <NuxtLink to="/embedded" class="text-blue-500 hover:text-blue-700 mb-4 block">前往嵌入頁面</NuxtLink>
    <form @submit.prevent="submitForm" class="max-w-md">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium mb-1">姓名</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium mb-1">電話</label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        :disabled="isLoading"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {{ isLoading ? "送出中..." : "送出" }}
      </button>
      <p
        v-if="message"
        :class="[
          'mt-2',
          messageType === 'success' ? 'text-green-600' : 'text-red-600',
        ]"
      >
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
const formData = ref({
  name: "",
  phone: "",
});

const isLoading = ref(false);
const message = ref("");
const messageType = ref("");

const submitForm = async () => {
  isLoading.value = true;
  message.value = "";

  try {
    // 使用 JSONP 方式發送請求
    const script = document.createElement("script");
    const callbackName = "jsonpCallback_" + Date.now();
    window[callbackName] = (response) => {
      if (response.status === "success") {
        message.value = "表單已成功送出！";
        messageType.value = "success";
        formData.value = { name: "", phone: "" };
      } else {
        throw new Error("提交失敗");
      }
      document.body.removeChild(script);
      delete window[callbackName];
    };

    const config = useRuntimeConfig();
    const data = encodeURIComponent(JSON.stringify(formData.value));
    script.src = `${config.public.gasUrl}?callback=${callbackName}&data=${data}`;
    document.body.appendChild(script);
  } catch (error) {
    message.value = "提交失敗，請稍後再試";
    messageType.value = "error";
    console.error("提交失敗：", error);
  } finally {
    isLoading.value = false;
  }
};
</script>