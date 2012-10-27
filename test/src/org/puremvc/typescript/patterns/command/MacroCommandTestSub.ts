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
	 * A <code>MacroCommand</code> utility subclass used by
	 * <code>MacroCommandTest</code>.
	 *
	 * @extends puremvc.MacroCommand MacroCommand
	 */

	/**
	 * @constructor
	 *
	 * Constructs a <code>MacroCommandTestSub</code> instance.
	 */
	var MacroCommandTestSub = function()
	{
		MacroCommand.call(this);
	}
	__extends( MacroCommandTestSub, MacroCommand );

	/**
	 * A method to test if <code>Facade</code> instance of the object has
	 * well been declared during its construction.
	 *
	 * @return {Boolean}
	 * 		<code>Facade</code> instance of the object has well been declared
	 * 		during its construction.
	 */
	MacroCommandTestSub.prototype.hasFacade = function()
	{
		var Facade = Facade;
		return this.facade instanceof Facade;
	}
}