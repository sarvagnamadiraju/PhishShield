chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkPhishing") {
        const url = request.url;

        fetch("http://127.0.0.1:5000/classify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: url }),
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({ result: data.classification || "Unknown result" });
        })
        .catch(error => {
            console.error("Error:", error);
            sendResponse({ result: "Error fetching classification." });
        });

        return true; // Keep the messaging channel open for async response
    }
});

