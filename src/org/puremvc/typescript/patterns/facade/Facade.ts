/*
 PureMVC for TypeScript port port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

//var Model = Objs("puremvc.Model");
//var View = Objs("puremvc.View");
//var Controller = Objs("puremvc.Controller");
//var Notification = Objs("puremvc.Notification");
//var IFacade = Objs("puremvc.IFacade");

module puremvc
{
	"use strict";

	/**
	 * A base Singleton <code>IFacade</code> implementation.
	 * 
	 * In PureMVC, the <code>Facade</code> class assumes these responsibilities:
	 *
	 * <UL>
	 * <LI>Initializing the <code>Model</code>, <code>View</code> and <code>Controller</code>
	 * singletons.
	 *
	 * <LI>Providing all the methods defined by the <code>IModel, IView, & IController</code> interfaces.
	 * <LI>Providing the ability to override the specific <code>Model</code>, <code>View</code> and
	 * <code>Controller</code> Singletons created.
	 * <LI>Providing a single point of contact to the application for registering <code>Commands</code> and
	 * notifying <code>Observers</code>
	 * 
	 *
 	 * Example usage:
	 * <code>
	 *	import puremvc.&lowast;;
	 * 
	 *	import com.me.myapp.model.~~;
	 *	import com.me.myapp.view.~~;
	 *	import com.me.myapp.controller.~~;
	 * 
	 *	class MyFacade extends Facade
	 *	{
	 *		//Notification constants. The Facade is the ideal location for these constants, since
	 *		//any part of the application participating in PureMVC Observer Notification will know
	 *		//the Facade.
	 *		public static const GO_COMMAND:string = "go";
	 * 		
	 *		// Override Singleton Factory method 
	 *		public static getInstance():MyFacade
	 *		{
	 *			if(instance == null) instance = new MyFacade();
	 *			return instance as MyFacade;
	 *		}
	 * 		
	 *		// optional initialization hook for Facade
	 *		public initializeFacade():void
	 *		{
	 *			super.initializeFacade();
	 *			// do any special subclass initialization here
	 *		}
	 *	
	 *		// optional initialization hook for Controller
	 *		public initializeController():void
	 *		{
	 *			// call super to use the PureMVC Controller Singleton. 
	 *			super.initializeController();
	 * 
	 *			// Otherwise, if you're implmenting your own IController, then instead do:
	 *			// if( controller != null ) return;
	 *			// controller = MyAppController.getInstance();
	 * 		
	 *			// do any special subclass initialization here such as registering Commands
	 *			registerCommand( GO_COMMAND, com.me.myapp.controller.GoCommand )
	 *		}
	 *	
	 *		// optional initialization hook for Model
	 *		public initializeModel():void
	 *		{
	 *			//Call super to use the PureMVC Model Singleton.
	 *			super.initializeModel();
	 * 
	 *			// Otherwise, if you're implmenting your own IModel, then instead do:
	 *			// if( model != null ) return;
	 *			// model = MyAppModel.getInstance();
	 * 		
	 *			//Do any special subclass initialization here such as creating and registering Model
	 *			//proxys that don't require a facade reference at construction time, such as fixed
	 *			//type lists that never need to send Notifications.
	 *			registerProxy( new USStateNamesProxy() );
	 * 			
	 *			//CAREFUL: Can't reference Facade instance in constructor of new Proxys from here,
	 *			//since this step is part of Facade construction! Usually, Proxys needing to send 
	 *			//notifications are registered elsewhere in the app for this reason.
	 *
	 *		}
	 *	
	 *		//Optional initialization hook for View
	 *		public initializeView():void
	 *		{
	 *			//call super to use the PureMVC View Singleton.
	 *			super.initializeView();
	 * 
	 *			//Otherwise, if you're implmenting your own IView, then instead do:
	 *			//if( view != null ) return;
	 *			//view = MyAppView.getInstance();
	 * 		
	 *			//do any special subclass initialization here such as creating and registering
	 *			//Mediators that do not need a Facade reference at construction time.
	 *			registerMediator( new LoginMediator() ); 
	 * 
	 *			//CAREFUL: Can't reference Facade instance in constructor of new Mediators from
	 *			//here, since this is a step in Facade construction! Usually, all Mediators need 
	 *			//receive notifications, and are registered elsewhere in the app for this reason.
	 *		}
	 *	}
	 * </code>
	 * 
	 * @see puremvc.core.model.Model Model
	 * @see puremvc.View View
	 * @see puremvc.Controller Controller
	 * @see puremvc.Notification Notification
	 * @see puremvc.Mediator Mediator
	 * @see puremvc.Proxy Proxy
	 * @see puremvc.SimpleCommand SimpleCommand
	 * @see puremvc.MacroCommand MacroCommand
	 */
	export class Facade
		implements IFacade
	{
		// Private references to Model, View and Controller
		/*protected*/public controller:IController;
		/*protected*/public model:IModel;
		/*protected*/public view:IView;

		// The Singleton Facade instance.
		/*protected*/public static instance:IFacade;

		// Message Constants
		/*protected*/public static /*const*/ SINGLETON_MSG:string = "Facade Singleton already constructed!";

		/**
		 * Constructor. 
		 *
		 * This <code>IFacade</code> implementation is a Singleton, so you should not call the
		 * constructor directly, but instead call the static Singleton Factory method
		 * <code>Facade.getInstance()</code>.
		 * 
		 * @throws Error
		 *		Error if Singleton instance has already been constructed
		 */
		constructor()
		{
			if( Facade.instance )
				throw Error( Facade.SINGLETON_MSG );

			Facade.instance = this;
			this.initializeFacade();
		}

		/**
		 * Called automatically by the constructor.
		 * Initialize the Singleton <code>Facade</code> instance.
		 *
		 * Override in your subclass to do any subclass specific initializations. Be sure to
		 * extend the <code>Facade</code> with the methods and properties on your implementation
		 * and call <code>Facade.initializeFacade()</code>.
		 */
		public initializeFacade():void
		{
			this.initializeModel();
			this.initializeController();
			this.initializeView();
		}

		/**
		 * Facade Singleton Factory method.
		 * 
		 * @return the Singleton instance of the Facade
		 */
		public static getInstance():IFacade
		{
			if( Facade.instance == null)
				Facade.instance = new Facade();

			return Facade.instance;
		}

		/**
		 * Initialize the <code>Model</code>.
		 * 
		 * Called by the <code>initializeFacade</code> method. Override this method in your
		 * subclass of <code>Facade</code> if one or both of the following are true:
		 * <UL>
		 * <LI> You wish to initialize a different <code>IModel</code>.
		 * <LI> You have <code>Proxy</code>s to register with the Model that do not retrieve a
		 * reference to the Facade at construction time.
		 *
		 * If you don't want to initialize a different <code>IModel</code>, call
		 * <code>super.initializeModel()</code> at the beginning of your method, then register
		 * <code>Proxy</code>s.
		 *
		 * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a
		 * <code>Command</code> to create and register <code>Proxy</code>s with the
		 * <code>Model</code>, since <code>Proxy</code>s with mutable data will likely need to send
		 * <code>INotification</code>s and thus will likely want to fetch a reference to the
		 * <code>Facade</code> during their construction.
		 */
		public initializeModel():void
		{
			if( !this.model )
				this.model = Model.getInstance();
		}

		/**
		 * Initialize the <code>Controller</code>.
		 * 
		 * Called by the <code>initializeFacade</code> method. Override this method in your
		 * subclass of <code>Facade</code> if one or both of the following are true:
		 * <UL>
		 * <LI>You wish to initialize a different <code>IController</code>.
		 * <LI>You have <code>ICommand</code>s to register with the <code>Controller</code> at
		 * startup.
		 *
		 * If you don't want to initialize a different <code>IController</code>, call
		 * <code>super.initializeController()</code> at the beginning of your method, then register
		 * <code>Command</code>s.
		 */
		public initializeController():void
		{
			if( !this.controller )
				this.controller = Controller.getInstance();
		}

		/**
		 * Initialize the <code>View</code>.
		 * 
		 *
		 * Called by the <code>initializeFacade</code> method. Override this method in your
		 * subclass of <code>Facade</code> if one or both of the following are true:
		 * <UL>
		 * <LI> You wish to initialize a different <code>IView</code>.
		 * <LI> You have <code>Observers</code> to register with the <code>View</code>
		 *
		 * If you don't want to initialize a different <code>IView</code>, call
		 * <code>super.initializeView()</code> at the beginning of your method, then register
		 * <code>IMediator</code> instances.
		 *
		 *
		 * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a
		 * <code>Command</code> to create and register <code>Mediator</code>s with the
		 * <code>View</code>, since <code>IMediator</code> instances will need to send 
		 * <code>INotification</code>s and thus will likely want to fetch a reference to the
		 * <code>Facade</code> during their construction. 
		 */
		public initializeView():void
		{
			if( !this.view )
				this.view = View.getInstance();
		}

		/**
		 * Register an <code>ICommand</code> with the <code>IController</code> associating it to a
		 * <code>INotification</code> name.
		 * 
		 * @param notificationName
		 *		The name of the <code>INotification</code> to associate the <code>ICommand</code>
		 *		with.
		 
		 * @param commandClassRef
		 *		A reference to the constructor of the <code>ICommand</code>.
		 */
		public registerCommand( notificationName:string, commandClassRef:Function ):void
		{
			this.controller.registerCommand( notificationName, commandClassRef );
		}

		/**
		 * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
		 * mapping from the <code>Controller</code>.
		 * 
		 * @param notificationName
		 *		The name of the <code>INotification</code> to remove the <code>ICommand</code>
		 *		mapping for.
		 */
		public removeCommand( notificationName:string ):void
		{
			this.controller.removeCommand( notificationName );
		}

		/**
		 * Check if a <code>Command</code> is registered for a given
		 * <code>Notification</code>.
		 * 
		 * @param notificationName
		 * 		The name of the <code>INotification</code> to verify for the existence of a
		 * 		<code>Command</code> mapping for.
		 *
		 * @return
		 * 		A <code>Command</code> is currently registered for the given <code>name</code>.
		 */
		public hasCommand( notificationName:string ):Boolean
		{
			return this.controller.hasCommand(notificationName);
		}

		/**
		 * Register an <code>IProxy</code> with the <code>Model</code> by name.
		 *
		 * @param proxy
		 *		The <code>IProxy</code> to be registered with the <code>Model</code>.
		 */
		public registerProxy( proxy:IProxy ):void
		{
			this.model.registerProxy( proxy );
		}
				
		/**
		 * Retrieve an <code>IProxy</code> from the <code>Model</code> by name.
		 * 
		 * @param proxyName
		 * 		The name of the <code>IProxy</code> instance to be retrieved.
		 *
		 * @return
		 * 		The <code>IProxy</code> previously registered with the given
		 *		<code>proxyName</code>.
		 */
		public retrieveProxy( proxyName:string ):IProxy
		{
			return this.model.retrieveProxy( proxyName );
		}

		/**
		 * Remove an <code>IProxy</code> from the <code>Model</code> by name.
		 *
		 * @param proxyName
		 *		The <code>IProxy</code> to remove from the <code>Model</code>.
		 *
		 * @return
		 *		The <code>IProxy</code> that was removed from the <code>Model</code>
		 */
		public removeProxy ( proxyName:string ):IProxy
		{
			var proxy:IProxy;
			if( this.model != null )
				proxy = this.model.removeProxy( proxyName );

			return proxy
		}

		/**
		 * Check if a <code>Proxy</code> is registered.
		 * 
		 * @param proxyName
		 * 		The <code>IProxy</code> to verify the existence of a registration with the
		 *		<code>IModel</code>.
		 *
		 * @return
		 *		Whether a Proxy is currently registered with the given <i>proxyName</i>.
		 */
		public hasProxy( proxyName:string ):Boolean
		{
			return this.model.hasProxy( proxyName );
		}

		/**
		 * Register a <code>IMediator</code> with the <code>IView</code>.
		 *
		 * @param mediator
		 		A reference to the <code>IMediator</code>.
		 */
		public registerMediator( mediator:IMediator ):void
		{
			if( this.view )
				this.view.registerMediator( mediator );
		}

		/**
		 * Retrieve an <code>IMediator</code> from the <code>IView</code>.
		 * 
		 * @param mediatorName
		 * 		The name of the registered <code>Mediator</code> to retrieve.
		 *
		 * @return
		 *		The <code>IMediator</code> previously registered with the given	<i>mediatorName</i>.
		 */
		public retrieveMediator( mediatorName:string ):IMediator
		{
			return this.view.retrieveMediator( mediatorName );
		}

		/**
		 * Remove an <code>IMediator</code> from the <code>IView</code>.
		 * 
		 * @param mediatorName
		 *		Name of the <code>IMediator</code> to be removed.
		 *
		 * @return
		 *		The <code>IMediator</code> that was removed from the <code>IView</code>
		 */
		public removeMediator( mediatorName:string ):IMediator
		{
			var mediator:IMediator;
			if( this.view != null )
				mediator = this.view.removeMediator( mediatorName );

			return mediator;
		}

		/**
		 * Check if a Mediator is registered or not
		 * 
		 * @param mediatorName
		 * 		The name of the <code>IMediator</code> to verify the existence of a registration
		 *		for.
		 *
		 * @return
		 * 		An <code>IMediator</code> is registered with the given <code>mediatorName</code>.
		 */
		public hasMediator( mediatorName:string ):Boolean
		{
			return this.view.hasMediator( mediatorName );
		}

		/**
		 * Notify the <code>IObservers</code> for a particular <code>INotification</code>.
		 *
		 *
		 * This method is left public mostly for backward compatibility, and to allow you to send
		 * custom notification classes using the facade.
		 *
		 * Usually you should just call sendNotification and pass the parameters, never having to
		 * construct the notification yourself.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> to have the <code>IView</code> notify <code>IObserver</code>s
		 * 		of.
		 */
		public notifyObservers ( notification:INotification ):void
		{
			if( this.view != null )
				this.view.notifyObservers( notification );
		}

		/**
		 * Create and send an <code>INotification</code>.
		 * 
		 * Keeps us from having to construct new notification instances in our implementation code.
		 *
		 * @param name
		 *		The name of the notification to send.
		 *
		 * @param body
		 *		The body of the notification to send (optional).
		 *
		 * @param type
		 *		The type of the notification to send (optional)
		 */
		//TODO There's some optional parameters in there, TypeScript knows how to handle them.
		public sendNotification( name:string, body:Object=null, type:string=null ):void
		{
			this.notifyObservers( new Notification( name, body, type ) );
		}
	}
}