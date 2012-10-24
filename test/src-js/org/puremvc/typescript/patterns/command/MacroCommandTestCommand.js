var MacroCommandTestCommand = function () {
    extract("puremvc.MacroCommand").call(this);
};
__extends(MacroCommandTestCommand, extract("puremvc.MacroCommand"));
MacroCommandTestCommand.prototype.initializeMacroCommand = function () {
    this.addSubCommand(MacroCommandTestSub1Command);
    this.addSubCommand(MacroCommandTestSub2Command);
};
