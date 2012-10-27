/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

///<reference path='../../../../../../../src/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../../src/org/puremvc/typescript/patterns/observer/Notification.ts'/>
///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

module puremvc
{
	"use strict";

	import YUITest = module("YUITest");

/**
 * @classDescription
 * A SimpleCommand subclass used by NotifierTest.
 *
 * @see puremvc.NotifierTest NotifierTest
 * @see puremvc.NotifierTestVO NotifierTestVO
 * 
 * @extends puremvc.SimpleCommand SimpleCommand
 */

 /**
 * @constructor
 */
var NotifierTestCommand = function()
{
	SimpleCommand.call(this);
}
__extends( NotifierTestCommand, SimpleCommand );

/**
 * Fabricate a result by multiplying the input by 2
 *
 * @param {Notification} note
 * 		The Notification carrying the NotifierTestVO
 */
NotifierTestCommand.prototype.execute = function( note )
{
	var vo:NotifierTestVO = note.getBody();

	// Fabricate a result
	vo.result = 2 * vo.input;
}