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
	 * A SimpleCommand subclass used by SimpleCommandTest.
	 *
	 * @see puremvc.SimpleCommandTest SimpleCommandTest
	 * @see puremvc.SimpleCommandTestVO SimpleCommandTestVO
	 *
	 * @extends puremvc.SimpleCommand SimpleCommand
	 *
	 * @constructor
	 */
	constructor()
	{
		SimpleCommand.call(this);
	}
	__extends( SimpleCommandTestCommand, SimpleCommand );

	/**
	 * Fabricate a result by multiplying the input by 2
	 *
	 * @param {Notification} note
	 * 		The <code>Notification</code> carrying the
	 * 		<code>SimpleCommandTestVO</code>
	 */
	SimpleCommandTestCommand.prototype.execute = function( note )
	{
		var vo:SimpleCommandTestVO = note.getBody();

		// Fabricate a result
		vo.result = 2 * vo.input;
	}
}