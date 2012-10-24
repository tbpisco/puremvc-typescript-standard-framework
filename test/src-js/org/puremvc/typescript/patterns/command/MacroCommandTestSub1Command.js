var MacroCommandTestSub1Command = function () {
    extract("puremvc.SimpleCommand").call(this);
};
__extends(MacroCommandTestSub1Command, extract("puremvc.SimpleCommand"));
MacroCommandTestSub1Command.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result1 = 2 * vo.input;
};
