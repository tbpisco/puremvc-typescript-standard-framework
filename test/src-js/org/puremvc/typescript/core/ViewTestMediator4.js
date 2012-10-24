var ViewTestMediator4 = function (view) {
    extract("puremvc.Mediator").call(this, ViewTestMediator4.NAME, view);
};
__extends(ViewTestMediator4, extract("puremvc.Mediator"));
ViewTestMediator4.prototype.getViewTest = function () {
    return this.viewComponent;
};
ViewTestMediator4.prototype.onRegister = function () {
    this.getViewTest().onRegisterCalled = true;
};
ViewTestMediator4.prototype.onRemove = function () {
    this.getViewTest().onRemoveCalled = true;
};
ViewTestMediator4.NAME = 'ViewTestMediator4';
