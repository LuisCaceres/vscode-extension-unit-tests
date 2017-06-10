/* The following piece of code makes certain lines of code read-only in the unit test file. */

const vscode = require('vscode');
const { window } = vscode;

const decorationHighlight = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 0, 0, 1)' // This colour is gray.
});

const noDecoration = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 255, 255, 1)' // This colour is white.
});

/** @type {TextLine|null} - The line highlighted or nothing if there is none. */
var line = null;

const TOP_LINES = 19;
const BOTTOM_LINES = 8;

/**
 * 
 */
function detectReadOnlyLines(event) {
    // Gets a reference to the active text editor.
    const { textEditor } = event;
    // Gets the number of lines in the document loaded in the text editor.
    const LINE_COUNT = textEditor.document.lineCount;
    // Gets the number of the line on which the caret is located.
    const LINE_NUMBER = event.selections[0].start.line;

    // If the line is one of the first 19 or one of the last 8 it is read-only.
    if (LINE_NUMBER < TOP_LINES || LINE_NUMBER >= LINE_COUNT - BOTTOM_LINES) {
        // Retrieves the actual line as an instance of TextLine.
        line = textEditor.document.lineAt(LINE_NUMBER);
        // Highlights the line as an indication that it is read-only.
        textEditor.setDecorations(decorationHighlight, [line.range]);
    }

    // Otherwise the line is editable.
    else if (line) {
        // Removes the background colour from a line if it is highlighted.
        textEditor.setDecorations(noDecoration, [line.range]);
        // Forgets about the former highlighted line.
        line = null;
    }

    console.log(line.text);
}

// attempts to detect a read-only line once the caret changes location.
window.onDidChangeTextEditorSelection(detectReadOnlyLines);

// TO DO: There is buggy behaviour with toggling the decoration when moving from a read-only line to an editable one and viceversa.