/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/proxy/Proxy.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/facade/Facade.ts'/>

module puremvc
{
	"use strict";

	import YUITest = module("YUITest");

	/**
	 * @classDescription
	 * A <code>Proxy</code> utility subclass used by <code>ProxyTest</code>.
	 *
	 * @extends puremvc.Proxy Proxy
	 */
	export class ProxyTestSub
		extends Proxy
	{
		constructor()
		{
			//FIXME Necessary here ?
			super();
		}

		/**
		 * A method to test if <code>Facade</code> instance of the object has
		 * well been declared during its construction.
		 *
		 * @return {bool}
		 *		<code>Facade</code> instance of the object has well been declared
		 *		during its construction.
		 */
		hasFacade()
		{
			return this.facade instanceof Facade;
		}
	}
}