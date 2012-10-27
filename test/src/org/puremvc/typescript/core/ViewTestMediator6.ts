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
	constructor( mediatorName, view )
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
	getViewTest()
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
	listNotificationInterests()
	{
		return [ ViewTest.NOTE6 ];
	}

	/**
	 * @override
	 *
	 * @param {Notification} notification
	 * 		The notification instance to be handled.
	 */
	handleNotification( notification )
	{
		this.facade.removeMediator(this.getMediatorName());
	}

	/**
	 * @override
	 */
	onRemove()
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