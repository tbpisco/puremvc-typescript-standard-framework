/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	"use strict";
	
	/**
	 * A base <code>INotification</code> implementation.
	 * 
	 *
	 * PureMVC does not rely upon underlying event framework or language models and TypeScript does
	 * not have an inherent event model.
	 * 
	 * The Observer Pattern as implemented within PureMVC exists to support event-driven
	 * communication between the application and the actors of the MVC triad.
	 *
	 * Notifications are not meant to be a replacement for Events in Flex/Flash/Air/Javascript.
	 * Generally, <code>IMediator</code> implementors place event listeners on their view components,
	 * which they then handle in the usual way. This may lead to the broadcast of
	 * <code>INotification</code>s to trigger <code>ICommand</code>s or to communicate with other
	 * <code>IMediators</code>. <code>IProxy</code> and <code>ICommand</code> instances communicate
	 * with each other and <code>IMediator</code>s by broadcasting <code>INotification</code>s.
	 * 
	 *
	 * A key difference between JavaScript <code>Event</code>s and PureMVC
	 * <code>INotification</code>s is that <code>Event</code>s follow the 'Chain of Responsibility'
	 * pattern, 'bubbling' up the display hierarchy until some parent component handles the
	 * <code>Event</code>, while PureMVC <code>INotification</code>s follow a 'Publish/Subscribe'
	 * pattern. PureMVC classes need not be related to each other in a parent/child relationship in
	 * order to communicate with one another using <code>INotification</code>s.
	 * 
	 * @see puremvc.Observer Observer
	 * 
	 */
	export class Notification
		implements INotification
	{
		/**
		 * The name of the notification.
		 */
		private name:string;

		/**
		 * The body data to send with the notification.
		 */
		private body:Object;
		
		/**
		 * The type identifier of the notification.
		 */
		private type:string;
				
		/**
		 * Constructs a <code>Notification</code> instance.
		 *
		 * @param {String} name
		 * 		The name of the notification.
		 *
		 * @param {Object} body
		 * 		(optional) Body data to send with the notification.
		 * 
		 * @param {String} type (optional)
		 * 		Type identifier of the notification.
		 */
		constructor( name:string, body:Object=null, type:string=null )
		{
			this.name = name;
			this.body = body;
			this.type = type;
		}
		
		/**
		 * Get the name of the <code>Notification</code> instance.
		 * 
		 * @return the name of the <code>Notification</code> instance.
		 */
		public getName():string
		{
			return this.name;
		}
		
		/**
		 * Set the body of the <code>Notification</code> instance.
		 */
		public setBody( body:Object ):void
		{
			this.body = body;
		}
		
		/**
		 * Get the body of the <code>Notification</code> instance.
		 * 
		 * @return the body object. 
		 */
		public getBody():Object
		{
			return this.body;
		}
		
		/**
		 * Set the type of the <code>Notification</code> instance.
		 */
		public setType( type:string ):void
		{
			this.type = type;
		}
		
		/**
		 * Get the type of the <code>Notification</code> instance.
		 * 
		 * @return the type  
		 */
		public getType():string
		{
			return this.type;
		}

		/**
		 * Get the string representation of the <code>Notification</code> instance.
		 * 
		 * @return the string representation of the <code>Notification</code> instance.
		 */
		public toString():string
		{
			var msg:string = "Notification Name: " + this.getName();
			msg += "\nBody:" + (( this.getBody() == null ) ? "null" : this.getBody().toString());
			msg += "\nType:" + (( this.getType() == null ) ? "null" : this.getType());
			return msg;
		}		
	}
}