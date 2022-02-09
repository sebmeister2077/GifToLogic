
var btn = new AboutDialog();
btn.addCloseButton();
new BaseDialog("base dialog")

let menuGroup = new WidgetGroup();

menuGroup.setFillParent(true);
menuGroup.touchable = Touchable.childrenOnly;
menuGroup.visible(() => state.isMenu());
Core.scene.add(menuGroup);

let menuF = new MenuFragment();
menuF.build()