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
	 * A MacroCommand subclass used by MacroCommandTest.
	 *
	 * @see puremvc.MacroCommandTest MacroCommandTest
	 * @see puremvc.MacroCommandTestSub1Command MacroCommandTestSub1Command
	 * @see puremvc.MacroCommandTestSub2Command MacroCommandTestSub2Command
	 * @see puremvc.MacroCommandTestVO MacroCommandTestVO
	 *
	 * @extends puremvc.MacroCommand MacroCommand
	 */

	constructor()
	{
		MacroCommand.call(this);
	}
	__extends( MacroCommandTestCommand, MacroCommand );

	/**
	 * Initialize the MacroCommandTestCommand by adding
	 * its 2 SubCommands.
	 *
	 * @override
	 */
	initializeMacroCommand()
	{
		this.addSubCommand( MacroCommandTestSub1Command );
		this.addSubCommand( MacroCommandTestSub2Command );
	}
}