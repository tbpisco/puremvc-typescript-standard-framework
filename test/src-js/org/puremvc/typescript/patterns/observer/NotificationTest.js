var NotificationTest = new YUITest.TestCase({
    name: "PureMVC Notification class tests",
    setUp: function () {
    },
    tearDown: function () {
    },
    testNameAccessors: function () {
        var Notification = extract("puremvc.Notification");
        var note = new Notification('TestNote');
        YUITest.Assert.areEqual('TestNote', note.getName(), "Expecting note.getName() == 'TestNote'");
    },
    testBodyAccessors: function () {
        var Notification = extract("puremvc.Notification");
        var note = new Notification(null);
        note.setBody(5);
        YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
    },
    testConstructor: function () {
        var Notification = extract("puremvc.Notification");
        var note = new Notification('TestNote', 5, 'TestNoteType');
        YUITest.Assert.areEqual("TestNote", note.getName(), "Expecting note.getName() == 'TestNote'");
        YUITest.Assert.areSame(5, note.getBody(), "Expecting note.getBody() === 5");
        YUITest.Assert.areEqual("TestNoteType", note.getType(), "Expecting note.getType() == 'TestNoteType'");
    },
    testToString: function () {
        var Notification = extract("puremvc.Notification");
        var note = new Notification('TestNote', [
            1, 
            3, 
            5
        ], 'TestType');
        var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
        YUITest.Assert.areEqual(ts, note.toString(), "Expecting note.testToString() == '" + ts + "'");
    }
});
