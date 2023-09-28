const ui = require("ui_lib/library");
var ptl = null;
ui.addMenuButton("testbtn", "paste", () => {
	ptl.show();
});

ui.onLoad(() => {
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button("testbtn", Icon.paste, () => {
		ptl.show();
	});

	ptl = new BaseDialog("testbtn");

	print("hello");

	ptl.cont.add("[coral]1.[] Select a PNG image.");
	ptl.cont.row();
	ptl.cont.add("[coral]2.[] Click [stat]Export[] to create a schematic.");
	ptl.cont.row();
	ptl.cont.add("[coral]Please dont use this for furry/weeb shit thank you");
	ptl.cont.row();

	ptl.cont
		.button("Select Image", () => {
			Vars.platform.showFileChooser(false, "png", (file) => {
				try {
					const bytes = file.readBytes();
					core.image = new Pixmap(bytes);
				} catch (e) {
					ui.showError("Failed to load source image", e);
				}
			});
		})
		.size(240, 50);
	ptl.cont.row();

	ptl.cont.label(() => core.stage).center();

	ptl.addCloseButton();
});

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
// Events.on(ClientCreateEvent, (event) => {
// 	// display toast on top of screen when the unit was a player
// 	Vars.ui.hudfrag.showToast("client create");
// });
// //this make the app crash
// // Events.on(ContentInitEvent, (event) => {
// // 	// display toast on top of screen when the unit was a player
// // 	setTimeout(() => {
// // 		Vars.ui.hudfrag.showToast("content init");
// // 	}, 2000);
// // });

// Events.on(ClientLoadEvent, (event) => {
// 	// display toast on top of screen when the unit was a player
// 	Vars.ui.hudfrag.showToast("client load");
// });
