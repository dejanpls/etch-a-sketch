const container = document.querySelector("div.container");
const gridContainer = document.querySelector("div.grid-container");

const generateBtn = document.querySelector("button.generate-grid");
const resetGridBtn = document.querySelector("button.reset-grid");
const clearSurfaceBtn = document.querySelector("button.clear-surface");

const colorPalette = document.querySelector("input[type='color']");
const blackBtn = document.querySelector("button.black-color");
const randomBtn = document.querySelector("button.random-color");
const rgbBtn = document.querySelector("button.rgb-color");
const eraseBtn = document.querySelector("button.erase-color");

const currentGridSize = document.querySelector("h3.current-grid-size");
const colorBox = document.querySelector("div.color-box");

let existingGridBoxes = document.querySelectorAll("div.grid-box");

let currentColor = colorPalette.value;

generateStartGrid();

// Generate grid 1x1 up to 100x100
generateBtn.addEventListener("mousedown", generateNewGrid);

// Reset back to original 16x16 start grid
resetGridBtn.addEventListener("mousedown", generateStartGrid);

// Reset background color of grid to white
clearSurfaceBtn.addEventListener("mousedown", clearSurface);

// Update background color of grid box
colorPalette.addEventListener("change", setCurrentColor);
blackBtn.addEventListener("mousedown", setCurrentColor);
randomBtn.addEventListener("mousedown", setCurrentColor);
rgbBtn.addEventListener("mousedown", setCurrentColor);
eraseBtn.addEventListener("mousedown", setCurrentColor);

// Draw color on mouse move
gridContainer.addEventListener("mouseover", changeColor);
gridContainer.addEventListener("mousedown", darkenColor);

// Functions
function darkenColor(e) {
	if (e.target.className === "grid-box") {

		let filter = e.target.style.filter;
		let percentage = filter.replace(/[^0-9]/g, '');
		
		if (percentage > 0) {
			e.target.style.filter = `brightness(${percentage - 10}%)`;
		}
	}
}

function setCurrentColor(e) {
	if (this.textContent.includes("Black")) {
		currentColor = "#000000";
	} else if (this.textContent.includes("Random")) {
		currentColor = getRandomColor();
	} else if (this.textContent.includes("RGB")) {
		currentColor = "rgb";
	} else if (this.textContent.includes("Erase")) {
		currentColor = "#ffffff";
	} else {
		currentColor = colorPalette.value;
	}
	updateColorBox();
}

function changeColor(e) {
	if (e.target.className === "grid-box") {
		
		e.target.style.filter = "brightness(100%)";

		if (currentColor === "rgb") {
			e.target.style.background = getRandomColor();
		}
		e.target.style.background = currentColor;
	}
}

function generateGrid(rows, columns, numberOfBoxes) {

	for (; numberOfBoxes > 0; numberOfBoxes--) {
		const gridBox = document.createElement("div");
		gridBox.classList = "grid-box";
		gridBox.style.width = `${600 / rows}px`
		gridBox.style.height = `${600 / rows}px`
		gridContainer.appendChild(gridBox);
	}

	currentGridSize.textContent = `Grid Size: ${rows} X ${columns}`;
	updateColorBox();
}

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

function generateNewGrid() {
	const rows = generateRows();
	const columns = rows;
	let numberOfBoxes = rows * columns;

	// If existing grid, remove it.
	existingGridBoxes = document.querySelectorAll("div.grid-box");
	if (existingGridBoxes.length > 0) {
		existingGridBoxes.forEach(box => gridContainer.removeChild(box));
	}

	generateGrid(rows, columns, numberOfBoxes);
}

function generateRows() {
	let rows;

	do {
		rows = parseInt(prompt("Enter a number between 1 and 100: "));
	} while (Number.isNaN(rows) || rows > 100 || rows < 1)

	return rows
}

function updateColorBox() {
	if (currentColor === "rgb") {
		// red, green and blue background
		colorBox.style.background = "linear-gradient(to right,red 33%, green 33% 66%, blue 66%)";
	}
	colorBox.style.background = currentColor;
}

function getRandomColor() {
	let numsLetters = ["a", "b", "c", "d", "e", "f", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  	let hex = "";

	for (let i = 0; i < 6; i++) {
    	hex += numsLetters[Math.floor(Math.random() * numsLetters.length)];
	}

  	return `#${hex}`;
}

function clearSurface() {
	existingGridBoxes = document.querySelectorAll("div.grid-box");
	if (confirm("Are you sure?")) {
		existingGridBoxes.forEach(box => {
			if (box.style.background !== "white") box.style.background = "white";
		})
	}
}