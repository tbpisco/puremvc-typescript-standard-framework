var ViewTestMediator6 = function (mediatorName, view) {
    extract("puremvc.Mediator").call(this, mediatorName, view);
};
__extends(ViewTestMediator6, extract("puremvc.Mediator"));
ViewTestMediator6.prototype.getViewTest = function () {
    return this.viewComponent;
};
ViewTestMediator6.prototype.listNotificationInterests = function () {
    return [
        ViewTest.NOTE6
    ];
};
ViewTestMediator6.prototype.handleNotification = function (notification) {
    this.facade.removeMediator(this.getMediatorName());
};
ViewTestMediator6.prototype.onRemove = function () {
    this.getViewTest().counter++;
};
ViewTestMediator6.NAME = 'ViewTestMediator6';
