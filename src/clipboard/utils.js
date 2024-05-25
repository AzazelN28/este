/**
 * @typedef {object} PreferredData
 * @property {string} type
 * @property {string} data
 */

/**
 * Returns a string from the clipboard data.
 *
 * @param {ClipboardEvent} event
 * @param {Array<string>} supportedTypes Supported types by order of preference
 * @returns {PreferredData|null}
 */
export function getPreferredData(event, supportedTypes) {
  for (const supportedType of supportedTypes) {
    if (event.clipboardData.types.includes(supportedType)) {
      return {
        type: supportedType,
        data: event.clipboardData.getData(supportedType)
      }
    }
  }
  return null
}

/**
 * Sanitizes HTML data.
 *
 * @param {string} data
 * @returns {string}
 */
export function sanitizeHTMLData(data) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'text/html')
  const nodeIterator = doc.createNodeIterator(
    doc.documentElement,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return NodeFilter.FILTER_ACCEPT
      }
      const skipNodes = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'LINK', 'IMG']
      return skipNodes.includes(node.nodeName)
        ? NodeFilter.FILTER_SKIP
        : NodeFilter.FILTER_ACCEPT
    }
  })
  for (let node = nodeIterator.nextNode(); node !== null; node = nodeIterator.nextNode()) {

  }
}
