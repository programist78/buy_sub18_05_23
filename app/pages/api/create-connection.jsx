async function loadDataAndSendToAPI(data) {
  const url = "/api/my-api-endpoint";

  try {
    // Получение данных из API
    const response = await fetch(url);
    const apiData = await response.json();

    // Обработка данных или выполнение дополнительных действий
    // ...

    // Отправка данных обратно на API
    const postDataResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (postDataResponse.ok) {
      console.log("Data sent to API successfully");
    } else {
      throw new Error("Failed to send data to API");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
