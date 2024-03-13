const container = document.querySelector("div.container");
const gridContainer = document.querySelector("div.grid-container");

const generateBtn = document.querySelector("button.generate-grid");
const resetBtn = document.querySelector("button.reset-grid");
const colorBtn = document.querySelector("button.reset-color");

const blackBtn = document.querySelector("button.black-color");
const randomBtn = document.querySelector("button.random-color");

const currentGridSize = document.querySelector("h3.current-grid-size");

let existingGridBoxes = document.querySelectorAll("div.grid-box");

let currentColor = "black";

generateStartGrid();


// Event listeners
generateBtn.addEventListener("mousedown", generateNewGrid);
resetBtn.addEventListener("mousedown", generateStartGrid);
colorBtn.addEventListener("mousedown", resetColor);
blackBtn.addEventListener("mousedown", setCurrentColor);
randomBtn.addEventListener("mousedown", setCurrentColor);

gridContainer.addEventListener("mouseover", changeColor);


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
		gridBox.style.width = `${600 / rows}px`
		gridBox.style.height = `${600 / columns}px`
		gridContainer.appendChild(gridBox);
	}

	currentColor = "black";
	currentGridSize.textContent = `Grid Size: ${rows} X ${columns}`;
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

function setCurrentColor(e) {
	if (this.textContent.includes("Black")) {
		currentColor = "black";
	} else if (this.textContent.includes("Random")) {
		currentColor = getRandomColor();
	}
}

function changeColor(e) {
	if (e.target.className === "grid-box") {
		e.target.style.background = currentColor;
	}
}

function getRandomColor() {
	let colors = [
		"gray", "maroon", "red", "purple", "fuchsia", "green", 
		"lime", "olive", "yellow", "navy", "blue", "teal", "aqua"
	];

	return colors[(Math.floor(Math.random() * colors.length))];
}

function resetColor() {
	existingGridBoxes = document.querySelectorAll("div.grid-box");
	existingGridBoxes.forEach(box => {
		if (box.style.background !== "white") box.style.background = "white";
	})
	currentColor = "black";
}