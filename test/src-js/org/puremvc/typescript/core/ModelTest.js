var ModelTest = new YUITest.TestCase({
    name: "PureMVC Model class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testGetInstance: function () {
        var Model = extract("puremvc.Model");
        var model = Model.getInstance();
        YUITest.Assert.isNotNull(model, "Expecting instance !== null");
        YUITest.Assert.isInstanceOf(Model, model, "Expecting instance extends Model");
    },
    testRegisterAndRetrieveProxy: function () {
        var Model = extract("puremvc.Model");
        var Proxy = extract("puremvc.Proxy");
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
    },
    testRegisterAndRemoveProxy: function () {
        var Model = extract("puremvc.Model");
        var Proxy = extract("puremvc.Proxy");
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
    },
    testHasProxy: function () {
        var Model = extract("puremvc.Model");
        var Proxy = extract("puremvc.Proxy");
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
    },
    testOnRegisterAndOnRemove: function () {
        var Model = extract("puremvc.Model");
        var model = Model.getInstance();
        var proxy = new ModelTestProxy();
        model.registerProxy(proxy);
        YUITest.Assert.areEqual(ModelTestProxy.ON_REGISTER_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED");
        model.removeProxy(ModelTestProxy.NAME);
        YUITest.Assert.areEqual(ModelTestProxy.ON_REMOVE_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED");
    }
});
