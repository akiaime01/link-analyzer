const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

async function main() {

  // Create the main Window
  const createWindow = () => {
    const mainWindow = new BrowserWindow({
      width: 500,
      height: 200,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/html/index.html'))
  }
  const createAboutWindow = () => {
    const aboutWindow = new BrowserWindow({
      title: 'About Link Analyzer',
      width: 300,
      height: 200
    });
    aboutWindow.loadFile(path.join(__dirname, './renderer/html/about.html'))
  }

  // App is Ready
  app.whenReady().then(() => {
    createWindow();
    const mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);
  });

  // Menu Template
  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
        },
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          type: 'separator'
        },
        {
          role: 'selectAll'
        }
      ]
    },

    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },

    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },

    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More'
        }
      ]
    }
  ]
}

main()