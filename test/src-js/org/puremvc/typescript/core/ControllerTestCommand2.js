var ControllerTestCommand2 = function () {
};
__extends(ControllerTestCommand2, extract("puremvc.SimpleCommand"));
ControllerTestCommand2.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result = vo.result + (2 * vo.input);
};
