var ViewTestMediator = function (view) {
    extract("puremvc.Mediator").call(this, ViewTestMediator.NAME, view);
};
__extends(ViewTestMediator, extract("puremvc.Mediator"));
ViewTestMediator.prototype.listNotificationInterests = function () {
    return [
        'ABC', 
        'DEF', 
        'GHI'
    ];
};
ViewTestMediator.NAME = "ViewTestMediator";
