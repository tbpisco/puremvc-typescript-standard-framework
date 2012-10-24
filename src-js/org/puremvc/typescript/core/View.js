var puremvc;
(function (puremvc) {
    "use strict";
    var View = (function () {
        function View() {
            if(View.instance) {
                throw Error(View.SINGLETON_MSG);
            }
            View.instance = this;
            this.mediatorMap = {
            };
            this.observerMap = {
            };
            this.initializeView();
        }
        View.prototype.initializeView = function () {
        };
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
        View.prototype.removeObserver = function (notificationName, notifyContext) {
            var observers = this.observerMap[notificationName];
            var i = observers.length;
            while(i--) {
                var observer = observers[i];
                if(observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if(observers.length == 0) {
                delete this.observerMap[notificationName];
            }
        };
        View.prototype.notifyObservers = function (notification) {
            var notificationName = notification.getName();
            var observersRef = this.observerMap[notificationName];
            if(observersRef) {
                var observers = observersRef.slice(0);
                var len = observers.length;
                for(var i = 0; i < len; i++) {
                    var observer = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        View.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            if(this.mediatorMap[name]) {
                return;
            }
            this.mediatorMap[name] = mediator;
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if(len) {
                var observer = new puremvc.Observer(mediator.handleNotification, mediator);
                for(var i = 0; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        };
        View.prototype.retrieveMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] || null;
        };
        View.prototype.removeMediator = function (mediatorName) {
            var mediator = this.mediatorMap[mediatorName];
            if(!mediator) {
                return null;
            }
            var interests = mediator.listNotificationInterests();
            var i = interests.length;
            while(i--) {
                this.removeObserver(interests[i], mediator);
            }
            delete this.mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        };
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] != null;
        };
        View.SINGLETON_MSG = "View Singleton already constructed!";
        View.instance = null;
        View.getInstance = function getInstance() {
            if(!View.instance) {
                View.instance = new View();
            }
            return View.instance;
        }
        return View;
    })();
    puremvc.View = View;    
})(puremvc || (puremvc = {}));

