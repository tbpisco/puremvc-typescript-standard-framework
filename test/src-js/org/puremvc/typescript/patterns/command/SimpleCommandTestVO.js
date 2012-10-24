var SimpleCommandTestVO = function (input) {
    extract("puremvc.SimpleCommand").call(this);
    this.input = input;
};
__extends(SimpleCommandTestVO, extract("puremvc.SimpleCommand"));
SimpleCommandTestVO.prototype.input = null;
SimpleCommandTestVO.prototype.result = null;
