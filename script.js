const input = document.querySelector("input");
const frame = document.querySelector(".frame");
let previousInputValue = 0;
input.addEventListener("input", function (event) {
  const proportion = document.querySelector(".proportion");
  proportion.textContent = `${input.value}x${input.value}`;
});
input.addEventListener("change", function (event) {
  let childrens = frame.childNodes;
  childrens.forEach((child) => {
    frame.removeChild(child);
    let columnChilds = child.childNodes;
    columnChilds.forEach((square) => {
      child.removeChild(square);
    });
  });
  previousInputValue = input.value;
  buildFrame();
});
window.addEventListener("load", (event) => {
  buildFrame();
  previousInputValue = input.value;
});
function buildFrame() {
  console.log(input.value);
  for (let j = 0; j < input.value; j++) {
    const newColumn = document.createElement("div");
    newColumn.style.display = "flex";
    for (let i = 0; i < input.value; i++) {
      const newSquare = document.createElement("div");
      newSquare.style.minWidth = `${
        parseInt(frame.style.width) / parseInt(input.value)
      }px`;
      newSquare.style.minHeight = `${
        parseInt(frame.style.height) / parseInt(input.value)
      }px`;
      newSquare.style.border = "1px solid #e1d9e9";
      newColumn.appendChild(newSquare);
    }
    frame.appendChild(newColumn);
  }
}
