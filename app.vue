<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">聯絡表單(已修改)</h1>
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
    const response = await fetch('/api/submit', {
      method: 'GET',
      body: JSON.stringify(formData.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    
    if (result.status === "success") {
      message.value = "表單已成功送出！";
      messageType.value = "success";
      formData.value = { name: "", phone: "" };
    } else {
      throw new Error("提交失敗");
    }
  } catch (error) {
    message.value = "提交失敗，請稍後再試";
    messageType.value = "error";
    console.error("提交失敗：", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
