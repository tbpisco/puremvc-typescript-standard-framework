/*
 PureMVC Javascript for Objs port by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
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
 *
 * Initialize a <code>Mediator</code> subclass instance.
 *
 * @param {Object} view
 * 		The view component handled by this <code>Mediator</code>.
 */
var ViewTestMediator5 = function( view )
{
	extract("puremvc.Mediator").call( this, ViewTestMediator5.NAME, view );
}
__extends(ViewTestMediator5,extract("puremvc.Mediator"));
	
/**
 * Standard getter to return the view handled by the
 * <code>Mediator</code>.
 *
 * @return {Object}
 * 		The view handled by the <code>Mediator</code>.
 *
 * @private
 */
ViewTestMediator5.prototype.getViewTest = function()
{
	return this.viewComponent;
}

/**
 * @override
 *
 * @return {Array}
 * 		The list of notifications names in which is interested the
 * 		<code>Mediator</code>.
 */
ViewTestMediator5.prototype.listNotificationInterests = function()
{
	return [ ViewTest.NOTE5 ];
}

/**
 * @override
 *
 * @param {Notification} notification
 * 		The notification instance to be handled.
 */
ViewTestMediator5.prototype.handleNotification = function( notification )
{
	this.getViewTest().counter++;
}

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator5.NAME = 'ViewTestMediator5';