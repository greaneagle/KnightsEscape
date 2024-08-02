const puzzles = [
    {
        name: "Original Puzzle",
        pieces: [
            { type: 'n', color: 'w', position: 'd4' },
            { type: 'p', color: 'b', position: 'a7' },
            { type: 'p', color: 'b', position: 'b7' },
            { type: 'p', color: 'b', position: 'c7' },
            { type: 'p', color: 'b', position: 'd7' },
            { type: 'p', color: 'b', position: 'e7' },
            { type: 'p', color: 'b', position: 'f7' },
            { type: 'p', color: 'b', position: 'g7' },
            { type: 'p', color: 'b', position: 'h7' },
            { type: 'r', color: 'b', position: 'a1' },
            { type: 'b', color: 'b', position: 'h1' }
        ],
        winSquares: [] // Empty means any edge square
    },
    {
        name: "Surrounded Knight",
        pieces: [
            { type: 'n', color: 'w', position: 'e4' },
            { type: 'p', color: 'b', position: 'd5' },
            { type: 'p', color: 'b', position: 'e5' },
            { type: 'p', color: 'b', position: 'f5' },
            { type: 'r', color: 'b', position: 'a1' },
            { type: 'b', color: 'b', position: 'h8' }
        ],
        winSquares: ['a1', 'h1', 'a8', 'h8'] // Knight must reach a corner
    },
        {
        name: "Knight's Corridor",
        pieces: [
            { type: 'n', color: 'w', position: 'd4' },
            { type: 'p', color: 'b', position: 'c3' },
            { type: 'p', color: 'b', position: 'c5' },
            { type: 'p', color: 'b', position: 'e3' },
            { type: 'p', color: 'b', position: 'e5' },
            { type: 'r', color: 'b', position: 'a1' },
            { type: 'r', color: 'b', position: 'h1' }
        ],
        winSquares: ['a4', 'h4']
    },
    {
        name: "Pawn Wall",
        pieces: [
            { type: 'n', color: 'w', position: 'e1' },
            { type: 'p', color: 'b', position: 'a7' },
            { type: 'p', color: 'b', position: 'b6' },
            { type: 'p', color: 'b', position: 'c5' },
            { type: 'p', color: 'b', position: 'd4' },
            { type: 'p', color: 'b', position: 'e3' },
            { type: 'p', color: 'b', position: 'f2' },
            { type: 'b', color: 'b', position: 'h8' }
        ],
        winSquares: ['h1', 'g1', 'f1']
    },
    {
        name: "Bishop's Cross",
        pieces: [
            { type: 'n', color: 'w', position: 'e4' },
            { type: 'b', color: 'b', position: 'a1' },
            { type: 'b', color: 'b', position: 'h1' },
            { type: 'b', color: 'b', position: 'a8' },
            { type: 'b', color: 'b', position: 'h8' },
            { type: 'p', color: 'b', position: 'd5' },
            { type: 'p', color: 'b', position: 'f5' }
        ],
        winSquares: ['a4', 'h4', 'e1', 'e8']
    },
    {
        name: "Rook's Fortress",
        pieces: [
            { type: 'n', color: 'w', position: 'd5' },
            { type: 'r', color: 'b', position: 'a1' },
            { type: 'r', color: 'b', position: 'h1' },
            { type: 'r', color: 'b', position: 'a8' },
            { type: 'r', color: 'b', position: 'h8' },
            { type: 'p', color: 'b', position: 'c6' },
            { type: 'p', color: 'b', position: 'e6' }
        ],
        winSquares: ['b3', 'c2', 'f2', 'g3']
    },
    {
        name: "Pawn Maze",
        pieces: [
            { type: 'n', color: 'w', position: 'e4' },
            { type: 'p', color: 'b', position: 'b2' },
            { type: 'p', color: 'b', position: 'd2' },
            { type: 'p', color: 'b', position: 'f2' },
            { type: 'p', color: 'b', position: 'c3' },
            { type: 'p', color: 'b', position: 'e3' },
            { type: 'p', color: 'b', position: 'g3' },
            { type: 'p', color: 'b', position: 'b4' },
            { type: 'p', color: 'b', position: 'd4' },
            { type: 'p', color: 'b', position: 'f4' },
            { type: 'r', color: 'b', position: 'a1' }
        ],
        winSquares: ['h1', 'h2', 'h3', 'h4']
    },
    {
        name: "Queen's Challenge",
        pieces: [
            { type: 'n', color: 'w', position: 'd4' },
            { type: 'q', color: 'b', position: 'e8' },
            { type: 'p', color: 'b', position: 'c3' },
            { type: 'p', color: 'b', position: 'e3' },
            { type: 'p', color: 'b', position: 'c5' },
            { type: 'p', color: 'b', position: 'e5' }
        ],
        winSquares: ['a1', 'a4', 'a7', 'h1', 'h4', 'h7']
    },
    {
        name: "Knight's Dilemma",
        pieces: [
            { type: 'n', color: 'w', position: 'e4' },
            { type: 'r', color: 'b', position: 'a1' },
            { type: 'b', color: 'b', position: 'h8' },
            { type: 'p', color: 'b', position: 'd3' },
            { type: 'p', color: 'b', position: 'f3' },
            { type: 'p', color: 'b', position: 'd5' },
            { type: 'p', color: 'b', position: 'f5' }
        ],
        winSquares: ['c2', 'g2', 'c6', 'g6']
    },
    {
        name: "Trapped in the Center",
        pieces: [
            { type: 'n', color: 'w', position: 'd5' },
            { type: 'p', color: 'b', position: 'c4' },
            { type: 'p', color: 'b', position: 'e4' },
            { type: 'p', color: 'b', position: 'c6' },
            { type: 'p', color: 'b', position: 'e6' },
            { type: 'r', color: 'b', position: 'a5' },
            { type: 'r', color: 'b', position: 'h5' },
            { type: 'b', color: 'b', position: 'd1' },
            { type: 'b', color: 'b', position: 'd8' }
        ],
        winSquares: ['b3', 'b7', 'f3', 'f7']
    },
    {
        name: "Escape the Box",
        pieces: [
            { type: 'n', color: 'w', position: 'e4' },
            { type: 'p', color: 'b', position: 'd3' },
            { type: 'p', color: 'b', position: 'e3' },
            { type: 'p', color: 'b', position: 'f3' },
            { type: 'p', color: 'b', position: 'd5' },
            { type: 'p', color: 'b', position: 'e5' },
            { type: 'p', color: 'b', position: 'f5' },
            { type: 'p', color: 'b', position: 'd4' },
            { type: 'p', color: 'b', position: 'f4' }
        ],
        winSquares: [] // Any edge square
    },
    {
        name: "Long Journey",
        pieces: [
            { type: 'n', color: 'w', position: 'a1' },
            { type: 'p', color: 'b', position: 'c2' },
            { type: 'p', color: 'b', position: 'e2' },
            { type: 'p', color: 'b', position: 'g2' },
            { type: 'p', color: 'b', position: 'b3' },
            { type: 'p', color: 'b', position: 'd3' },
            { type: 'p', color: 'b', position: 'f3' },
            { type: 'p', color: 'b', position: 'h3' },
            { type: 'r', color: 'b', position: 'h1' }
        ],
        winSquares: ['h8']
    }
];