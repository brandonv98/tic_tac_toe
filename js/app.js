/*jshint esversion: 6 */
//  // NOTE: Function call.
const uDash = (function (exports) {
	"use strict";
	const body = document.querySelector('BODY');
	exports = {
		// bodyHidden: body.firstElementChild.style.display = 'none',
		turnState: 0,
		players: 2,
		playerTurn: 0,
		players: document.querySelectorAll('.players'),
		isActive: false,
		boxNodes: [...document.querySelectorAll('.box')],
		player: [new Array(), new Array()], // P1 == 0 && p2 === 1;
		winOpt: new Array(),
	};
	exports.playerToString = (playerNum) => {
		const isPlayerOne = playerNum === 0;
		let player = ''; {
			(isPlayerOne) ? player = 'o': player = 'x'; // Find what player is active.
		}
		return player;
	};
	exports.handleHover = (target, className) => {
		let isPlayedSpot = target.id.startsWith('player'); {
			(isPlayedSpot) ? null: target.setAttribute('class', `${className}`);
		}
	};
	exports.winOptions = () => {
		exports.winOpt.push([1, 2, 3]);
		exports.winOpt.push([4, 5, 6]);
		exports.winOpt.push([7, 8, 9]);
		exports.winOpt.push([1, 4, 7]);
		exports.winOpt.push([2, 5, 8]);
		exports.winOpt.push([3, 6, 9]);
		exports.winOpt.push([1, 5, 9]);
		exports.winOpt.push([3, 5, 7]);
	};
	exports.pushPlayerMove = (player) => {
		const boxes = exports.boxNodes; // loop threw the board li nodes.
		const playerNum = player; // player number;
		if (exports.turnState >= 3) { // Check amount of turns made.
			// let playCounts = 0;
			player -= 1;
			const myLoop = boxes.map((item, i, all) => {
				// i += 1; // Keep array checking count at 1 && ! 0;
				let played = item.id.startsWith(`player${playerNum}`);
				if (played) {
					// playCounts++;
					// console.log(playerNum, playCounts, playCounts);
					exports.player[player].push(i + 1); // Push the position of player location on the board.
				}
			});
			exports.checkIfWon(exports.player[player], exports.winOpt, player); // Check if player has won.
		}
		console.log(exports.player);
		exports.turnState += 1;
	};
	exports.nextPlayerTurn = (nextPlayer) => { // Decide who is next.
		const player = nextPlayer;
		if (player === 0) {
			return exports.playerTurn = 1;
		} else if (player === 1) {
			return exports.playerTurn = 0;
		}
	};
	exports.createDiv = () => {
		const div = document.createElement('DIV');
		body.appendChild(div);
	};
	exports.checkIfWon = (players, winArray, playerNum) => { // Check if any player has won.

		const playerArray = players.map((item, i, all) => {
			let play = all.slice(i, i + 3);
			console.log(play);

			const winOpt = winArray.map((item, i, all) => {
				console.log(JSON.stringify(play), JSON.stringify(item));
				if (JSON.stringify(play) === JSON.stringify(item)) {
					exports.showWinnerPage({ playerNum }); // Show the winning player page.
				}
			});
		});
	};
	exports.showWinnerPage = (props) => {
		exports.appendHTML(exports.htmlSnippets().win); // Onload show start page.
		const playerNum = props.playerNum + 1;
		let message = `Player ${playerNum} wins`; // Player message

		const finish = document.querySelector('#finish');
		finish.setAttribute('class', `screen screen-win winner-${playerNum}-background`);
		const p = document.querySelector('.message');
		p.innerHTML = message;
		p.parentNode.setAttribute('class', `winner-${playerNum}-null`);

		const button = document.querySelector('.button');
		console.log(button);
		button.addEventListener('click', (e) => {
			e.preventDefault();
			location.reload(); // Restart the game
		});
	};
	exports.htmlSnippets = (props, message = ' ') => {
		console.log(props);
		const HTML = {
			start: `
        <div class="screen screen-start" id="start">
          <header>
            <h1>Tic Tac Toe</h1>
            <a href="#" class="button">Start game</a>
          </header>
        </div>`,
			win: `
      <div class="screen screen-win" id="finish">
        <header>
          <h1>Tic Tac Toe</h1>
					<span class="winner"></span>
          <p class="message"></p>
          <a href="#" class="button">New game</a>
        </header>
      </div>`,
			board: `
      <div class="board" id="board">
        <header>
          <h1>Tic Tac Toe</h1>
          <ul>
            <li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
            <li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
          </ul>
        </header>
        <ul class="boxes">
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
        </ul>
      </div>`,
			player1: `
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewbox="0 0 42 42" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-200.000000, -60.000000)" fill="#000000">
            <g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g>
          </g>
        </g>
      </svg>`
		}
		return HTML;
	};
	exports.appendHTML = (props) => {
		const newDiv = body.querySelectorAll('DIV')[1];
		newDiv.innerHTML = props;
	};
	////////////////////////////////////////////////////////
	// ================================================== //
	// NOTE:
	exports.playerActive = (isActive, player) => {
		{
			(isActive) ? exports.players[player].setAttribute('class', 'players active'): exports.players[player].setAttribute('class', 'players');
		}

	};

	exports.handleStart = () => { // add start overlay on build.
		exports.createDiv();
		exports.appendHTML(exports.htmlSnippets().start); // Onload show start page.
		exports.winOptions();
	};


	exports.handleStart(); // Run create game page.
	return exports;
}(this.uDash || {}));