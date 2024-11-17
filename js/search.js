export function initializeSearch() {
  const searchBar = document.getElementById("search-bar");
  
  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const query = searchBar.value.toLowerCase();
      const tabItems = document.querySelectorAll(".tab-item");
      
      tabItems.forEach((tab) => {
        const title = tab.title.trim().toLowerCase();
        tab.style.display = title.includes(query) ? "block" : "none";
      });
    });
  }
}
