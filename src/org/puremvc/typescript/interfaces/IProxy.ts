/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	
	/**
	 * The interface definition for a PureMVC Proxy.
	 *
	 *
	 * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
	 * <UL>
	 * <LI>Implement a common method which returns the name of the Proxy.
	 * <LI>Provide methods for setting and getting the data object.
	 *
	 *
	 * Additionally, <code>IProxy</code>s typically:
	 * <UL>
	 * <LI>Maintain references to one or more pieces of model data.
	 * <LI>Provide methods for manipulating that data.
	 * <LI>Generate <code>INotifications</code> when their model data changes.
	 * <LI>Expose their name as a <code>public static const</code> called <code>NAME</code>, if they are not instantiated multiple times.
	 * <LI>Encapsulate interaction with local or remote services used to fetch and persist model data.
	 *
	 */
	export interface IProxy
	{
		
		/**
		 * Get the Proxy name
		 * 
		 * @return the Proxy instance name
		 */
		getProxyName():string;
		
		/**
		 * Set the data object
		 * 
		 * @param data the data object
		 */
		setData( data:Object ):void;
		
		/**
		 * Get the data object
		 * 
		 * @return the data as type Object
		 */
		getData():Object;
		
		/**
		 * Called by the Model when the Proxy is registered
		 */ 
		onRegister( ):void;

		/**
		 * Called by the Model when the Proxy is removed
		 */ 
		onRemove( ):void;
	}
}