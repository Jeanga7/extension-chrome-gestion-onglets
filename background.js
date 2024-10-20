chrome.tabs.onCreated.addListener((tab) => {
  showNotification("Onglet créé", `Un nouvel onglet a été créé : ${tab.title}`);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  showNotification("Onglet fermé", `Un onglet a été fermé : ${tabId}`);
});

// Fonction pour afficher une notification
function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon48.png', // Remplacez par le chemin de votre icône
    title: title,
    message: message,
    priority: 1
  });
}
