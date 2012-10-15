/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Test the PureMVC Controller class.
 *
 * @see puremvc.ControllerTestVO ControllerTestVO
 * @see puremvc.ControllerTestCommand ControllerTestCommand
 */
var ControllerTest = new YUITest.TestCase
(
	{
	    /**
	     * The name of the test case - if not provided, one is automatically
	     * generated by the YUITest framework.
	     * 
	     * @type {String}
	     * @private
	     */
	    name: "PureMVC Controller class tests",  

	    /**
	     * Sets up data that is needed by each test.
	     */
	    setUp: function()
		{
	    },

	    /**
	     * Cleans up everything that was created by setUp().
	     */
	    tearDown: function()
		{
	    },

		/**
		 * Tests the Controller Singleton Factory Method
		 */
		testGetInstance: function()
		{
			var Controller = extract("puremvc.Controller");
			
			// Test Factory Method
			var controller/*Controller*/ = Controller.getInstance();
			
			// test assertions
			YUITest.Assert.isNotNull
			(
				controller,
				"Expecting instance !== null"
			);
			
			YUITest.Assert.isInstanceOf
			(
				Controller,
				controller,
				"Expecting instance extends Controller"
			);
		},

		/**
		 * Tests Command registration and execution.
		 * 
		 * <P>
		 * This test gets the Singleton Controller instance 
		 * and registers the ControllerTestCommand class 
		 * to handle 'ControllerTest' Notifications.<P>
		 * 
		 * <P>
		 * It then constructs such a Notification and tells the 
		 * Controller to execute the associated Command.
		 * Success is determined by evaluating a property
		 * on an object passed to the Command, which will
		 * be modified when the Command executes.
		 */
		testRegisterAndExecuteCommand: function()
		{
			var Controller = extract("puremvc.Controller");
			var Notification = extract("puremvc.Notification");
			
			// Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notes
			var controller/*Controller*/ = Controller.getInstance();
			controller.registerCommand( 'ControllerTest', ControllerTestCommand );
			
			// Create a 'ControllerTest' note
			var vo/*Object*/ = new ControllerTestVO(12);
			var note/*Notification*/ = new Notification( 'ControllerTest', vo );

			// Tell the controller to execute the Command associated with the note
			// the ControllerTestCommand invoked will multiply the vo.input value
			// by 2 and set the result on vo.result
			controller.executeCommand(note);
			
			// test assertions 
			YUITest.Assert.areEqual
			(
				24,
				vo.result,
				"Expecting vo.result == 24"
			);
		},
		
		/**
		 * Tests Command registration and removal.
		 * 
		 * <P>
		 * Tests that once a Command is registered and verified
		 * working, it can be removed from the Controller.
		 */
		testRegisterAndRemoveCommand: function()
		{
			var Controller = extract("puremvc.Controller");
			var Notification = extract("puremvc.Notification");

			// Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notes
			var controller/*Controller*/ = Controller.getInstance();
			controller.registerCommand( 'ControllerRemoveTest', ControllerTestCommand );
			
			// Create a 'ControllerTest' note
			var vo/*Object*/ = new ControllerTestVO(12) ;
			var note/*Notification*/ = new Notification( 'ControllerRemoveTest', vo );

			// Tell the controller to execute the Command associated with the note
			// the ControllerTestCommand invoked will multiply the vo.input value
			// by 2 and set the result on vo.result
			controller.executeCommand(note);

			// test assertions 
			YUITest.Assert.areEqual
			(
				24,
				vo.result, 
				"Expecting vo.result == 24"
			);

			// Reset result
			vo.result = 0;
			
			// Remove the Command from the Controller
			controller.removeCommand('ControllerRemoveTest');
			
			// Tell the controller to execute the Command associated with the
			// note. This time, it should not be registered, and our vo result
			// will not change   			
			controller.executeCommand(note);
			
			// test assertions 
			YUITest.Assert.areEqual
			(
				0,
				vo.result,
				"Expecting vo.result == 0"
			);
		},

		/**
		 * Test hasCommand method.
		 */
		testHasCommand: function()
		{
			var Controller = extract("puremvc.Controller");

			// register the ControllerTestCommand to handle 'hasCommandTest' notes
			var controller/*Controller*/ = Controller.getInstance();
			controller.registerCommand( 'hasCommandTest', ControllerTestCommand );
			
			// test that hasCommand returns true for hasCommandTest notifications 
			YUITest.Assert.isTrue
			(
				controller.hasCommand('hasCommandTest'),
				"Expecting controller.hasCommand('hasCommandTest') === true"
			);
			
			// Remove the Command from the Controller
			controller.removeCommand('hasCommandTest');
		
			// test that hasCommand returns false for hasCommandTest notifications 
			YUITest.Assert.isFalse
			(
				controller.hasCommand('hasCommandTest'),
				"Expecting controller.hasCommand('hasCommandTest') === false"
			);
		},
		
		/**
		 * Tests Removing and Reregistering a Command
		 * 
		 * <P>
		 * Tests that when a Command is re-registered that it isn't fired twice.
		 * This involves, minimally, registration with the controller but
		 * notification via the View, rather than direct execution of
		 * the Controller's executeCommand method as is done above in 
		 * testRegisterAndRemove. The bug under test was fixed in AS3 Standard 
		 * Version 2.0.2. If you run the unit tests with 2.0.1 this
		 * test will fail.
		 */
		testReregisterAndExecuteCommand: function()
		{
			var Controller = extract("puremvc.Controller");
			var View = extract("puremvc.View");
			var Notification = extract("puremvc.Notification");

			// Fetch the controller, register the ControllerTestCommand2 to handle 'ControllerTest2' notes
			var controller/*Controller*/ = Controller.getInstance();
			controller.registerCommand( 'ControllerTest2', ControllerTestCommand2 );
			
			// Remove the Command from the Controller
			controller.removeCommand('ControllerTest2');
		
			// Re-register the Command with the Controller
			controller.registerCommand( 'ControllerTest2', ControllerTestCommand2 );

			// Create a 'ControllerTest2' note
			var vo/*Object*/ = new ControllerTestVO( 12 );
			var note/*Notification*/ = new Notification( 'ControllerTest2', vo );
			
			// retrieve a reference to the View.
			var view/*View*/ = View.getInstance();
			
			// send the Notification
			view.notifyObservers(note);
			
			// test assertions 
			// if the command is executed once the value will be 24
			YUITest.Assert.areEqual
			(
				24,
				vo.result,
				"Expecting vo.result == 24" 
			);
			
			// Prove that accumulation works in the VO by sending the notification again
			view.notifyObservers(note);
			
			// if the command is executed twice the value will be 48
			YUITest.Assert.areEqual
			(
				48,
				vo.result,
				"Expecting vo.result == 48"
			);
		}
  	}
);