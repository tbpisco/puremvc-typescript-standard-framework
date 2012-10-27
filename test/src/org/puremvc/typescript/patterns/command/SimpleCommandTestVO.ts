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
	 * A utility class used by SimpleCommandTest.
	 *
	 * @see puremvc.SimpleCommandTest SimpleCommandTest
	 * @see puremvc.SimpleCommandTestCommand SimpleCommandTestCommand
	 */

	/**
	 * @constructor
	 * Constructs a <code>SimpleCommandTestVO</code> instance.
	 *
	 * @param {number} input
	 * 		The number to be fed to the	<code>SimpleCommandTestCommand</code>.
	 */
	constructor( input )
	{
		SimpleCommand.call(this);

		this.input = input;
	}
	__extends( SimpleCommandTestVO, SimpleCommand );

	/**
	 * @type {number}
	 */
	input:number = null;

	/**
	 * @type {number}
	 */
	result:number = null;
}