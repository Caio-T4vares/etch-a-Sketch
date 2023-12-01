const input = document.querySelector("input");
const frame = document.querySelector(".frame");
const erase = document.querySelector(".erase");
const darken = document.querySelector(".darken");
const clear = document.querySelector(".clear");
const rainbow = document.querySelector(".rainbow");
const DEFAULT_COLOR = "#000";
let mode = "";
let color = DEFAULT_COLOR;
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
  if (event.target.classList.contains("selected")) {
    color = DEFAULT_COLOR;
    event.target.classList.remove("selected");
  } else {
    color = "#FFFFFF";
    event.target.classList.add("selected");
  }
});
darken.addEventListener("click", (event) => {
  if (event.target.classList.contains("selected")) {
    color = DEFAULT_COLOR;
    event.target.classList.remove("selected");
    mode = "";
  } else {
    color = "#FFFFFF";
    event.target.classList.add("selected");
    mode = "darken";
  }
});
rainbow.addEventListener("click", (event) => {
  if (event.target.classList.contains("selected")) {
    color = DEFAULT_COLOR;
    mode = "";
    event.target.classList.remove("selected");
  } else {
    color = genRandomRGB();
    event.target.classList.add("selected");
    mode = "rainbow";
  }
});
clear.addEventListener("click", (event) => {
  clearFrame();
  buildFrame();
});

function buildFrame() {
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
      newSquare.addEventListener("mouseenter", (event) => {
        event.target.style.backgroundColor = color;
      });
      newSquare.addEventListener("mouseleave", (event) => {
        if (mode === "rainbow") {
          color = genRandomRGB();
        }
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
function genRandomRGB() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
