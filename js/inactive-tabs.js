export function closeInactiveTabs() {
  const closeInactiveButton = document.getElementById("close-inactive-tabs");

  closeInactiveButton.addEventListener("click", () => {
    const inactiveThreshold = 30 * 60 * 1000;
    const now = Date.now();

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.get(tab.id, (tabInfo) => {
          if (
            tabInfo.lastAccessed &&
            now - tabInfo.lastAccessed > inactiveThreshold
          ) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    });
  });
}
