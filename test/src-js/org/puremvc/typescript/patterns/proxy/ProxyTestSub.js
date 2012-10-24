var ProxyTestSub = function () {
    extract("puremvc.Proxy").call(this);
};
__extends(ProxyTestSub, extract("puremvc.Proxy"));
ProxyTestSub.prototype.hasFacade = function () {
    var Facade = extract("puremvc.Facade");
    return this.facade instanceof Facade;
};
