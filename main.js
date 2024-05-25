import './style.css'
import { TextEditor } from './src/TextEditor'

const textEditor = new TextEditor(document.getElementById('editor'))
window.textEditor = textEditor
