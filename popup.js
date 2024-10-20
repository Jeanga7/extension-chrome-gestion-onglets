// Fonction pour afficher une notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = "notification";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000); // La notification disparaît après 3 secondes
}

// Fonction pour gérer l'affichage des onglets
const TabManager = {
  displayTabs: function () {
    chrome.storage.local.get("categorizedTabs", (data) => {
      const tabsList = document.getElementById("tabsList");
      tabsList.innerHTML = ""; // Réinitialise la liste des onglets

      if (data.categorizedTabs) {
        console.log("Onglets trouvés : ", data.categorizedTabs);
        for (const [category, tabs] of Object.entries(data.categorizedTabs)) {
          this.createCategorySection(category, tabs, tabsList);
        }
      } else {
        console.log("Aucun onglet n'a été trouvé dans le stockage local.");
      }
    });
  },

  createCategorySection: function (category, tabs, tabsList) {
    const categoryHeader = document.createElement("h3");
    categoryHeader.textContent = category;
    tabsList.appendChild(categoryHeader);

    tabs.forEach((tab) => {
      const li = document.createElement("li");
      const tabTitle = document.createElement("span");
      tabTitle.textContent = tab.title;
      li.appendChild(tabTitle);

      const tabUrl = document.createElement("small");
      tabUrl.textContent = tab.url;
      tabUrl.style.marginLeft = "10px";
      tabUrl.style.color = "#666"; // Couleur grisée pour l'URL
      li.appendChild(tabUrl);

      tabsList.appendChild(li);
    });
  },

  organizeTabsByCategory: function (category) {
    chrome.tabs.query({}, (tabs) => {
      const categorizedTabs = {};

      // Organiser les onglets par catégorie
      tabs.forEach((tab) => {
        // Ajoute l'onglet à l'objet categorizedTabs sous la catégorie choisie
        if (!categorizedTabs[category]) {
          categorizedTabs[category] = [];
        }
        categorizedTabs[category].push({
          id: tab.id,
          title: tab.title,
          url: tab.url,
        });
      });

      // Sauvegarde les informations dans le stockage local
      chrome.storage.local.set({ categorizedTabs }, () => {
        console.log(
          `Les onglets ont été organisés et enregistrés sous la catégorie ${category}.`
        );
        showNotification(`Onglets organisés sous la catégorie "${category}".`); // Notification à l'utilisateur
        this.displayTabs(); // Met à jour l'affichage des onglets
      });
    });
  },
};

// Fonction pour gérer les sessions
const SessionManager = {
  saveCurrentSession: function () {
    chrome.tabs.query({}, (tabs) => {
      const sessionName = `Session ${new Date().toLocaleString()}`;
      const sessionTabs = tabs.map((tab) => ({
        url: tab.url,
        title: tab.title,
      }));
      chrome.storage.local.set({ [sessionName]: sessionTabs }, () => {
        showNotification(`Session "${sessionName}" enregistrée avec succès.`);
        this.displaySavedSessions();
      });
    });
  },

  displaySavedSessions: function () {
    chrome.storage.local.get(null, (items) => {
      const sessionsList = document.getElementById("savedSessionsList");
      sessionsList.innerHTML = ""; // Réinitialise la liste des sessions

      for (const [sessionName, tabs] of Object.entries(items)) {
        this.createSessionItem(sessionName, tabs.length, sessionsList);
      }
    });
  },

  createSessionItem: function (sessionName, tabCount, sessionsList) {
    const li = document.createElement("li");
    li.textContent = `${sessionName} (${tabCount} onglets)`;

    const restoreButton = document.createElement("button");
    restoreButton.textContent = "Restaurer";
    restoreButton.addEventListener("click", () =>
      this.restoreSession(sessionName)
    );

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      if (
        confirm(`Voulez-vous vraiment supprimer la session "${sessionName}" ?`)
      ) {
        this.deleteSession(sessionName);
      }
    });

    li.appendChild(restoreButton);
    li.appendChild(deleteButton);
    sessionsList.appendChild(li);
  },

  restoreSession: function (sessionName) {
    chrome.storage.local.get(sessionName, (data) => {
      const tabs = data[sessionName];
      if (tabs) {
        tabs.forEach((tab) => {
          chrome.tabs.create({ url: tab.url });
        });
      }
    });
  },

  deleteSession: function (sessionName) {
    chrome.storage.local.remove(sessionName, () => {
      console.log(`La session ${sessionName} a été supprimée.`);
      this.displaySavedSessions(); // Met à jour l'affichage des sessions enregistrées
    });
  },
};

// Événements
document
  .getElementById("showTabs")
  .addEventListener("click", TabManager.displayTabs.bind(TabManager));
document.getElementById("organizeTabs").addEventListener("click", function () {
  const selectedCategory = document.getElementById("categorySelect").value;
  TabManager.organizeTabsByCategory(selectedCategory);
});
document
  .getElementById("saveSession")
  .addEventListener(
    "click",
    SessionManager.saveCurrentSession.bind(SessionManager)
  );

// Affiche les sessions enregistrées au chargement de la popup
document.addEventListener(
  "DOMContentLoaded",
  SessionManager.displaySavedSessions.bind(SessionManager)
);
