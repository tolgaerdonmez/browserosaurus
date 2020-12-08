import { App } from './types'

export const apps: App[] = [
  {
    name: 'Brave',
    id: 'com.brave.Browser',
  },
  {
    name: 'Brave Beta',
    id: 'com.brave.Browser.beta',
  },
  {
    name: 'Brave Dev',
    id: 'com.brave.Browser.dev',
  },
  {
    name: 'Brave Nightly',
    id: 'com.brave.Browser.nightly',
  },
  {
    name: 'Chromium',
    id: 'org.chromium.Chromium',
    privateArg: '--incognito',
  },
  {
    name: 'Dissenter',
    id: 'com.gab.Dissenter',
  },
  {
    name: 'Finicky',
    id: 'net.kassett.finicky',
  },
  {
    name: 'Firefox',
    id: 'org.mozilla.firefox',
    privateArg: '--private-window',
  },
  {
    name: 'Firefox Developer Edition',
    id: 'org.mozilla.firefoxdeveloperedition',
    privateArg: '--private-window',
  },
  {
    name: 'Firefox Nightly',
    id: 'org.mozilla.nightly',
    privateArg: '--private-window',
  },
  {
    name: 'Google Chrome',
    id: 'com.google.Chrome',
    privateArg: '--incognito',
  },
  {
    name: 'Google Chrome Canary',
    id: 'com.google.Chrome.canary',
    privateArg: '--incognito',
  },
  {
    name: 'Iridium',
    id: 'de.iridiumbrowser',
  },
  {
    name: 'Maxthon',
    id: 'com.maxthon.mac.Maxthon',
  },
  {
    name: 'Microsoft Edge',
    id: 'com.microsoft.edgemac',
  },
  {
    name: 'Microsoft Edge Beta',
    id: 'com.microsoft.edgemac.Beta',
  },
  {
    name: 'Microsoft Edge Canary',
    id: 'com.microsoft.edgemac.Canary',
  },
  {
    name: 'Microsoft Edge Dev',
    id: 'com.microsoft.edgemac.Dev',
  },
  {
    name: 'Min',
    id: 'com.electron.min',
  },
  {
    name: 'NAVER Whale',
    id: 'com.naver.Whale',
  },
  {
    name: 'Opera',
    id: 'com.operasoftware.Opera',
  },
  {
    name: 'Opera Beta',
    id: 'com.operasoftware.OperaNext',
  },
  {
    name: 'Opera Developer',
    id: 'com.operasoftware.OperaDeveloper',
  },
  {
    name: 'Opera GX',
    id: 'com.operasoftware.OperaGX',
  },
  {
    name: 'Opera Neon',
    id: 'com.opera.Neon',
  },
  {
    name: 'Pocket',
    id: 'com.readitlater.PocketMac',
    urlTemplate: 'pocket://add?url={{URL}}',
  },
  {
    name: 'Polypane',
    id: 'com.firstversionist.polypane',
  },
  {
    name: 'qutebrowser',
    id: 'org.qt-project.Qt.QtWebEngineCore',
  },
  {
    name: 'Safari',
    id: 'com.apple.Safari',
  },
  {
    name: 'Safari Technology Preview',
    id: 'com.apple.SafariTechnologyPreview',
  },
  {
    name: 'Tor Browser',
    id: 'org.torproject.torbrowser',
  },
  {
    name: 'Vivaldi',
    id: 'com.vivaldi.Vivaldi',
  },
  {
    name: 'Vivaldi Snapshot',
    id: 'com.vivaldi.Vivaldi.snapshot',
  },
  {
    name: 'Waterfox',
    id: 'net.waterfox.waterfoxcurrent',
  },
  {
    name: 'Yandex',
    id: 'ru.yandex.desktop.yandex-browser',
  },
  {
    name: 'Spotify',
    id: 'com.spotify.client',
    privateArg: '--uri',
  },
]
