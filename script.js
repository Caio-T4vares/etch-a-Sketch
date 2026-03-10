const board = document.querySelector("#board");
const sizeInput = document.querySelector("#sizeInput");
const sizeLabel = document.querySelector(".input-container label");

generateBoard(16);

sizeInput.addEventListener("input", (e) => {
  const size = e.target.value;
  sizeLabel.textContent = `${size}x${size}`;

  clearBoard();
  generateBoard(size);
});

function generateBoard(size) {
  for (let i = 0; i < size; i++) {
    const newColumn = document.createElement("div");
    newColumn.classList.add("column");

    for (let j = 0; j < size; j++) {
      const newSquare = document.createElement("div");
      newSquare.classList.add("square");

      newColumn.append(newSquare);

      newSquare.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "black";
      });
    }

    board.append(newColumn);
  }
}

function clearBoard() {
  let child;
  while ((child = board.firstChild)) {
    child.remove();
  }
}
