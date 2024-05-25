import { getPreferredData, sanitizeHTMLData } from './utils';

export function paste(editor, event) {
  const preferredData = getPreferredData(event, ['text/html', 'text/plain'])
  if (preferredData === null) {
    event.preventDefault()
    return
  }

  const { type, data } = preferredData
  if (type === 'text/html') {
    return sanitizeHTMLData(data)
  }
  return data
}
