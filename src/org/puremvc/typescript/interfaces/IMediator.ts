/*
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 United States License
*/
module puremvc
{
	
	/**
	 * The interface definition for a PureMVC Mediator.
	 *
	 * <P>
	 * In PureMVC, <code>IMediator</code> implementors assume these responsibilities:</P>
	 * <UL>
	 * <LI>Implement a common method which returns a list of all <code>INotification</code>s 
	 * the <code>IMediator</code> has interest in.</LI>
	 * <LI>Implement a notification callback method.</LI>
	 * <LI>Implement methods that are called when the IMediator is registered or removed from the View.</LI>
	 * </UL>
	 * <P>
	 * Additionally, <code>IMediator</code>s typically:
	 * <UL>
	 * <LI>Act as an intermediary between one or more view components such as text boxes or 
	 * list controls, maintaining references and coordinating their behavior.</LI>
	 * <LI>In Flash-based apps, this is often the place where event listeners are
	 * added to view components, and their handlers implemented.</LI>
	 * <LI>Respond to and generate <code>INotifications</code>, interacting with of 
	 * the rest of the PureMVC app.
	 * </UL></P>
	 * <P>
	 * When an <code>IMediator</code> is registered with the <code>IView</code>, 
	 * the <code>IView</code> will call the <code>IMediator</code>'s 
	 * <code>listNotificationInterests</code> method. The <code>IMediator</code> will 
	 * return a list of <code>INotification</code> names which
	 * it wishes to be notified about.</P>
	 * 
	 * <P>
	 * The <code>IView</code> will then create an <code>Observer</code> object 
	 * encapsulating that <code>IMediator</code>'s (<code>handleNotification</code>) method
	 * and register it as an Observer for each <code>INotification</code> name returned by 
	 * <code>listNotificationInterests</code>.</P>
	 * 
	 * <P>
	 * A concrete IMediator implementor usually looks something like this:</P>
	 * 
	 * <listing>
	 *	import org.puremvc.typescript.patterns.mediator.~~;
	 *	import org.puremvc.typescript.patterns.observer.~~;
	 *	import org.puremvc.typescript.core.view.~~;
	 * 
	 *	import com.me.myapp.model.~~;
	 *	import com.me.myapp.view.~~;
	 *	import com.me.myapp.controller.~~;
	 * 		
	 *	import mx.controls.ComboBox;
	 *	import mx.events.ListEvent;
	 * 
	 * class MyMediator extends Mediator implements IMediator {
	 * 
	 * 		public MyComboMediator( viewComponent:Object ) {
	 * 			super( viewComponent );
	 * 			combo.addEventListener( Event.CHANGE, onChange );
	 * 		}
	 * 		
	 * 		override public listNotificationInterests():string[] {
	 * 				return [ MyFacade.SET_SELECTION, 
	 * 						 MyFacade.SET_DATAPROVIDER ];
	 * 		}
	 * 
	 * 		override public handleNotification( notification:INotification ):void {
	 * 				switch ( notification.getName() ) {
	 * 					case MyFacade.SET_SELECTION:
	 * 						setSelection(notification);
	 * 						break;
	 * 					case MyFacade.SET_DATAPROVIDER:
	 * 						setDataProvider(notification);
	 * 						break;
	 * 				}
	 * 		}
	 * 
	 * 		// Set the data provider of the combo box
	 * 		public setDataProvider( notification:INotification ):void
	 *		{
	 * 			combo.dataProvider = notification.getBody();
	 * 		}
	 * 
	 * 		// Invoked when the combo box dispatches a change event, we send a
	 *      // notification with the
	 * 		public onChange(event:ListEvent):void
	 *
	 * 			sendNotification( MyFacade.MYCOMBO_CHANGED, this );
	 * 		}
	 * 
	 * 		// A private getter for accessing the view object by class
	 *      public get combo():ComboBox  {
	 *         return view as ComboBox;
	 *      }
	 * 
	 * }
	 * </listing>
	 * 
	 * @see org.puremvc.typescript.interfaces.INotification INotification
	 */
	export interface IMediator
	{
		
		/**
		 * Get the <code>IMediator</code> instance name
		 * 
		 * @return
		 * 		The <code>IMediator</code> instance name
		 */
		getMediatorName():string;
		
		/**
		 * Get the <code>IMediator</code>'s view component.
		 * 
		 * @return Object
		 * 		The view component.
		 */
		getViewComponent():Object;

		/**
		 * Set the <code>IMediator</code>'s view component.
		 * 
		 * @param Object
		 * 		The view component.
		 */
		setViewComponent( viewComponent:Object ):void;
		
		/**
		 * List <code>INotification</code> interests.
		 * 
		 * @return
		 * A list of the <code>INotification</code> names this <code>IMediator</code> has an interest in.
		 */
		listNotificationInterests( ):string[];
		
		/**
		 * Handle an <code>INotification</code>.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> to be handled
		 */
		handleNotification( notification:INotification ):void;
		
		/**
		 * Called by the View when the Mediator is registered
		 */ 
		onRegister( ):void;

		/**
		 * Called by the View when the Mediator is removed
		 */ 
		onRemove( ):void;
		
	}
}