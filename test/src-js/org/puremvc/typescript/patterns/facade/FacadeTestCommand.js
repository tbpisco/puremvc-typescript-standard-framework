var FacadeTestCommand = function () {
    extract("puremvc.SimpleCommand").call(this);
};
__extends(FacadeTestCommand, extract("puremvc.SimpleCommand"));
FacadeTestCommand.prototype.execute = function (note) {
    var vo = note.getBody();
    vo.result = 2 * vo.input;
};
