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
 * 
 * @constructor
 */

		/**
 * @constructor
 *
		 * Initialize a <code>Mediator</code> subclass instance.
		 * 
		 * @param {Object} view
		 * 		The view component handled by this <code>Mediator</code>.
		 */
var ViewTestMediator4 = function( view )
{
	extract("puremvc.Mediator").call( this, ViewTestMediator4.NAME, view );
}
__extends(ViewTestMediator4,extract("puremvc.Mediator"));

/**
 * Standard getter to return the view handled by the
 * <code>Mediator</code>.
 *
 * @return {Object}
 * 		The view handled by the <code>Mediator</code>.
 *
 * @private
 */
ViewTestMediator4.prototype.getViewTest = function()
{
	return this.viewComponent;
}

/**
 * @override
 */
ViewTestMediator4.prototype.onRegister = function()
{
	this.getViewTest().onRegisterCalled = true;
}

/**
 * @override
 */
ViewTestMediator4.prototype.onRemove = function()
{
	this.getViewTest().onRemoveCalled = true;
}

/**
 * The Mediator name.
 * 
 * @type {String}
 * @private
 */
ViewTestMediator4.NAME = 'ViewTestMediator4';