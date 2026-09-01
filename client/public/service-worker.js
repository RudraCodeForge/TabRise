chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_QUOTE") {
    fetch("https://zenquotes.io/api/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        sendResponse({
          success: true,
          quote: data[0],
        });
      })
      .catch((error) => {
        console.error("Quote API Error:", error);

        sendResponse({
          success: false,
          error: error.message,
        });
      });

    return true;
  }
});
