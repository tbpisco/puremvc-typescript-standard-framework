/*
 PureMVC Javascript for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	"use strict";

	/**
	 * A Singleton <code>IController</code> implementation.
	 * 
	 * <P>
	 * In PureMVC, the <code>Controller</code> class follows the
	 * 'Command and Controller' strategy, and assumes these 
	 * responsibilities:
	 * <UL>
	 * <LI> Remembering which <code>ICommand</code>s 
	 * are intended to handle which <code>INotifications</code>.</LI>
	 * <LI> Registering itself as an <code>IObserver</code> with
	 * the <code>View</code> for each <code>INotification</code> 
	 * that it has an <code>ICommand</code> mapping for.</LI>
	 * <LI> Creating a new instance of the proper <code>ICommand</code>
	 * to handle a given <code>INotification</code> when notified by the <code>View</code>.</LI>
	 * <LI> Calling the <code>ICommand</code>'s <code>execute</code>
	 * method, passing in the <code>INotification</code>.</LI> 
	 * </UL>
	 * 
	 * <P>
	 * Your application must register <code>ICommands</code> with the 
	 * Controller.
	 * <P>
 	 * The simplest way is to subclass </code>Facade</code>, 
	 * and use its <code>initializeController</code> method to add your 
	 * registrations. 
	 * 
	 * @see org.puremvc.typescript.core.view.View View
	 * @see org.puremvc.typescript.patterns.observer.Observer Observer
	 * @see org.puremvc.typescript.patterns.observer.Notification Notification
	 * @see org.puremvc.typescript.patterns.command.SimpleCommand SimpleCommand
	 * @see org.puremvc.typescript.patterns.command.MacroCommand MacroCommand
	 */
	export class Controller
		implements IController
	{

		/**
		 * Constructor. 
		 * 
		 * <P>
		 * This <code>IController</code> implementation is a Singleton, 
		 * so you should not call the constructor 
		 * directly, but instead call the static Singleton 
		 * Factory method <code>Controller.getInstance()</code>
		 * 
		 * @throws Error Error if Singleton instance has already been constructed
		 * 
		 */
		constructor()
		{
			if( Controller.instance != null )
				throw Error( Controller.SINGLETON_MSG );

			Controller.instance = this;
			this.commandMap = new Array();
			this.initializeController();
		}
		
		/**
		 * Initialize the Singleton <code>Controller</code> instance.
		 * 
		 * <P>Called automatically by the constructor.</P> 
		 * 
		 * <P>Note that if you are using a subclass of <code>View</code>
		 * in your application, you should <i>also</i> subclass <code>Controller</code>
		 * and override the <code>initializeController</code> method in the 
		 * following way:</P>
		 * 
		 * <listing>
		 *		// ensure that the Controller is talking to my IView implementation
		 *		override public initializeController(  ):void
		 *		{
		 *			view = MyView.getInstance();
		 *		}
		 * </listing>
		 * 
		 * @return void
		 */
		public initializeController():void
		{
			this.view = View.getInstance();
		}
	
		/**
		 * <code>Controller</code> Singleton Factory method.
		 * 
		 * @return the Singleton instance of <code>Controller</code>
		 */
		public static getInstance():IController
		{
			if( Controller.instance == null )
				Controller.instance = new Controller( );

			return Controller.instance;
		}

		/**
		 * If an <code>ICommand</code> has previously been registered 
		 * to handle a the given <code>INotification</code>, then it is executed.
		 * 
		 * @param note an <code>INotification</code>
		 */
		public executeCommand( note:INotification ):void
		{
			//TODO Identify if here *any* is the right choice instead of Function ( won't compile if set to Function because it is not newable on new commandClassRef )
			var commandClassRef:any = this.commandMap[ note.getName() ];
			if( commandClassRef == null )
				return;

			var commandInstance:ICommand = new commandClassRef();
			commandInstance.execute( note );
		}

		/**
		 * Register a particular <code>ICommand</code> class as the handler 
		 * for a particular <code>INotification</code>.
		 * 
		 * <P>
		 * If an <code>ICommand</code> has already been registered to 
		 * handle <code>INotification</code>s with this name, it is no longer
		 * used, the new <code>ICommand</code> is used instead.</P>
		 * 
		 * The Observer for the new ICommand is only created if this the 
		 * first time an ICommand has been regisered for this Notification name.
		 * 
		 * @param notificationName the name of the <code>INotification</code>
		 * @param commandClassRef the <code>Class</code> of the <code>ICommand</code>
		 */
		public registerCommand( notificationName:string, commandClassRef:Function ):void
		{
			if( this.commandMap[ notificationName ] == null )
				this.view.registerObserver( notificationName, new Observer( this.executeCommand, this ) );

			this.commandMap[ notificationName ] = commandClassRef;
		}
		
		/**
		 * Check if a Command is registered for a given Notification 
		 * 
		 * @param notificationName
		 * @return whether a Command is currently registered for the given <code>notificationName</code>.
		 */
		public hasCommand( notificationName:string ):Boolean
		{
			return this.commandMap[ notificationName ] != null;
		}

		/**
		 * Remove a previously registered <code>ICommand</code> to <code>INotification</code> mapping.
		 * 
		 * @param notificationName the name of the <code>INotification</code> to remove the <code>ICommand</code> mapping for
		 */
		public removeCommand( notificationName:string ):void
		{
			// if the Command is registered...
			if( this.hasCommand( notificationName ) )
			{
				// remove the observer
				this.view.removeObserver( notificationName, this );
							
				// remove the command
				this.commandMap[ notificationName ] = null;
			}
		}

		// Local reference to View
		public view:IView;

		// Mapping of Notification names to Command Class references
		public commandMap:Function[];

		// Singleton instance
		public static instance:IController;

		// Message "Constants" (ther is no constants support within TypeScript)
		public static SINGLETON_MSG:string = "Controller Singleton already constructed!";

	}
}