const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let current = CROSS;
let remainingCells = 9;

const field = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}


function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== null) {
        return
    }
    field[row][col] = current;
    console.log(field);
    renderSymbolInCell(current, row, col);
    current = current === CROSS ? ZERO : CROSS;
    remainingCells--;
    if (remainingCells === 0) {
        alert("Победила дружба")
    }
}


function winnerDetected(field) {
    for (let i = 0; i < 3; i++) {
        if (
            field[i][0] !== null &&
            field[i][0] === field[i][1] &&
            field[i][0] === field[i][2]
        ) {
            alert("Победил " + field[i][0]);
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (
            field[0][j] !== null &&
            field[0][j] === field[1][j] &&
            field[1][j] === field[2][j]
        ) {
            alert("Победил " + field[0][j]);
            return true;
        }
    }

    if (
        field[0][0] !== null &&
        field[0][0] === field[1][1] &&
        field[1][1] === field[2][2]
    ) {
        alert("Победил " + field[0][0]);
        return true;
    }

    if (
        field[0][2] !== null &&
        field[0][2] === field[1][1] &&
        field[1][1] === field[2][0]
    ) {
        alert("Победил " + field[0][2]);
        return true;
    }

    return false;
}


function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
