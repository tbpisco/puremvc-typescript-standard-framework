var NotifierTestCommand = function () {
    extract("puremvc.SimpleCommand").call(this);
};
__extends(NotifierTestCommand, extract("puremvc.SimpleCommand"));
NotifierTestCommand.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result = 2 * vo.input;
};
