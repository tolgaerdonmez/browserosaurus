import electron from 'electron'
import Store from 'electron-store'
import execa from 'execa'
import flatten from 'lodash/fp/flatten'
import partition from 'lodash/fp/partition'
import pipe from 'lodash/fp/pipe'

import {
  BROWSER_RUN,
  BROWSERS_GET,
  BROWSERS_SET,
  COPY_TO_CLIPBOARD,
  OPT_TOGGLE,
  URL_RECEIVED,
} from '../config/events'
import copyToClipboard from '../utils/copyToClipboard'
import getInstalledBrowsers from '../utils/getInstalledBrowsers'
import createWindow from './createWindow'

// eslint-disable-next-line @typescript-eslint/camelcase, no-underscore-dangle
declare const __non_webpack_require__: (path: string) => { hello: string }

// TODO This will be the default in Electron 9, remove once upgraded
electron.app.allowRendererProcessReuse = true

// Attempt to fix this bug: https://github.com/electron/electron/issues/20944
electron.app.commandLine.appendArgument('--enable-features=Metal')

// Prompt to set as default browser
electron.app.setAsDefaultProtocolClient('http')

interface B {
  store: Store<{ fav: string }>
  url: string | null
  window: electron.BrowserWindow | null
  isOptHeld: boolean
}

const b: B = {
  store: new Store({ fav: { type: 'string' } }),
  url: null,
  window: null,
  isOptHeld: false,
}

const urlReceived = (url: string, win: electron.BrowserWindow) => {
  win.webContents.send(URL_RECEIVED, url)
  win.show()
}

// Send browsers down to picker
electron.ipcMain.on(BROWSERS_GET, async () => {
  const installedBrowsers = await getInstalledBrowsers()
  const favBrowserId = b.store.get('fav') || 'com.apple.Safari'
  const favFirst = pipe(partition({ appId: favBrowserId }), flatten)
  const browsers = favFirst(installedBrowsers)
  b.window?.webContents.send(BROWSERS_SET, browsers)
})

electron.ipcMain.on(BROWSER_RUN, (_: Event, browserId: string) => {
  if (b.url) {
    if (b.isOptHeld) {
      b.isOptHeld = false
      execa('open', [b.url, '-b', browserId, '-g'])
    } else {
      execa('open', [b.url, '-b', browserId])
    }
  }
})

electron.ipcMain.on(COPY_TO_CLIPBOARD, (_: Event, url: string) => {
  copyToClipboard(url)
})

electron.ipcMain.on(OPT_TOGGLE, (_: Event, toggle: boolean) => {
  b.isOptHeld = toggle
})

electron.app.on('ready', async () => {
  b.window = await createWindow()

  if (b.url) {
    // if Browserosaurus was opened with a link, this will now be sent on to the picker window.
    urlReceived(b.url, b.window)
  }

  // Auto update on production
  // if (!isDev) {
  //   const feedURL = `https://update.electronjs.org/will-stone/browserosaurus/darwin-x64/${app.getVersion()}`

  //   autoUpdater.setFeedURL({
  //     url: feedURL,
  //     headers: {
  //       'User-Agent': `${pkg.name}/${pkg.version} (darwin: x64)`,
  //     },
  //   })

  //   autoUpdater.on('update-downloaded', () => {
  //     return null
  //   })

  //   autoUpdater.on('before-quit-for-update', () => {
  //     // All windows must be closed before an update can be applied using "restart".
  //     pickerWindow.destroy()
  //   })

  //   autoUpdater.on('error', (err) => {
  //     // eslint-disable-next-line no-console
  //     console.log('updater error', err)
  //   })

  //   // check for updates right away and keep checking later
  //   const TEN_MINS = 600000
  //   autoUpdater.checkForUpdates()
  //   setInterval(() => {
  //     autoUpdater.checkForUpdates()
  //   }, TEN_MINS)
  // }
})

electron.app.on('activate', () => {
  b.window?.show()
})

// App doesn't always close on ctrl-c in console, this fixes that
electron.app.on('before-quit', () => {
  electron.app.exit()
})

electron.app.on('open-url', (event, url) => {
  event.preventDefault()
  b.url = url
  if (b.window) {
    urlReceived(b.url, b.window)
  }
})
