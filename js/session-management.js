export function setupSessionManagement() {
  const saveSessionButton = document.getElementById("save-session");
  const loadSessionButton = document.getElementById("load-session");

  saveSessionButton.addEventListener("click", () => {
    chrome.tabs.query({}, (tabs) => {
      const session = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
      localStorage.setItem("savedSession", JSON.stringify(session));
      alert("Session saved!");
    });
  });

  loadSessionButton.addEventListener("click", () => {
    const session = JSON.parse(localStorage.getItem("savedSession"));
    if (session) {
      session.forEach((tab) => chrome.tabs.create({ url: tab.url }));
    } else {
      alert("No session saved!");
    }
  });
}
