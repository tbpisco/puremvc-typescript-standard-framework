/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	"use strict";

	/**
	 * A base <code>IObserver</code> implementation.
	 *
	 * An <code>Observer</code> is an object that encapsulates information about an interested
	 * object with a method that should  be called when a particular <code>INotification</code> is
	 * broadcast.
	 *
	 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Encapsulate the notification (callback) method of the interested object.
	 * <LI>Encapsulate the notification context (this) of the interested object.
	 * <LI>Provide methods for setting the notification method and context.
	 * <LI>Provide a method for notifying the interested object.
	 *
	 * 
	 * @see puremvc.View View
	 * @see puremvc.Notification Notification
	 */
	export class Observer
		implements IObserver
	{
		/**
		 * The notification method of the interested object.
		 */
		notify:Function;

		/**
		 * The notification context of the interested object.
		 */
		context:Object;

		/**
		 * Constructs an <code>Observer</code> instance.
		 * 
		 * @param notifyMethod
		 * 		The notification method of the interested object.
		 *
		 * @param notifyContext
		 * 		The notification context of the interested object.
		 */
		constructor( notifyMethod:Function, notifyContext:Object )
		{
			this.setNotifyMethod( notifyMethod );
			this.setNotifyContext( notifyContext );
		}

		/**
		 * Get the notification method.
		 * 
		 * @return
		 * 		The notification (callback) method of the interested object.
		 */
		private getNotifyMethod():Function
		{
			return this.notify;
		}

		/**
		 * Set the notification method.
		 *
		 * The notification method should take one parameter of type <code>INotification</code>.
		 * 
		 * @param notifyMethod
		 * 		The notification (callback) method of the interested object.
		 */
		public setNotifyMethod( notifyMethod:Function ):void
		{
			this.notify = notifyMethod;
		}
		
		/**
		 * Get the notification context.
		 * 
		 * @return
		 * 		The notification context (<code>this</code>) of the interested object.
		 */
		private getNotifyContext():Object
		{
			return this.context;
		}
			
		/**
		 * Set the notification context.
		 * 
		 * @param notifyContext
		 * 		The notification context (this) of the interested object.
		 */
		public setNotifyContext( notifyContext:Object ):void
		{
			this.context = notifyContext;
		}

		/**
		 * Notify the interested object.
		 * 
		 * @param {Notification} note
		 * 		The <code>Notification</code> to pass to the interested object's notification
		 * 		method.
		 */
		public notifyObserver( notification:INotification ):void
		{
			this.getNotifyMethod().apply(this.getNotifyContext(),[notification]);
		}
	
		/**
		 * Compare an object to the notification context.
		 *
		 * @param object
		 * 		The object to compare.
		 *
		 * @return
		 * 		The object and the notification context are the same.
		 */
		 public compareNotifyContext( object:Object ):Boolean
		 {
		 	return object === this.context;
		 }		
	}
}