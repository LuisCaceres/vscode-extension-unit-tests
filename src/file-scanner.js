/* The following piece of code searches the entire root folder and subfolders 
for JavaScript files. Based on the results of the search it creates a list of 
completion suggestions that will be used by Intellisense. These suggestions 
will be shown when appropriate as the developer modifies the document. */

// Load the Node.js path module which works with file paths.
const path = require('path');

// Load the VS Code API in order to interact with VS Code.
const vscode = require('vscode');
const { CompletionItem, workspace } = vscode;

// Specify that only JavaScript files will be shown as completion suggestions.
const GLOB_PATTERN = '**/*.js';

// Create an empty list of completion suggestions.
const completionItems = [];

// Specify these completion suggestions will have a file icon.
const kind = 16;

/** Process the JavaScript files once found.
 * @param {[URI]} files - 
 * @return {[CompletionItem]}
 */
function processFiles(files) {
    // For each file found.
    for (let file of files) {
        // Generate the name of the folder.
        let folder = path.basename(file._fsPath, '.js');
        // Generate the name of the file including the extension.
        let fileName = `${folder}.js`;
        // Generate the relative path.
        let relativePath = `../${folder}/${fileName}`;
        // Create a completion suggestion.
        let completionItem = new CompletionItem(fileName, kind);
        // Associate the completion suggestion with the relative path.
        completionItem.insertText = relativePath;
        // Add to the list of completion sugestions.
        completionItems.push(completionItem);
    }

    console.log(completionItems);
    return completionItems;
}

// Look for all JavaScript files within the root folder.
workspace.findFiles(GLOB_PATTERN)
    // Process the JavaScript files once found.
    .then(processFiles);