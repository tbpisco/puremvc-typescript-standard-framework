///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='SimpleCommandTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by <code>SimpleCommandTest</code>.
	 */
	export class SimpleCommandTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param note
		 * 		The <code>Notification</code> carrying the <code>SimpleCommandTestVO</code>.
		 */
		execute( note:puremvc.INotification )
		{
			var vo:SimpleCommandTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}