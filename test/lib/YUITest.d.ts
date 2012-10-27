/*
 PureMVC for TypeScript port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Minimalist TypeScript description file for YUITest giving the compiler the exact necessary to
 * compile PureMVC framework Unit Tests.
 */
declare module "YUITest"
{
    export class Assert
	{
        static areEqual( value1:any, value2:any, message:string ):void;
        static areSame( value1:any, value2:any, message:string ):void;
    }
}