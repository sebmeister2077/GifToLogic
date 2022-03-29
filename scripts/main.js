Log.info("hi from terminal");

const dialog = new BaseDialog("some title", Styles.defaultDialog);
dialog.cont.add("some text idk").width(500).wrap().pad(4).get().setAlignment(Align.center, Align.center);
dialog.buttons.defaults().size(200, 54).pad(2);
dialog.setFillParent(false);
dialog.buttons.button("@ok", () => {
	dialog.hide();
	confirmed.run();
});
dialog.show();
