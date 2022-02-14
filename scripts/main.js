
Log.info("hi from terminal")

const dialog = new BaseDialog(title);
        dialog.cont.add(text).width(500).wrap().pad(4).get().setAlignment(Align.center, Align.center);
        dialog.buttons.defaults().size(200, 54).pad(2);
        dialog.setFillParent(false);
        dialog.buttons.button("@ok", () => {
            dialog.hide();
            confirmed.run();
        });
        dialog.show();