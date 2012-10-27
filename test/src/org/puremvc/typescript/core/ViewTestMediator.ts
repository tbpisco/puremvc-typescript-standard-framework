/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/interfaces/IMediator.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/patterns/mediator/Mediator.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A Mediator class used by ViewTest.
	 */
	export class ViewTestMediator
		extends Mediator
		implements IMediator
	{
		/**
		 * @constructor
		 * Constructs a <code>Mediator</code> subclass instance.
		 *
		 * @param view
		 *		The view component handled by this <code>Mediator</code>.
		 */
		constructor( view:any )
		{
			super( ViewTestMediator.NAME, view );
		}

		/**
		 * @override
		 *
		 * @return
		 * 		The list of notifications names in which is interested the <code>Mediator</code>.
		 */
		listNotificationInterests():string[]
		{
			// Be sure that the mediator has some Observers created in order to test removeMediator.
			return [ 'ABC', 'DEF', 'GHI' ];
		}

		/**
		 * The Mediator name.
		 *
		 * @constant
		 */
		private static NAME:string = "ViewTestMediator";
	}
}