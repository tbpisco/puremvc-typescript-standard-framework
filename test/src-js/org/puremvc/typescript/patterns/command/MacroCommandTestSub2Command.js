var MacroCommandTestSub2Command = function () {
    extract("puremvc.SimpleCommand").call(this);
};
__extends(MacroCommandTestSub2Command, extract("puremvc.SimpleCommand"));
MacroCommandTestSub2Command.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result2 = vo.input * vo.input;
};
