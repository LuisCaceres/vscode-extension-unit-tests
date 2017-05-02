// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
require('./src/snippet.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate() {}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

exports.deactivate = deactivate;



// TO DO:

// spec.html files live in specific type of folders. They can't be put anywhere. We need some validation checks for this.
// on save, the browser(s) running the tests should reload automatically
// intellisense suppor for the library.
// only allow modification with the main <script> element
// populate <title> with the appropriate text
// get GIFS to demonstrate the features of this extension