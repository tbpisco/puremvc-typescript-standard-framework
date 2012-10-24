var SimpleCommandTest = new YUITest.TestCase({
    name: "PureMVC SimpleCommand class Tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testConstructor: function () {
        var simpleCommandTestSub = new SimpleCommandTestSub();
        YUITest.Assert.isTrue(simpleCommandTestSub.hasFacade(), "Expecting simpleCommandTestSub.hasFacade() === true");
    },
    testSimpleCommandExecute: function () {
        var Notification = extract("puremvc.Notification");
        var vo = new SimpleCommandTestVO(5);
        var note = new Notification('SimpleCommandTestNote', vo);
        var command = new SimpleCommandTestCommand();
        command.execute(note);
        YUITest.Assert.areEqual(10, vo.result, "Expecting vo.result == 10");
    }
});
