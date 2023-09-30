const ui = require("ui_lib/library");
const core = require("giftologic/core");

ui.onLoad(() => {
	const buttonNames = "Gif to Logic";
	let dialog = null;
	ui.addMenuButton(buttonNames, Icon.paste, () => {
		dialog;
	});
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button(buttonNames, Icon.paste, () => {
		dialog.show();
	});

	dialog = new BaseDialog(buttonNames);

	dialog.cont.add("[coral]1.[] Select a GIF(2MB).");
	dialog.cont.row();
	dialog.cont.add("[coral]2.[] Click [stat]Export[] to create a schematic.");
	dialog.cont.row();

	dialog.cont
		.button("Select Gif", () => {
			Vars.platform.showFileChooser(false, "gif", (file) => {
				try {
					const bytes = file.readBytes();
					core.gifbytes = bytes;
					// coreLogic.image = new Pixmap(bytes);
				} catch (e) {
					ui.showError("Failed to load source gif", e);
				}
			});
		})
		.size(240, 50);

	dialog.cont.row();
	dialog.cont.label(() => core.workingStateLabel).center();
	dialog.buttons
		.button("Export", Icons.export, () => {
			new java.lang.Thread(() => {
				try {
					core.exportGif(core.gifbytes);
					dialog.hide();
				} catch (e) {
					Core.app.post(() => {
						ui.showError("Failed to export schematic", e);
						core.isWorking = false;
					});
				}
			}, "GifToLogic worker").start();
		})
		.disabled(() => !core.gifbytes || !core.isWorking);

	dialog.addCloseButton();
});
