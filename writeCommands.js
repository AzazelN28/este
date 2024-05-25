import fs from 'node:fs'

const commands = [
  "insertText",
  "insertReplacementText",
  "insertLineBreak",
  "insertParagraph",
  "insertOrderedList",
  "insertUnorderedList",
  "insertHorizontalRule",
  "insertFromYank",
  "insertFromDrop",
  "insertFromPaste",
  "insertFromPasteAsQuotation",
  "insertTranspose",
  "insertCompositionText",
  "insertLink",
  "deleteWordBackward",
  "deleteWordForward",
  "deleteSoftLineBackward",
  "deleteSoftLineForward",
  "deleteEntireSoftLine",
  "deleteHardLineBackward",
  "deleteHardLineForward",
  "deleteByDrag",
  "deleteByCut",
  "deleteContent",
  "deleteContentBackward",
  "deleteContentForward",
  "historyUndo",
  "historyRedo",
  "formatBold",
  "formatItalic",
  "formatUnderline",
  "formatStrikeThrough",
  "formatSuperscript",
  "formatSubscript",
  "formatJustifyFull",
  "formatJustifyCenter",
  "formatJustifyRight",
  "formatJustifyLeft",
  "formatIndent",
  "formatOutdent",
  "formatRemove",
  "formatSetBlockTextDirection",
  "formatSetInlineTextDirection",
  "formatBackColor",
  "formatFontColor",
  "formatFontName"
]

if (!fs.existsSync('src/commands')) {
  fs.mkdirSync('src/commands', { recursive: true })
}

let sourceCode = ''
for (const command of commands) {
  const commandPath = `src/commands/${command}.js`
  sourceCode += `import { ${command} } from './${command}.js'\n`
  if (!fs.existsSync(commandPath)) {
    fs.writeFileSync(commandPath, `export function ${command}(editor, event) {}`, 'utf8')
  }
}

sourceCode += `\nexport default {\n${commands.map((command) => `  ${command}`).join(',\n')}\n}`

fs.writeFileSync(`src/commands/index.js`, sourceCode, 'utf8')
