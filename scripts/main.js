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
Events.on(ClientCreateEvent, (event) => {
	// display toast on top of screen when the unit was a player
	Vars.ui.hudfrag.showToast("client create");
});
Events.on(ContentInitEvent, (event) => {
	// display toast on top of screen when the unit was a player
	setTimeout(() => {
		Vars.ui.hudfrag.showToast("content init");
	}, 2000);
});

Events.on(ClientLoadEvent, (event) => {
	// display toast on top of screen when the unit was a player
	Vars.ui.hudfrag.showToast("client load");
});
