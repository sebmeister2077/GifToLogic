Log.info("hi from terminal");

const dialogStyle = new DialogStyle();
dialogStyle.titleFont = Fonts.def;
dialogStyle.background = windowEmpty;
dialogStyle.titleFontColor = Pal.accent;
dialogStyle.stageBackground = black9;

const dialog = new BaseDialog("some title", dialogStyle);
dialog.cont.add("some text idk").width(500).wrap().pad(4).get().setAlignment(Align.center, Align.center);
dialog.buttons.defaults().size(200, 54).pad(2);
dialog.setFillParent(false);
dialog.buttons.button("@ok", () => {
	dialog.hide();
	confirmed.run();
});
dialog.show();
