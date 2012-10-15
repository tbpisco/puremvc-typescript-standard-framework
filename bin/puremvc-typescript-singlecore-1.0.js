var puremvc;
(function (puremvc) {
    "use strict";
    var Observer = (function () {
        function Observer(notifyMethod, notifyContext) {
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }
        Observer.prototype.setNotifyMethod = function (notifyMethod) {
            this.notify = notifyMethod;
        };
        Observer.prototype.setNotifyContext = function (notifyContext) {
            this.context = notifyContext;
        };
        Observer.prototype.getNotifyMethod = function () {
            return this.notify;
        };
        Observer.prototype.getNotifyContext = function () {
            return this.context;
        };
        Observer.prototype.notifyObserver = function (notification) {
            this.getNotifyMethod().apply(this.getNotifyContext(), [
                notification
            ]);
        };
        Observer.prototype.compareNotifyContext = function (object) {
            return object === this.context;
        };
        return Observer;
    })();
    puremvc.Observer = Observer;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Controller = (function () {
        function Controller() {
            if(Controller.instance != null) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.instance = this;
            this.commandMap = new Array();
            this.initializeController();
        }
        Controller.prototype.initializeController = function () {
            this.view = puremvc.View.getInstance();
        };
        Controller.getInstance = function getInstance() {
            if(Controller.instance == null) {
                Controller.instance = new Controller();
            }
            return Controller.instance;
        }
        Controller.prototype.executeCommand = function (note) {
            var commandClassRef = this.commandMap[note.getName()];
            if(commandClassRef == null) {
                return;
            }
            var commandInstance = new commandClassRef();
            commandInstance.execute(note);
        };
        Controller.prototype.registerCommand = function (notificationName, commandClassRef) {
            if(this.commandMap[notificationName] == null) {
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
                this.commandMap[notificationName] = null;
            }
        };
        Controller.instance = null;
        Controller.SINGLETON_MSG = "Controller Singleton already constructed!";
        return Controller;
    })();
    puremvc.Controller = Controller;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Model = (function () {
        function Model() {
            if(Model.instance != null) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.instance = this;
            this.proxyMap = new Array();
            this.initializeModel();
        }
        Model.prototype.initializeModel = function () {
        };
        Model.getInstance = function getInstance() {
            if(Model.instance == null) {
                Model.instance = new Model();
            }
            return Model.instance;
        }
        Model.prototype.registerProxy = function (proxy) {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        Model.prototype.retrieveProxy = function (proxyName) {
            return this.proxyMap[proxyName];
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if(proxy) {
                this.proxyMap[proxyName] = null;
                proxy.onRemove();
            }
            return proxy;
        };
        Model.instance = null;
        Model.SINGLETON_MSG = "Model Singleton already constructed!";
        return Model;
    })();
    puremvc.Model = Model;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var View = (function () {
        function View() {
            if(View.instance != null) {
                throw Error(View.SINGLETON_MSG);
            }
            View.instance = this;
            this.mediatorMap = new Array();
            this.observerMap = new Array();
            this.initializeView();
        }
        View.prototype.initializeView = function () {
        };
        View.getInstance = function getInstance() {
            if(View.instance == null) {
                View.instance = new View();
            }
            return View.instance;
        }
        View.prototype.registerObserver = function (notificationName, observer) {
            var observers = this.observerMap[notificationName];
            if(observers) {
                observers.push(observer);
            } else {
                this.observerMap[notificationName] = [
                    observer
                ];
            }
        };
        View.prototype.notifyObservers = function (notification) {
            if(this.observerMap[notification.getName()] != null) {
                var observers_ref = this.observerMap[notification.getName()];
                var observers = new Array();
                var observer;
                for(var i = 0; i < observers_ref.length; i++) {
                    observer = observers_ref[i];
                    observers.push(observer);
                }
                for(i = 0; i < observers.length; i++) {
                    observer = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        View.prototype.removeObserver = function (notificationName, notifyContext) {
            var observers = this.observerMap[notificationName];
            for(var i = 0; i < observers.length; i++) {
                if(observers[i].compareNotifyContext(notifyContext) === true) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if(observers.length == 0) {
                delete this.observerMap[notificationName];
            }
        };
        View.prototype.registerMediator = function (mediator) {
            if(this.mediatorMap[mediator.getMediatorName()] != null) {
                return;
            }
            this.mediatorMap[mediator.getMediatorName()] = mediator;
            var interests = mediator.listNotificationInterests();
            if(interests.length > 0) {
                var observer = new puremvc.Observer(mediator.handleNotification, mediator);
                for(var i = 0; i < interests.length; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        };
        View.prototype.retrieveMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName];
        };
        View.prototype.removeMediator = function (mediatorName) {
            var mediator = this.mediatorMap[mediatorName];
            if(mediator) {
                var interests = mediator.listNotificationInterests();
                for(var i = 0; i < interests.length; i++) {
                    this.removeObserver(interests[i], mediator);
                }
                delete this.mediatorMap[mediatorName];
                mediator.onRemove();
            }
            return mediator;
        };
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] != null;
        };
        View.instance = null;
        View.SINGLETON_MSG = "View Singleton already constructed!";
        return View;
    })();
    puremvc.View = View;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notification = (function () {
        function Notification(name, body, type) {
            this.name = name;
            this.body = body;
            this.type = type;
        }
        Notification.prototype.getName = function () {
            return this.name;
        };
        Notification.prototype.setBody = function (body) {
            this.body = body;
        };
        Notification.prototype.getBody = function () {
            return this.body;
        };
        Notification.prototype.setType = function (type) {
            this.type = type;
        };
        Notification.prototype.getType = function () {
            return this.type;
        };
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.body == null) ? "null" : this.body.toString());
            msg += "\nType:" + ((this.type == null) ? "null" : this.type);
            return msg;
        };
        return Notification;
    })();
    puremvc.Notification = Notification;    
})(puremvc || (puremvc = {}));

