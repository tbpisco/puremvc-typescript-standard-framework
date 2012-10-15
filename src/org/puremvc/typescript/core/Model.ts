/*
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 United States License
*/
module puremvc
{
	"use strict";
	
	/**
	 * A Singleton <code>IModel</code> implementation.
	 * 
	 * <P>
	 * In PureMVC, the <code>Model</code> class provides
	 * access to model objects (Proxies) by named lookup. 
	 * 
	 * <P>
	 * The <code>Model</code> assumes these responsibilities:</P>
	 * 
	 * <UL>
	 * <LI>Maintain a cache of <code>IProxy</code> instances.</LI>
	 * <LI>Provide methods for registering, retrieving, and removing 
	 * <code>IProxy</code> instances.</LI>
	 * </UL>
	 * 
	 * <P>
	 * Your application must register <code>IProxy</code> instances 
	 * with the <code>Model</code>. Typically, you use an 
	 * <code>ICommand</code> to create and register <code>IProxy</code> 
	 * instances once the <code>Facade</code> has initialized the Core 
	 * actors.</p>
	 *
	 * @see org.puremvc.typescript.patterns.proxy.Proxy Proxy
	 * @see org.puremvc.typescript.interfaces.IProxy IProxy
	 */
	export class Model
		implements IModel
	{
		/**
		 * Constructor. 
		 * 
		 * <P>
		 * This <code>IModel</code> implementation is a Singleton, 
		 * so you should not call the constructor 
		 * directly, but instead call the static Singleton 
		 * Factory method <code>Model.getInstance()</code>
		 * 
		 * @throws Error Error if Singleton instance has already been constructed
		 * 
		 */
		constructor()
		{
			if( Model.instance != null )
				throw Error( Model.SINGLETON_MSG );

			Model.instance = this;
			this.proxyMap = new Array();
			this.initializeModel();
		}
		
		/**
		 * Initialize the Singleton <code>Model</code> instance.
		 * 
		 * <P>
		 * Called automatically by the constructor, this
		 * is your opportunity to initialize the Singleton
		 * instance in your subclass without overriding the
		 * constructor.</P>
		 * 
		 * @return void
		 */
		public initializeModel():void
		{

		}
				
		/**
		 * <code>Model</code> Singleton Factory method.
		 * 
		 * @return the Singleton instance
		 */
		public static getInstance():IModel
		{
			if( Model.instance == null )
				Model.instance = new Model( );

			return Model.instance;
		}

		/**
		 * Register an <code>IProxy</code> with the <code>Model</code>.
		 * 
		 * @param proxy an <code>IProxy</code> to be held by the <code>Model</code>.
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
		 * @return the <code>IProxy</code> instance previously registered with the given <code>proxyName</code>.
		 */
		public retrieveProxy( proxyName:string ):IProxy
		{
			return this.proxyMap[ proxyName ];
		}

		/**
		 * Check if a Proxy is registered
		 * 
		 * @param proxyName
		 * @return whether a Proxy is currently registered with the given <code>proxyName</code>.
		 */
		public hasProxy( proxyName:string ):Boolean
		{
			return this.proxyMap[ proxyName ] != null;
		}

		/**
		 * Remove an <code>IProxy</code> from the <code>Model</code>.
		 * 
		 * @param proxyName name of the <code>IProxy</code> instance to be removed.
		 * @return the <code>IProxy</code> that was removed from the <code>Model</code>
		 */
		public removeProxy( proxyName:string ):IProxy
		{
			var proxy:IProxy = this.proxyMap[ proxyName ];
			if ( proxy ) 
			{
				this.proxyMap[ proxyName ] = null;
				proxy.onRemove();
			}
			return proxy;
		}

		// Mapping of proxyNames to IProxy instances
		public proxyMap:IProxy[];

		// Singleton instance
		public static instance:IModel;
		
		// Message Constants
		public static SINGLETON_MSG	: string = "Model Singleton already constructed!";

	}
}