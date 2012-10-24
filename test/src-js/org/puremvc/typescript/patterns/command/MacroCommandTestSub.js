var MacroCommandTestSub = function () {
    extract("puremvc.MacroCommand").call(this);
};
__extends(MacroCommandTestSub, extract("puremvc.MacroCommand"));
MacroCommandTestSub.prototype.hasFacade = function () {
    var Facade = extract("puremvc.Facade");
    return this.facade instanceof Facade;
};
