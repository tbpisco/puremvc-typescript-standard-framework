/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	"use strict";
	
	/**
	 * A base <code>IProxy</code> implementation. 
	 *
	 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the application's data
	 * model.
	 *
	 * A <code>Proxy</code> might simply manage a reference to a local data object, in which case
	 * interacting with it might involve setting and getting of its data in synchronous fashion.
	 *
	 * <code>Proxy</code> classes are also used to encapsulate the application's interaction with
	 * remote services to store or retrieve data, in which case, we adopt an asynchronous idiom
	 * setting data (or calling a method) on the <code>Proxy</code> and listening for a
	 * <code>Notification</code> to be sent when the <code>Proxy</code> has retrieved the data from
	 * the service.
	 * 
	 * @see puremvc.core.model.Model Model
	 */
	export class Proxy
		extends Notifier
		implements IProxy, INotifier
	{

		/**
		 * The data object controlled by the <code>Proxy</code>.
		 */
		private proxyName:string;

		/**
		 * The name of the <code>Proxy</code>.
		 */
		private data:Object;

		/**
		 * The default name of the <code>Proxy</code>
		 * 
		 * @type {String}
		 * @constant
		 */
		 public static NAME:string = 'Proxy';

		/**

		 *
		 * Constructs a <code>Proxy</code> instance.
		 *
		 * @param {String} proxyName
		 * 		The name of the <code>Proxy</code>.
		 *
		 * @param {Object} data
		 * 		An initial data object to be held by the <code>Proxy</code>.
		 */
		constructor( proxyName:string=null, data:Object=null )
		{
			super();

			this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;

			if( data != null )
				this.setData(data);
		}

		/**
		 * Get the proxy name
		 * @return
		 * 		The name of the proxy.
		 */
		public getProxyName():string
		{
			return this.proxyName;
		}		

		/**
		 * Set the data object.
		 * @param data
		 * 		The data to set.
		 */
		public setData( data:Object ):void
		{
			this.data = data;
		}

		/**
		 * Get the data object
		 *
		 * @return
		 * 		The data held in the <code>Proxy</code>.
		 */
		public getData():Object
		{
			return this.data;
		}

		/**
		 * Called by the Model when the <code>Proxy</code> is registered. This method has to be
		 * overridden by the subclass to know when the instance is registered.
		 */ 
		public onRegister( ):void {}

		/**
		 * Called by the Model when the <code>Proxy</code> is removed. This method has to be
		 * overridden by the subclass to know when the instance is removed.
		 */ 
		public onRemove( ):void {}
	}
}