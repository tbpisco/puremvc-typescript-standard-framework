var SimpleCommandTestCommand = function () {
    extract("puremvc.SimpleCommand").call(this);
};
__extends(SimpleCommandTestCommand, extract("puremvc.SimpleCommand"));
SimpleCommandTestCommand.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result = 2 * vo.input;
};
