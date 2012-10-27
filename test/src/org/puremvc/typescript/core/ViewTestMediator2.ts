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
	 * @param {Object} view
	 * 		The view component handled by this <code>Mediator</code>.
	 */
	constructor( view )
	{
		Mediator.call( this, ViewTestMediator2.NAME, view );
	}
	__extends(ViewTestMediator2,Mediator);

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
		// be sure that the mediator has some Observers created
		// in order to test removeMediator
		return [ ViewTest.NOTE1,  ViewTest.NOTE2 ];
	}

	/**
	 * @override
	 *
	 * @param {Notification} note
	 * 		The notification instance to be handled.
	 */
	handleNotification( note )
	{
		this.getViewTest().lastNotification = note.getName();
	}

	/**
	 * The Mediator name.
	 *
	 * @type {String}
	 *
	 * @private
	 */
/*const*/static NAME:string = 'ViewTestMediator2';
}