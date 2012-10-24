var MediatorTest = new YUITest.TestCase({
    name: "PureMVC Mediator class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testConstructor: function () {
        var mediatorTestSub = new MediatorTestSub();
        YUITest.Assert.isTrue(mediatorTestSub.hasFacade(), "Expecting mediatorTestSub.hasFacade() === true");
    },
    testNameAccessor: function () {
        var Mediator = extract("puremvc.Mediator");
        var mediator = new Mediator();
        YUITest.Assert.areEqual(Mediator.NAME, mediator.getMediatorName(), "Expecting mediator.getMediatorName() == Mediator.NAME");
    },
    testViewAccessor: function () {
        var Mediator = extract("puremvc.Mediator");
        var view = new Object();
        var mediator = new Mediator(Mediator.NAME, view);
        YUITest.Assert.isNotNull(mediator.getViewComponent(), "Expecting mediator.getViewComponent() !== null");
    }
});
