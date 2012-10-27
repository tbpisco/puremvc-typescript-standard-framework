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
	 * A SimpleCommand subclass used by NotifierTest.
	 *
	 * @see puremvc.NotifierTest NotifierTest
	 * @see puremvc.NotifierTestVO NotifierTestVO
	 *
	 * @extends puremvc.SimpleCommand SimpleCommand
	 */
	export class NotifierTestCommand
		extends SimpleCommand
	{
		constructor()
		{
			//FIXME Necessary here
			super();
		}

		/**
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param note
		 * 		The Notification carrying the NotifierTestVO
		 */
		execute( note:INotification )
		{
			var vo:NotifierTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}