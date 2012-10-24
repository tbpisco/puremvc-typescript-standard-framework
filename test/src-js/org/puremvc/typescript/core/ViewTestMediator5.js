var ViewTestMediator5 = function (view) {
    extract("puremvc.Mediator").call(this, ViewTestMediator5.NAME, view);
};
__extends(ViewTestMediator5, extract("puremvc.Mediator"));
ViewTestMediator5.prototype.getViewTest = function () {
    return this.viewComponent;
};
ViewTestMediator5.prototype.listNotificationInterests = function () {
    return [
        ViewTest.NOTE5
    ];
};
ViewTestMediator5.prototype.handleNotification = function (notification) {
    this.getViewTest().counter++;
};
ViewTestMediator5.NAME = 'ViewTestMediator5';
