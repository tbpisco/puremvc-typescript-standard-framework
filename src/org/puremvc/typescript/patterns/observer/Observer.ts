/*
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 United States License
*/
module puremvc
{
	"use strict";

	/**
	 * A base <code>IObserver</code> implementation.
	 * 
	 * <P> 
	 * An <code>Observer</code> is an object that encapsulates information
	 * about an interested object with a method that should 
	 * be called when a particular <code>INotification</code> is broadcast. </P>
	 * 
	 * <P>
	 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Encapsulate the notification (callback) method of the interested object.</LI>
	 * <LI>Encapsulate the notification context (this) of the interested object.</LI>
	 * <LI>Provide methods for setting the notification method and context.</LI>
	 * <LI>Provide a method for notifying the interested object.</LI>
	 * </UL>
	 * 
	 * @see org.puremvc.typescript.core.view.View View
	 * @see org.puremvc.typescript.patterns.observer.Notification Notification
	 */
	export class Observer
		implements IObserver
	{
		private notify:Function;
		private context:Object;
	
		/**
		 * Constructor. 
		 * 
		 * <P>
		 * The notification method on the interested object should take 
		 * one parameter of type <code>INotification</code></P>
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
		 * Set the notification method.
		 * 
		 * <P>
		 * The notification method should take one parameter of type <code>INotification</code>.</P>
		 * 
		 * @param notifyMethod
		 * 		The notification (callback) method of the interested object.
		 */
		public setNotifyMethod( notifyMethod:Function ):void
		{
			this.notify = notifyMethod;
		}
		
		/**
		 * Set the notification context.
		 * 
		 * @param notifyContext the notification context (this) of the interested object.
		 */
		public setNotifyContext( notifyContext:Object ):void
		{
			this.context = notifyContext;
		}
		
		/**
		 * Get the notification method.
		 * 
		 * @return the notification (callback) method of the interested object.
		 */
		private getNotifyMethod():Function
		{
			return this.notify;
		}
		
		/**
		 * Get the notification context.
		 * 
		 * @return the notification context (<code>this</code>) of the interested object.
		 */
		private getNotifyContext():Object
		{
			return this.context;
		}
		
		/**
		 * Notify the interested object.
		 * 
		 * @param notification the <code>INotification</code> to pass to the interested object's notification method.
		 */
		public notifyObserver( notification:INotification ):void
		{
			this.getNotifyMethod().apply(this.getNotifyContext(),[notification]);
		}
	
		/**
		 * Compare an object to the notification context. 
		 * 
		 * @param object the object to compare
		 * @return boolean indicating if the object and the notification context are the same
		 */
		 public compareNotifyContext( object:Object ):Boolean
		 {
		 	return object === this.context;
		 }		
	}
}