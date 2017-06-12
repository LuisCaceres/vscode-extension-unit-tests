/* The following piece of code highlights any read-only lines in the current
text selection. */

// Gets a reference to the VS Code API.
const vscode = require('vscode');
const { window } = vscode;

// Specifies the styles of a read-only line.
const decorationHighlight = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 128, 128, 1)' // This colour is sort of pinkish.
});

// Flags which of the topmost and bottomost lines in the document are read-only.
const TOP_LINES = 20;
const BOTTOM_LINES = 8;


/** Highlights any read-only lines on the same line as the caret and in the
 * current text selection.
 * @listens {onDidChangeTextEditorSelection}
 */
function highlightIfNecessary(event) {
    // Gets a reference to the active text editor.
    const { activeTextEditor } = window;
    // Gets each of the lines in the current text selection.
    const lines = getLines(event.selections[0]);
    // Gets the lines that are read-only.
    const readOnlyLines = lines.filter(isReadOnly);

    // Does nothing if there are no read-only lines in the text selection.
    if (!readOnlyLines.length) {
        return;
    }

    // Otherwise continues execution.
    // Gets the range of each read-only line in the text selection.
    const ranges = readOnlyLines.map(line => line.range);
    // Highlights each read-only line in the text selection.
    activeTextEditor.setDecorations(decorationHighlight, ranges);
}


/** Gets each of the lines in the provided text selection.
 * @param {Selection} selection - A text selection.
 * @returns {[TextLine]} - An array of the lines in the text selection.
 */
function getLines(selection) {
    // gets a reference to the current document.
    const document = window.activeTextEditor.document;
    // gets the line number of the topmost line in the text selection.
    const START = selection.start.line;
    // gets the line number of the bottommost line in the text selection.
    const END = selection.end.line + 1;
    // creates an array that will consist of the lines in the text selection.
    const lines = [];
    // for each line number in the text selection.
    for (let i = START; i < END; i++) {
        // gets a reference to the associated line in the document.
        let line = document.lineAt(i);
        // puts this reference in the array of lines.
        lines.push(line);
    }
    // returns the array of references to the lines in the text selection.
    return lines;
}


/** Checks if the line provided is read-only.
 * @param {TextLine} line - A line in the document.
 * @returns {Boolean} - Whether the line is read-only.
 */
function isReadOnly(line) {
    // Gets the line number associated with this line.
    const LINE_NUMBER = line.lineNumber;
    // Gets the number of lines in the document loaded in the text editor.
    const LINE_COUNT = window.activeTextEditor.document.lineCount;
    // If the line is one of the first 20 or one of the last 8 it is read-only.
    return LINE_NUMBER < TOP_LINES || LINE_NUMBER >= LINE_COUNT - BOTTOM_LINES;
}

// highlights a read-only line if it detects one.
window.onDidChangeTextEditorSelection(highlightIfNecessary);