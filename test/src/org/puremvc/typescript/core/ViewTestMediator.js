/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A Mediator class used by ViewTest.
 * 
 * @see puremvc.ViewTest ViewTest
 *
 * @extends puremvc.Mediator Mediator
 */

/**
 * @constructor
 * Initialize a <code>Mediator</code> subclass instance.
 *
 * @param {Object} view
 * 		The view component handled by this <code>Mediator</code>.
 */
var ViewTestMediator = function( view )
{
	extract("puremvc.Mediator").call( this, ViewTestMediator.NAME, view );
}
__extends( ViewTestMediator, extract("puremvc.Mediator") );

/**
 * @override
 *
 * @return {Array}
 * 		The list of notifications names in which is interested the
 * 		<code>Mediator</code>.
 */
ViewTestMediator.prototype.listNotificationInterests = function()
{
	// be sure that the mediator has some Observers created
	// in order to test removeMediator
	return [ 'ABC', 'DEF', 'GHI'  ];
}

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator.NAME = "ViewTestMediator";
