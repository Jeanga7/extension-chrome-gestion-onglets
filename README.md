# Tab Group Manager

#### Video Demo: [My YouTube Video URL here](https://www.youtube.com/watch?v=uDasr3_bfyw)

#### Description:

Tab Group Manager is a browser extension designed to help users organize and manage their tabs efficiently. With this tool, users can create custom groups of tabs, drag and drop tabs between groups, and delete groups as needed. It also supports the automatic closure of inactive tabs to improve browser performance.

This extension provides several key features:
- **Create and manage tab groups**: Group your tabs by categories to keep everything organized.
- **Drag-and-drop tabs**: Easily move tabs between groups using the drag-and-drop interface.
- **Group deletion**: Delete unwanted groups with a click of a button.
- **Auto-saves**: Groups are saved locally, so users don’t lose their progress between sessions.
- **Export/Import functionality**: Export your groups to a file and import them when switching devices.
- **Close inactive tabs**: Automatically close tabs that haven’t been used in a certain amount of time to keep your browser running smoothly.

### Files in this Project:

- **`background.js`**: Contains the logic for handling tab group creation, deletion, and management. It also manages saving the groups to local storage.
- **`popup.js`**: Controls the UI for adding, managing, and deleting groups through the extension's popup interface.
- **`popup.html`**: The HTML structure for the popup interface, which allows users to interact with the extension.
- **`style.css`**: The CSS file for styling the extension's popup and tab group elements.
- **`manifest.json`**: Configures the Chrome extension, including permissions and popup details.
- **`README.md`**: This file, providing an overview of the project and instructions for users.

### Design Choices:

1. **Local Storage for Group Management**: I decided to use `chrome.storage.local` to save groups because it ensures that the data persists across browser sessions without requiring external databases.
   
2. **Drag and Drop Functionality**: I implemented drag-and-drop using event listeners to enhance the user experience. It allows quick tab organization without relying on manual inputs.

3. **Auto-Closure of Inactive Tabs**: This feature is aimed at improving the browser's performance by automatically closing tabs that haven’t been used for a predefined amount of time. This decision was made to address a common pain point for users with many open tabs.

### Future Improvements:
- Implement cloud syncing for groups across devices.
- Add more customization options for tab grouping.
- Optimize the auto-close feature to allow for more control over which tabs to close.

---
