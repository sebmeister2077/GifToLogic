ui.addArea = (name, area) => {
	ui.areas[name] = area;
};

ui.addArea("menu", {
    init(bottom) {
        bottom.bottom().left();
    },
    post() { }
})