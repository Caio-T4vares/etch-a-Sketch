const input = document.querySelector("input");
const frame = document.querySelector(".frame");
const erase = document.querySelector(".erase");
const darken = document.querySelector(".darken");
const clear = document.querySelector(".clear");
const rainbow = document.querySelector(".rainbow");
let color = "#000000";
let previousInputValue = 0;
input.addEventListener("input", function (event) {
  const proportion = document.querySelector(".proportion");
  proportion.textContent = `${input.value}x${input.value}`;
});
input.addEventListener("change", function (event) {
  clearFrame();
  previousInputValue = input.value;
  buildFrame();
});
window.addEventListener("load", (event) => {
  buildFrame();
  previousInputValue = input.value;
});

erase.addEventListener("click", (event) => {
  color = "#FFFFFF";
});
darken.addEventListener("click", (event) => {});

function buildFrame() {
  console.log(input.value);
  for (let j = 0; j < input.value; j++) {
    const newColumn = document.createElement("div");
    newColumn.style.display = "flex";
    newColumn.class = "";
    for (let i = 0; i < input.value; i++) {
      const newSquare = document.createElement("div");
      newSquare.style.minWidth = `${
        parseInt(frame.style.width) / parseInt(input.value)
      }px`;
      newSquare.style.minHeight = `${
        parseInt(frame.style.height) / parseInt(input.value)
      }px`;
      newSquare.style.border = "1px solid #e1d9e9";
      newSquare.addEventListener("hovering", (event) => {
        event.target.style.backgroundColor = color;
      });
      newColumn.appendChild(newSquare);
    }
    frame.appendChild(newColumn);
  }
}
function clearFrame() {
  while (frame.firstChild) {
    frame.removeChild(frame.lastChild);
  }
}
