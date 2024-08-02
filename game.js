import { Chess } from './chess.js';

// Logging function

function log(message) {
    console.log(message);
    // Uncomment the next line if you want to display logs on the page
    // $('#gameLog').append('<div>' + message + '</div>');
}

let board = null;
let game = null;
let customGame = {
    turn: 'w',
    gameOver: false,
    winSquares: []
};

function initializeGame(puzzleIndex) {
    log(`Initializing game with puzzle index ${puzzleIndex}`);
    game = new Chess(); // Initialize the game here
    game.clear();
    const puzzle = puzzles[puzzleIndex];
    puzzle.pieces.forEach(piece => {
        game.put({ type: piece.type, color: piece.color }, piece.position);
    });
    board.position(game.fen());
    customGame.turn = 'w';
    customGame.gameOver = false;
    customGame.winSquares = puzzle.winSquares;
    $('#status').text('');
    highlightWinSquares();
    log(`Game initialized. FEN: ${game.fen()}`);
}

function highlightWinSquares() {
    log('Highlighting win squares');
    $('.square-55d63').removeClass('highlight-win');
    if (customGame.winSquares.length > 0) {
        customGame.winSquares.forEach(square => {
            $(`#myBoard .square-${square}`).addClass('highlight-win');
        });
        log(`Win squares highlighted: ${customGame.winSquares.join(', ')}`);
    } else {
        log('Highlighting all edge squares');
        for (let i = 0; i < 8; i++) {
            $(`#myBoard .square-a${i+1}`).addClass('highlight-win');
            $(`#myBoard .square-h${i+1}`).addClass('highlight-win');
            $(`#myBoard .square-${String.fromCharCode(97+i)}1`).addClass('highlight-win');
            $(`#myBoard .square-${String.fromCharCode(97+i)}8`).addClass('highlight-win');
        }
    }
}

function onDragStart(source, piece, position, orientation) {
    log(`Drag start - Source: ${source}, Piece: ${piece}`);
    
    if (customGame.gameOver) {
        log('Drag blocked: Game is over');
        return false;
    }
    if (piece.search(/^b/) !== -1) {
        log('Drag blocked: Not a white piece');
        return false;
    }
    if (customGame.turn !== 'w') {
        log('Drag blocked: Not white\'s turn');
        return false;
    }
    if (piece !== 'wN') {
        log('Drag blocked: Not a white knight');
        return false;
    }
    
    log('Drag allowed');
    return true;
}

function onDrop(source, target) {
    log(`Attempting move from ${source} to ${target}`);
    
    let moveAttempt = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (moveAttempt === null) {
        log(`Move is illegal. FEN: ${game.fen()}`);
        return 'snapback';
    }

    log(`Move executed: ${JSON.stringify(moveAttempt)}`);
    customGame.turn = 'b';
    checkGameOver();
    if (!customGame.gameOver) {
        window.setTimeout(makeBlackMove, 250);
    }
}

function makeBlackMove() {
    log('Making black move');
    let moves = game.moves({ verbose: true });
    log(`All possible moves: ${JSON.stringify(moves)}`);
    
    moves = moves.filter(move => move.piece !== 'n');
    log(`Moves after filtering out knight moves: ${JSON.stringify(moves)}`);

    moves.sort((a, b) => {
        if (a.captured && !b.captured) return -1;
        if (!a.captured && b.captured) return 1;
        if (a.san.includes('+') && !b.san.includes('+')) return -1;
        if (!a.san.includes('+') && b.san.includes('+')) return 1;
        return 0;
    });

    if (moves.length > 0) {
        let move = moves[0];
        log(`Chosen black move: ${JSON.stringify(move)}`);
        game.move(move);
    } else {
        log('No legal moves for black');
    }

    board.position(game.fen());
    customGame.turn = 'w';
    checkGameOver();
}

function checkGameOver() {
    log('Checking if game is over');
    let knightPos = null;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let square = String.fromCharCode(97 + i) + (j + 1);
            let piece = game.get(square);
            if (piece && piece.type === 'n' && piece.color === 'w') {
                knightPos = {square: square};
                break;
            }
        }
        if (knightPos) break;
    }
    
    if (!knightPos) {
        log('Game over: Knight captured');
        $('#status').text('Game Over: Knight captured!');
        customGame.gameOver = true;
    } else if (isKnightSafe(knightPos.square)) {
        log('Game over: Knight escaped safely');
        $('#status').text('You Win: Knight escaped safely!');
        customGame.gameOver = true;
    } else {
        log('Game continues');
    }
}

function isKnightSafe(square) {
    log(`Checking if knight is safe at ${square}`);
    if (customGame.winSquares.length > 0) {
        if (!customGame.winSquares.includes(square)) {
            log(`Knight not in win squares: ${customGame.winSquares.join(', ')}`);
            return false;
        }
    } else {
        let col = square[0];
        let row = square[1];
        if (!(col === 'a' || col === 'h' || row === '1' || row === '8')) {
            log('Knight not on edge square');
            return false;
        }
    }

    let moves = game.moves({ verbose: true });
    let isSafe = !moves.some(move => move.to === square);
    log(`Knight safe: ${isSafe}`);
    return isSafe;
}

let config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};

// Initialize the board
board = Chessboard('myBoard', config);

// Add puzzle selection functionality
function selectPuzzle() {
    const puzzleIndex = document.getElementById('puzzleSelect').value;
    log(`Puzzle selected: ${puzzleIndex}`);
    initializeGame(parseInt(puzzleIndex));
}

// Initialize with the first puzzle when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGame(0);
});

// Make functions globally accessible
window.initializeGame = initializeGame;
window.selectPuzzle = selectPuzzle;
