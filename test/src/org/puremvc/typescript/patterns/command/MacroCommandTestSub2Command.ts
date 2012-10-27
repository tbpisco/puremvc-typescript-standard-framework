/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>
///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

module puremvc
{
	"use strict";

	import YUITest = module("YUITest");

	/**
	 * @classDescription
	 * A SimpleCommand subclass used by MacroCommandTestCommand.
	 *
	 * @see puremvc.MacroCommandTest MacroCommandTest
	 * @see puremvc.MacroCommandTestCommand MacroCommandTestCommand
	 * @see puremvc.MacroCommandTestVO MacroCommandTestVO
	 *
	 * @extends puremvc.SimpleCommand SimpleCommand
	 *
	 * @constructor
	 */
	var MacroCommandTestSub2Command = function()
	{
		SimpleCommand.call(this);
	}
	__extends( MacroCommandTestSub2Command, SimpleCommand );

	/**
	 * Fabricate a result by multiplying the input by 2
	 *
	 * @param {Notification} note
	 * 		The <code>Notification</code> carrying the
	 * 		<code>MacroCommandTestVO</code>
	 */
	MacroCommandTestSub2Command.prototype.execute = function( note )
	{
		var vo/*MacroCommandTestVO*/ = note.getBody();

		// Fabricate a result
		vo.result2 = vo.input * vo.input;
	}
}