const template = require('./template.js');

const vscode = require('vscode');
const { window, workspace } = vscode;
const fs = require('fs');

const COMMAND_NAME = 'unit-tests.insertUnitTestFile';
const EXTENSION = '.spec.html';

/** Creates and puts a unit test file in the selected folder.
 * @param {Uri} uri - A universal resource identifier representing the parent folder in which the unit test file will be put.
 * @listens Activation of command on context menu in File Explorer.
 */
function addUnitTestFile(uri) {
	/** @type {String}
	 *	@example 'foo/bar/baz/' */
	const DIRECTORY_NAME = uri._fsPath;

	/** @type {String}
	 *	@example 'baz' */
	const [FILENAME] = DIRECTORY_NAME.split('\\').reverse();

	/** @type {String}
	 *	@example 'foo/bar/baz/baz.spec.html' */
	const PATH = `${DIRECTORY_NAME}\\${FILENAME}${EXTENSION}`;

	/** @type {String} - The contents of the file. */
	const CONTENTS = template.clone(FILENAME);

	// Creates and places the unit test file in the folder selected by the user.
	fs.appendFileSync(PATH, CONTENTS);

	// Locates the unit test file on disk and opens it on VS Code.
	workspace.openTextDocument(PATH).then(window.showTextDocument);
};

vscode.commands.registerCommand(COMMAND_NAME, addUnitTestFile);

// TO DO: 
// Add comments

// NOTES:
// commands.executeCommand('editor.action.formatDocument') is buggy. It does not apply the formatting when the extension gets activated. Any subsequent creation of test files results in the document formatted accordingly.

// Construct the name of the file according the the folder name.
// NICE TO HAVE: Make some lines read only

// Create this as a class in JS