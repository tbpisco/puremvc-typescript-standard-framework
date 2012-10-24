var puremvc;
(function (puremvc) {
    "use strict";
    var Controller = (function () {
        function Controller() {
            if(Controller.instance) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.instance = this;
            this.commandMap = {
            };
            this.initializeController();
        }
        Controller.prototype.initializeController = function () {
            this.view = puremvc.View.getInstance();
        };
        Controller.prototype.executeCommand = function (notification) {
            var commandClassRef = this.commandMap[notification.getName()];
            if(commandClassRef) {
                var command = new commandClassRef();
                command.execute(notification);
            }
        };
        Controller.prototype.registerCommand = function (notificationName, commandClassRef) {
            if(!this.commandMap[notificationName]) {
                this.view.registerObserver(notificationName, new puremvc.Observer(this.executeCommand, this));
            }
            this.commandMap[notificationName] = commandClassRef;
        };
        Controller.prototype.hasCommand = function (notificationName) {
            return this.commandMap[notificationName] != null;
        };
        Controller.prototype.removeCommand = function (notificationName) {
            if(this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        };
        Controller.instance = null;
        Controller.SINGLETON_MSG = "Controller Singleton already constructed!";
        Controller.getInstance = function getInstance() {
            if(!Controller.instance) {
                Controller.instance = new Controller();
            }
            return Controller.instance;
        }
        return Controller;
    })();
    puremvc.Controller = Controller;    
})(puremvc || (puremvc = {}));

