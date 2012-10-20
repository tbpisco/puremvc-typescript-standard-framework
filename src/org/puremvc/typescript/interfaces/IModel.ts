/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	/**
	 * The interface definition for a PureMVC Model.
	 * 
	 *
	 * In PureMVC, <code>IModel</code> implementors provide
	 * access to <code>IProxy</code> objects by named lookup.
	 * 
	 *
	 * An <code>IModel</code> assumes these responsibilities:
	 * 
	 * <UL>
	 * <LI>Maintain a cache of <code>IProxy</code> instances
	 * <LI>Provide methods for registering, retrieving, and removing <code>IProxy</code> instances
	 *
	 */
	export interface IModel
	{
		/**
		 * Register an <code>IProxy</code> instance with the <code>Model</code>.
		 * 
		 * @param proxyName the name to associate with this <code>IProxy</code> instance.
		 * @param proxy an object reference to be held by the <code>Model</code>.
		 */
		registerProxy( proxy:IProxy ):void;

		/**
		 * Retrieve an <code>IProxy</code> instance from the Model.
		 * 
		 * @param proxyName
		 * @return the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
		 */
		retrieveProxy( proxyName:string ):IProxy;

		/**
		 * Remove an <code>IProxy</code> instance from the Model.
		 * 
		 * @param proxyName name of the <code>IProxy</code> instance to be removed.
		 * @return the <code>IProxy</code> that was removed from the <code>Model</code>
		 */
		removeProxy( proxyName:string ):IProxy;

		/**
		 * Check if a Proxy is registered
		 * 
		 * @param proxyName
		 * @return whether a Proxy is currently registered with the given <code>proxyName</code>.
		 */
		hasProxy( proxyName:string ):Boolean;

	}
}