const sharp = require("sharp")
const core = {
	//this is the base display
	display: Blocks.logicDisplay,
	size: Blocks.logicDisplay.displaySize,

	gifbytes: null,

	isWorking: false,
	workingStateLabel: "",

	exportGif: (gifBytes) => {
		sharp(gifBytes).resize(300, 300).
			print(typeof fs.readFileSync);
		print("Finish");
	},
}

module.exports = core;
