/*jshint esversion: 6 */
const newModule = (function (exports) {
	"use strict";
	exports = {
		num: 5,
		string: 'Hello there'
	};
	exports.helloBrandon = () => {
		console.log('Hello Brandon');
	};
	exports.goodBye = () => {
		console.log('goodbye bro...');
	};
	return exports;
}(this.newModule || {}));

/// // NOTE: assign operator
const newObj = Object.assign({}, { hello: 'Brandon' }, { toString: 'VanCamp' });