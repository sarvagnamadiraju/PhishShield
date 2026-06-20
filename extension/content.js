function createPopup() {
  const popupHtml = `
    <div class="phishing-popup">
      <div class="card w-full max-w-md mx-auto">
        <div class="card-header">
          <div class="flex items-center">
            <svg class="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
            <h3 class="text-xl font-bold">Malicious Website Detected</h3>
          </div>
        </div>
        <div class="card-content">
          <p>
            The website you are trying to access has been identified as potentially malicious. Continuing may put your
            device and personal information at risk.
          </p>
          <div class="flex justify-between">
            <button id="continueButton" class="button-destructive">Continue Anyway</button>
            <button id="goBackButton" class="button-outline">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const popupStyle = `
    <style>
      .phishing-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      }
      .card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        padding: 1.5rem;
      }
      .card-header {
        background-color: #f56565;
        color: #fff;
        padding: 1.5rem;
        border-bottom: 1px solid #e2e8f0;
      }
      .flex {
        display: flex;
        align-items: center;
      }
      .justify-between {
        justify-content: space-between;
      }
      .button-destructive {
        background-color: #f56565;
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease-in-out;
      }
      .button-destructive:hover {
        background-color: #c53030;
      }
      .button-outline {
        background-color: transparent;
        color: #4a5568;
        border: 1px solid #cbd5e0;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease-in-out;
      }
      .button-outline:hover {
        background-color: #edf2f7;
      }
      .button-destructive, .button-outline {
        margin: 0 5px;
      }
    </style>
  `;

  // Append the popup to the body
  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = popupHtml;
  document.body.appendChild(popupContainer);

  // Append the style to the head
  const styleElement = document.createElement("style");
  styleElement.innerHTML = popupStyle;
  document.head.appendChild(styleElement);

  document.getElementById("continueButton").addEventListener("click", () => {
    document.querySelector(".phishing-popup").remove();
  });

  document.getElementById("goBackButton").addEventListener("click", () => {
    window.history.back();
  });
}

// Send URL to the background script for phishing detection
const currentUrl = document.URL;
chrome.runtime.sendMessage({ action: "checkPhishing", url: currentUrl }, (response) => {
  if (response && response.result === "PHISHING") {
    createPopup();
  }
});
