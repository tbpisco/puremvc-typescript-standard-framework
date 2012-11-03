///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
///<reference path='../../../../../../../test/lib/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='NotifierTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A puremvc.SimpleCommand subclass used by NotifierTest.
	 */
	export class NotifierTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2
		 *
		 * @param note
		 * 		The Notification carrying the NotifierTestVO
		 */
		execute( note:puremvc.INotification )
		{
			var vo:NotifierTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}