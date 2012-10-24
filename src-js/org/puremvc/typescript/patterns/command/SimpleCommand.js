var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var puremvc;
(function (puremvc) {
    "use strict";
    var SimpleCommand = (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            _super.apply(this, arguments);

        }
        SimpleCommand.prototype.execute = function (notification) {
        };
        return SimpleCommand;
    })(puremvc.Notifier);
    puremvc.SimpleCommand = SimpleCommand;    
})(puremvc || (puremvc = {}));

