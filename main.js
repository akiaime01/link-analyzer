const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const { create } = require('domain');

const isDev = process.env.NODE_ENV !== 'production'

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

    // Open Dev tools If In Dev environemtn
    // if (isDev) {
    //     mainWindow.webContents.openDevTools();
    // }

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
  // if (process.argv.length < 3) {
  //     console.log("No Website Provided")
  //     process.exit(1)
  // }

  // if (process.argv.length > 3) {
  //     console.log("Too Many Command Line Arguments")
  //     process.exit(1)
  // }

  // const baseURL = process.argv[2]

  // console.log(`Starting Crawl of ${baseURL}`)
  // const pages = await scrapePage(baseURL, baseURL, {})
  // printReport(pages)
}

main()