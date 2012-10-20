/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

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
 * @param {Number} input
 * 		The number to be fed to the	<code>SimpleCommandTestCommand</code>.
 */
var SimpleCommandTestVO = function( input )
{
	extract("puremvc.SimpleCommand").call(this);

	this.input = input;
}
__extends( SimpleCommandTestVO, extract("puremvc.SimpleCommand") );
	
/**
 * @type {Number}
 */
SimpleCommandTestVO.prototype.input = null;
	
/**
 * @type {Number}
 */
SimpleCommandTestVO.prototype.result = null;