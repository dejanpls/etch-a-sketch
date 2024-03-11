const container = document.querySelector("div.container");
const gridContainer = document.querySelector("div.grid-container");

const generateBtn = document.querySelector("button.generate-grid");
const resetBtn = document.querySelector("button.reset-grid");
const colorBtn = document.querySelector("button.reset-color");

const blackBtn = document.querySelector("button.black-color");
const rgbBtn = document.querySelector("button.rgb-color");

let existingGridBoxes = document.querySelectorAll("div.grid-box");

let currentColor = "black";

generateStartGrid();

// Functions
function generateStartGrid() {
	const rows = 16;
	const columns = rows;
	let numberOfBoxes = rows * columns;

	// If existing grid, remove it.
	existingGridBoxes = document.querySelectorAll("div.grid-box");
	if (existingGridBoxes.length > 0) {
		existingGridBoxes.forEach(box => gridContainer.removeChild(box));
	}

	generateGrid(rows, columns, numberOfBoxes);
}

function generateGrid(rows, columns, numberOfBoxes) {
	for (; numberOfBoxes > 0; numberOfBoxes--) {
		const gridBox = document.createElement("div");
		gridBox.classList = "grid-box";
		gridBox.style.width = `${600/ rows}px`
		gridBox.style.height = `${600 / columns}px`
		gridContainer.appendChild(gridBox);
	}
}