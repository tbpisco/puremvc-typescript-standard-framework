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

	/**
	 * @classDescription
	 * A <code>Mediator</code> utility subclass used by <code>MediatorTest</code>.
	 *
	 * @extends puremvc.Mediator Mediator
	 */

	/**
	 * @constructor
	 */
	var MediatorTestSub = function()
	{
		Mediator.call(this);
	}
	__extends( MediatorTestSub, Mediator );

	/**
	 * A method to test if <code>Facade</code> instance of the object has
	 * well been declared during its construction.
	 *
	 * @return {Boolean}
	 * 		<code>Facade</code> instance of the object has well been declared
	 * 		during its construction.
	 */
	MediatorTestSub.prototype.hasFacade = function()
	{
		var Facade = Facade;
		return this.facade instanceof Facade;
	}
}