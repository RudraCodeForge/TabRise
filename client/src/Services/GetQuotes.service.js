export const getQuote = () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "GET_QUOTE" }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      if (!response?.success) {
        reject(new Error(response?.error || "Failed to get quote"));
        return;
      }

      console.log("Quote received:", response.quote);

      resolve(response.quote);
    });
  });
};
