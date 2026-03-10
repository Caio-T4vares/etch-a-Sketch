const board = document.querySelector("#board");
const sizeInput = document.querySelector("#sizeInput");
const sizeLabel = document.querySelector(".input-container label");
const clearButton = document.querySelector("#clear-button");
const rgbModeButton = document.querySelector("#rgb-button");
const darkenModeButton = document.querySelector("#darken-button");

const MAX_OPACITY = 1;
const DRAW_MODE = {
  DEFAULT: 0,
  RGB: 1,
  DARKEN: 2,
};

let drawMode = DRAW_MODE.DEFAULT;

generateBoard(16);

clearButton.addEventListener("click", () => {
  clearBoard();
});

darkenModeButton.addEventListener("click", (e) => {
  const darkenButton = e.target;
  darkenButton.classList.toggle("selected");

  if (rgbModeButton.classList.contains("selected"))
    rgbModeButton.classList.toggle("selected");

  if (darkenButton.classList.contains("selected")) drawMode = DRAW_MODE.DARKEN;
  else drawMode = DRAW_MODE.DEFAULT;
});

rgbModeButton.addEventListener("click", (e) => {
  const rgbButton = e.target;
  rgbButton.classList.toggle("selected");

  if (darkenModeButton.classList.contains("selected"))
    darkenModeButton.classList.toggle("selected");

  if (rgbButton.classList.contains("selected")) drawMode = DRAW_MODE.RGB;
  else drawMode = DRAW_MODE.DEFAULT;
});

sizeInput.addEventListener("input", (e) => {
  const size = e.target.value;
  sizeLabel.textContent = `${size}x${size}`;

  removeBoard();
  generateBoard(size);
});

function clearBoard() {
  let lines = board.children;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let j = 0; j < line.children.length; j++) {
      line.children[j].style = "";
    }
  }
}

function generateBoard(size) {
  for (let i = 0; i < size; i++) {
    const newLine = document.createElement("div");
    newLine.classList.add("line");

    for (let j = 0; j < size; j++) {
      const newSquare = document.createElement("div");
      newSquare.classList.add("square");

      newLine.append(newSquare);

      newSquare.addEventListener("mouseenter", (e) => {
        let bgColor;
        let opacity = 1.0;
        if (drawMode === DRAW_MODE.DEFAULT) bgColor = "black";
        else if (drawMode === DRAW_MODE.RGB) {
          bgColor = `rgb(${genRandomColor()}, ${genRandomColor()}, ${genRandomColor()})`;
        } else {
          bgColor =
            e.target.style.backgroundColor == ""
              ? "black"
              : e.target.style.backgroundColor;
          const elementOpacity = e.target.style.opacity;
          opacity = elementOpacity ? +elementOpacity + 0.1 : 0.2;
        }
        e.target.style.opacity = opacity;
        e.target.style.backgroundColor = bgColor;
      });
    }

    board.append(newLine);
  }
}

function removeBoard() {
  let child;
  while ((child = board.firstChild)) {
    child.remove();
  }
}

function genRandomColor() {
  return Math.floor(Math.random() * 255 + 1);
}
