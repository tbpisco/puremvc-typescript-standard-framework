/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	
	/**
	 * The interface definition for a PureMVC Observer.
	 *
	 *
	 * In PureMVC, <code>IObserver</code> implementors assume these responsibilities:
	 * <UL>
	 * <LI>Encapsulate the notification (callback) method of the interested object.
	 * <LI>Encapsulate the notification context (this) of the interested object.
	 * <LI>Provide methods for setting the interested object' notification method and context.
	 * <LI>Provide a method for notifying the interested object.
	 *
	 * 
	 *
	 * PureMVC does not rely upon underlying event
	 * models such as the one provided with Flash,
	 * and ActionScript 3 does not have an inherent
	 * event model.
	 * 
	 *
	 * The Observer Pattern as implemented within
	 * PureMVC exists to support event driven communication
	 * between the application and the actors of the
	 * MVC triad.
	 * 
	 *
	 * An Observer is an object that encapsulates information
	 * about an interested object with a notification method that
	 * should be called when an </code>INotification</code> is broadcast. The Observer then
	 * acts as a proxy for notifying the interested object.
	 * 
	 *
	 * Observers can receive <code>Notification</code>s by having their
	 * <code>notifyObserver</code> method invoked, passing
	 * in an object implementing the <code>INotification</code> interface, such
	 * as a subclass of <code>Notification</code>.
	 * 
	 * @see puremvc.interfaces.IView IView
	 * @see puremvc.interfaces.INotification INotification
	 */
	export interface IObserver
	{
		//import INotification = module("puremvc").INotification;

		/**
		 * Set the notification method.
		 * 
		 *
		 * The notification method should take one parameter of type <code>INotification</code>
		 * 
		 * @param notifyMethod the notification (callback) method of the interested object
		 */
		setNotifyMethod( notifyMethod:Function ):void;
		
		/**
		 * Set the notification context.
		 * 
		 * @param notifyContext the notification context (this) of the interested object
		 */
		setNotifyContext( notifyContext:Object ):void;
		
		/**
		 * Notify the interested object.
		 * 
		 * @param notification the <code>INotification</code> to pass to the interested object's notification method
		 */
		notifyObserver( notification:INotification ):void;
		
		/**
		 * Compare the given object to the notificaiton context object.
		 * 
		 * @param object the object to compare.
		 * @return boolean indicating if the notification context and the object are the same.
		 */
		compareNotifyContext( object:Object ):Boolean;
	}
}