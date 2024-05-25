export function insertText(editor, event) {
  if (event.type !== 'beforeinput') return
  /**
   * @type {Range}
   */
  const range = editor.selection.getRangeAt(0)
  if (editor.selection.isCollapsed) {
    const caretNode = editor.selection.anchorNode
    // Si el nodo es un nodo de texto y es hijo del elemento editor
    // o el nodo es directamente el nodo del editor, entonces creamos
    // un nuevo <div> (un nuevo bloque contenedor) e insertamos ahí el texto.
    if (caretNode.nodeType === Node.TEXT_NODE && caretNode.parentNode === editor.element
     || caretNode.nodeType === Node.ELEMENT_NODE && caretNode === editor.element
    ) {
      event.preventDefault()
      const newBlock = document.createElement('div')
      const newText = document.createTextNode(event.data)
      newBlock.append(newText)
      range.insertNode(newBlock)
      range.selectNode(newText)
      range.collapse(false)
    }
  } else {

  }
}
