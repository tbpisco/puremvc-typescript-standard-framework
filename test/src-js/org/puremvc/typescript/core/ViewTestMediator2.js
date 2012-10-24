var ViewTestMediator2 = function (view) {
    extract("puremvc.Mediator").call(this, ViewTestMediator2.NAME, view);
};
__extends(ViewTestMediator2, extract("puremvc.Mediator"));
ViewTestMediator2.prototype.getViewTest = function () {
    return this.viewComponent;
};
ViewTestMediator2.prototype.listNotificationInterests = function () {
    return [
        ViewTest.NOTE1, 
        ViewTest.NOTE2
    ];
};
ViewTestMediator2.prototype.handleNotification = function (note) {
    this.getViewTest().lastNotification = note.getName();
};
ViewTestMediator2.NAME = 'ViewTestMediator2';
