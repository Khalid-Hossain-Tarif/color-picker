//Main or boot functions, this function will take care of getting all the DOM references
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
          rgbOutput.value = hexToRgb(color);
        }
      }
    });
  }