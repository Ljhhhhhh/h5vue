import defaultSettings from '@/settings'

const title = defaultSettings.title || 'H5Vue'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
