const container = document.querySelector("div.container");
const gridContainer = document.querySelector("div.grid-container");

const generateBtn = document.querySelector("button.generate-grid");
const resetGridBtn = document.querySelector("button.reset-grid");
const clearSurfaceBtn = document.querySelector("button.clear-surface");

const blackBtn = document.querySelector("button.black-color");
const randomBtn = document.querySelector("button.random-color");
const rgbBtn = document.querySelector("button.rgb-color");
const eraseBtn = document.querySelector("button.erase-color");

const currentGridSize = document.querySelector("h3.current-grid-size");
const chosenColor = document.querySelector("h3.chosen-color");
const colorBox = document.querySelector("div.color-box");


let existingGridBoxes = document.querySelectorAll("div.grid-box");

let currentColor = "black";

generateStartGrid();


// Generate grid 1x1 up to 100x100
generateBtn.addEventListener("mousedown", generateNewGrid);

// Reset back to original 16x16 start grid
resetGridBtn.addEventListener("mousedown", generateStartGrid);

// Reset background color of grid to white
clearSurfaceBtn.addEventListener("mousedown", clearSurface);

// Update background color of grid box
blackBtn.addEventListener("mousedown", setCurrentColor);
randomBtn.addEventListener("mousedown", setCurrentColor);
rgbBtn.addEventListener("mousedown", setCurrentColor);
eraseBtn.addEventListener("mousedown", setCurrentColor);

// Draw color on mouse move
gridContainer.addEventListener("mouseover", changeColor);


// Functions
function setCurrentColor(e) {
	if (this.textContent.includes("Black")) {
		currentColor = "black";
	} else if (this.textContent.includes("Random")) {
		currentColor = getRandomColor();
	} else if (this.textContent.includes("RGB")) {
		currentColor = "rgb";
	} else if (this.textContent.includes("Erase")) {
		currentColor = "white";
	}
	updateDisplayColor();
}

function changeColor(e) {
	if (e.target.className === "grid-box") {

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
		gridBox.style.height = `${600 / columns}px`
		gridContainer.appendChild(gridBox);
	}

	currentGridSize.textContent = `Grid Size: ${rows} X ${columns}`;
	updateDisplayColor();
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

function updateDisplayColor() {

	if (currentColor === "rgb") {
		colorBox.style.background = "linear-gradient(to right,red 33%, green 33% 66%, blue 66%)";
	} else if (currentColor == "white") {
		colorBox.style.background = "Erase";
	}
	
	chosenColor.textContent = `Current Color: ${currentColor}`;

	colorBox.style.background = currentColor;

}

function getRandomColor() {
	let colors = [
		"gray", "maroon", "red", "purple", "fuchsia", "green", 
		"lime", "olive", "yellow", "navy", "blue", "teal", "aqua"
	];

	return colors[(Math.floor(Math.random() * colors.length))];
}

function clearSurface() {
	existingGridBoxes = document.querySelectorAll("div.grid-box");
	existingGridBoxes.forEach(box => {
		if (box.style.background !== "white") box.style.background = "white";
	})
}