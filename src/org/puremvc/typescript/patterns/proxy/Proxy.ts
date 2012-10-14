/*
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 United States License
*/
module puremvc
{
	"use strict";

	import org.puremvc.typescript.interfaces.*;
	import org.puremvc.typescript.patterns.observer.*;
	import org.puremvc.typescript.patterns.facade.Facade;
	
	/**
	 * A base <code>IProxy</code> implementation. 
	 * 
	 * <P>
	 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the 
	 * application's data model. </P>
	 * 
	 * <P>
	 * A <code>Proxy</code> might simply manage a reference to a local data object, 
	 * in which case interacting with it might involve setting and 
	 * getting of its data in synchronous fashion.</P>
	 * 
	 * <P>
	 * <code>Proxy</code> classes are also used to encapsulate the application's 
	 * interaction with remote services to save or retrieve data, in which case, 
	 * we adopt an asyncronous idiom; setting data (or calling a method) on the 
	 * <code>Proxy</code> and listening for a <code>Notification</code> to be sent 
	 * when the <code>Proxy</code> has retrieved the data from the service. </P>
	 * 
	 * @see org.puremvc.typescript.core.model.Model Model
	 */
	public class Proxy
		extends Notifier
		implements IProxy, INotifier
	{

		public static var NAME:string = 'Proxy';
		
		/**
		 * Constructor
		 */
		constructor( proxyName:string=null, data:Object=null )
		{
			
			this.proxyName = (proxyName != null)?proxyName:NAME; 
			if (data != null) setData(data);
		}

		/**
		 * Get the proxy name
		 */
		public getProxyName():string
		{
			return proxyName;
		}		
		
		/**
		 * Set the data object
		 */
		public setData( data:Object ):void
		{
			this.data = data;
		}
		
		/**
		 * Get the data object
		 */
		public getData():Object
		{
			return data;
		}		

		/**
		 * Called by the Model when the Proxy is registered
		 */ 
		public onRegister( ):void {}

		/**
		 * Called by the Model when the Proxy is removed
		 */ 
		public onRemove( ):void {}
		
		
		// the proxy name
		protected var proxyName:string;
		
		// the data object
		protected var data:Object;
	}
}