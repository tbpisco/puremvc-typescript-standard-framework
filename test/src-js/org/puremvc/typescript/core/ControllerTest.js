var ControllerTest = new YUITest.TestCase({
    name: "PureMVC Controller class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testGetInstance: function () {
        var Controller = extract("puremvc.Controller");
        var controller = Controller.getInstance();
        YUITest.Assert.isNotNull(controller, "Expecting instance !== null");
        YUITest.Assert.isInstanceOf(Controller, controller, "Expecting instance extends Controller");
    },
    testRegisterAndExecuteCommand: function () {
        var Controller = extract("puremvc.Controller");
        var Notification = extract("puremvc.Notification");
        var controller = Controller.getInstance();
        controller.registerCommand('ControllerTest', ControllerTestCommand);
        var vo = new ControllerTestVO(12);
        var note = new Notification('ControllerTest', vo);
        controller.executeCommand(note);
        YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
    },
    testRegisterAndRemoveCommand: function () {
        var Controller = extract("puremvc.Controller");
        var Notification = extract("puremvc.Notification");
        var controller = Controller.getInstance();
        controller.registerCommand('ControllerRemoveTest', ControllerTestCommand);
        var vo = new ControllerTestVO(12);
        var note = new Notification('ControllerRemoveTest', vo);
        controller.executeCommand(note);
        YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
        vo.result = 0;
        controller.removeCommand('ControllerRemoveTest');
        controller.executeCommand(note);
        YUITest.Assert.areEqual(0, vo.result, "Expecting vo.result == 0");
    },
    testHasCommand: function () {
        var Controller = extract("puremvc.Controller");
        var controller = Controller.getInstance();
        controller.registerCommand('hasCommandTest', ControllerTestCommand);
        YUITest.Assert.isTrue(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === true");
        controller.removeCommand('hasCommandTest');
        YUITest.Assert.isFalse(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === false");
    },
    testReregisterAndExecuteCommand: function () {
        var Controller = extract("puremvc.Controller");
        var View = extract("puremvc.View");
        var Notification = extract("puremvc.Notification");
        var controller = Controller.getInstance();
        controller.registerCommand('ControllerTest2', ControllerTestCommand2);
        controller.removeCommand('ControllerTest2');
        controller.registerCommand('ControllerTest2', ControllerTestCommand2);
        var vo = new ControllerTestVO(12);
        var note = new Notification('ControllerTest2', vo);
        var view = View.getInstance();
        view.notifyObservers(note);
        YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
        view.notifyObservers(note);
        YUITest.Assert.areEqual(48, vo.result, "Expecting vo.result == 48");
    }
});
