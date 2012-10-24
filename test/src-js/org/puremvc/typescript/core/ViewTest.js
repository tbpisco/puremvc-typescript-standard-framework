var ViewTest = new YUITest.TestCase({
    name: "PureMVC View class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    lastNotification: null,
    counter: 0,
    onRegisterCalled: false,
    onRemoveCalled: false,
    viewTestVar: null,
    testGetInstance: function () {
        var View = extract("puremvc.View");
        var view = View.getInstance();
        YUITest.Assert.isNotNull(view, "Expecting instance !== null");
        YUITest.Assert.isInstanceOf(View, view, "Expecting instance implements View");
    },
    testRegisterAndNotifyObserver: function () {
        var View = extract("puremvc.View");
        var Observer = extract("puremvc.Observer");
        var view = View.getInstance();
        var observer = new Observer(this.viewTestMethod, this);
        view.registerObserver(ViewTestNote.NAME, observer);
        var note = ViewTestNote.create(10);
        view.notifyObservers(note);
        YUITest.Assert.areEqual(10, this.viewTestVar, "Expecting viewTestVar = 10");
    },
    viewTestMethod: function (note) {
        this.viewTestVar = note.getBody();
    },
    testRegisterAndRetrieveMediator: function () {
        var View = extract("puremvc.View");
        var view = View.getInstance();
        var viewTestMediator = new ViewTestMediator(this);
        view.registerMediator(viewTestMediator);
        var mediator = view.retrieveMediator(ViewTestMediator.NAME);
        YUITest.Assert.isInstanceOf(ViewTestMediator, mediator, "Expecting comp is ViewTestMediator");
        this.cleanup();
    },
    testHasMediator: function () {
        var View = extract("puremvc.View");
        var Mediator = extract("puremvc.Mediator");
        var view = View.getInstance();
        var mediator = new Mediator('hasMediatorTest', this);
        view.registerMediator(mediator);
        YUITest.Assert.isTrue(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === true");
        view.removeMediator('hasMediatorTest');
        YUITest.Assert.isFalse(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === false");
    },
    testRegisterAndRemoveMediator: function () {
        var View = extract("puremvc.View");
        var Mediator = extract("puremvc.Mediator");
        var view = View.getInstance();
        var mediator = new Mediator('testing', this);
        view.registerMediator(mediator);
        var removedMediator = view.removeMediator('testing');
        YUITest.Assert.areEqual('testing', removedMediator.getMediatorName(), "Expecting removedMediator.getMediatorName() == 'testing'");
        var t = view.retrieveMediator('testing');
        YUITest.Assert.isNull(view.retrieveMediator('testing'), "Expecting view.retrieveMediator( 'testing' ) === null )");
        this.cleanup();
    },
    testOnRegisterAndOnRemove: function () {
        var View = extract("puremvc.View");
        var view = View.getInstance();
        var mediator = new ViewTestMediator4(this);
        view.registerMediator(mediator);
        YUITest.Assert.isTrue(this.onRegisterCalled, "Expecting onRegisterCalled === true");
        view.removeMediator(ViewTestMediator4.NAME);
        YUITest.Assert.isTrue(this.onRemoveCalled, "Expecting onRemoveCalled === true");
        this.cleanup();
    },
    testSuccessiveRegisterAndRemoveMediator: function () {
        var View = extract("puremvc.View");
        var view = View.getInstance();
        view.registerMediator(new ViewTestMediator(this));
        YUITest.Assert.isInstanceOf(ViewTestMediator, view.retrieveMediator(ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) isInstanceOf ViewTestMediator");
        view.removeMediator(ViewTestMediator.NAME);
        YUITest.Assert.isNull(view.retrieveMediator(ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
        YUITest.Assert.isNull(view.removeMediator(ViewTestMediator.NAME), "Expecting view.removeMediator( ViewTestMediator.NAME ) === null");
        view.registerMediator(new ViewTestMediator(this));
        YUITest.Assert.isInstanceOf(ViewTestMediator, view.retrieveMediator(ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) is ViewTestMediator");
        view.removeMediator(ViewTestMediator.NAME);
        YUITest.Assert.isNull(view.retrieveMediator(ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
        this.cleanup();
    },
    testRemoveMediatorAndSubsequentNotify: function () {
        var View = extract("puremvc.View");
        var Notification = extract("puremvc.Notification");
        var view = View.getInstance();
        view.registerMediator(new ViewTestMediator2(this));
        view.notifyObservers(new Notification(ViewTest.NOTE1));
        YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
        view.notifyObservers(new Notification(ViewTest.NOTE2));
        YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
        view.removeMediator(ViewTestMediator2.NAME);
        YUITest.Assert.isNull(view.retrieveMediator(ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
        this.lastNotification = null;
        view.notifyObservers(new Notification(ViewTest.NOTE1));
        YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
        view.notifyObservers(new Notification(ViewTest.NOTE2));
        YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
        this.cleanup();
    },
    testRemoveOneOfTwoMediatorsAndSubsequentNotify: function () {
        var View = extract("puremvc.View");
        var Notification = extract("puremvc.Notification");
        var view = View.getInstance();
        view.registerMediator(new ViewTestMediator2(this));
        view.registerMediator(new ViewTestMediator3(this));
        view.notifyObservers(new Notification(ViewTest.NOTE1));
        YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
        view.notifyObservers(new Notification(ViewTest.NOTE2));
        YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
        view.notifyObservers(new Notification(ViewTest.NOTE3));
        YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
        view.removeMediator(ViewTestMediator2.NAME);
        YUITest.Assert.isNull(view.retrieveMediator(ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
        this.lastNotification = null;
        view.notifyObservers(new Notification(ViewTest.NOTE1));
        YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
        view.notifyObservers(new Notification(ViewTest.NOTE2));
        YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
        view.notifyObservers(new Notification(ViewTest.NOTE3));
        YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
        this.cleanup();
    },
    testMediatorReregistration: function () {
        var View = extract("puremvc.View");
        var Notification = extract("puremvc.Notification");
        var view = View.getInstance();
        view.registerMediator(new ViewTestMediator5(this));
        view.registerMediator(new ViewTestMediator5(this));
        this.counter = 0;
        view.notifyObservers(new Notification(ViewTest.NOTE5));
        YUITest.Assert.areEqual(1, this.counter, "Expecting counter == 1");
        view.removeMediator(ViewTestMediator5.NAME);
        YUITest.Assert.isNull(view.retrieveMediator(ViewTestMediator5.NAME), "Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null");
        this.counter = 0;
        view.notifyObservers(new Notification(ViewTest.NOTE5));
        YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
    },
    testModifyObserverListDuringNotification: function () {
        var View = extract("puremvc.View");
        var Notification = extract("puremvc.Notification");
        var view = View.getInstance();
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/1", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/2", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/3", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/4", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/5", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/6", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/7", this));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/8", this));
        this.counter = 0;
        view.notifyObservers(new Notification(ViewTest.NOTE6));
        YUITest.Assert.areEqual(8, this.counter, "Expecting counter == 8");
        this.counter = 0;
        view.notifyObservers(new Notification(ViewTest.NOTE6));
        YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
    },
    cleanup: function () {
        var View = extract("puremvc.View");
        View.getInstance().removeMediator(ViewTestMediator.NAME);
        View.getInstance().removeMediator(ViewTestMediator2.NAME);
        View.getInstance().removeMediator(ViewTestMediator3.NAME);
    }
});
ViewTest.NOTE1 = "Notification1";
ViewTest.NOTE2 = "Notification2";
ViewTest.NOTE3 = "Notification3";
ViewTest.NOTE4 = "Notification4";
ViewTest.NOTE5 = "Notification5";
ViewTest.NOTE6 = "Notification6";
