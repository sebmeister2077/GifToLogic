// Log.info("hi from terminal");

// // todo view https://vscode.dev/github/Anuken/Arc/blob/master/arc-core/src/arc/scene/ui/Dialog.java
// const myDialog = new BaseDialog("Dialog Title");
// // Add "go back" button
// myDialog.addCloseButton();
// // Add text to the main content
// myDialog.cont.add("Goodbye.");
// // Show dialog
// myDialog.show();

// listen for the event where a unit is destroyed
Events.on(PlayerConnect, (event) => {
	// display toast on top of screen when the unit was a player
	try {
		Vars.ui.hudfrag.showToast(Object.keys(this).join(", "));
	} catch {}
	try {
		Vars.ui.hudfrag.showToast(Object.keys(globalThis).join(", "));
	} catch {}
});
