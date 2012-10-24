var ObserverTest = new YUITest.TestCase({
    name: "PureMVC Observer class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    observerTestVar: null,
    testObserverAccessors: function () {
        var Observer = extract("puremvc.Observer");
        var Notification = extract("puremvc.Notification");
        var observer = new Observer(null, null);
        observer.setNotifyContext(this);
        observer.setNotifyMethod(this.observerTestMethod);
        var note = new Notification('ObserverTestNote', 10);
        observer.notifyObserver(note);
        YUITest.Assert.areSame(10, this.observerTestVar, "Expecting observerTestVar === 10");
    },
    testObserverConstructor: function () {
        var Observer = extract("puremvc.Observer");
        var Notification = extract("puremvc.Notification");
        var observer = new Observer(this.observerTestMethod, this);
        var note = new Notification('ObserverTestNote', 5);
        observer.notifyObserver(note);
        YUITest.Assert.areSame(5, this.observerTestVar, "Expecting observerTestVar === 5");
    },
    testCompareNotifyContext: function () {
        var Observer = extract("puremvc.Observer");
        var observer = new Observer(this.observerTestMethod, this);
        var negTestObj = new Object();
        YUITest.Assert.isFalse(observer.compareNotifyContext(negTestObj), "Expecting observer.compareNotifyContext(negTestObj) === false");
        YUITest.Assert.isTrue(observer.compareNotifyContext(this), "Expecting observer.compareNotifyContext(this) === true");
    },
    observerTestMethod: function (note) {
        this.observerTestVar = note.getBody();
    }
});
