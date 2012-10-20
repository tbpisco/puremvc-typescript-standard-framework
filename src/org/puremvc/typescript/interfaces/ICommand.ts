/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	/**
	 * The interface definition for a PureMVC Command.
	 *
	 * @see puremvc.interfaces INotification
	 */
	export interface ICommand
	{
		/**
		 * Execute the <code>ICommand</code>'s logic to handle a given <code>INotification</code>.
		 * 
		 * @param note
		 * 		An <code>INotification</code> to handle.
		 */
		execute( notification:INotification ):void;
	}
}