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
	 * A SimpleCommand subclass used by FacadeTest.
	 *
	 * @see puremvc.FacadeTest FacadeTest
	 * @see puremvc.FacadeTestVO FacadeTestVO
	 *
	 * @extends puremvc.SimpleCommand SimpleCommand
	 */
	class FacadeTestCommand
		extends SimpleCommand
	{
		constructor()
		{
			SimpleCommand.call(this);
		}

		/**
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param {Notification} note
		 * 		The Notification carrying the FacadeTestVO
		 */
		execute( note )
		{
			var vo:FacadeTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}