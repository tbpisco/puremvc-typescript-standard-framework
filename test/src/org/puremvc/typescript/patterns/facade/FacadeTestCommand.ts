///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
///<reference path='../../../../../../../test/lib/puremvc-typescript-standard-1.0.d.ts'/>

///<reference path='FacadeTestVO.ts'/>

module test
{
	"use strict";

	/**
	 * A puremvc.SimpleCommand subclass used by FacadeTest.
	 */
	export class FacadeTestCommand
		extends puremvc.SimpleCommand
		implements puremvc.ICommand
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 *
		 * @param note
		 * 		The Notification carrying the FacadeTestVO.
		 */
		execute( note:puremvc.INotification )
		{
			var vo:FacadeTestVO = <FacadeTestVO> note.getBody();

			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
}