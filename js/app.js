document.addEventListener("DOMContentLoaded", function () {
  // ---------------- GLOBAL VARIABLES ----------------
  var activePlayer = "X";
  var winConditions = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
  ];
  var gameStatus = document.getElementById("gameStatus");
  var playerNames = document.querySelectorAll(".playerName");
  var playerScores = [
    document.getElementById("player1Score"),
    document.getElementById("player2Score"),
  ];

  // ---------------- SETUP GRID ----------------
  var table = document.createElement("table");
  table.setAttribute("border", "0");
  table.setAttribute("cellspacing", "0");
  document.querySelector(".game").appendChild(table);

  var cells = [];

  for (var i = 0; i < 3; i++) {
    var row = table.insertRow();
    for (var j = 0; j < 3; j++) {
      var cell = row.insertCell();
      cell.id = "cell" + (cells.length + 1);
      cells.push(cell);
    }
  }

  // ---------------- WIN CHECK ----------------
  function winCheck() {
    for (var i = 0; i < winConditions.length; i++) {
      var tempCombo = "";
      for (var j = 0; j < 3; j++) {
        var [r, c] = winConditions[i][j];
        tempCombo += table.rows[r].cells[c].className;
      }

      var [a, b, c] = tempCombo;
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

    var index = activePlayer === "X" ? 0 : 1;

    playerScores[index].innerHTML = Number(playerScores[index].innerHTML) + 1;
    gameStatus.innerHTML = playerNames[index].innerHTML + " won this round";
  }

  // ---------------- GAME LOGIC ----------------
  function gameLogic() {
    if (!this.classList.contains("empty")) return;

    if (this.className == "empty") {
      this.classList.remove("empty");
      this.classList.add(activePlayer);
      this.innerHTML = `<i class="fa-solid fa-${activePlayer.toLowerCase()}"></i>`;

      var winCondition = winCheck();

      if (winCondition) {
        endGame(winCondition);
      } else if (document.querySelectorAll(".empty").length == 0) {
        gameStatus.innerHTML = "Draw";
      } else {
        gameStatus.innerHTML =
          playerNames[activePlayer === "X" ? 1 : 0].innerHTML + "'s turn";
      }

      activePlayer = activePlayer === "X" ? "O" : "X";
    }
  }

  // ---------------- NEW GAME ----------------
  function newGame() {
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.className = "empty";
      cell.onclick = gameLogic;
    });

    gameStatus.innerHTML =
      playerNames[activePlayer === "X" ? 0 : 1].innerHTML + "'s turn";
  }

  // ---------------- RENAME PLAYER ----------------
  function renamePlayer() {
    var index = Number(this.id.slice(-1)) - 1;
    var name;

    while (true) {
      name = prompt("Player " + (index + 1) + " name (letters only):");

      if (name === null) {
        return;
      }

      if (/^[A-Za-z ]{1,12}$/.test(name)) {
        break;
      }
    }

    playerNames[index].innerHTML = name;
  }

  // ---------------- BUTTONS ----------------
  document.getElementById("btnReset").onclick = newGame;
  document.getElementById("btnRename1").onclick = renamePlayer;
  document.getElementById("btnRename2").onclick = renamePlayer;

  newGame();
});
