/*
 PureMVC for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
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
	 * A SimpleCommand subclass used by ControllerTest.
	 *
	 * @see puremvc.ControllerTest ControllerTest
	 * @see puremvc.ControllerTestVO ControllerTestVO
	 *
	 * @extends puremvc.SimpleCommand SimpleCommand
	 *
	 * @constructor
	 */
	export class ControllerTestCommand
		extends SimpleCommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param {Notification} note
		 * 		The note carrying the ControllerTestVO
		 */
		execute( note )
		{
			var vo:ControllerTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}