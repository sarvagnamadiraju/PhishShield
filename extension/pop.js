document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs.length) {
            document.getElementById('result').textContent = "Error: No active tab found.";
            return;
        }

        const currentTab = tabs[0];

        if (!currentTab || !currentTab.url) {
            document.getElementById('result').textContent = "Error: Unable to retrieve URL.";
            return;
        }

        const currentUrl = currentTab.url;

        fetch('http://127.0.0.1:5000/classify', {  // Use 127.0.0.1 instead of localhost
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: currentUrl }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); // Debugging log
            const resultElement = document.getElementById('result');

            if (!data.classification) {
                resultElement.textContent = "Error: No classification received.";
                return;
            }

            resultElement.textContent = `Classification: ${data.classification}`;

            if (data.classification === "Unsafe") {
                if (typeof createPopup === "function") {
                    createPopup();
                } else {
                    console.warn("createPopup() function is not defined.");
                }
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('result').textContent = `Error: ${error.message}`;
        });
    });
});


