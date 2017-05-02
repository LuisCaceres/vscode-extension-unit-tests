/* Inserts a unit test file template upon creation of a '.spec.html' file. */

const pattern = '**/*.spec.html';

const MOCHA_CSS = 'https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css',
	MOCHA_JS = 'https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js',
	EXPECT_JS = 'https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js';

var template =
`<!DOCTYPE html>
<html lang="en">

<head>
	<title>Mocha Tests</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="${MOCHA_CSS}" rel="stylesheet">
	<!-- loads test framework -->
	<script src="${MOCHA_JS}"></script>
	<!-- loads a library assertion -->
	<script src="${EXPECT_JS}"></script>
	<!-- do not remove the following <script> -->
	<script>
		mocha.setup('bdd');
	</script>
	<!-- loads the event constructors polyfill -->
	<script src="../polyfills/event constructors.js"></script>
	<!-- loads code to be tested. Add more script tags if necessary -->
	<script src=""></script>
	<style></style>
</head>

<body>
	<!-- do not remove the following <div> -->
	<div id="mocha"></div>
	<script>
		(function () {
			'use strict';
			describe('A group of unit tests!', function () {
				it('Is a unit test!');
			});
		}());
	</script>
	<!-- do not remove the following <script> -->
	<script>
		mocha.run();
	</script>
</body>

</html>`;

var { Position, workspace, WorkspaceEdit } = require('vscode');

var watcher = workspace.createFileSystemWatcher(pattern, false, true, true);

watcher.onDidCreate(function (uri) {
	var edit = new WorkspaceEdit();
	edit.insert(uri, new Position(0, 0), template);
	workspace.applyEdit(edit);
});

// TO DO: 
// Add comments

// NOTES:
// commands.executeCommand('editor.action.formatDocument') is buggy. It does not apply the formatting when the extension gets activated. Any subsequent creation of test files results in the document formatted accordingly.
