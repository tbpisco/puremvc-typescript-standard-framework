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

	import YUITest = module("YUITest");

	/**
	 * @classDescription
	 * A utility class used by NotifierTest.
	 *
	 * @see puremvc.NotifierTest NotifierTest
	 * @see puremvc.NotiferTestCommand NotifierTestCommand
	 */
	class

	/**
	 * @constructor
	 * Constructs a <code>NotifierTestVO</code> instance.
	 *
	 * @param {Number} input
	 * 		The number to be fed to the FacadeTestCommand
	 */
	constructor( input )
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
}