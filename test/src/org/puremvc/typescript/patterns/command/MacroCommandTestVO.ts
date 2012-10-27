/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>

module puremvc
{
	"use strict";

	/**
	 * @classDescription
	 * A utility class used by MacroCommandTest.
	 *
	 * @see puremvc.MacroCommandTest MacroCommandTest
	 * @see puremvc.MacroCommandTestCommand MacroCommandTestCommand
	 * @see puremvc.MacroCommandTestSub1Command MacroCommandTestSub1Command
	 * @see puremvc.MacroCommandTestSub2Command MacroCommandTestSub2Command
	 */

	/**
	 * @constructor
	 * Constructs a <code>MacroCommandTestVO</code> instance.
	 *
	 * @param {Number} input
	 * 		A random number to pass to the command.
	 */
	constructor( input )
	{
		this.input = input;
	}

	/**
	 * @type {Number}
	 */
	MacroCommandTestVO.prototype.input = null;

	/**
	 * @type {Number}
	 */
	MacroCommandTestVO.prototype.result1 = null;

	/**
	 * @type {Number}
	 */
	MacroCommandTestVO.prototype.result2 = null;
}