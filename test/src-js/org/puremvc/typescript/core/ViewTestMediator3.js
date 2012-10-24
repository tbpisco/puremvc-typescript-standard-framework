var ViewTestMediator3 = function (view) {
    extract("puremvc.Mediator").call(this, ViewTestMediator3.NAME, view);
};
__extends(ViewTestMediator3, extract("puremvc.Mediator"));
ViewTestMediator3.prototype.getViewTest = function () {
    return this.viewComponent;
};
ViewTestMediator3.prototype.listNotificationInterests = function () {
    return [
        ViewTest.NOTE3
    ];
};
ViewTestMediator3.prototype.handleNotification = function (note) {
    this.getViewTest().lastNotification = note.getName();
};
ViewTestMediator3.NAME = 'ViewTestMediator3';
