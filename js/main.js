// display current win-loss record
document.getElementById('xWins').innerText = `X wins: ${localStorage.getItem('x wins') || 0}`
document.getElementById('oWins').innerText = `O wins: ${localStorage.getItem('o wins') || 0}`

const squareA = document.getElementById('a')
const squareB = document.getElementById('b')
const squareC = document.getElementById('c')
const squareD = document.getElementById('d')
const squareE = document.getElementById('e')
const squareF = document.getElementById('f')
const squareG = document.getElementById('g')
const squareH = document.getElementById('h')
const squareI = document.getElementById('i')


const ticTacToe = {
    // whose turn is it
    'currentPlayer': 'x',

    // record winner
    'lastWinner': '',

    // record of squares played
    'a': '',
    'b': '',
    'c': '',
    'd': '',
    'e': '',
    'f': '',
    'g': '',
    'h': '',
    'i': '',

    
    // switch players after turn
    changePlayer() {
        if (ticTacToe.currentPlayer === 'x') {
            ticTacToe.currentPlayer = 'o'
        } else ticTacToe.currentPlayer = 'x'
        // change button colors
        document.getElementById('x').classList.toggle('selected')
        document.getElementById('o').classList.toggle('selected')
    },

    // image handler to make sure image renders before continuing
    async loadImage(url, elem) {
        return new Promise((resolve, reject) => {
          elem.onload = () => resolve(elem);
          elem.onerror = reject;
          elem.src = url;
        });
      },

    // mark squares, set player record
    async markSquare() {
        if (ticTacToe.lastWinner) alert('Game already won!!')
        else if (!ticTacToe[this.id]) {
            const img = document.getElementById(`${this.id}`)
            if (ticTacToe.currentPlayer === 'x') {
                ticTacToe[this.id] = 'x'
                await ticTacToe.loadImage('/img/plantX.jpg', img);
            } else {
                ticTacToe[this.id] = 'o'
                await ticTacToe.loadImage('/img/fireO.jpg', img);
            }

            ticTacToe.checkWin(this.classList)
            ticTacToe.changePlayer()

        } else alert('Square already marked!')
    },

    //check for three-in-row, win
    checkWin(classList) {
        if (classList.contains('row1') && (ticTacToe.a == ticTacToe.b & ticTacToe.b == ticTacToe.c)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }        
        if (classList.contains('row2') && (ticTacToe.d == ticTacToe.e & ticTacToe.e == ticTacToe.f)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }        
        if (classList.contains('row3') && (ticTacToe.g == ticTacToe.h & ticTacToe.h == ticTacToe.i)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }
        if (classList.contains('col1') && (ticTacToe.a == ticTacToe.d & ticTacToe.d == ticTacToe.g)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }
        if (classList.contains('col2') && (ticTacToe.b == ticTacToe.e & ticTacToe.e == ticTacToe.h)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }
        if (classList.contains('col3') && (ticTacToe.c == ticTacToe.f & ticTacToe.f == ticTacToe.i)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }
        if (classList.contains('diag1') && (ticTacToe.a == ticTacToe.e & ticTacToe.e == ticTacToe.i)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }
        if (classList.contains('diag2') && (ticTacToe.c == ticTacToe.e & ticTacToe.e == ticTacToe.g)) {
            ticTacToe.ifWinner(ticTacToe.currentPlayer)
        }
    },

    // handle winner, store wins in local storage, alert winner
    ifWinner(currentPlayer) {
        ticTacToe.lastWinner = currentPlayer
        if (localStorage.getItem(`${ticTacToe.lastWinner} wins`) !== null) {
            let wins = +(localStorage.getItem(`${ticTacToe.lastWinner} wins`))
            localStorage.setItem(`${ticTacToe.lastWinner} wins`, `${++wins}`)
        } else {
            localStorage.setItem(`${ticTacToe.lastWinner} wins`, `1`)
        }
        document.getElementById('xWins').innerText = `X wins: ${localStorage.getItem('x wins') || 0}`
        document.getElementById('oWins').innerText = `O wins: ${localStorage.getItem('o wins') || 0}`
        document.getElementById('displayWin').innerText = `${ticTacToe.lastWinner.toUpperCase()} WINS!!!`

        // ticTacToe.markWinSquare()
        ticTacToe.alertWinner()  
    },

    // alert winner party
    alertWinner() {
        alert(`${ticTacToe.lastWinner.toUpperCase()} WINS!!!`)
    },

    // clear board
    clearBoard() {
        location.reload()
    },

    clearWins() {
        localStorage.clear()
        location.reload()
    }

    // testFunc() {
    //     console.log('it works')
    // }


}


// add these if you want to allow players to choose who starts
// document.getElementById('x').addEventListener('click', ticTacToe.changePlayer)
// document.getElementById('o').addEventListener('click', ticTacToe.changePlayer)

// mark squares and set player record when square clicked
squareA.addEventListener('click', ticTacToe.markSquare)
squareB.addEventListener('click', ticTacToe.markSquare)
squareC.addEventListener('click', ticTacToe.markSquare)
squareD.addEventListener('click', ticTacToe.markSquare)
squareE.addEventListener('click', ticTacToe.markSquare)
squareF.addEventListener('click', ticTacToe.markSquare)
squareG.addEventListener('click', ticTacToe.markSquare)
squareH.addEventListener('click', ticTacToe.markSquare)
squareI.addEventListener('click', ticTacToe.markSquare)

document.getElementById('reset').addEventListener('click', ticTacToe.clearBoard)
document.getElementById('resetWins').addEventListener('click', ticTacToe.clearWins)