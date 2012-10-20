/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	
	/**
	 * The interface definition for a PureMVC View.
	 * 
	 *
	 * In PureMVC, <code>IView</code> implementors assume these responsibilities:
	 * 
	 *
	 * In PureMVC, the <code>View</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>IMediator</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>IMediators</code>.
	 * <LI>Managing the observer lists for each <code>INotification</code> in the application.
	 * <LI>Providing a method for attaching <code>IObservers</code> to an <code>INotification</code>'s observer list.
	 * <LI>Providing a method for broadcasting an <code>INotification</code>.
	 * <LI>Notifying the <code>IObservers</code> of a given <code>INotification</code> when it broadcast.
	 *
	 * 
	 * @see puremvc.interfaces.IMediator IMediator
	 * @see puremvc.interfaces.IObserver IObserver
	 * @see puremvc.interfaces.INotification INotification
	 */
	export interface IView
	{
		
		/**
		 * Register an <code>IObserver</code> to be notified
		 * of <code>INotifications</code> with a given name.
		 * 
		 * @param notificationName the name of the <code>INotifications</code> to notify this <code>IObserver</code> of
		 * @param observer the <code>IObserver</code> to register
		 */
		registerObserver( notificationName:string, observer:IObserver ):void;

		/**
		 * Remove a group of observers from the observer list for a given Notification name.
		 *
		 * @param notificationName which observer list to remove from 
		 * @param notifyContext removed the observers with this object as their notifyContext
		 */
		removeObserver( notificationName:string, notifyContext:Object ):void;

		/**
		 * Notify the <code>IObservers</code> for a particular <code>INotification</code>.
		 * 
		 *
		 * All previously attached <code>IObservers</code> for this <code>INotification</code>'s
		 * list are notified and are passed a reference to the <code>INotification</code> in 
		 * the order in which they were registered.
		 * 
		 * @param notification the <code>INotification</code> to notify <code>IObservers</code> of.
		 */
		notifyObservers( note:INotification ):void;

		/**
		 * Register an <code>IMediator</code> instance with the <code>View</code>.
		 * 
		 *
		 * Registers the <code>IMediator</code> so that it can be retrieved by name,
		 * and further interrogates the <code>IMediator</code> for its 
		 * <code>INotification</code> interests.
		 *
		 * If the <code>IMediator</code> returns any <code>INotification</code> 
		 * names to be notified about, an <code>Observer</code> is created encapsulating 
		 * the <code>IMediator</code> instance's <code>handleNotification</code> method 
		 * and registering it as an <code>Observer</code> for all <code>INotifications</code> the 
		 * <code>IMediator</code> is interested in.</p>
		 * 
		 * @param mediatorName the name to associate with this <code>IMediator</code> instance
		 * @param mediator a reference to the <code>IMediator</code> instance
		 */
		registerMediator( mediator:IMediator ):void;

		/**
		 * Retrieve an <code>IMediator</code> from the <code>View</code>.
		 * 
		 * @param mediatorName the name of the <code>IMediator</code> instance to retrieve.
		 * @return the <code>IMediator</code> instance previously registered with the given <code>mediatorName</code>.
		 */
		retrieveMediator( mediatorName:string ):IMediator;

		/**
		 * Remove an <code>IMediator</code> from the <code>View</code>.
		 * 
		 * @param mediatorName name of the <code>IMediator</code> instance to be removed.
		 * @return the <code>IMediator</code> that was removed from the <code>View</code>
		 */
		removeMediator( mediatorName:string ):IMediator;
		
		/**
		 * Check if a Mediator is registered or not
		 * 
		 * @param mediatorName
		 * @return whether a Mediator is registered with the given <code>mediatorName</code>.
		 */
		hasMediator( mediatorName:string ):Boolean;
		
	}
	
}