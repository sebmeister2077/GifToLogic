const ui = require("ui_lib/library");
const coreLogic = require("giftologic/core");

var ptl = null;

const buttonNames = "Gif to Logic";
ui.addMenuButton(buttonNames, "paste", () => {
	ptl.show();
});

ui.onLoad(() => {
	ui.addMenuButton(buttonNames, Icon.paste, () => {});
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button(buttonNames, Icon.paste, () => {
		ptl.show();
	});

	ptl = new BaseDialog(buttonNames);

	ptl.cont.add("[coral]1.[] Select a GIF(2MB).");
	ptl.cont.row();
	ptl.cont.add("[coral]2.[] Click [stat]Export[] to create a schematic.");
	ptl.cont.row();

	ptl.cont
		.button("Select Gif", () => {
			Vars.platform.showFileChooser(false, "gif", (file) => {
				try {
					print(file);
					const bytes = file.readBytes();
					print(bytes.length);
					print(bytes[0]);
					print(bytes[1]);
					// core.image = new Pixmap(bytes);
				} catch (e) {
					ui.showError("Failed to load source gif", e);
				}
			});
		})
		.size(240, 50);

	ptl.cont.row();
	ptl.cont.label(() => "This is label...").center();

	ptl.addCloseButton();
});
