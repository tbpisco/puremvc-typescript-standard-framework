/*
 PureMVC - Copyright(c) 2006-12 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 United States License
*/
module puremvc
{
	"use strict";
	
	/**
	 * A base <code>ICommand</code> implementation that executes other <code>ICommand</code>s.
	 *  
	 * <P>
	 * A <code>MacroCommand</code> maintains an list of
	 * <code>ICommand</code> Class references called <i>SubCommands</i>.</P>
	 * 
	 * <P>
	 * When <code>execute</code> is called, the <code>MacroCommand</code> 
	 * instantiates and calls <code>execute</code> on each of its <i>SubCommands</i> turn.
	 * Each <i>SubCommand</i> will be passed a reference to the original
	 * <code>INotification</code> that was passed to the <code>MacroCommand</code>'s 
	 * <code>execute</code> method.</P>
	 * 
	 * <P>
	 * Unlike <code>SimpleCommand</code>, your subclass
	 * should not override <code>execute</code>, but instead, should 
	 * override the <code>initializeMacroCommand</code> method, 
	 * calling <code>addSubCommand</code> once for each <i>SubCommand</i>
	 * to be executed.</P>
	 * 
	 * <P>
	 * 
	 * @see org.puremvc.typescript.core.controller.Controller Controller
	 * @see org.puremvc.typescript.patterns.observer.Notification Notification
	 * @see org.puremvc.typescript.patterns.command.SimpleCommand SimpleCommand
	 */
	export class MacroCommand
		extends Notifier
		implements ICommand, INotifier
	{
		private subCommands:Function[];
		
		/**
		 * Constructor. 
		 * 
		 * <P>
		 * You should not need to define a constructor, 
		 * instead, override the <code>initializeMacroCommand</code>
		 * method.</P>
		 * 
		 * <P>
		 * If your subclass does define a constructor, be 
		 * sure to call <code>super()</code>.</P>
		 */
		constructor()
		{
			super();

			this.subCommands = new Array();
			this.initializeMacroCommand();
		}
		
		/**
		 * Initialize the <code>MacroCommand</code>.
		 * 
		 * <P>
		 * In your subclass, override this method to 
		 * initialize the <code>MacroCommand</code>'s <i>SubCommand</i>  
		 * list with <code>ICommand</code> class references like 
		 * this:</P>
		 * 
		 * <listing>
		 *		// Initialize MyMacroCommand
		 *		override public initializeMacroCommand( ):void
		 *		{
		 *			this.addSubCommand( com.me.myapp.controller.FirstCommand );
		 *			this.addSubCommand( com.me.myapp.controller.SecondCommand );
		 *			this.addSubCommand( com.me.myapp.controller.ThirdCommand );
		 *		}
		 * </listing>
		 * 
		 * <P>
		 * Note that <i>SubCommand</i>s may be any <code>ICommand</code> implementor,
		 * <code>MacroCommand</code>s or <code>SimpleCommands</code> are both acceptable.
		 */
		public initializeMacroCommand():void
		{
		}
		
		/**
		 * Add a <i>SubCommand</i>.
		 * 
		 * <P>
		 * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
		 * order.</P>
		 * 
		 * @param commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
		 */
		public addSubCommand( commandClassRef:Function ): void
		{
			this.subCommands.push(commandClassRef);
		}
		
		/** 
		 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
		 * 
		 * <P>
		 * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
		 * order. 
		 * 
		 * @param notification the <code>INotification</code> object to be passsed to each <i>SubCommand</i>.
		 */
		public /*TODO final*/ execute( notification:INotification ):void
		{
			while( this.subCommands.length > 0 )
			{
				//TODO Any ?
				var commandClassRef:any = this.subCommands.shift();
				var commandInstance:ICommand = new commandClassRef();
				commandInstance.execute( notification );
			}
		}
								
	}
}