/*global document*/

var gameTable;
var oTurn = false;
var boardSize = 3;
var gameOver = false;

function setUp() {
    document.getElementById("reset").setAttribute("onClick", "reset()")
    gameTable = document.getElementById("gameTable");

    for (i = 0; i < 3; i++) {
        var thisRow = document.createElement("tr");
        gameTable.appendChild(thisRow);
        for (j = 0; j < 3; j++) {
            var thisSquare = document.createElement("td");

            thisSquare.setAttribute("class", "gameSquare")
            thisSquare.setAttribute("onClick", "squareClicked(" + i + "," + j + ")");
            thisSquare.innerHTML = " ";
            thisRow.appendChild(thisSquare);
        }
    }
}

function squareClicked(i, j) {
    if (gameOver) {
        return;
    }
    if (gameTable.rows[i].cells[j].innerHTML == " ") {
        if (oTurn) {
            gameTable.rows[i].cells[j].innerHTML = "O";
        } else {
            gameTable.rows[i].cells[j].innerHTML = "X";
        }
    }
    oTurn = !oTurn
    checkForWinner();
}


function checkForWinner() {
    if (checkRows("X")) {
        declareWinner("X");
    } else if (checkRows("O")) {
        declareWinner("O");
    } else if (checkColumns("X")) {
        declareWinner("X");
    } else if (checkColumns("O")) {
        declareWinner("O");
    } else if (checkDiagnols("X")) {
        declareWinner("X");
    } else if (checkDiagnols("O")) {
        declareWinner("O");
    }

}

function checkRows(s) {
    var goodSoFar = true;
    for (i = 0; i < boardSize; i++) {
        for (j = 0; j < boardSize; j++) {
            if (gameTable.rows[i].cells[j].innerHTML != s) {
                goodSoFar = false;
            }
        }
        if (goodSoFar) {
            return true;
        }
        goodSoFar = true;
    }
    return false;
}

function checkColumns(s) {
    var goodSoFar = true;
    for (i = 0; i < boardSize; i++) {
        for (j = 0; j < boardSize; j++) {
            if (gameTable.rows[j].cells[i].innerHTML != s) {
                goodSoFar = false;
            }
        }
        if (goodSoFar) {
            return true;
        }
        goodSoFar = true;
    }
    return false;
}

function checkDiagnols(s) {
    var goodSoFar = true;
    for (i = 0; i < boardSize; i++) {
        if (gameTable.rows[i].cells[i].innerHTML != s) {
            goodSoFar = false;
        }
    }
    if (goodSoFar) {
        return true;
    }

    goodSoFar = true;
    for (i = 0; i < boardSize; i++) {
        if (gameTable.rows[boardSize - 1 - i].cells[i].innerHTML != s) {
            goodSoFar = false;
        }
    }
    if (goodSoFar) {
        return true;
    }

    return false;
}

function declareWinner(s) {
    document.getElementById("winMsg").innerHTML = s + " is the winner!!!";
    gameOver = true;
}

function reset() {
    gameTable.innerHTML = "";
    setUp();
    document.getElementById("winMsg").innerHTML = "";
    gameOver = false;
}
