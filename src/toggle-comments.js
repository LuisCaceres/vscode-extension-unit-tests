/* The following piece of code toggles the visibility of comment blocks in a JavaScript file. There will be three supported states: 

1. Comment blocks and code are both visible at the same time.
2. Comment blocks are visible. Code is not visible.
3. Comment blocks are not visible. Code is visible. */

// Get some references to the VS Code API.
const vscode = require('vscode');
const { Range, window } = vscode;
const { activeTextEditor } = window;
const { document } = activeTextEditor;

// Let 'decoration' be the style of an invisible range of text.
const decoration = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 125, 125, 1)', // White.
    // color: 'rgba(255, 255, 255, 1)' // White.
});

// Let 'single' be a regular expression that matches a pair of forward slashes followed by exactly one piece of white space followed by one or more characters except for a dot followed by a dot (single line comment block).
const single = /\/\/\s[^.]+\./;

// Let 'multi' be a regular expression that matches a forward slash followed by an asterisk followed by any number of absolutely any characters followed by an asterisk followed by a forward slash (multi line comment block).
const multi = /\/\*[\w\W]+?\*\//;

// Let 'regex' be a regular expression based on 'single' and 'multi'.
const regex = new RegExp(`${single.source}|${multi.source}`, 'g');

// Let 'text' be all of the content in the current document.
const text = document.getText();

// Let 'comments' be an empty list of comment blocks.
let commentBlocks = [];

// Let 'code' be an empty list of code blocks.
let codeBlocks = [];

// Let 'start' be a zero-based character position in 'text'.
let start,
// Let 'end' be a zero-based character position in 'text'.
    end,
// Let 'range' be a text range delimited by 'start' and 'end'.
    range;

// Let 'start' be the character position of the very 1st character in 'text'.
start = document.positionAt(0)

let comment;
// For each comment block found in 'text'.
while (comment = regex.exec(text)) {
    // Let 'comment' be the current comment block.
    // Let 'end' be the character position of the 1st character in 'comment'.
    end = document.positionAt(comment.index);
    // Let 'range' be the text range delimited by 'start' and 'end'.
    range = new Range(start, end);
    // Add 'range' to 'codeBlocks'.
    codeBlocks.push(range);

    // Let 'start' be the character position of the 1st character in 'comment'.
    start = end;
    // Let 'end' be the character position of the last character in 'comment'.
    end = document.positionAt(regex.lastIndex);
    // Let 'range' be the text range delimited by 'start' and 'end'.
    range = new Range(start, end);
    // Add 'range' to 'comments'.
    commentBlocks.push(range);
    
    // Let 'start' be the character position of the last character in 'comment'.
    start = end;
}

// Let 'end' be the character position of the very last character in 'text'.
end = document.positionAt(text.length);
// Let 'range' be the text range delimited by 'start' and 'end'.
range = new Range(start, end);
// Add 'range' to 'codeBlocks'.
codeBlocks.push(range);

// Make each text range in 'commentBlocks' invisible.
activeTextEditor.setDecorations(decoration, commentBlocks);