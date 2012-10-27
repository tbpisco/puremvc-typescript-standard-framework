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
	 * @param {Object} view
	 * 		The view component handled by this <code>Mediator</code>.
	 */
	var ViewTestMediator3 = function( view )
	{
		Mediator.call( this, ViewTestMediator3.NAME, view );
	}
	__extends(ViewTestMediator3,Mediator);

	/**
	 * Standard getter to return the view handled by the
	 * <code>Mediator</code>.
	 *
	 * @return {Object}
	 * 		The view handled by the <code>Mediator</code>.
	 *
	 * @private
	 */
	ViewTestMediator3.prototype.getViewTest = function()
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
	ViewTestMediator3.prototype.listNotificationInterests = function()
	{
		// be sure that the mediator has some Observers created
		// in order to test removeMediator
		return [ ViewTest.NOTE3 ];
	}

	/**
	 * @override
	 *
	 * @param {Notification} notification
	 * 		The notification instance to be handled.
	 */
	ViewTestMediator3.prototype.handleNotification = function( note )
	{
		this.getViewTest().lastNotification = note.getName();
	}

	/**
	 * The Mediator name.
	 *
	 * @type {String}
	 * @private
	 */
	ViewTestMediator3.NAME = 'ViewTestMediator3';
}