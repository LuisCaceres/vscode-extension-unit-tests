// Links to a style sheet by the test framework Mocha.
const MOCHA_CSS = 'https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css',
    // Links to a JavaScript file by the test framework Mocha.
    MOCHA_JS = 'https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js',
    // Links to a JavaScript file by the expect.js assertion library.
    EXPECT_JS = 'https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js';

/** Generates the contents of a unit test file.
 * @param {String} subject - The subject of the unit tests.
 */
function clone(subject) {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <title>${subject}</title>
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
    <!-- loads code to be tested. Add more script tags if necessary -->
    <script src="${subject}.js"></script>
    <style></style>
</head>

<body>
    <!-- do not remove the following <div> -->
    <div id="mocha"></div>
    <script>
        (function () {
            'use strict';
            describe('A group of unit tests!', function () {
                it('Is a unit test!', function () {
                    expect('Hello world!').to.be('Hello world!');
                });
            });
        }());
    </script>
    <!-- do not remove the following <script> -->
    <script>
        mocha.run();
    </script>
</body>

</html>`;
}

exports.clone = clone;
