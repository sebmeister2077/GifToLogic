const fs = require("fs");
const gif = require("gif");

const core = {
	//this is the base display
	display: Blocks.logicDisplay,
	size: Blocks.logicDisplay.displaySize,

	gifbytes: null,

	isWorking: false,
	workingStateLabel: "",
};

core.exportGif = (gifBytes) => {
	print(typeof fs.readFileSync);
	print("Finish");
};

module.exports = core;
