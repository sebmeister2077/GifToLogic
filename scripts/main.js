const ui = Vars.ui;

let menuGroupaux = new WidgetGroup();
menuGroupaux.setFillParent(true);
menuGroupaux.touchable = Touchable.childrenOnly;
menuGroupaux.visible= true;

Core.scene.add(menuGroupaux)
ui.menuFrag.build(menuGroupaux);

