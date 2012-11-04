///<reference path='../../../../../../test/lib/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='ControllerTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> subclass used by <code>ControllerTest</code>.
	 */
	export class ControllerTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param note
		 * 		The note carrying the ControllerTestVO
		 */
		execute( note:puremvc.INotification )
		{
			var vo:ControllerTestVO = note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}