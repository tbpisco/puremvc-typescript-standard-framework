var ProxyTest = new YUITest.TestCase({
    name: "PureMVC Proxy class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testConstructorInitialization: function () {
        var proxyTestSub = new ProxyTestSub();
        YUITest.Assert.isTrue(proxyTestSub.hasFacade(), "Expecting proxyTestSub.hasFacade() === true");
    },
    testConstructor: function () {
        var Proxy = extract("puremvc.Proxy");
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
    },
    testNameAccessor: function () {
        var Proxy = extract("puremvc.Proxy");
        var proxy = new Proxy('TestProxy');
        YUITest.Assert.areEqual('TestProxy', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'TestProxy'");
    },
    testDataAccessors: function () {
        var Proxy = extract("puremvc.Proxy");
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
    }
});
