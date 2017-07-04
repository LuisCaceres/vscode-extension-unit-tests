/* The following piece of code highlights any read-only lines on the same line
as the caret and in the current text selection. The goal is to alert the
developer of the prescence of read-only lines which should not be edited. */

// Get a reference to some Node core modules.
const path = require('path');

// Get a reference to the VS Code API.
const vscode = require('vscode');
const { window } = vscode;

// Specify the styles of a read-only line.
const decorationHighlight = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 128, 128, 1)' // This colour is sort of pinkish.
});

// Indicate which lines in a unit test file are read-only.
const TOP_LINES = 20; // First 20 lines.
const BOTTOM_LINES = 8; // Last 8 lines.

// Will store a reference to the highlighter.
let disposable = null;

// Get a reference to the active text editor if any.
const { activeTextEditor } = window;

// If there is an active text editor.
if (activeTextEditor) {
    // Check if the document in the active text editor is a unit test file.
    enableHighlighterIfRequired(activeTextEditor);
}

// From now on, check if whatever becomes the active editor contains a unit test file.
window.onDidChangeActiveTextEditor(enableHighlighterIfRequired);


/** Enable the highlighting feature as long as certain conditions are met.
 * @param {TextEditor} textEditor - The text editor that has just gained focus.
 * @listens onDidChangeActiveTextEditor
 */
function enableHighlighterIfRequired(textEditor){
    // If the highlighter is on in another document.
    if (disposable) {
        // Turn the highlighter off in that document.
        disposable.dispose();
        disposable = null;
    };
    // Get the file name of the file attached to the active document.
    const FILE_NAME = path.basename(textEditor.document.fileName);
    // If the file name ends with '.spec.html'.
    if (FILE_NAME.endsWith('.spec.html')) {
        // Enable the highlighter feature in the active document.
        disposable = window.onDidChangeTextEditorSelection(highlightIfRequired);
    }
}


/** Get each line in the text selection.
 * @param {Selection} selection - The text selection.
 * @returns {[TextLine]} - The lines in the text selection.
 */
function getLines(selection) {
    // Get a reference to the current document.
    const document = window.activeTextEditor.document;
    // Get the line number of the first line in the text selection.
    const START = selection.start.line;
    // Get the line number of the last line in the text selection.
    const END = selection.end.line + 1;
    // Initialize an empty array of lines.
    const lines = [];
    // For each line number in the text selection.
    for (let i = START; i < END; i++) {
        // Get the line associated with the line number.
        let line = document.lineAt(i);
        // Put the line in the array.
        lines.push(line);
    }
    // Return the lines in the text selection.
    return lines;
}


/** Highlight any read-only lines on the same line as the caret and in the
 * current text selection.
 * @listens {onDidChangeTextEditorSelection}
 */
function highlightIfRequired(event) {
    // Get a reference to the active text editor.
    const { activeTextEditor } = window;
    // Get each line in the current text selection.
    const lines = getLines(event.selections[0]);
    // Get any read-only lines.
    const readOnlyLines = lines.filter(isReadOnly);

    // Do nothing if there are no read-only lines in the text selection.
    if (!readOnlyLines.length) {
        return;
    }

    // Otherwise continue execution.
    // Get the range of each read-only line in the text selection.
    const ranges = readOnlyLines.map(line => line.range);
    // Highlight each read-only line in the text selection.
    activeTextEditor.setDecorations(decorationHighlight, ranges);
}


/** Check if the line of text provided is read-only.
 * @param {TextLine} line - A line of text in the document.
 * @returns {Boolean} - Whether the line of text is read-only.
 */
function isReadOnly(line) {
    // Get the line number associated with this line.
    const LINE_NUMBER = line.lineNumber;
    // Get the total number of lines in the current document.
    const LINE_COUNT = window.activeTextEditor.document.lineCount;
    // If the line is one of the first 20 or one of the last 8 it is read-only.
    return LINE_NUMBER < TOP_LINES || LINE_NUMBER >= LINE_COUNT - BOTTOM_LINES;
}