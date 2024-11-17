export function setupImportExport() {
    const exportButton = document.getElementById("export-session");
    const importInput = document.getElementById("import-session");
    const importButton = document.getElementById("import-session-button");
  
    // Exporter la session
    exportButton.addEventListener("click", () => {
      chrome.tabs.query({}, (tabs) => {
        const session = tabs.map((tab) => ({ title: tab.title, url: tab.url }));
        const blob = new Blob([JSON.stringify(session)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
  
        const a = document.createElement("a");
        a.href = url;
        a.download = "session.json";
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  
    // Ouvrir le sélecteur de fichier lorsque le bouton d'importation est cliqué
    importButton.addEventListener("click", () => {
      importInput.click();
    });
  
    // Importer la session
    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const session = JSON.parse(event.target.result);
          session.forEach((tab) => chrome.tabs.create({ url: tab.url }));
        };
        reader.readAsText(file);
      }
    });
  }
  