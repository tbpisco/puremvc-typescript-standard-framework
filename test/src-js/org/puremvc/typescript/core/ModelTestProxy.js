var ModelTestProxy = function () {
    this.initialize();
};
__extends(ModelTestProxy, extract("puremvc.Proxy"));
ModelTestProxy.prototype.initialize = function () {
    extract("puremvc.Proxy").call(this, ModelTestProxy.NAME, '');
};
ModelTestProxy.prototype.onRegister = function () {
    this.setData(ModelTestProxy.ON_REGISTER_CALLED);
} , ModelTestProxy.prototype.onRemove = function () {
    this.setData(ModelTestProxy.ON_REMOVE_CALLED);
};
ModelTestProxy.NAME = 'ModelTestProxy';
ModelTestProxy.ON_REGISTER_CALLED = 'onRegister Called';
ModelTestProxy.ON_REMOVE_CALLED = 'onRemove Called';
