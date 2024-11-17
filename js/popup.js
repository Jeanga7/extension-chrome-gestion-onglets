import { initializeDragAndDrop } from "./drag-and-drop.js";
import { initializeSearch } from "./search.js";
import { setupSessionManagement } from "./session-management.js";
import { setupGroupManagement } from "./group-management.js";
import { closeInactiveTabs } from "./inactive-tabs.js";
import { setupImportExport } from "./import-export.js";

// Initialisation des fonctionnalités
initializeDragAndDrop();
initializeSearch();
setupSessionManagement();
setupGroupManagement();
closeInactiveTabs();
setupImportExport();
