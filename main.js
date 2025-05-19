let cells = [];
const COLS = 150;
const ROWS = 200;

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("ascii-grid");


    for (let i = 0; i < ROWS * COLS; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = "X";
        cell.setAttribute('tabindex', '0');

        cell.addEventListener('click', () => {
            selectedIndex = i;
            cell.focus();
            updateSelectedStyle();
        });

        grid.appendChild(cell);
    }

    cells = Array.from(grid.children);
    setCanvasWidth(grid, COLS);
});

function updateSelectedStyle() {
    cells.forEach((c, idx) => {
        if (idx === selectedIndex) {
            c.classList.add('selected');
            c.focus();
        } else {
            c.classList.remove('selected');
        }
    });
}

function setCanvasWidth(grid, cols) {
    const testSpan = document.createElement('span');
    testSpan.style.fontFamily = "'Courier New', Courier, monospace";
    testSpan.style.fontSize = "16px";
    testSpan.style.position = "absolute";
    testSpan.style.visibility = "hidden";
    testSpan.textContent = "M";
    document.body.appendChild(testSpan);

    const charWidth = testSpan.getBoundingClientRect().width;
    document.body.removeChild(testSpan);

    grid.style.width = `${charWidth * cols}px`;

    // 👇 Most important: ensure correct number of columns in CSS grid
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${cols}, 1ch)`;
}

document.addEventListener('keydown', (e) => {
  if (!document.activeElement.classList.contains('cell')) return;

  if (e.key === 'Backspace') {
    cells[selectedIndex].textContent = " ";
    e.preventDefault();
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      if (selectedIndex % COLS !== 0) {
        selectedIndex -= 1;
        e.preventDefault();
      }
      break;
    case 'ArrowRight':
      if (selectedIndex % COLS !== COLS - 1) {
        selectedIndex += 1;
        e.preventDefault();
      }
      break;
    case 'ArrowUp':
      if (selectedIndex - COLS >= 0) {
        selectedIndex -= COLS;
        e.preventDefault();
      }
      break;
    case 'ArrowDown':
      if (selectedIndex + COLS < ROWS * COLS) {
        selectedIndex += COLS;
        e.preventDefault();
      }
      break;
  }

  // Update selection highlight
  updateSelectedStyle();

  // Capture typed character input
  if (e.key.length === 1) {
    cells[selectedIndex].textContent = e.key;
    e.preventDefault();
  }
});


