/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/interfaces/IProxy.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/patterns/proxy/Proxy.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
	 */
	export class ModelTestProxy
		extends Proxy
		implements IProxy
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
			super( ModelTestProxy.NAME, '' );
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