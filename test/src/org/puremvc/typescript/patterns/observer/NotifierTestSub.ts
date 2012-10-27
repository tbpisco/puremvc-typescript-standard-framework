/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/facade/Facade.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>

module puremvc
{
	"use strict";

	/**
	 * @classDescription
	 * A <code>Notifier</code> utility subclass used by <code>NotifierTest</code>.
	 *
	 * @extends puremvc.Notifier Notifier
	 */
	export class NotifierTestSub
		extends Notifier
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
		 * @return
		 * 		<code>Facade</code> instance of the object has well been declared
		 * 		during its construction.
		 */
		hasFacade():bool
		{
			return this.facade instanceof Facade;
		}
	}
}