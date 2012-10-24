var MacroCommandTest = new YUITest.TestCase({
    name: "PureMVC MacroCommmand class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testConstructor: function () {
        var macroCommandTestSub = new MacroCommandTestSub();
        YUITest.Assert.isTrue(macroCommandTestSub.hasFacade(), "Expecting macroCommandTestSub.hasFacade() === true");
    },
    testMacroCommandExecute: function () {
        var Notification = extract("puremvc.Notification");
        var vo = new MacroCommandTestVO(5);
        var note = new Notification('MacroCommandTest', vo);
        var command = new MacroCommandTestCommand();
        command.execute(note);
        YUITest.Assert.areEqual(10, vo.result1, "Expecting vo.result1 == 10");
        YUITest.Assert.areEqual(25, vo.result2, "Expecting vo.result2 == 25");
    }
});
