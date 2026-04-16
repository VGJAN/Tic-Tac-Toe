document.addEventListener("DOMContentLoaded", function () {
  // ---------------- GLOBAL VARIABLES ----------------
  let startingPlayer = "O";
  let activePlayer = "X";
  let moveCount = 0;
  const winConditions = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
  ];
  const gameStatus = document.getElementById("gameStatus");
  const playerNames = document.querySelectorAll(".playerName");
  const playerScores = [
    document.getElementById("player1Score"),
    document.getElementById("player2Score"),
  ];

  // ---------------- SETUP GRID ----------------
  const table = document.createElement("table");
  table.setAttribute("border", "0");
  table.setAttribute("cellspacing", "0");
  document.querySelector(".game").appendChild(table);

  const cells = [];

  for (let i = 0; i < 3; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 3; j++) {
      const cell = row.insertCell();
      cell.id = "cell" + (cells.length + 1);
      cells.push(cell);
    }
  }

  // ---------------- WIN CHECK ----------------
  function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
      const values = [];

      winConditions[i].forEach(([r, c]) => {
        if (table.rows[r].cells[c].classList.contains("empty")) return;
        values.push(table.rows[r].cells[c].className);
      });

      const [a, b, c] = values;
      if (a && a === b && b === c) {
        return winConditions[i];
      }
    }
  }

  // ---------------- END GAME ----------------
  function endGame(win) {
    cells.forEach((cell) => {
      cell.onclick = null;
      cell.className += " endGameCell";
    });

    win.forEach(([r, c]) => {
      table.rows[r].cells[c].classList.add("wonCell");
    });

    const index = activePlayer === "X" ? 0 : 1;

    playerScores[index].innerHTML = Number(playerScores[index].innerHTML) + 1;
  }

  // ---------------- GAME LOGIC ----------------
  function gameLogic() {
    if (!this.classList.contains("empty")) return;

    this.classList.remove("empty");
    this.classList.add(activePlayer);
    this.innerHTML = `<i class="fa-solid fa-${activePlayer.toLowerCase()}"></i>`;

    const winCondition = checkWin();
    moveCount++;

    if (winCondition) {
      endGame(winCondition);
      updateGameStatus("win");
    } else if (moveCount == 9) {
      updateGameStatus("draw");
    } else {
      activePlayer = activePlayer === "X" ? "O" : "X";
      updateGameStatus();
    }
  }

  // ---------------- GAME STATUS ----------------
  function updateGameStatus(cause) {
    const index = activePlayer === "X" ? 0 : 1;

    if (cause === "win") {
      gameStatus.innerHTML = playerNames[index].innerHTML + " won";
    } else if (cause === "draw") {
      gameStatus.innerHTML = "Draw";
    } else {
      gameStatus.innerHTML = playerNames[index].innerHTML + "'s turn";
    }
  }

  // ---------------- NEW GAME ----------------
  function newGame() {
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.className = "empty";
      cell.onclick = gameLogic;
    });

    startingPlayer = startingPlayer === "X" ? "O" : "X";
    activePlayer = startingPlayer;
    moveCount = 0;
    gameStatus.innerHTML =
      playerNames[activePlayer === "X" ? 0 : 1].innerHTML + "'s turn";
  }

  // ---------------- RENAME PLAYER ----------------
  function renamePlayer() {
    const index = Number(this.id.slice(-1)) - 1;
    let name;

    while (true) {
      name = prompt("Player " + (index + 1) + " name (letters only):");
      if (name === null) return;
      if (/^[A-Za-z ]{1,12}$/.test(name)) break;
    }

    playerNames[index].innerHTML = name;
  }

  // ---------------- BUTTONS ----------------
  document.getElementById("btnReset").onclick = newGame;
  document.getElementById("btnRename1").onclick = renamePlayer;
  document.getElementById("btnRename2").onclick = renamePlayer;

  newGame();
});
