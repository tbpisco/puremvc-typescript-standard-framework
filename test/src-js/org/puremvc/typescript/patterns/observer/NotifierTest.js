var NotifierTest = new YUITest.TestCase({
    name: "PureMVC Notifier class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testConstructor: function () {
        var notifierTestSub = new NotifierTestSub();
        YUITest.Assert.isTrue(notifierTestSub.hasFacade(), "Expecting notifierTestSub.hasFacade() === true");
    },
    testSendNotification: function () {
        var Facade = extract("puremvc.Facade");
        var facade = Facade.getInstance();
        facade.registerCommand('NotifierTestNote', NotifierTestCommand);
        var vo = new NotifierTestVO(32);
        facade.sendNotification('NotifierTestNote', vo);
        YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
    }
});
