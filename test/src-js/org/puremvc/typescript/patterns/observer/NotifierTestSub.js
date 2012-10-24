var NotifierTestSub = function () {
    extract("puremvc.Notifier").call(this);
};
__extends(NotifierTestSub, extract("puremvc.Notifier"));
NotifierTestSub.prototype.hasFacade = function () {
    var Facade = extract("puremvc.Facade");
    return this.facade instanceof Facade;
};
