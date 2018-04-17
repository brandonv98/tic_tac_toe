/*jshint esversion: 6 */
// ! function () {  // NOTE: Function call
const body = document.querySelector('BODY');

const uDash = (function (exports) {
	"use strict";
	exports = {
		// bodyHidden: body.firstElementChild.style.display = 'none',
	};
	exports.createDiv = () => {
		const div = document.createElement('DIV');
		body.appendChild(div);
	};
	exports.htmlSnippets = (props) => {
		const HTML = {
			start: `
        <div class="screen screen-start" id="start">
          <header>
            <h1>Tic Tac Toe</h1>
            <a href="#" class="button">Start game</a>
          </header>
        </div>`,
			win: ``,
			board: ``
		}
		return HTML;
	};
	exports.appendHTML = (props) => {
		const newDiv = body.querySelectorAll('DIV')[1];
		newDiv.innerHTML = exports.htmlSnippets().start;
	};
	////////////////////////////////////////////////////////
	// ================================================== //
	exports.helloBrandon = () => {
		console.log('Hello Brandon');
	};
	exports.goodBye = () => {
		console.log('goodbye bro...');
	};

	exports.handleStart = () => {
		exports.createDiv();
		exports.appendHTML();
	};


	exports.handleStart(); // Run create game page.
	return exports;
}(this.uDash || {}));


// }();