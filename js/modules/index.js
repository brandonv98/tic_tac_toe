/*jshint esversion: 6 */
/// // NOTE: assign operator
//
// // NOTE: start of calls
!(() => {
	const nodes = Object.assign({}, { x: 'x' }, { o: 'o' });
	const startScreen = document.querySelector('#start');
	const gameBoard = document.querySelector('.boxes');
	// // NOTE: Classes.
	class FuncName {
		constructor(data) {
			// this.name = data.name;
			// da
		}
	}

	class Event extends FuncName {
		// // TODO:  test // DEBUG: on funcName param
		constructor(data) {
			super();
			this.node = data.node;
			this.funcName = data.funcName;
			this.type = data.type || 'click';
			data.node.addEventListener(this.type, data.funcName, true);
		}
	}
	eventDeclarations = () => {
		let startButton = new Event({ node: startScreen, funcName: clickRemove });
		let hover = new Event({ node: gameBoard, funcName: onHover, type: 'mouseover' });
		let hoverOut = new Event({ node: gameBoard, funcName: onHoverOut, type: 'mouseout' });
		let playerTurn = new Event({ node: gameBoard, funcName: playerClick });
	};

	clickRemove = (e) => { // Remove start screen overlay.
		const target = e.target;
		isTarget = target.innerHTML === 'Start game'; {
			(isTarget) ? startScreen.remove(): null;
		}
		setTimeout(function () { // Set player one to first active player.
			uDash.playerActive(true, 0);
		}, 500);
	};
	onHover = (e) => {
		const target = e.target;
		player = uDash.playerTurn + 1;
		uDash.handleHover(e.target, `box-preset-${player} box`);

	};
	onHoverOut = (e) => {
		uDash.handleHover(e.target, 'box');
	};
	playerClick = (e) => {
		player = uDash.playerTurn + 1;
		const target = e.target;
		const currentPlayer = target.id.startsWith(`player`);
		if (currentPlayer) { // Check if spot was played yet.
			return;
		} else {
			target.setAttribute('class', `box box-filled-${player}`);
			target.setAttribute('id', `player${player}-played`);

			uDash.playerActive(false, uDash.playerTurn); // Remove old active player
			uDash.nextPlayerTurn(uDash.playerTurn, setTimeout(function () { // Set next player active player.
				uDash.playerActive(true, uDash.playerTurn);
			}, 500));

			uDash.pushPlayerMove(player);
		}
	};

	eventDeclarations(); // call eventDeclarations.
})();