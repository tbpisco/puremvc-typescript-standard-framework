/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by NotifierTest.
 * 
 * @see puremvc.NotifierTest NotifierTest
 * @see puremvc.NotiferTestCommand NotifierTestCommand
 */

/**
 * @constructor
 * Constructs a <code>NotifierTestVO</code> instance.
 *
 * @param {Number} input
 * 		The number to be fed to the FacadeTestCommand
 */
var NotifierTestVO = function( input )
{
	this.input = input;
}

/**
 * @type {Number}
 */
NotifierTestVO.prototype.input = null;

/**
 * @type {Number}
 */
NotifierTestVO.prototype.result = null;