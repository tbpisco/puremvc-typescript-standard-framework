var puremvc;
(function (puremvc) {
    "use strict";
    var Notifier = (function () {
        function Notifier() {
            this.facade = puremvc.Facade.getInstance();
        }
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.facade.sendNotification(name, body, type);
        };
        return Notifier;
    })();
    puremvc.Notifier = Notifier;    
})(puremvc || (puremvc = {}));

