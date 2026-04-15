document.addEventListener("DOMContentLoaded", function () {
  // Global variable
  var currentPlayer = "X";
  var possibleWin = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
  ];

  function gameLogic() {
    if (this.className == "empty") {
      this.className = currentPlayer;
      this.style.cursor = "default";

      if (currentPlayer == "X") {
        this.innerHTML = '<i class="fa-solid fa-x"></i>';
      } else {
        this.innerHTML = '<i class="fa-solid fa-o"></i>';
      }

      document.getElementById("gameStatus").innerHTML = "Running";

      var winCheckReturn = winCheck();

      if (winCheckReturn != undefined) {
        for (var i = 0; i < 9; i++) {
          document.getElementsByTagName("td")[i].style += "cursor: default; pointer-events: none;";
          document.getElementsByTagName("td")[i].onclick = "";
          if (document.getElementsByTagName("td")[i].className != "empty") {
            document.getElementsByTagName("td")[i].className += " allMark";
          }
        }

        for (var cellCoordinate = 0; cellCoordinate < 3; cellCoordinate++) {
          var row = winCheckReturn[cellCoordinate][0];
          var cell = winCheckReturn[cellCoordinate][1];
          table.rows[row].cells[cell].className += " wonMark";
        }

        var player1Score = document.getElementById("player1Score");
        var player2Score = document.getElementById("player2Score");

        if (currentPlayer == "X") {
          player1Score.innerHTML = Number(player1Score.innerHTML) + 1;
          document.getElementById("gameStatus").innerHTML = document.getElementsByClassName("playerName")[0].innerHTML + " won this round";
        } else {
          player2Score.innerHTML = Number(player2Score.innerHTML) + 1;
          document.getElementById("gameStatus").innerHTML = document.getElementsByClassName("playerName")[1].innerHTML + " won this round";
        }
      }

      if (winCheckReturn == undefined && document.getElementsByClassName("empty").length == 0) {
        document.getElementById("gameStatus").innerHTML = "Draw";
      }

      currentPlayer = currentPlayer == "X" ? "O" : "X";
    }
  }

  function winCheck() {
    for (var indexOfPossibleWin = 0; indexOfPossibleWin < possibleWin.length; indexOfPossibleWin++) {
      var tempCombination = "";

      for (var cellCoordinate = 0; cellCoordinate < 3; cellCoordinate++) {
        var row = possibleWin[indexOfPossibleWin][cellCoordinate][0];
        var cell = possibleWin[indexOfPossibleWin][cellCoordinate][1];
        tempCombination += table.rows[row].cells[cell].className;
      }

      if (tempCombination[0] != null && tempCombination[0] == tempCombination[1] && tempCombination[1] == tempCombination[2]) {
        return possibleWin[indexOfPossibleWin];
      }
    }
  }

  function newGame() {
    for (var i = 1; i <= 9; i++) {
      var cell = document.getElementById("cell" + i);
      cell.innerHTML = "";
      cell.className = "empty";
      cell.onclick = gameLogic;
      cell.style += "cursor: pointer; opacity: 1;";
    }
    document.getElementById("gameStatus").innerHTML = "Not Running";
  }

  function renamePlayerName() {
    do {
      var playerName = document.getElementsByClassName("playerName")[this.id[9] - 1];
      playerName.innerHTML = prompt("Set a name for Player " + this.id[9] + ":",);
    } while (playerName.innerHTML.length > 12 || playerName.innerHTML.length < 1 || /^[A-Za-z ]+$/.test(playerName.innerHTML) == false);
  }

  // Build cells
  var table = document.createElement("table");
  table.setAttribute("border", "0");
  table.setAttribute("cellspacing", "0");
  document.getElementsByClassName("game")[0].appendChild(table);

  var cellNo = 1;
  for (var i = 1; i <= 3; i++) {
    var row = document.createElement("tr");
    table.appendChild(row);

    for (var j = 1; j <= 3; j++) {
      var cell = document.createElement("td");
      cell.id = "cell" + cellNo;
      row.appendChild(cell);
      cellNo++;
    }
  }

  // Assign button functions
  document.getElementById("btnReset").onclick = newGame;
  document.getElementById("btnRename1").onclick = renamePlayerName;
  document.getElementById("btnRename2").onclick = renamePlayerName;

  newGame();
});
