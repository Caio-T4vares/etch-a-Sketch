const board = document.querySelector("#board");

generateBoard(16);

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
