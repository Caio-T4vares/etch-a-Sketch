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
    if (mode === "rainbow" || mode === "darken") {
      mode = "";
    }
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
    color = "rgb(200,200,200)";
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
        if (mode == "darken") {
          event.target.style.backgroundColor = makeDarker(
            event.target.style.backgroundColor
          );
        } else event.target.style.backgroundColor = color;
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
  let red = Math.floor(Math.random() * 255);
  let grenn = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return "rgb(" + red + "," + grenn + "," + blue + ")";
}
function makeDarker(oldBackground) {
  if (oldBackground === "") {
    return color;
  } else {
    if (oldBackground !== `rgb(0,0,0)`) {
      oldBackground = oldBackground.slice(4);
      let red = oldBackground.slice(0, oldBackground.indexOf(","));
      oldBackground = oldBackground.slice(oldBackground.indexOf(",") + 1);
      let blue = oldBackground.slice(0, oldBackground.indexOf(","));
      oldBackground = oldBackground.slice(oldBackground.indexOf(",") + 1);
      let green = oldBackground.slice(0, oldBackground.indexOf(")"));
      // podia ter pego só um dos valores, vacilei

      red = Math.floor(parseInt(red) - 20);
      blue = Math.floor(parseInt(red) - 20);
      green = Math.floor(parseInt(red) - 20);

      red = red < 0 ? 0 : red;
      blue = blue < 0 ? 0 : blue;
      green = green < 0 ? 0 : green;
      return `rgb(${red},${blue}, ${green})`;
    }
  }
}
