export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!config.gasUrl) {
    throw createError({
      statusCode: 500,
      message: "GAS URL 未設定",
    });
  }

  try {
    const data = encodeURIComponent(JSON.stringify(body));
    const response = await fetch(`${config.gasUrl}?data=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "提交失敗",
    });
  }
});
