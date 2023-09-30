const ui = require("ui_lib/library");
const coreLogic = require("giftologic/core");

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
					coreLogic.gifbytes = bytes;
					// coreLogic.image = new Pixmap(bytes);
				} catch (e) {
					ui.showError("Failed to load source gif", e);
				}
			});
		})
		.size(240, 50);

	dialog.cont.row();
	dialog.cont.label(() => coreLogic.workingStateLabel).center();
	dialog.buttons
		.button("Export", Icon.export, () => {
			new java.lang.Thread(() => {
				try {
					coreLogic.exportGif(coreLogic.gifbytes);
					dialog.hide();
				} catch (e) {
					Core.app.post(() => {
						ui.showError("Failed to export schematic", e);
						coreLogic.isWorking = false;
					});
				}
			}, "GifToLogic worker").start();
		})
		.disabled(() => !coreLogic.gifbytes || !coreLogic.isWorking);

	dialog.addCloseButton();
});
