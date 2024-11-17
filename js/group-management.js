export function setupGroupManagement() {
  const createGroupButton = document.getElementById("create-group");
  const groupsContainer = document.getElementById("groups");

  // Charger les groupes sauvegardés au démarrage
  chrome.storage.local.get("groups", (data) => {
    if (data.groups) {
      data.groups.forEach((group) =>
        createGroupElement(group.name, group.tabs)
      );
    }
  });

  createGroupButton.addEventListener("click", () => {
    const groupName = prompt("Enter group name:");
    if (groupName) {
      createGroupElement(groupName);
      saveGroups();
    }
  });

  // Crée un élément de groupe et gère le drag & drop
  function createGroupElement(name, tabs = []) {
    // Création du conteneur principal pour le groupe
    const groupDiv = document.createElement("div");
    groupDiv.className = "group";
    groupDiv.innerHTML = `
      <h3>${name}</h3>
      <div class="group-tabs"></div>
      <button class="delete-group">Delete Group</button>
    `;

    // Ajout du groupe à l'interface utilisateur
    const groupsContainer = document.getElementById("groups");
    groupsContainer.appendChild(groupDiv);

    // Récupération des conteneurs pour les onglets et le bouton de suppression
    const groupTabsContainer = groupDiv.querySelector(".group-tabs");
    const deleteButton = groupDiv.querySelector(".delete-group");

    // Ajout des onglets restaurés (si le groupe est chargé depuis la mémoire)
    tabs.forEach((tabId) => {
      const tabElement = document.querySelector(`[data-id='${tabId}']`);
      if (tabElement) {
        groupTabsContainer.appendChild(tabElement);
      }
    });

    // Gestion du drag & drop pour ajouter des onglets dans le groupe
    groupDiv.addEventListener("dragover", (e) => e.preventDefault());
    groupDiv.addEventListener("drop", (e) => {
      e.preventDefault();

      // Récupérer l'identifiant de l'onglet déplacé
      const draggedTabId = e.dataTransfer.getData("text/plain");

      // Trouver l'élément correspondant à cet onglet et l'ajouter au groupe
      const draggedElement = document.querySelector(
        `[data-id='${draggedTabId}']`
      );
      if (draggedElement) {
        groupTabsContainer.appendChild(draggedElement);
        saveGroups(); // Sauvegarder les modifications
      }
    });

    // Gestion de la suppression du groupe
    deleteButton.addEventListener("click", () => {
      groupDiv.remove(); // Supprimer le groupe de l'interface
      saveGroups(); // Mettre à jour les données sauvegardées
    });
  }

  // Sauvegarder les groupes dans chrome.storage.local
  function saveGroups() {
    const groups = [];
    document.querySelectorAll(".group").forEach((groupDiv) => {
      const name = groupDiv.querySelector("h3").textContent;
      const tabs = Array.from(
        groupDiv.querySelectorAll(".group-tabs .tab-item")
      ).map((tab) => tab.dataset.id);
      groups.push({ name, tabs });
    });

    chrome.storage.local.set({ groups });
  }
}
