import clipboard from './clipboard/index.js'
import commands from './commands/index.js'

export class TextEditor extends EventTarget {
  /**
   * @type {HTMLElement}
   */
  #element = null

  /**
   * @type {Selection}
   */
  #selection = null

  /**
   * @type {Object<string, Function>}
   */
  #events = null

  constructor(element) {
    super()

    this.#element = element
    this.#events = {
      beforeinput: this.#onBeforeInput,
      input: this.#onInput,

      paste: this.#onPaste,
      copy: this.#onCopy,
      cut: this.#onCut,

      focus: this.#onFocus,
      blur: this.#onBlur,

      keypress: this.#onKeyPress,
      keydown: this.#onKeyDown,
      keyup: this.#onKeyUp
    }

    this.#setup()
  }

  get element() {
    return this.#element
  }

  get selection() {
    return this.#selection
  }

  #setup() {
    this.#element.contentEditable = true
    this.#element.spellcheck = false
    this.#element.autocapitalize = false
    this.#element.autofocus = true
    this.#element.role = 'textbox'

    this.#element.ariaAutoComplete = false
    this.#element.ariaMultiLine = true

    this.#addEventListeners()
  }

  dispose() {
    this.#removeEventListeners()
  }

  #onSelectionChange = (e) => {
    console.log(e)
    this.#selection = document.getSelection()
    // Aquí lidiamos con una selección colapsada
    // también conocida como "caret".
    if (this.#selection.isCollapsed) {
      const caretNode = this.#selection.anchorNode
      const caretOffset = this.#selection.anchorOffset
      console.log(caretNode, caretOffset)
    } else {
      console.log(this.#selection.anchorNode, this.#selection.anchorOffset)
      console.log(this.#selection.focusNode, this.#selection.focusOffset)
      // Aquí estaríamos hablando de una selección
      // de rango.
      for (let rangeIndex = 0; rangeIndex < this.#selection.rangeCount; rangeIndex++) {
        const range = this.#selection.getRangeAt(rangeIndex)
        console.log(range)
      }
    }
  }

  #onBeforeInput = (e) => {
    console.log(e)
    if (e.inputType in commands) {
      const command = commands[e.inputType]
      command(this, e)
    }
  }

  #onInput = (e) => {
    console.log(e)
    if (e.inputType in commands) {
      const command = commands[e.inputType]
      command(this, e)
    }
  }

  #onPaste = (e) => {
    console.log(e)
    clipboard.paste(this, e)
  }
  #onCopy = (e) => {
    console.log(e)
    clipboard.copy(this, e)
  }
  #onCut = (e) => {
    console.log(e)
    clipboard.cut(this, e)
  }

  #onFocus = (e) => {
    console.log(e)
    document.addEventListener('selectionchange', this.#onSelectionChange)
    this.#selection = document.getSelection()
  }

  #onBlur = (e) => {
    console.log(e)
    document.removeEventListener('selectionchange', this.#onSelectionChange)
    this.#selection = null
  }

  #onKeyPress = (e) => console.log(e)
  #onKeyDown = (e) => console.log(e)
  #onKeyUp = (e) => console.log(e)

  #addEventListeners() {
    Object.entries(this.#events).forEach(([type, listener]) =>
      this.#element.addEventListener(type, listener)
    )
  }

  #removeEventListeners() {
    Object.entries(this.#events).forEach(([type, listener]) =>
      this.#element.removeEventListener(type, listener)
    )
  }
}
