var SimpleCommandTestSub = function () {
    extract("puremvc.SimpleCommand").call(this);
};
__extends(SimpleCommandTestSub, extract("puremvc.SimpleCommand"));
SimpleCommandTestSub.prototype.hasFacade = function () {
    var Facade = extract("puremvc.Facade");
    return this.facade instanceof Facade;
};
