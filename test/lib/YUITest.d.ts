declare module "YUITest"
{
    export class Assert
	{
        static areEqual( value1:any, value2:any, message:string ):void;
        static areSame( value1:any, value2:any, message:string ):void;
    }
}