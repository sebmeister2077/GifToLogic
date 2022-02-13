const about = Vars.ui.about;

ui.addMenuButton = (name, icon, clicked, user) => {
	ui.addTable("menu", name, t => {
		t.button(name, ui.getIcon(icon), clicked).height(48).size(210, 84);
		if (user) user(t);
	});
};
ui.addMenuButton("PicToLogic", "paste", () => {
	ptl.show();
});