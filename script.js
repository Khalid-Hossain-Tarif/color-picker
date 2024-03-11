/**
 * Date: 06-03-2024
 * Author: Khalid Hossain
 * Inspired by: Stack learner
 * Description: Color picker tool with vanilla js
 */

//globals
let toastContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};

//Onload handler
window.onload = () => {
  main();
  updateColorCodeToDom(defaultColor);
};

//Main or boot functions, this function will take care of getting all the DOM references
function main() {
  //Dom references
  const generateRandomColorBtn = document.getElementById(
    "generate-random-color"
  );
  const hexColorInput = document.getElementById("input-hex");
  const colorSliderRed = document.getElementById("color-slider-red");
  const colorSliderGreen = document.getElementById("color-slider-green");
  const colorSliderBlue = document.getElementById("color-slider-blue");
  const copyToClipboardBtn = document.getElementById("copy-to-clipboard");

  //Event listeners
  generateRandomColorBtn.addEventListener(
    "click",
    handleGenerateRandomColorBtn
  );

  hexColorInput.addEventListener("keyup", handleHexColorInput);

  colorSliderRed.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderGreen.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderBlue.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );

  copyToClipboardBtn.addEventListener("click", handleCopyToClipboard);
}

//Event handlers
function handleGenerateRandomColorBtn() {
  const color = generateDecimalColor();
  updateColorCodeToDom(color);
}

function handleHexColorInput(e) {
  const inputHexErrorMsg = document.getElementById("input-hex-error-msg");
  const hexColor = e.target.value;

  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      inputHexErrorMsg.style.display = "none";
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    } else {
      inputHexErrorMsg.style.display = "block";
      inputHexErrorMsg.innerHTML = "Color code should be valid!";
    }
  }
}

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };

    updateColorCodeToDom(color);
  };
}

function handleCopyToClipboard() {
  const colorModeRadioButtons = document.getElementsByName("color-mode");
  const mode = getCheckedValueFromRadioButtons(colorModeRadioButtons);

  if (mode == null) {
    throw new Error("Invalid Radio Input");
  }

  if (toastContainer != null) {
    toastContainer.remove();
    toastContainer = null;
  }

  if (mode == "hex") {
    const hexColor = document.getElementById("input-hex").value;
    if (hexColor && isValidHex(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor} copied`);
    } else {
      alert("Invalid hex code");
    }
  } else {
    const rbgColor = document.getElementById("input-rgb").value;
    if (rbgColor) {
      navigator.clipboard.writeText(rbgColor);
      generateToastMessage(`${rbgColor} copied`);
    } else {
      alert("Invalid rgb code");
    }
  }
}

//Dom functions

/**
 * Generate toast message
 * @param {string} msg
 */
function generateToastMessage(msg) {
  toastContainer = document.createElement("div");
  toastContainer.innerText = msg;
  toastContainer.className = "toast-message toast-message-slide-in";

  toastContainer.addEventListener("click", function () {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    //toaster remove after animationend event
    toastContainer.addEventListener("animationend", function () {
      toastContainer.remove();
      toastContainer = null;
    });
  });

  document.body.appendChild(toastContainer);

  // setTimeout(() => {
  //   toastContainer.classList.add("toaster-slide-out");
  // }, 5000);

  // setTimeout(() => {
  //   toastContainer.remove();
  //   toastContainer = null;
  // }, 5300);
}

/**
 * Find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string / null}
 */
function getCheckedValueFromRadioButtons(nodes) {
  let checkedValue = null;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
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
  document.getElementById("input-hex").value = hexColor.toUpperCase();
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("color-slider-red").value = color.red;
  document.getElementById("color-slider-red-label").innerText = color.red;
  document.getElementById("color-slider-green").value = color.green;
  document.getElementById("color-slider-green-label").innerText = color.green;
  document.getElementById("color-slider-blue").value = color.blue;
  document.getElementById("color-slider-blue-label").innerText = color.blue;
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
