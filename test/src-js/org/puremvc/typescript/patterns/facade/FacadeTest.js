var FacadeTest = new YUITest.TestCase({
    name: "PureMVC Facade class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testGetInstance: function () {
        var Facade = extract("puremvc.Facade");
        var facade = Facade.getInstance();
        YUITest.Assert.isNotUndefined(facade, "Expecting facade not to be undefined");
        YUITest.Assert.isInstanceOf(Facade, facade, "Expecting instance is instance of Facade");
    },
    testRegisterCommandAndSendNotification: function () {
        var Facade = extract("puremvc.Facade");
        var facade = Facade.getInstance();
        facade.registerCommand('FacadeTestNote', FacadeTestCommand);
        var vo = new FacadeTestVO(32);
        facade.sendNotification('FacadeTestNote', vo);
        YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
    },
    testRegisterAndRemoveCommandAndSendNotification: function () {
        var Facade = extract("puremvc.Facade");
        var facade = Facade.getInstance();
        facade.registerCommand('FacadeTestNote', FacadeTestCommand);
        facade.removeCommand('FacadeTestNote');
        var vo = new FacadeTestVO(32);
        facade.sendNotification('FacadeTestNote', vo);
        YUITest.Assert.areNotEqual(64, vo.result, "Expecting vo.result != 64");
    },
    testRegisterAndRetrieveProxy: function () {
        var Facade = extract("puremvc.Facade");
        var Proxy = extract("puremvc.Proxy");
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
    },
    testRegisterAndRemoveProxy: function () {
        var Facade = extract("puremvc.Facade");
        var Proxy = extract("puremvc.Proxy");
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
    },
    testRegisterRetrieveAndRemoveMediator: function () {
        var Facade = extract("puremvc.Facade");
        var Mediator = extract("puremvc.Mediator");
        var facade = Facade.getInstance();
        facade.registerMediator(new Mediator(Mediator.NAME, new Object()));
        YUITest.Assert.isNotNull(facade.retrieveMediator(Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) !== null");
        var removedMediator = facade.removeMediator(Mediator.NAME);
        YUITest.Assert.areEqual(Mediator.NAME, removedMediator ? removedMediator.getMediatorName() : null, "Expecting removedMediator.getMediatorName() == Mediator.NAME");
        YUITest.Assert.isNull(facade.retrieveMediator(Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) === null )");
    },
    testHasProxy: function () {
        var Facade = extract("puremvc.Facade");
        var Proxy = extract("puremvc.Proxy");
        var facade = Facade.getInstance();
        facade.registerProxy(new Proxy('hasProxyTest', [
            1, 
            2, 
            3
        ]));
        YUITest.Assert.isTrue(facade.hasProxy('hasProxyTest'), "Expecting facade.hasProxy('hasProxyTest') === true");
    },
    testHasMediator: function () {
        var Facade = extract("puremvc.Facade");
        var Mediator = extract("puremvc.Mediator");
        var facade = Facade.getInstance();
        facade.registerMediator(new Mediator('facadeHasMediatorTest', new Object()));
        YUITest.Assert.isTrue(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === true");
        facade.removeMediator('facadeHasMediatorTest');
        YUITest.Assert.isFalse(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === false");
    },
    testHasCommand: function () {
        var Facade = extract("puremvc.Facade");
        var facade = Facade.getInstance();
        facade.registerCommand('facadeHasCommandTest', FacadeTestCommand);
        YUITest.Assert.isTrue(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === true");
        facade.removeCommand('facadeHasCommandTest');
        YUITest.Assert.isFalse(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === false");
    }
});
