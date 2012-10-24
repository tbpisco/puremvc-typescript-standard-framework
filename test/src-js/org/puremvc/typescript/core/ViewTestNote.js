var ViewTestNote = function (name, body) {
    extract("puremvc.Notification").call(this, ViewTestNote.NAME, body);
};
__extends(ViewTestNote, extract("puremvc.Notification"));
ViewTestNote.NAME = "ViewTestNote";
ViewTestNote.create = function (body) {
    return new ViewTestNote(ViewTestNote.NAME, body);
};
