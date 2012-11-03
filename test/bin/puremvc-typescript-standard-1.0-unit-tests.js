var test;
(function (test) {
    "use strict";
    var ControllerTestVO = (function () {
        function ControllerTestVO(input) {
            this.input = 0;
            this.result = 0;
            this.input = input;
        }
        return ControllerTestVO;
    })();
    test.ControllerTestVO = ControllerTestVO;    
})(test || (test = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var test;
(function (test) {
    "use strict";
    
    var ControllerTestCommand2 = (function (_super) {
        __extends(ControllerTestCommand2, _super);
        function ControllerTestCommand2() {
            _super.apply(this, arguments);

        }
        ControllerTestCommand2.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = vo.result + (2 * vo.input);
        };
        return ControllerTestCommand2;
    })(puremvc.SimpleCommand);
    test.ControllerTestCommand2 = ControllerTestCommand2;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    
    
    var ControllerTestCommand = (function (_super) {
        __extends(ControllerTestCommand, _super);
        function ControllerTestCommand() {
            _super.apply(this, arguments);

        }
        ControllerTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return ControllerTestCommand;
    })(SimpleCommand);
    test.ControllerTestCommand = ControllerTestCommand;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var ControllerTest = (function () {
        function ControllerTest() {
            this.name = "PureMVC Controller class tests";
        }
        ControllerTest.prototype.testGetInstance = function () {
            var controller = Controller.getInstance();
            YUITest.Assert.isNotNull(controller, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(Controller, controller, "Expecting instance extends Controller");
        };
        ControllerTest.prototype.testRegisterAndExecuteCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('ControllerTest', test.ControllerTestCommand);
            var vo = new test.ControllerTestVO(12);
            var note = new Notification('ControllerTest', vo);
            controller.executeCommand(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
        };
        ControllerTest.prototype.testRegisterAndRemoveCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('ControllerRemoveTest', test.ControllerTestCommand);
            var vo = new test.ControllerTestVO(12);
            var note = new Notification('ControllerRemoveTest', vo);
            controller.executeCommand(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
            vo.result = 0;
            controller.removeCommand('ControllerRemoveTest');
            controller.executeCommand(note);
            YUITest.Assert.areEqual(0, vo.result, "Expecting vo.result == 0");
        };
        ControllerTest.prototype.testHasCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('hasCommandTest', test.ControllerTestCommand);
            YUITest.Assert.isTrue(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === true");
            controller.removeCommand('hasCommandTest');
            YUITest.Assert.isFalse(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === false");
        };
        ControllerTest.prototype.testReregisterAndExecuteCommand = function () {
            var controller = Controller.getInstance();
            controller.registerCommand('ControllerTest2', test.ControllerTestCommand2);
            controller.removeCommand('ControllerTest2');
            controller.registerCommand('ControllerTest2', test.ControllerTestCommand2);
            var vo = new test.ControllerTestVO(12);
            var note = new Notification('ControllerTest2', vo);
            var view = View.getInstance();
            view.notifyObservers(note);
            YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
            view.notifyObservers(note);
            YUITest.Assert.areEqual(48, vo.result, "Expecting vo.result == 48");
        };
        return ControllerTest;
    })();
    test.ControllerTest = ControllerTest;    
})(test || (test = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Model = (function () {
        function Model() {
            this.proxyMap = null;
            if(Model.instance) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.instance = this;
            this.proxyMap = {
            };
            this.initializeModel();
        }
        Model.prototype.initializeModel = function () {
        };
        Model.prototype.registerProxy = function (proxy) {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if(proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        Model.prototype.retrieveProxy = function (proxyName) {
            return this.proxyMap[proxyName] || null;
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        Model.SINGLETON_MSG = "Model singleton already constructed!";
        Model.instance = null;
        Model.getInstance = function getInstance() {
            if(!puremvc.Model.instance) {
                puremvc.Model.instance = new puremvc.Model();
            }
            return puremvc.Model.instance;
        }
        return Model;
    })();
    puremvc.Model = Model;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Observer = (function () {
        function Observer(notifyMethod, notifyContext) {
            this.notify = null;
            this.context = null;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }
        Observer.prototype.getNotifyMethod = function () {
            return this.notify;
        };
        Observer.prototype.setNotifyMethod = function (notifyMethod) {
            this.notify = notifyMethod;
        };
        Observer.prototype.getNotifyContext = function () {
            return this.context;
        };
        Observer.prototype.setNotifyContext = function (notifyContext) {
            this.context = notifyContext;
        };
        Observer.prototype.notifyObserver = function (notification) {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
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
            this.view = null;
            this.commandMap = null;
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
        Controller.SINGLETON_MSG = "Controller singleton already constructed!";
        Controller.getInstance = function getInstance() {
            if(!puremvc.Controller.instance) {
                puremvc.Controller.instance = new puremvc.Controller();
            }
            return puremvc.Controller.instance;
        }
        return Controller;
    })();
    puremvc.Controller = Controller;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var View = (function () {
        function View() {
            this.mediatorMap = null;
            this.observerMap = null;
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
            if(len > 0) {
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
        View.SINGLETON_MSG = "View singleton already constructed!";
        View.instance = null;
        View.getInstance = function getInstance() {
            if(!puremvc.View.instance) {
                puremvc.View.instance = new puremvc.View();
            }
            return puremvc.View.instance;
        }
        return View;
    })();
    puremvc.View = View;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notification = (function () {
        function Notification(name, body, type) {
            if (typeof body === "undefined") { body = null; }
            if (typeof type === "undefined") { type = null; }
            this.name = null;
            this.body = null;
            this.type = null;
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
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
        return Notification;
    })();
    puremvc.Notification = Notification;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Facade = (function () {
        function Facade() {
            this.model = null;
            this.view = null;
            this.controller = null;
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
        Facade.SINGLETON_MSG = "Facade singleton already constructed!";
        Facade.instance = null;
        Facade.getInstance = function getInstance() {
            if(!puremvc.Facade.instance) {
                puremvc.Facade.instance = new puremvc.Facade();
            }
            return puremvc.Facade.instance;
        }
        return Facade;
    })();
    puremvc.Facade = Facade;    
})(puremvc || (puremvc = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var Notifier = (function () {
        function Notifier() {
            this.facade = null;
            this.facade = Facade.getInstance();
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

var puremvc;
(function (puremvc) {
    "use strict";
    var Proxy = (function (_super) {
        __extends(Proxy, _super);
        function Proxy(proxyName, data) {
            if (typeof proxyName === "undefined") { proxyName = null; }
            if (typeof data === "undefined") { data = null; }
            _super.prototype();
            this.proxyName = null;
            this.data = null;
            this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if(data != null) {
                this.setData(data);
            }
        }
        Proxy.prototype.getProxyName = function () {
            return this.proxyName;
        };
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        Proxy.prototype.onRegister = function () {
        };
        Proxy.prototype.onRemove = function () {
        };
        Proxy.NAME = "Proxy";
        return Proxy;
    })(puremvc.Notifier);
    puremvc.Proxy = Proxy;    
})(puremvc || (puremvc = {}));

var test;
(function (test) {
    "use strict";
    var ModelTestProxy = (function (_super) {
        __extends(ModelTestProxy, _super);
        function ModelTestProxy() {
            _super.prototype(ModelTestProxy.NAME, '');
        }
        ModelTestProxy.prototype.onRegister = function () {
            this.setData(ModelTestProxy.ON_REGISTER_CALLED);
        };
        ModelTestProxy.prototype.onRemove = function () {
            this.setData(ModelTestProxy.ON_REMOVE_CALLED);
        };
        ModelTestProxy.NAME = 'ModelTestProxy';
        ModelTestProxy.ON_REGISTER_CALLED = 'onRegister Called';
        ModelTestProxy.ON_REMOVE_CALLED = 'onRemove Called';
        return ModelTestProxy;
    })(Proxy);
    test.ModelTestProxy = ModelTestProxy;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var ModelTest = (function () {
        function ModelTest() {
            this.name = "PureMVC Model class tests";
        }
        ModelTest.prototype.testGetInstance = function () {
            var model = Model.getInstance();
            YUITest.Assert.isNotNull(model, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(Model, model, "Expecting instance extends Model");
        };
        ModelTest.prototype.testRegisterAndRetrieveProxy = function () {
            var model = Model.getInstance();
            model.registerProxy(new Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]));
            var proxy = model.retrieveProxy('colors');
            var data = proxy.getData();
            YUITest.Assert.isNotNull(data, "Expecting data !== null");
            YUITest.Assert.isArray(data, "Expecting data type is Array");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        ModelTest.prototype.testRegisterAndRemoveProxy = function () {
            var model = Model.getInstance();
            var proxy = new Proxy('sizes', [
                '7', 
                '13', 
                '21'
            ]);
            model.registerProxy(proxy);
            var removedProxy = model.removeProxy('sizes');
            YUITest.Assert.areEqual('sizes', removedProxy.getProxyName(), "Expecting removedProxy.getProxyName() == 'sizes'");
            proxy = model.retrieveProxy('sizes');
            YUITest.Assert.isNull(proxy, "Expecting proxy === null");
        };
        ModelTest.prototype.testHasProxy = function () {
            var model = Model.getInstance();
            var proxy = new Proxy('aces', [
                'clubs', 
                'spades', 
                'hearts', 
                'diamonds'
            ]);
            model.registerProxy(proxy);
            YUITest.Assert.isTrue(model.hasProxy('aces'), "Expecting model.hasProxy('aces') === true");
            model.removeProxy('aces');
            YUITest.Assert.isFalse(model.hasProxy('aces'), "Expecting model.hasProxy('aces') === false");
        };
        ModelTest.prototype.testOnRegisterAndOnRemove = function () {
            var model = Model.getInstance();
            var proxy = new test.ModelTestProxy();
            model.registerProxy(proxy);
            YUITest.Assert.areEqual(test.ModelTestProxy.ON_REGISTER_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED");
            model.removeProxy(test.ModelTestProxy.NAME);
            YUITest.Assert.areEqual(test.ModelTestProxy.ON_REMOVE_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED");
        };
        return ModelTest;
    })();
    test.ModelTest = ModelTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestMediator = (function (_super) {
        __extends(ViewTestMediator, _super);
        function ViewTestMediator(view) {
            _super.prototype(ViewTestMediator.NAME, view);
        }
        ViewTestMediator.prototype.listNotificationInterests = function () {
            return [
                'ABC', 
                'DEF', 
                'GHI'
            ];
        };
        ViewTestMediator.NAME = "ViewTestMediator";
        return ViewTestMediator;
    })(Mediator);
    test.ViewTestMediator = ViewTestMediator;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestMediator2 = (function (_super) {
        __extends(ViewTestMediator2, _super);
        function ViewTestMediator2(view) {
            _super.prototype(ViewTestMediator2.NAME, view);
        }
        ViewTestMediator2.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator2.prototype.listNotificationInterests = function () {
            return [
                test.ViewTest.NOTE1, 
                test.ViewTest.NOTE2
            ];
        };
        ViewTestMediator2.prototype.handleNotification = function (note) {
            this.getViewTest().lastNotification = note.getName();
        };
        ViewTestMediator2.NAME = 'ViewTestMediator2';
        return ViewTestMediator2;
    })(Mediator);
    test.ViewTestMediator2 = ViewTestMediator2;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestMediator3 = (function (_super) {
        __extends(ViewTestMediator3, _super);
        function ViewTestMediator3(view) {
            _super.prototype(ViewTestMediator3.NAME, view);
        }
        ViewTestMediator3.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator3.prototype.listNotificationInterests = function () {
            return [
                test.ViewTest.NOTE3
            ];
        };
        ViewTestMediator3.prototype.handleNotification = function (note) {
            this.getViewTest().lastNotification = note.getName();
        };
        ViewTestMediator3.NAME = 'ViewTestMediator3';
        return ViewTestMediator3;
    })(Mediator);
    test.ViewTestMediator3 = ViewTestMediator3;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestMediator4 = (function (_super) {
        __extends(ViewTestMediator4, _super);
        function ViewTestMediator4(view) {
            _super.prototype(ViewTestMediator4.NAME, view);
        }
        ViewTestMediator4.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator4.prototype.onRegister = function () {
            this.getViewTest().onRegisterCalled = true;
        };
        ViewTestMediator4.prototype.onRemove = function () {
            this.getViewTest().onRemoveCalled = true;
        };
        ViewTestMediator4.NAME = 'ViewTestMediator4';
        return ViewTestMediator4;
    })(Mediator);
    test.ViewTestMediator4 = ViewTestMediator4;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestMediator5 = (function (_super) {
        __extends(ViewTestMediator5, _super);
        function ViewTestMediator5(view) {
            _super.prototype(ViewTestMediator5.NAME, view);
        }
        ViewTestMediator5.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator5.prototype.listNotificationInterests = function () {
            return [
                test.ViewTest.NOTE5
            ];
        };
        ViewTestMediator5.prototype.handleNotification = function (notification) {
            this.getViewTest().counter++;
        };
        ViewTestMediator5.NAME = 'ViewTestMediator5';
        return ViewTestMediator5;
    })(Mediator);
    test.ViewTestMediator5 = ViewTestMediator5;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestMediator6 = (function (_super) {
        __extends(ViewTestMediator6, _super);
        function ViewTestMediator6(mediatorName, view) {
            _super.prototype(mediatorName, view);
        }
        ViewTestMediator6.prototype.getViewTest = function () {
            return this.viewComponent;
        };
        ViewTestMediator6.prototype.listNotificationInterests = function () {
            return [
                test.ViewTest.NOTE6
            ];
        };
        ViewTestMediator6.prototype.handleNotification = function (notification) {
            this.facade.removeMediator(this.getMediatorName());
        };
        ViewTestMediator6.prototype.onRemove = function () {
            this.getViewTest().counter++;
        };
        ViewTestMediator6.NAME = 'ViewTestMediator6';
        return ViewTestMediator6;
    })(Mediator);
    test.ViewTestMediator6 = ViewTestMediator6;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var ViewTestNote = (function (_super) {
        __extends(ViewTestNote, _super);
        function ViewTestNote(name, body) {
            _super.prototype(ViewTestNote.NAME, body);
        }
        ViewTestNote.NAME = "ViewTestNote";
        ViewTestNote.create = function create(body) {
            return new ViewTestNote(ViewTestNote.NAME, body);
        }
        return ViewTestNote;
    })(Notification);
    test.ViewTestNote = ViewTestNote;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var ViewTest = (function () {
        function ViewTest() {
            this.name = "PureMVC View class tests";
            this.lastNotification = "";
            this.counter = 0;
            this.onRegisterCalled = false;
            this.onRemoveCalled = false;
            this.viewTestVar = 0;
        }
        ViewTest.prototype.testGetInstance = function () {
            var view = View.getInstance();
            YUITest.Assert.isNotNull(view, "Expecting instance !== null");
            YUITest.Assert.isInstanceOf(View, view, "Expecting instance implements View");
        };
        ViewTest.prototype.testRegisterAndNotifyObserver = function () {
            var view = View.getInstance();
            var observer = new Observer(this.viewTestMethod, this);
            view.registerObserver(test.ViewTestNote.NAME, observer);
            var note = test.ViewTestNote.create(10);
            view.notifyObservers(note);
            YUITest.Assert.areEqual(10, this.viewTestVar, "Expecting viewTestVar = 10");
        };
        ViewTest.prototype.viewTestMethod = function (note) {
            this.viewTestVar = note.getBody();
        };
        ViewTest.prototype.testRegisterAndRetrieveMediator = function () {
            var view = View.getInstance();
            var viewTestMediator = new test.ViewTestMediator(this);
            view.registerMediator(viewTestMediator);
            var mediator = view.retrieveMediator(test.ViewTestMediator.NAME);
            YUITest.Assert.isInstanceOf(test.ViewTestMediator, mediator, "Expecting comp is ViewTestMediator");
            this.cleanup();
        };
        ViewTest.prototype.testHasMediator = function () {
            var view = View.getInstance();
            var mediator = new Mediator('hasMediatorTest', this);
            view.registerMediator(mediator);
            YUITest.Assert.isTrue(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === true");
            view.removeMediator('hasMediatorTest');
            YUITest.Assert.isFalse(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === false");
        };
        ViewTest.prototype.testRegisterAndRemoveMediator = function () {
            var view = View.getInstance();
            var mediator = new Mediator('testing', this);
            view.registerMediator(mediator);
            var removedMediator = view.removeMediator('testing');
            YUITest.Assert.areEqual('testing', removedMediator.getMediatorName(), "Expecting removedMediator.getMediatorName() == 'testing'");
            var retrievedMediator = view.retrieveMediator('testing');
            YUITest.Assert.isNull(retrievedMediator, "Expecting view.retrieveMediator( 'testing' ) === null )");
            this.cleanup();
        };
        ViewTest.prototype.testOnRegisterAndOnRemove = function () {
            var view = View.getInstance();
            var mediator = new test.ViewTestMediator4(this);
            view.registerMediator(mediator);
            YUITest.Assert.isTrue(this.onRegisterCalled, "Expecting onRegisterCalled === true");
            view.removeMediator(test.ViewTestMediator4.NAME);
            YUITest.Assert.isTrue(this.onRemoveCalled, "Expecting onRemoveCalled === true");
            this.cleanup();
        };
        ViewTest.prototype.testSuccessiveRegisterAndRemoveMediator = function () {
            var view = View.getInstance();
            view.registerMediator(new test.ViewTestMediator(this));
            YUITest.Assert.isInstanceOf(test.ViewTestMediator, view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) isInstanceOf ViewTestMediator");
            view.removeMediator(test.ViewTestMediator.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
            YUITest.Assert.isNull(view.removeMediator(test.ViewTestMediator.NAME), "Expecting view.removeMediator( ViewTestMediator.NAME ) === null");
            view.registerMediator(new test.ViewTestMediator(this));
            YUITest.Assert.isInstanceOf(test.ViewTestMediator, view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) is ViewTestMediator");
            view.removeMediator(test.ViewTestMediator.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
            this.cleanup();
        };
        ViewTest.prototype.testRemoveMediatorAndSubsequentNotify = function () {
            var view = View.getInstance();
            view.registerMediator(new test.ViewTestMediator2(this));
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
            view.removeMediator(test.ViewTestMediator2.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
            this.lastNotification = null;
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
            this.cleanup();
        };
        ViewTest.prototype.testRemoveOneOfTwoMediatorsAndSubsequentNotify = function () {
            var view = View.getInstance();
            view.registerMediator(new test.ViewTestMediator2(this));
            view.registerMediator(new test.ViewTestMediator3(this));
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
            view.notifyObservers(new Notification(ViewTest.NOTE3));
            YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
            view.removeMediator(test.ViewTestMediator2.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
            this.lastNotification = null;
            view.notifyObservers(new Notification(ViewTest.NOTE1));
            YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
            view.notifyObservers(new Notification(ViewTest.NOTE2));
            YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
            view.notifyObservers(new Notification(ViewTest.NOTE3));
            YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
            this.cleanup();
        };
        ViewTest.prototype.testMediatorReregistration = function () {
            var view = View.getInstance();
            view.registerMediator(new test.ViewTestMediator5(this));
            view.registerMediator(new test.ViewTestMediator5(this));
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE5));
            YUITest.Assert.areEqual(1, this.counter, "Expecting counter == 1");
            view.removeMediator(test.ViewTestMediator5.NAME);
            YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator5.NAME), "Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null");
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE5));
            YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
        };
        ViewTest.prototype.testModifyObserverListDuringNotification = function () {
            var view = View.getInstance();
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/1", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/2", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/3", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/4", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/5", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/6", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/7", this));
            view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/8", this));
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE6));
            YUITest.Assert.areEqual(8, this.counter, "Expecting counter == 8");
            this.counter = 0;
            view.notifyObservers(new Notification(ViewTest.NOTE6));
            YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
        };
        ViewTest.prototype.cleanup = function () {
            View.getInstance().removeMediator(test.ViewTestMediator.NAME);
            View.getInstance().removeMediator(test.ViewTestMediator2.NAME);
            View.getInstance().removeMediator(test.ViewTestMediator3.NAME);
        };
        ViewTest.NOTE1 = "Notification1";
        ViewTest.NOTE2 = "Notification2";
        ViewTest.NOTE3 = "Notification3";
        ViewTest.NOTE4 = "Notification4";
        ViewTest.NOTE5 = "Notification5";
        ViewTest.NOTE6 = "Notification6";
        return ViewTest;
    })();
    test.ViewTest = ViewTest;    
})(test || (test = {}));

var puremvc;
(function (puremvc) {
    "use strict";
    var MacroCommand = (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
            _super.prototype();
            this.subCommands = null;
            this.subCommands = new Array();
            this.initializeMacroCommand();
        }
        MacroCommand.prototype.initializeMacroCommand = function () {
        };
        MacroCommand.prototype.addSubCommand = function (commandClassRef) {
            this.subCommands.push(commandClassRef);
        };
        MacroCommand.prototype.execute = function (notification) {
            var subCommands = this.subCommands.slice(0);
            var len = this.subCommands.length;
            for(var i = 0; i < len; i++) {
                var commandClassRef = subCommands[i];
                var commandInstance = new commandClassRef();
                commandInstance.execute(notification);
            }
            this.subCommands.splice(0);
        };
        return MacroCommand;
    })(puremvc.Notifier);
    puremvc.MacroCommand = MacroCommand;    
})(puremvc || (puremvc = {}));

var test;
(function (test) {
    "use strict";
    var MacroCommandTestSub = (function (_super) {
        __extends(MacroCommandTestSub, _super);
        function MacroCommandTestSub() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub.prototype.hasFacade = function () {
            return this.facade instanceof Facade;
        };
        return MacroCommandTestSub;
    })(MacroCommand);
    test.MacroCommandTestSub = MacroCommandTestSub;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var MacroCommandTestVO = (function () {
        function MacroCommandTestVO(input) {
            this.input = null;
            this.result1 = null;
            this.result2 = null;
            this.input = input;
        }
        return MacroCommandTestVO;
    })();
    test.MacroCommandTestVO = MacroCommandTestVO;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var MacroCommandTestSub1Command = (function (_super) {
        __extends(MacroCommandTestSub1Command, _super);
        function MacroCommandTestSub1Command() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub1Command.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result1 = 2 * vo.input;
        };
        return MacroCommandTestSub1Command;
    })(SimpleCommand);
    test.MacroCommandTestSub1Command = MacroCommandTestSub1Command;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var MacroCommandTestSub2Command = (function (_super) {
        __extends(MacroCommandTestSub2Command, _super);
        function MacroCommandTestSub2Command() {
            _super.apply(this, arguments);

        }
        MacroCommandTestSub2Command.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result2 = vo.input * vo.input;
        };
        return MacroCommandTestSub2Command;
    })(SimpleCommand);
    test.MacroCommandTestSub2Command = MacroCommandTestSub2Command;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var MacroCommandTestCommand = (function (_super) {
        __extends(MacroCommandTestCommand, _super);
        function MacroCommandTestCommand() {
            _super.apply(this, arguments);

        }
        MacroCommandTestCommand.prototype.initializeMacroCommand = function () {
            this.addSubCommand(test.MacroCommandTestSub1Command);
            this.addSubCommand(test.MacroCommandTestSub2Command);
        };
        return MacroCommandTestCommand;
    })(MacroCommand);
    test.MacroCommandTestCommand = MacroCommandTestCommand;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var MacroCommandTest = (function () {
        function MacroCommandTest() {
            this.name = "PureMVC MacroCommmand class tests";
        }
        MacroCommandTest.prototype.testConstructor = function () {
            var macroCommandTestSub = new test.MacroCommandTestSub();
            YUITest.Assert.isTrue(macroCommandTestSub.hasFacade(), "Expecting macroCommandTestSub.hasFacade() === true");
        };
        MacroCommandTest.prototype.testMacroCommandExecute = function () {
            var vo = new test.MacroCommandTestVO(5);
            var note = new Notification('MacroCommandTest', vo);
            var command = new test.MacroCommandTestCommand();
            command.execute(note);
            YUITest.Assert.areEqual(10, vo.result1, "Expecting vo.result1 == 10");
            YUITest.Assert.areEqual(25, vo.result2, "Expecting vo.result2 == 25");
        };
        return MacroCommandTest;
    })();
    test.MacroCommandTest = MacroCommandTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var SimpleCommandTestVO = (function () {
        function SimpleCommandTestVO(input) {
            this.input = null;
            this.result = null;
            this.input = input;
        }
        return SimpleCommandTestVO;
    })();
    test.SimpleCommandTestVO = SimpleCommandTestVO;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var SimpleCommandTestCommand = (function (_super) {
        __extends(SimpleCommandTestCommand, _super);
        function SimpleCommandTestCommand() {
            _super.apply(this, arguments);

        }
        SimpleCommandTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return SimpleCommandTestCommand;
    })(SimpleCommand);
    test.SimpleCommandTestCommand = SimpleCommandTestCommand;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var SimpleCommandTestSub = (function (_super) {
        __extends(SimpleCommandTestSub, _super);
        function SimpleCommandTestSub() {
            _super.apply(this, arguments);

        }
        SimpleCommandTestSub.prototype.hasFacade = function () {
            return this.facade instanceof Facade;
        };
        return SimpleCommandTestSub;
    })(SimpleCommand);
    test.SimpleCommandTestSub = SimpleCommandTestSub;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var SimpleCommandTest = (function () {
        function SimpleCommandTest() {
            this.name = "PureMVC SimpleCommand class Tests";
        }
        SimpleCommandTest.prototype.testConstructor = function () {
            var simpleCommandTestSub = new test.SimpleCommandTestSub();
            YUITest.Assert.isTrue(simpleCommandTestSub.hasFacade(), "Expecting simpleCommandTestSub.hasFacade() === true");
        };
        SimpleCommandTest.prototype.testSimpleCommandExecute = function () {
            var vo = new test.SimpleCommandTestVO(5);
            var note = new Notification('SimpleCommandTestNote', vo);
            var command = new test.SimpleCommandTestCommand();
            command.execute(note);
            YUITest.Assert.areEqual(10, vo.result, "Expecting vo.result == 10");
        };
        return SimpleCommandTest;
    })();
    test.SimpleCommandTest = SimpleCommandTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var FacadeTestVO = (function () {
        function FacadeTestVO(input) {
            this.input = null;
            this.result = null;
            this.input = input;
        }
        return FacadeTestVO;
    })();
    test.FacadeTestVO = FacadeTestVO;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var FacadeTestCommand = (function (_super) {
        __extends(FacadeTestCommand, _super);
        function FacadeTestCommand() {
            _super.apply(this, arguments);

        }
        FacadeTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return FacadeTestCommand;
    })(SimpleCommand);
    test.FacadeTestCommand = FacadeTestCommand;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var FacadeTest = (function () {
        function FacadeTest() {
            this.name = "PureMVC Facade class tests";
        }
        FacadeTest.prototype.testGetInstance = function () {
            var facade = Facade.getInstance();
            YUITest.Assert.isNotUndefined(facade, "Expecting facade not to be undefined");
            YUITest.Assert.isInstanceOf(Facade, facade, "Expecting instance is instance of Facade");
        };
        FacadeTest.prototype.testRegisterCommandAndSendNotification = function () {
            var facade = Facade.getInstance();
            facade.registerCommand('FacadeTestNote', test.FacadeTestCommand);
            var vo = new test.FacadeTestVO(32);
            facade.sendNotification('FacadeTestNote', vo);
            YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
        };
        FacadeTest.prototype.testRegisterAndRemoveCommandAndSendNotification = function () {
            var facade = Facade.getInstance();
            facade.registerCommand('FacadeTestNote', test.FacadeTestCommand);
            facade.removeCommand('FacadeTestNote');
            var vo = new test.FacadeTestVO(32);
            facade.sendNotification('FacadeTestNote', vo);
            YUITest.Assert.areNotEqual(64, vo.result, "Expecting vo.result != 64");
        };
        FacadeTest.prototype.testRegisterAndRetrieveProxy = function () {
            var facade = Facade.getInstance();
            facade.registerProxy(new Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]));
            var proxy = facade.retrieveProxy('colors');
            YUITest.Assert.isInstanceOf(Proxy, proxy, "Expecting proxy is Proxy");
            var data = proxy.getData();
            YUITest.Assert.isNotUndefined(data, "Expecting data not null");
            YUITest.Assert.isArray(data, "Expecting data is Array");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        FacadeTest.prototype.testRegisterAndRemoveProxy = function () {
            var facade = Facade.getInstance();
            var proxy = new Proxy('sizes', [
                '7', 
                '13', 
                '21'
            ]);
            facade.registerProxy(proxy);
            var removedProxy = facade.removeProxy('sizes');
            YUITest.Assert.areEqual('sizes', removedProxy ? removedProxy.getProxyName() : null, "Expecting removedProxy.getProxyName() == 'sizes'");
            proxy = facade.retrieveProxy('sizes');
            YUITest.Assert.isNull(proxy, "Expecting proxy === null");
        };
        FacadeTest.prototype.testRegisterRetrieveAndRemoveMediator = function () {
            var facade = Facade.getInstance();
            facade.registerMediator(new Mediator(Mediator.NAME, new Object()));
            YUITest.Assert.isNotNull(facade.retrieveMediator(Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) !== null");
            var removedMediator = facade.removeMediator(Mediator.NAME);
            YUITest.Assert.areEqual(Mediator.NAME, removedMediator ? removedMediator.getMediatorName() : null, "Expecting removedMediator.getMediatorName() == Mediator.NAME");
            YUITest.Assert.isNull(facade.retrieveMediator(Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) === null )");
        };
        FacadeTest.prototype.testHasProxy = function () {
            var facade = Facade.getInstance();
            facade.registerProxy(new Proxy('hasProxyTest', [
                1, 
                2, 
                3
            ]));
            YUITest.Assert.isTrue(facade.hasProxy('hasProxyTest'), "Expecting facade.hasProxy('hasProxyTest') === true");
        };
        FacadeTest.prototype.testHasMediator = function () {
            var facade = Facade.getInstance();
            facade.registerMediator(new Mediator('facadeHasMediatorTest', new Object()));
            YUITest.Assert.isTrue(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === true");
            facade.removeMediator('facadeHasMediatorTest');
            YUITest.Assert.isFalse(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === false");
        };
        FacadeTest.prototype.testHasCommand = function () {
            var facade = Facade.getInstance();
            facade.registerCommand('facadeHasCommandTest', test.FacadeTestCommand);
            YUITest.Assert.isTrue(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === true");
            facade.removeCommand('facadeHasCommandTest');
            YUITest.Assert.isFalse(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === false");
        };
        return FacadeTest;
    })();
    test.FacadeTest = FacadeTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var MediatorTestSub = (function (_super) {
        __extends(MediatorTestSub, _super);
        function MediatorTestSub() {
            _super.apply(this, arguments);

        }
        MediatorTestSub.prototype.hasFacade = function () {
            return this.facade instanceof Facade;
        };
        return MediatorTestSub;
    })(Mediator);
    test.MediatorTestSub = MediatorTestSub;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var MediatorTest = (function () {
        function MediatorTest() {
            this.name = "PureMVC Mediator class tests";
        }
        MediatorTest.prototype.testConstructor = function () {
            var mediatorTestSub = new test.MediatorTestSub();
            YUITest.Assert.isTrue(mediatorTestSub.hasFacade(), "Expecting mediatorTestSub.hasFacade() === true");
        };
        MediatorTest.prototype.testNameAccessor = function () {
            var mediator = new Mediator();
            YUITest.Assert.areEqual(Mediator.NAME, mediator.getMediatorName(), "Expecting mediator.getMediatorName() == Mediator.NAME");
        };
        MediatorTest.prototype.testViewAccessor = function () {
            var view = new Object();
            var mediator = new Mediator(Mediator.NAME, view);
            YUITest.Assert.isNotNull(mediator.getViewComponent(), "Expecting mediator.getViewComponent() !== null");
        };
        return MediatorTest;
    })();
    test.MediatorTest = MediatorTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var NotificationTest = (function () {
        function NotificationTest() {
            this.name = "PureMVC Notification class tests";
        }
        NotificationTest.prototype.testNameAccessors = function () {
            var note = new Notification('TestNote');
            YUITest.Assert.areEqual('TestNote', note.getName(), "Expecting note.getName() == 'TestNote'");
        };
        NotificationTest.prototype.testBodyAccessors = function () {
            var note = new Notification(null);
            note.setBody(5);
            YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
        };
        NotificationTest.prototype.testConstructor = function () {
            var note = new Notification('TestNote', 5, 'TestNoteType');
            YUITest.Assert.areEqual("TestNote", note.getName(), "Expecting note.getName() == 'TestNote'");
            YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
            YUITest.Assert.areEqual("TestNoteType", note.getType(), "Expecting note.getType() == 'TestNoteType'");
        };
        NotificationTest.prototype.testToString = function () {
            var note = new Notification('TestNote', [
                1, 
                3, 
                5
            ], 'TestType');
            var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
            YUITest.Assert.areEqual(ts, note.toString(), "Expecting note.testToString():void == '" + ts + "'");
        };
        return NotificationTest;
    })();
    test.NotificationTest = NotificationTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    
    
    var NotifierTestVO = (function () {
        function NotifierTestVO(input) {
            this.input = null;
            this.result = null;
            this.input = input;
        }
        return NotifierTestVO;
    })();
    test.NotifierTestVO = NotifierTestVO;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var NotifierTestCommand = (function (_super) {
        __extends(NotifierTestCommand, _super);
        function NotifierTestCommand() {
            _super.apply(this, arguments);

        }
        NotifierTestCommand.prototype.execute = function (note) {
            var vo = note.getBody();
            vo.result = 2 * vo.input;
        };
        return NotifierTestCommand;
    })(SimpleCommand);
    test.NotifierTestCommand = NotifierTestCommand;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var NotifierTestSub = (function (_super) {
        __extends(NotifierTestSub, _super);
        function NotifierTestSub() {
            _super.apply(this, arguments);

        }
        NotifierTestSub.prototype.hasFacade = function () {
            return this.facade instanceof Facade;
        };
        return NotifierTestSub;
    })(Notifier);
    test.NotifierTestSub = NotifierTestSub;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var NotifierTest = (function () {
        function NotifierTest() {
            this.name = "PureMVC Notifier class tests";
        }
        NotifierTest.prototype.testConstructor = function () {
            var notifierTestSub = new test.NotifierTestSub();
            YUITest.Assert.isTrue(notifierTestSub.hasFacade(), "Expecting notifierTestSub.hasFacade() === true");
        };
        NotifierTest.prototype.testSendNotification = function () {
            var facade = Facade.getInstance();
            facade.registerCommand('NotifierTestNote', test.NotifierTestCommand);
            var vo = new test.NotifierTestVO(32);
            facade.sendNotification('NotifierTestNote', vo);
            YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
        };
        return NotifierTest;
    })();
    test.NotifierTest = NotifierTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var ObserverTest = (function () {
        function ObserverTest() {
            this.name = "PureMVC Observer class tests";
            this.observerTestVar = -1;
        }
        ObserverTest.prototype.testObserverAccessors = function () {
            var observer = new Observer(null, null);
            observer.setNotifyContext(this);
            observer.setNotifyMethod(this.observerTestMethod);
            var note = new Notification('ObserverTestNote', 10);
            observer.notifyObserver(note);
            YUITest.Assert.areSame(10, this.observerTestVar, "Expecting observerTestVar === 10");
        };
        ObserverTest.prototype.testObserverConstructor = function () {
            var observer = new Observer(this.observerTestMethod, this);
            var note = new Notification('ObserverTestNote', 5);
            observer.notifyObserver(note);
            YUITest.Assert.areSame(5, this.observerTestVar, "Expecting observerTestVar === 5");
        };
        ObserverTest.prototype.testCompareNotifyContext = function () {
            var observer = new Observer(this.observerTestMethod, this);
            var negTestObj = new Object();
            YUITest.Assert.isFalse(observer.compareNotifyContext(negTestObj), "Expecting observer.compareNotifyContext(negTestObj) === false");
            YUITest.Assert.isTrue(observer.compareNotifyContext(this), "Expecting observer.compareNotifyContext(this) === true");
        };
        ObserverTest.prototype.observerTestMethod = function (note) {
            this.observerTestVar = note.getBody();
        };
        return ObserverTest;
    })();
    test.ObserverTest = ObserverTest;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    
    
    var ProxyTestSub = (function (_super) {
        __extends(ProxyTestSub, _super);
        function ProxyTestSub() {
            _super.apply(this, arguments);

        }
        ProxyTestSub.prototype.hasFacade = function () {
            return this.facade instanceof Facade;
        };
        return ProxyTestSub;
    })(Proxy);
    test.ProxyTestSub = ProxyTestSub;    
})(test || (test = {}));

var test;
(function (test) {
    "use strict";
    var YUITest = require("YUITest")
    
    var ProxyTest = (function () {
        function ProxyTest() {
            this.name = "PureMVC Proxy class tests";
        }
        ProxyTest.prototype.testConstructorInitialization = function () {
            var proxyTestSub = new test.ProxyTestSub();
            YUITest.Assert.isTrue(proxyTestSub.hasFacade(), "Expecting proxyTestSub.hasFacade() === true");
        };
        ProxyTest.prototype.testConstructor = function () {
            var proxy = new Proxy('colors', [
                'red', 
                'green', 
                'blue'
            ]);
            var data = proxy.getData();
            YUITest.Assert.isNotNull(proxy, "Expecting proxy !== null");
            YUITest.Assert.areEqual('colors', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'colors'");
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        ProxyTest.prototype.testNameAccessor = function () {
            var proxy = new Proxy('TestProxy');
            YUITest.Assert.areEqual('TestProxy', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'TestProxy'");
        };
        ProxyTest.prototype.testDataAccessors = function () {
            var proxy = new Proxy('colors');
            proxy.setData([
                'red', 
                'green', 
                'blue'
            ]);
            var data = proxy.getData();
            YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
            YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
            YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
            YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
        };
        return ProxyTest;
    })();
    test.ProxyTest = ProxyTest;    
})(test || (test = {}));

