const container = document.querySelector("div.container");
const gridContainer = document.querySelector("div.grid-container");

const generateBtn = document.querySelector("button.generate-grid");
const resetBtn = document.querySelector("button.reset-grid");
const colorBtn = document.querySelector("button.reset-color");

const blackBtn = document.querySelector("button.black-color");
const rgbBtn = document.querySelector("button.rgb-color");

let existingGridBoxes = document.querySelectorAll("div.grid-box");

let currentColor = "black";