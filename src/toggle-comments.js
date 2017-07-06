/* The following piece of code toggles the visibility of comment blocks in a JavaScript file. There will be three supported states: 

1. Comment blocks and code are both visible at the same time.
2. Comment blocks are visible. Code is not visible.
3. Comment blocks are not visible. Code is visible. */

// Get some references to the VS Code API.
const vscode = require('vscode');
const { Range, window } = vscode;
const { activeTextEditor } = window;

// Let 'decoration' be the style of an invisible text range.
const decoration = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 125, 125, 1)', // White.
    // color: 'rgba(255, 255, 255, 1)' // White.
});

// Let 'document' be the current document.
const document = activeTextEditor.document;

// Let 'single' be a regular expression that matches a pair of forward slashes followed by exactly one piece of white space followed by any number of absolutely any characters followed by a dot (single line comment block).
const single = /\/\/\s[\W\w]+?\./;

// Let 'multi' be a regular expression that matches a forward slash followed by an asterisk followed by any number of absolutely any characters followed by an asterisk followed by a forward slash (multi line comment block).
const multi = /\/\*[\w\W]+?\*\//;

// Let 'PATTERN' be the result of merging 'single' and 'multi'.
const PATTERN = `${single.source}|${multi.source}`;

// Let 'comment' be a regular expression based on PATTERN.
const comment = new RegExp(PATTERN, 'g');

// Let 'text' be the entire textual content in 'document'.
const text = document.getText();

// Let 'match' be a substring in 'text' that matches 'comment'.
let match;

// Let 'ranges' be an empty list of text ranges.
let ranges = [];

// For each match in 'text'.
while (match = comment.exec(text)) {
    // Let 'start' be the zero-based position at which 'match' starts.
    let start = document.positionAt(match.index);
    
    // Let 'end' be the zero-based position at which 'match' ends.
    let end = document.positionAt(comment.lastIndex);
    
    // Let 'range' be a text range delimited by 'start' and 'end'.
    let range = new Range(start, end);

    // Add 'range' to the list of ranges.
    ranges.push(range);
}

// Hide each text range in 'ranges'.
activeTextEditor.setDecorations(decoration, ranges);