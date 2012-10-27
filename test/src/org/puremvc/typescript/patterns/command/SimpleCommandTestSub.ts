/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/ICommand.ts'/>

///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/command/SimpleCommand.ts'/>

///<reference path='SimpleCommandTestVO.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A <code>SimpleCommand</code> utility subclass used by <code>SimpleCommandTest</code>.
	 */
	export class SimpleCommandTestSub
		extends SimpleCommand
		implements ICommand
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has well been declared
		 * during its construction.
		 *
		 * @return
		 * 		<code>Facade</code> instance of the object has well been declared during its
		 * 		construction.
		 */
		hasFacade():bool
		{
			var Facade = Facade;
			return this.facade instanceof Facade;
		}
	}
}