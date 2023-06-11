const path = require('path');
const { app, BrowserWindow, Menu } = require('electron')

const isDev = process.env.NODE_ENV !== 'production'

async function main() {

    // Create the main Window
    const createWindow = () => {
        const mainWindow = new BrowserWindow({
            width: isDev ? 1000 : 500,
            height: 500,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });

        // Open Dev tools If In Dev environemtn
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }

        mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
    }
    const createAboutWindow = () => {
        const aboutWindow = new BrowserWindow({
            title:'About Link Analyzer',
            width: 400,
            height: 400,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'))
    }

    // App is Ready
    app.whenReady().then(() => {
        createWindow();

        const mainMenu = Menu.buildFromTemplate(menu);
        Menu.setApplicationMenu(mainMenu);

      });

      // Menu Template
      const menu = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                },
                {
                    label: 'Quit',
                    click: () => app.quit(),
                    accelerator: 'CmdOrCtrl+Q'
                }
            ],
            label: "Edit",
            submenu: [
                {
                  label: "Undo",
                  accelerator: "CmdOrCtrl+Z",
                  selector: "undo:"
                },
                {
                  label: "Redo",
                  accelerator: "Shift+CmdOrCtrl+Z",
                  selector: "redo:"
                },
                {
                  type: "separator"
                },
                {
                  label: "Cut",
                  accelerator: "CmdOrCtrl+X",
                  selector: "cut:"
                },
                {
                  label: "Copy",
                  accelerator: "CmdOrCtrl+C",
                  selector: "copy:"
                },
                {
                  label: "Paste",
                  accelerator: "CmdOrCtrl+V",
                  selector: "paste:"
                },
                {
                  label: "Select All",
                  accelerator: "CmdOrCtrl+A",
                  selector: "selectAll:"
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