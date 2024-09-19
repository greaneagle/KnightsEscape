// Updated knight-move-puzzle-simple.js

let currentPuzzle = null;
let knightPosition = null;
let moveCount = 0;
let startTime = null;
let canvas, ctx;
let isDragging = false;
let dragOffset = {x: 0, y: 0};
let isPuzzleSolved = false;
let currentHoverSquare = null;
let puzzles = [];

// Fetch puzzles from the JSON file
function fetchPuzzles() {
    fetch('puzzles.json')
        .then(response => response.json())
        .then(data => {
            puzzles = data;
            initGame();
        })
        .catch(error => console.error('Error fetching puzzles:', error));
}

function initGame() {
    canvas = document.getElementById('gameBoard');
    ctx = canvas.getContext('2d');
    
    populatePuzzleDropdown();
    addEventListeners(); // Now defined below
    
    // Load the first puzzle by default
    loadPuzzle(puzzles[0]);
}

function populatePuzzleDropdown() {
    const puzzleSelect = document.getElementById('puzzleSelect');
    puzzles.forEach((puzzle, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = puzzle.name;
        puzzleSelect.appendChild(option);
    });

    puzzleSelect.addEventListener('change', function() {
        loadPuzzle(puzzles[this.value]);
    });
}

function addEventListeners() {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleCanvasClick);
    
    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'Reload Puzzle';
    reloadButton.addEventListener('click', () => loadPuzzle(currentPuzzle));
    document.body.appendChild(reloadButton);
}

function loadPuzzle(puzzle) {
    currentPuzzle = puzzle;
    knightPosition = {...puzzle.knightStart};
    moveCount = 0;
    startTime = null;
    isPuzzleSolved = false;
    updateBoard();
    updateStatus();
}

function updateBoard(dragX = null, dragY = null) {
    const tileSize = Math.min(canvas.width / currentPuzzle.boardSize.x, canvas.height / currentPuzzle.boardSize.y);
    canvas.width = currentPuzzle.boardSize.x * tileSize;
    canvas.height = currentPuzzle.boardSize.y * tileSize;

	    // Highlight the knight's current square while dragging
    if (isDragging) {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(knightPosition.x * tileSize, knightPosition.y * tileSize, tileSize, tileSize);

    for (let x = 0; x < currentPuzzle.boardSize.x; x++) {
        for (let y = 0; y < currentPuzzle.boardSize.y; y++) {
            if (currentPuzzle.unavailableSquares.some(sq => sq.x === x && sq.y === y)) {
                ctx.fillStyle = '#808080'; // Unavailable squares
            } else {
                ctx.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#c0c0c0';
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
	


        // Highlight valid move squares
        for (let x = 0; x < currentPuzzle.boardSize; x++) {
            for (let y = 0; y < currentPuzzle.boardSize; y++) {
                if (isValidKnightMove(x, y)) {
                    if (currentHoverSquare && currentHoverSquare.x === x && currentHoverSquare.y === y) {
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
                    } else {
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.0)';
                    }
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    // Draw the knight
    ctx.fillStyle = '#000000';
    ctx.font = `${tileSize * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const knightX = dragX !== null ? dragX : (knightPosition.x + 0.5) * tileSize;
    const knightY = dragY !== null ? dragY : (knightPosition.y + 0.5) * tileSize;
    ctx.fillText('♞', knightX, knightY);

    // Draw win squares
    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    currentPuzzle.winSquares.forEach(square => {
        ctx.fillRect(square.x * tileSize, square.y * tileSize, tileSize, tileSize);
    });
}


function updateBoard(dragX = null, dragY = null) {
    const tileSize = Math.min(canvas.width / currentPuzzle.boardSize.x, canvas.height / currentPuzzle.boardSize.y);
    canvas.width = currentPuzzle.boardSize.x * tileSize;
    canvas.height = currentPuzzle.boardSize.y * tileSize;

    // Draw the board and handle unavailable squares
    for (let x = 0; x < currentPuzzle.boardSize.x; x++) {
        for (let y = 0; y < currentPuzzle.boardSize.y; y++) {
            if (currentPuzzle.unavailableSquares.some(sq => sq.x === x && sq.y === y)) {
                ctx.fillStyle = '#808080'; // Unavailable squares
            } else {
                ctx.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#c0c0c0';
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
   // Highlight the knight's current square while dragging
    if (isDragging) {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(knightPosition.x * tileSize, knightPosition.y * tileSize, tileSize, tileSize);

		// Highlight valid move squares if dragging
		if (isDragging) {
			for (let x = 0; x < currentPuzzle.boardSize.x; x++) {
				for (let y = 0; y < currentPuzzle.boardSize.y; y++) {
					if (!currentPuzzle.unavailableSquares.some(sq => sq.x === x && sq.y === y) && isValidKnightMove(x, y)) {
						if (currentHoverSquare && currentHoverSquare.x === x && currentHoverSquare.y === y) {
							ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'; // Highlight with a green overlay
						} else {
							ctx.fillStyle = 'rgba(0, 255, 0, 0.0)'; // Slight highlight for valid move squares
						}
						ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
					}
				}
			}
		}
	}

    // Draw the knight
    ctx.fillStyle = '#000000';
    ctx.font = `${tileSize * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const knightX = dragX !== null ? dragX : (knightPosition.x + 0.5) * tileSize;
    const knightY = dragY !== null ? dragY : (knightPosition.y + 0.5) * tileSize;
    ctx.fillText('♞', knightX, knightY);

    // Highlight win squares
    ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    currentPuzzle.winSquares.forEach(square => {
        ctx.fillRect(square.x * tileSize, square.y * tileSize, tileSize, tileSize);
    });
}






function handleMouseDown(event) {
    if (isPuzzleSolved) return;
    const {x, y} = getBoardCoordinates(event);
    if (x === knightPosition.x && y === knightPosition.y) {
        isDragging = true;
        const tileSize = Math.min(canvas.width / currentPuzzle.boardSize.x, canvas.height / currentPuzzle.boardSize.y);
        dragOffset.x = event.clientX - (knightPosition.x + 0.5) * tileSize;
        dragOffset.y = event.clientY - (knightPosition.y + 0.5) * tileSize;
        updateBoard(event.clientX - dragOffset.x, event.clientY - dragOffset.y);
    }
}

function handleMouseMove(event) {
    if (!isDragging) return;
    const dragX = event.clientX - dragOffset.x;
    const dragY = event.clientY - dragOffset.y;
    currentHoverSquare = getBoardCoordinates(event);
    updateBoard(dragX, dragY);
}

function handleMouseUp(event) {
    if (!isDragging) return;
    isDragging = false;
    currentHoverSquare = null;
    const {x, y} = getBoardCoordinates(event);
    tryMoveKnight(x, y);
}

function handleCanvasClick(event) {
    if (isDragging || isPuzzleSolved) return;
    const {x, y} = getBoardCoordinates(event);
    tryMoveKnight(x, y);
}

function getBoardCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((event.clientX - rect.left) * scaleX / (canvas.width / currentPuzzle.boardSize.x));
    const y = Math.floor((event.clientY - rect.top) * scaleY / (canvas.height / currentPuzzle.boardSize.y));
    return {x, y};
}

function tryMoveKnight(x, y) {
    if (!startTime) {
        startTime = new Date();
    }
    
    if (isValidKnightMove(x, y)) {
        knightPosition = {x, y};
        moveCount++;
        updateBoard();
        updateStatus();
        checkWinCondition();
    } else {
        updateBoard(); // Redraw the board to snap the knight back to its original position
    }
}

function isValidKnightMove(x, y) {
    if (currentPuzzle.unavailableSquares.some(sq => sq.x === x && sq.y === y)) {
        return false;
    }
    const dx = Math.abs(x - knightPosition.x);
    const dy = Math.abs(y - knightPosition.y);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
}

function checkWinCondition() {
    if (currentPuzzle.winSquares.some(square => square.x === knightPosition.x && square.y === knightPosition.y)) {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
        const statusMessage = `Congratulations! You solved the puzzle in ${moveCount} moves and ${timeTaken.toFixed(2)} seconds.`;
        document.getElementById('status').textContent = statusMessage;
        isPuzzleSolved = true;
    }
}

function updateStatus() {
    const statusMessage = `Moves: ${moveCount}`;
    document.getElementById('moveCount').textContent = statusMessage;
}

window.onload = fetchPuzzles;