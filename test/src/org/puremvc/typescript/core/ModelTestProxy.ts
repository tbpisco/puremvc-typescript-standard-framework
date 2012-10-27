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
	 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
	 *
	 * @extends puremvc.Proxy Proxy
	 */
	export class ModelTestProxy
		extends Proxy
	{

		/**
		 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
		 *
		 * @extends puremvc.Proxy Proxy
		 *
		 * @constructor
		 */
		constructor()
		{
			//FIXME Needed ?
			this.initialize();
		}

		/**
		 * @constructs
		 */
		//FIXME Needed ?
		initialize()
		{
			Proxy.call( this, ModelTestProxy.NAME, '' );
		}

		/**
		 * @override.
		 */
		onRegister():void
		{
			this.setData( ModelTestProxy.ON_REGISTER_CALLED );
		}

		/**
		 * @override.
		 */
		onRemove():void
		{
			this.setData( ModelTestProxy.ON_REMOVE_CALLED );
		}

		/**
		 * @constant
		 */
		private static NAME:string = 'ModelTestProxy';

		/**
		 * @constant
		 */
		private static ON_REGISTER_CALLED:string = 'onRegister Called';

		/**
		 * @constant
		 */
		private static ON_REMOVE_CALLED:string = 'onRemove Called';
	}
}