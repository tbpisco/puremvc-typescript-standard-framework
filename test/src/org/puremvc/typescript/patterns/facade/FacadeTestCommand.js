/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by FacadeTest.
 *
 * @see puremvc.FacadeTest FacadeTest
 * @see puremvc.FacadeTestVO FacadeTestVO
 * 
 * @extends puremvc.SimpleCommand SimpleCommand
 *
 * @constructor
 */
var FacadeTestCommand = function()
{
	extract("puremvc.SimpleCommand").call(this);
}
__extends( FacadeTestCommand, extract("puremvc.SimpleCommand") );

/**
 * Fabricate a result by multiplying the input by 2
 *
 * @param {Notification} note
 * 		The Notification carrying the FacadeTestVO
 */
FacadeTestCommand.prototype.execute = function( note )
{
	var vo/*FacadeTestVO*/ = note.getBody();

	// Fabricate a result
	vo.result = 2 * vo.input;
}