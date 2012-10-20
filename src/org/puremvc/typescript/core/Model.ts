/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

//var IProxy = Objs("puremvc.IProxy");

module puremvc
{
	"use strict";
	
	/**
	 * The <code>Model</code> class for PureMVC.
	 *
	 * A Singleton <code>IModel</code> implementation.
	 *
	 * In PureMVC, the <code>IModel</code> class provides access to model objects (Proxies) by named
	 * lookup.
	 *
	 * The <code>Model</code> assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>IProxy</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.
	 *
	 * Your application must register <code>IProxy</code> instances with the <code>Model</code>.
	 * Typically, you use an <code>ICommand</code> to create and register <code>Proxy</code> instances
	 * once the <code>Facade</code> has initialized the Core actors.
	 *
	 * @see puremvc.Proxy Proxy
	 * @see puremvc.interfaces.IProxy IProxy
	 */
	export class Model
		implements IModel
	{

		/**
		 * HashTable of <code>IProxy</code> registered with the <code>Model</code>.
		 * @protected
		 */
		public proxyMap:Object;

		/**
		 * This <code>IModel</code> implementation is a Singleton,  so you should not call the
		 * constructor directly, but instead call the static Singleton Factory method
		 * <code>Model.getInstance()</code>.
		 * 
		 * @throws Error
		 * 		Error if Singleton instance has already been constructed.
		 */
		constructor()
		{
			if( Model.instance )
				throw Error( Model.SINGLETON_MSG );

			Model.instance = this;
			this.proxyMap = new Object();
			this.initializeModel();
		}
		
		/**
		 * Initialize the Singleton <code>Model</code> instance.
		 * 
		 *
		 * Called automatically by the constructor, this is the opportunity to initialize the
		 * Singleton instance in a subclass without overriding the constructor.
		 */
		/*protected*/public initializeModel():void
		{

		}
				
		/**
		 * <code>Model</code> Singleton Factory method.
		 * 
		 * @return
		 *		The Singleton instance.
		 */
		public static getInstance():IModel
		{
			if( !Model.instance )
				Model.instance = new Model();

			return Model.instance;
		}

		/**
		 * Register an <code>IProxy</code> with the <code>Model</code>.
		 * 
		 * @param proxy
		 *		An <code>IProxy</code> to be held by the <code>Model</code>.
		 */
		public registerProxy( proxy:IProxy ):void
		{
			this.proxyMap[ proxy.getProxyName() ] = proxy;
			proxy.onRegister();
		}

		/**
		 * Retrieve an <code>IProxy</code> from the <code>Model</code>.
		 * 
		 * @param proxyName
		 *		 The <code>IProxy</code> name to retrieve from the <code>Model</code>.
		 *
		 * @return
		 *		The <code>IProxy</code> instance previously registered with the given
		 *		<code>proxyName</code> or an explicit <code>null</code> if it doesn't exists.
		 */
		public retrieveProxy( proxyName:string ):IProxy
		{
				//Return a strict null when the proxy doesn't exist
				return this.proxyMap[proxyName] || null;
		}

		/**
		 * Check if a Proxy is registered
		 * 
		 * @param proxyName
		 *		The name of the <code>IProxy</code> to verify the existence of its registration.
		 *
		 * @return
		 *		A Proxy is currently registered with the given <code>proxyName</code>.
		 */
		public hasProxy( proxyName:string ):Boolean
		{
			return this.proxyMap[ proxyName ] != null;
		}

		/**
		 * Remove an <code>IProxy</code> from the <code>Model</code>.
		 *
		 * @param {String} proxyName
		 *		The name of the <code>Proxy</code> instance to be removed.
		 *
		 * @return {Proxy}
		 *		The <code>Proxy</code> that was removed from the <code>Model</code> or an
		 *		explicit <code>null</null> if the <code>Proxy</code> didn't exist.
		 */
		public removeProxy( proxyName:string ):IProxy
		{
			var proxy:IProxy = this.proxyMap[ proxyName ];
			if( proxy )
			{
				delete this.proxyMap[ proxyName ];
				proxy.onRemove();
			}
			
			return proxy;
		}
	/**
	 * Singleton instance.
	 *
	 * @protected
	 */
	 public static instance:IModel;

	/**
	 * Error message used to indicate that a controller singleton is already constructed when
	 * trying to constructs the class twice.
	 *
	 * @constant
	 * @protected
	 */
	 public static SINGLETON_MSG:string = "Model Singleton already constructed!";

	}
}