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
	class ModelTestProxy
		extends Proxy
	{

		/**
		 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
		 *
		 * @extends puremvc.Proxy Proxy
		 *
		 * @constructor
		 */
		constructor(){ this.initialize() }

		/**
		 * @constructs
		 */
		initialize()
		{
			Proxy.call( this, ModelTestProxy.NAME, '' );
		}

		/**
		 * @override.
		 */
		onRegister()
		{
			this.setData( ModelTestProxy.ON_REGISTER_CALLED );
		}

		/**
		 * @override.
		 */
		onRemove()
		{
			this.setData( ModelTestProxy.ON_REMOVE_CALLED );
		}

		/**
		 * @type {String}
		 * @constant
		 */
		ModelTestProxy.NAME = 'ModelTestProxy';


		/**
		 * @type {String}
		 * @constant
		 */
		ModelTestProxy.ON_REGISTER_CALLED = 'onRegister Called';


		/**
		 * @type {String}
		 * @constant
		 */
		ModelTestProxy.ON_REMOVE_CALLED = 'onRemove Called';
	}
}