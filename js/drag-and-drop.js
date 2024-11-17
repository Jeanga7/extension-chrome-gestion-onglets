export function initializeDragAndDrop() {
  const tabContainer = document.getElementById("tab-container");

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      const tabItem = document.createElement("div");
      tabItem.className = "tab-item";
      tabItem.draggable = true;
      tabItem.dataset.id = tab.id;

      // Créer l'élément pour l'icône
      const tabIcon = document.createElement("img");
      tabIcon.src = tab.favIconUrl || "./images/default-icon.jpg"; // Si pas d'icône, afficher une icône par défaut
      tabIcon.className = "tab-icon";

      // Créer un élément pour le titre
      const tabTitle = document.createElement("span");
      tabTitle.textContent = tab.title || "New Tab";
      tabTitle.className = "tab-title";

      // Ajout de l'icône et du titre à l'élément de l'onglet
      tabItem.appendChild(tabIcon);
      tabItem.appendChild(tabTitle);

      // Lorsque l'icône est cliquée, rediriger vers l'onglet
      tabIcon.addEventListener("click", () => {
        chrome.tabs.update(tab.id, { active: true });
      });

      // Gérer l'événement de "dragstart"
      tabItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", tabItem.dataset.id);
      });

      tabContainer.appendChild(tabItem);
    });

    enableDragAndDrop();
  });

  function enableDragAndDrop() {
    const tabItems = document.querySelectorAll(".tab-item");
    tabItems.forEach((item) => {
      item.addEventListener("dragover", (e) => e.preventDefault());
      item.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedTabId = e.dataTransfer.getData("text/plain");
        const draggedElement = document.querySelector(
          `[data-id='${draggedTabId}']`
        );
        tabContainer.insertBefore(draggedElement, item.nextSibling);
      });
    });
  }
}
