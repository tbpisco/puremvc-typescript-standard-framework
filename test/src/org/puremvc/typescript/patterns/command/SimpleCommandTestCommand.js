/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

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
var SimpleCommandTestCommand = function()
{
	extract("puremvc.SimpleCommand").call(this);
}
__extends( SimpleCommandTestCommand, extract("puremvc.SimpleCommand") );

/**
 * Fabricate a result by multiplying the input by 2
 *
 * @param {Notification} note
 * 		The <code>Notification</code> carrying the
 * 		<code>SimpleCommandTestVO</code>
 */
SimpleCommandTestCommand.prototype.execute = function( note )
{
	var vo/*SimpleCommandTestVO*/ = note.getBody();

	// Fabricate a result
	vo.result = 2 * vo.input;
}