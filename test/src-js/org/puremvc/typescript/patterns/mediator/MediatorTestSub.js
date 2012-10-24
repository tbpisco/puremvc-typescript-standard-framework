var MediatorTestSub = function () {
    extract("puremvc.Mediator").call(this);
};
__extends(MediatorTestSub, extract("puremvc.Mediator"));
MediatorTestSub.prototype.hasFacade = function () {
    var Facade = extract("puremvc.Facade");
    return this.facade instanceof Facade;
};
