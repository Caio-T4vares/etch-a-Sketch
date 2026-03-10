const board = document.querySelector("#board");
const sizeInput = document.querySelector("#sizeInput");
const sizeLabel = document.querySelector(".input-container label");
const clearButton = document.querySelector("#clear-button");

generateBoard(16);

clearButton.addEventListener("click", () => {
  clearBoard();
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
      line.children[j].style.backgroundColor = "";
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
        e.target.style.backgroundColor = "black";
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
