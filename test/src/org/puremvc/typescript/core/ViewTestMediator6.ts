/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>
///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

module puremvc
{
	"use strict";

	import YUITest = module("YUITest");

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
	 * Constructs a <code>Mediator</code> subclass instance.
	 *
	 * @param {String} mediatorName
	 * 		The name of the <code>Mediator</code>.
	 *
	 * @param {Object} view
	 * 		The view component handled by this <code>Mediator</code>.
	 */
	var ViewTestMediator6 = function( mediatorName, view )
	{
		Mediator.call( this, mediatorName, view );
	}
	__extends(ViewTestMediator6,Mediator);

	/**
	 * Standard getter to return the view handled by the
	 * <code>Mediator</code>.
	 *
	 * @return {Object}
	 * 		The view handled by the <code>Mediator</code>.
	 *
	 * @private
	 */
	ViewTestMediator6.prototype.getViewTest = function()
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
	ViewTestMediator6.prototype.listNotificationInterests = function()
	{
		return [ ViewTest.NOTE6 ];
	}

	/**
	 * @override
	 *
	 * @param {Notification} notification
	 * 		The notification instance to be handled.
	 */
	ViewTestMediator6.prototype.handleNotification = function( notification )
	{
		this.facade.removeMediator(this.getMediatorName());
	}

	/**
	 * @override
	 */
	ViewTestMediator6.prototype.onRemove = function()
	{
		this.getViewTest().counter++;
	}

	/**
	 * The Mediator name.
	 *
	 * @type {String}
	 * @private
	 */
	ViewTestMediator6.NAME = 'ViewTestMediator6';
}