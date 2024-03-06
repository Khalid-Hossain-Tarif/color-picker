/**
 * Date: 06-03-2024
 * Author: Khalid Hossain
 * Inspired by: Stack learner
 * Description: Color picker tool with vanilla js
 */

//globals
let toasterDiv = null;

//Onload handler
window.onload = () => {
  main();
};

//Main or boot functions, this function will take care of getting all the DOM references
function main() {
  const generateRandomColorBtn = document.getElementById(
    "generate-random-color"
  );
  const hexColorInput = document.getElementById("input-hex");

  generateRandomColorBtn.addEventListener(
    "click",
    handleGenerateRandomColorBtn
  );

  hexColorInput.addEventListener("keyup", handleHexColorInput);
}

//Event handlers
function handleGenerateRandomColorBtn() {
  const color = generateDecimalColor();
  updateColorCodeToDom(color);
}

function handleHexColorInput(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    }
  }
}

//Dom functions

/**
 * Generate toast message
 * @param {string} msg
 */
function generateToastMessage(msg) {
  toasterDiv = document.createElement("div");
  toasterDiv.innerText = msg;
  toasterDiv.className = "toaster toaster-slide-in";

  toasterDiv.addEventListener("click", function () {
    toasterDiv.classList.add("toaster-slide-out");
    toasterDiv.classList.remove("toaster-slide-in");

    //toaster remove after animationend event
    toasterDiv.addEventListener("animationend", function () {
      toasterDiv.remove();
      toasterDiv = null;
    });
  });

  document.body.appendChild(toasterDiv);

  // setTimeout(() => {
  //   toasterDiv.classList.add("toaster-slide-out");
  // }, 5000);

  // setTimeout(() => {
  //   toasterDiv.remove();
  //   toasterDiv = null;
  // }, 5300);
}

/**
 * update dom elements with calculated color values
 * @params {object} color
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById(
    "color-display"
  ).style.backgroundColor = `#${hexColor}`;
  document.getElementById("input-hex").value = hexColor;
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("color-slider-red").value = color.red;
  document.getElementById("color-slider-red-label").innerText = color.red;
  document.getElementById("color-slider-green").value = color.green;
  document.getElementById("color-slider-green-label").innerText = color.green;
  document.getElementById("color-slider-blue").value = color.green;
  document.getElementById("color-slider-blue-label").innerText = color.green;
}

//Utils functions

//Generate decimal color - return object of three colors
function generateDecimalColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

/**
 * Generate random hex color code: #000, #fff
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
  // const { red, green, blue } = generateDecimalColor();
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return getTwoCode(red) + getTwoCode(green) + getTwoCode(blue);
}

/**
 * Generate random rgb color: rgb(0, 0, 0), rgb(255, 0, 0)
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
  // const { red, green, blue } = generateDecimalColor();
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Convert hex to decimal colors
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimalColors(hex) {
  const red = parseInt(hex.slice(0, 2), 16); //16 - we can't convert hexadecimal to int, that;s why should use hexadecimal base 16
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * validate hex color code (without #)
 * @param {string} color
 * @returns {boolean}
 */
function isValidHex(color) {
  if (color.length != 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

//Hex color code validity check with #
// function isValidHex(color) {
//   if (color.length != 7) return false;
//   if (color[0] != "#") return false;
//   color = color.substring(1);
//   return /^[0-9A-Fa-f]{6}$/i.test(color);
// }
