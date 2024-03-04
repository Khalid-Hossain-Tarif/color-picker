let toasterDiv = null;

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById("root");
  const output = document.getElementById("output");
  const rgbOutput = document.getElementById("rgb-output");
  const changeBtn = document.getElementById("color-change-btn");
  const hexCopyBtn = document.getElementById("hex-copy-btn");
  const rbgCopyBtn = document.getElementById("rbg-copy-btn");

  changeBtn.addEventListener("click", function () {
    //passing decimal color as a parameter, because hex and rgb color should be the same, that's why passing generateDecimalColor() from a common function
    const decimalColor = generateDecimalColor();
    const hex = generateHexColor(decimalColor);
    const rgb = generateRGBColor(decimalColor);
    root.style.backgroundColor = hex;
    output.value = hex.substring(1).toUpperCase();
    rgbOutput.value = rgb;
  });

  //copy Hex color code
  hexCopyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(`#${output.value}`);
    if (toasterDiv != null) {
      toasterDiv.remove();
      toasterDiv = null;
    }

    if (isValidHex(output.value)) {
      generateToastMessage(`#${output.value} copied`);
    } else {
      alert("color code not matched!");
    }
  });

  //copy RGB color code
  rbgCopyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(rgbOutput.value);
    if (toasterDiv != null) {
      toasterDiv.remove();
      toasterDiv = null;
    }

    if (isValidHex(output.value)) {
      generateToastMessage(`${rgbOutput.value} copied`);
    } else {
      alert("color code not matched!");
    }
  });

  //change bgColor based on use input
  output.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color) {
      output.value = color.toUpperCase();
      if (isValidHex(color)) {
        root.style.backgroundColor = `#${color}`;
        rgbOutput.value = convertHexToRgb(color);
      }
    }
  });
}

//Generate decimal color - return obj
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

//Generate random hex color: #000, #fff
function generateHexColor({ red, green, blue }) {
  // const { red, green, blue } = generateDecimalColor();

  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`;
}

//Generate random hex color: rgb(0, 0, 0), rgb(255, 0, 0)
function generateRGBColor({ red, green, blue }) {
  // const { red, green, blue } = generateDecimalColor();
  return `rgb(${red}, ${green}, ${blue})`;
}

//Convert hex to rgb color
function convertHexToRgb(hex) {
  const red = parseInt(hex.slice(0, 2), 16); //16 - we can't convert hexadecimal to int, that;s why should use hexadecimal base 16
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`;
}

//Toast Message generate
function generateToastMessage(msg) {
  toasterDiv = document.createElement("div");
  toasterDiv.innerText = msg;
  toasterDiv.className = "toaster toaster-slide-in";
  document.body.appendChild(toasterDiv);

  toasterDiv.addEventListener("click", function () {
    toasterDiv.classList.add("toaster-slide-out");
    toasterDiv.classList.remove("toaster-slide-in");

    //toaster remove after animationend event
    toasterDiv.addEventListener("animationend", function () {
      toasterDiv.remove();
      toasterDiv = null;
    });
  });

  // setTimeout(() => {
  //   toasterDiv.classList.add("toaster-slide-out");
  // }, 5000);

  // setTimeout(() => {
  //   toasterDiv.remove();
  //   toasterDiv = null;
  // }, 5300);
}

//Hex color code validity check without #
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
