var ControllerTestCommand = function () {
};
__extends(ControllerTestCommand, extract("puremvc.SimpleCommand"));
ControllerTestCommand.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result = 2 * vo.input;
};
