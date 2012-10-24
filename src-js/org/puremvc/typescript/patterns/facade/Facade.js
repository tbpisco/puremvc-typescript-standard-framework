var puremvc;
(function (puremvc) {
    "use strict";
    var Facade = (function () {
        function Facade() {
            if(Facade.instance) {
                throw Error(Facade.SINGLETON_MSG);
            }
            Facade.instance = this;
            this.initializeFacade();
        }
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        Facade.prototype.initializeModel = function () {
            if(!this.model) {
                this.model = puremvc.Model.getInstance();
            }
        };
        Facade.prototype.initializeController = function () {
            if(!this.controller) {
                this.controller = puremvc.Controller.getInstance();
            }
        };
        Facade.prototype.initializeView = function () {
            if(!this.view) {
                this.view = puremvc.View.getInstance();
            }
        };
        Facade.prototype.registerCommand = function (notificationName, commandClassRef) {
            this.controller.registerCommand(notificationName, commandClassRef);
        };
        Facade.prototype.removeCommand = function (notificationName) {
            this.controller.removeCommand(notificationName);
        };
        Facade.prototype.hasCommand = function (notificationName) {
            return this.controller.hasCommand(notificationName);
        };
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        Facade.prototype.retrieveProxy = function (proxyName) {
            return this.model.retrieveProxy(proxyName);
        };
        Facade.prototype.removeProxy = function (proxyName) {
            var proxy;
            if(this.model) {
                proxy = this.model.removeProxy(proxyName);
            }
            return proxy;
        };
        Facade.prototype.hasProxy = function (proxyName) {
            return this.model.hasProxy(proxyName);
        };
        Facade.prototype.registerMediator = function (mediator) {
            if(this.view) {
                this.view.registerMediator(mediator);
            }
        };
        Facade.prototype.retrieveMediator = function (mediatorName) {
            return this.view.retrieveMediator(mediatorName);
        };
        Facade.prototype.removeMediator = function (mediatorName) {
            var mediator;
            if(this.view) {
                mediator = this.view.removeMediator(mediatorName);
            }
            return mediator;
        };
        Facade.prototype.hasMediator = function (mediatorName) {
            return this.view.hasMediator(mediatorName);
        };
        Facade.prototype.notifyObservers = function (notification) {
            if(this.view) {
                this.view.notifyObservers(notification);
            }
        };
        Facade.prototype.sendNotification = function (name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.notifyObservers(new puremvc.Notification(name, body, type));
        };
        Facade.SINGLETON_MSG = "Facade Singleton already constructed!";
        Facade.instance = null;
        Facade.getInstance = function getInstance() {
            if(!Facade.instance) {
                Facade.instance = new Facade();
            }
            return Facade.instance;
        }
        return Facade;
    })();
    puremvc.Facade = Facade;    
})(puremvc || (puremvc = {}));

