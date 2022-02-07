const ui = {
	// Functions to be called when atlas is ready
	loadEvents: [],
	// Functions to be called when the mouse is clicked
	clickEvents: [],
	areas: {},
	// Custom drawing functions
	effects: [],
	// Dialog used to show any runtime errors
	errors: null,
	// Dialog used to select items from a list
	selection: null,
	// if the loadEvents have started processing
	loaded: false
};

ui.onLoad = func => {
	if (ui.loaded) {
		func();
	} else {
		ui.loadEvents.push(func);
	}
};

ui.load = () => {
	var table;
	for (var i in ui.areas) {
		table = new Table();
		table.fillParent = true;
		table.visibility = () => !Vars.ui.minimapfrag.shown();
		ui.areas[i].table = table;
		ui.areas[i].init(table);
	}

	ui.loaded = true;
	for (var e of ui.loadEvents) e();
	ui.loadEvents = [];

	var area;
	for (var i in ui.areas) {
		area = ui.areas[i];
		// Sort the cells by name
		area.table.cells.sortComparing(cell => {
			const name = cell.get().name;
			return name[0] == '$' ? Core.bundle.get(name.substr(1)) : name;
		});

		area.post(area.table);
		// Add the UI elements to the HUD by default
		if (area.group !== null) {
			(area.group || Vars.ui.hudGroup).addChild(area.table);
		}
	}
};

ui.addArea = (name, area) => {
	ui.areas[name] = area;
};

ui.addArea("menu", {
    init(bottom) {
        bottom.bottom().left();
    },
    post() { }
})

ui.addArea("menu", {
	init(table) {
		this.dialog = new BaseDialog("$ui.more");
		this.dialog.addCloseButton();

		const pane = new ScrollPane(table);
		table.defaults().pad(6);
		this.dialog.cont.add(pane).grow();

		if (Vars.mobile) {
			var parent = new WidgetGroup();
			parent.fillParent = true;
			parent.touchable = Touchable.childrenOnly;
			Vars.ui.menuGroup.addChild(parent);
			this.mobileButton(parent);
		} else {
			this.desktopButton(Vars.ui.menuGroup.children.get(0));
		}
	},

	post() {},

	buildDesktop(parent) {
		// Basically clearMenut
		const style = new TextButton.TextButtonStyle(Styles.cleart);
		style.up = Tex.clear;
		style.down = Styles.flatDown;

		// menufrag.container's first table
		const buttons = parent.children.get(1).cells.get(1).get();
		/* Specialized version of menufrag.buttons(buttons, new Buttoni(...)) */
		buttons.button("$ui.more", Icon.add, style, () => {
			this.dialog.show();
		}).marginLeft(11);
	},

	desktopButton(parent) {
		if (Core.assets.progress != 1) {
			Core.app.post(() => {
				this.desktopButton(parent);
			});
			return;
		}

		// ClientLauncher has a 6-long post snek, one-up it.
		Time.run(7, () => {
			this.buildDesktop(parent);
			Events.on(ResizeEvent, () => {
				this.buildDesktop(parent);
			});
		});
	},

	mobileButton(parent) {
		const style = new TextButton.TextButtonStyle(
			Tex.buttonEdge4,
			Tex.buttonEdgeOver4,
			Tex.buttonEdge4,
			Fonts.def);

		parent.fill(cons(button => {
			button.button("$ui.more", () => this.dialog.show())
				.top().left().grow().size(84, 45).get().setStyle(style);
		}));
	},

	group: null,

	dialog: null
});