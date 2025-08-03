# Tic-Tac-Toe Practice

Classic algorithm and game logic practice for interviews.

## 🎯 Why Tic-Tac-Toe?

- **Game logic**: State management and rules
- **Algorithms**: Win detection, minimax (AI)
- **Data structures**: 2D arrays, board representation
- **React**: Component-based UI
- **TypeScript**: Type safety for game state

## 🚀 React + TypeScript Setup

### Create React App with TypeScript
```bash
npx create-react-app tic-tac-toe-game --template typescript
cd tic-tac-toe-game
npm install
npm start
```

## ⚡ Quick Interview Implementation (Single File)

**For live coding interviews** - copy-paste ready TypeScript React component:

```typescript
import React, { useState } from 'react';

// Types
type Player = 'X' | 'O';
type Square = Player | null;
type Board = Square[];

// Game Logic
const checkWinner = (board: Board): Player | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
};

const isBoardFull = (board: Board): boolean => 
  board.every(square => square !== null);

// Main Component
function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner('draw' as any); // Quick hack for draw state
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Tic-Tac-Toe</h1>
      
      <div style={{ fontSize: '1.2rem', margin: '1rem' }}>
        {winner === 'draw' ? (
          "It's a draw! 🤝"
        ) : winner ? (
          `${winner} wins! 🎉`
        ) : (
          `Current player: ${currentPlayer}`
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gap: '4px',
        justifyContent: 'center',
        margin: '1rem auto'
      }}>
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '80px',
              height: '80px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              cursor: square ? 'not-allowed' : 'pointer',
              backgroundColor: square ? '#f0f0f0' : 'white',
              border: '2px solid #333',
              borderRadius: '4px'
            }}
            disabled={!!square || !!winner}
          >
            {square}
          </button>
        ))}
      </div>

      <button 
        onClick={resetGame}
        style={{
          padding: '8px 16px',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        🔄 New Game
      </button>
    </div>
  );
}

export default TicTacToe;
```

**Usage:** Just replace your `App.tsx` content with:
```typescript
import TicTacToe from './TicTacToe'; // or wherever you put the component

function App() {
  return <TicTacToe />;
}

export default App;
```

### 🎯 Interview Talking Points:
1. **TypeScript types** - `Player`, `Square`, `Board` for type safety
2. **Pure functions** - `checkWinner()` and `isBoardFull()` are testable
3. **Immutable updates** - Using spread operator for state updates
4. **React hooks** - `useState` for component state management
5. **Inline styles** - Quick styling without external CSS files
6. **Event handling** - Click handlers with proper TypeScript typing

**Time to implement:** ~10-15 minutes in an interview setting! ⚡

## 📁 Full Project Structure (For Reference)

```
src/
├── components/
│   ├── TicTacToe/
│   │   ├── TicTacToe.tsx
│   │   ├── TicTacToe.module.css
│   │   └── index.ts
│   ├── Board/
│   │   ├── Board.tsx
│   │   ├── Board.module.css
│   │   └── index.ts
│   ├── Square/
│   │   ├── Square.tsx
│   │   ├── Square.module.css
│   │   └── index.ts
│   └── index.ts          # Export all components
├── types/
│   └── game.ts           # Game-related types
├── utils/
│   └── gameLogic.ts      # Game logic functions
├── App.tsx
└── index.tsx
```

## 🔧 Adding to Your App

### 1. Create Game Types
```typescript
// src/types/game.ts
export type Player = 'X' | 'O';
export type Square = Player | null;
export type Board = Square[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  status: GameStatus;
}
```

### 2. Game Logic Utilities
```typescript
// src/utils/gameLogic.ts
import { Board, Player } from '../types/game';

export const checkWinner = (board: Board): Player | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(square => square !== null);
};

export const makeMove = (board: Board, index: number, player: Player): Board => {
  if (board[index] !== null) {
    return board; // Invalid move
  }
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};
```

### 3. Main Game Component
```typescript
// src/components/TicTacToe/TicTacToe.tsx
import React, { useState } from 'react';
import { Board } from '../Board';
import { GameState, Player, Square } from '../../types/game';
import { checkWinner, isBoardFull, makeMove } from '../../utils/gameLogic';
import styles from './TicTacToe.module.css';

const initialBoard: Square[] = Array(9).fill(null);

export function TicTacToe() {
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard,
    currentPlayer: 'X',
    winner: null,
    status: 'playing'
  });

  const handleSquareClick = (index: number) => {
    if (gameState.board[index] || gameState.winner) {
      return; // Square occupied or game over
    }

    const newBoard = makeMove(gameState.board, index, gameState.currentPlayer);
    const winner = checkWinner(newBoard);
    const isDrawn = !winner && isBoardFull(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      status: winner ? 'won' : isDrawn ? 'draw' : 'playing'
    });
  };

  const resetGame = () => {
    setGameState({
      board: initialBoard,
      currentPlayer: 'X',
      winner: null,
      status: 'playing'
    });
  };

  return (
    <div className={styles.game}>
      <h1>Tic-Tac-Toe</h1>
      
      <div className={styles.status}>
        {gameState.winner ? (
          <span className={styles.winner}>🎉 {gameState.winner} wins!</span>
        ) : gameState.status === 'draw' ? (
          <span className={styles.draw}>🤝 It's a draw!</span>
        ) : (
          <span>Current player: <strong>{gameState.currentPlayer}</strong></span>
        )}
      </div>

      <Board 
        board={gameState.board} 
        onSquareClick={handleSquareClick} 
      />

      <button 
        className={styles.resetButton} 
        onClick={resetGame}
      >
        🔄 New Game
      </button>
    </div>
  );
}
```

### 4. Add to App.tsx
```typescript
// src/App.tsx
import { TicTacToe } from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TicTacToe />
      </header>
    </div>
  );
}

export default App;
```

### 5. Component Exports
```typescript
// src/components/index.ts
export { TicTacToe } from './TicTacToe';
export { Board } from './Board';
export { Square } from './Square';
```

## 🧩 Additional Components (TypeScript)

### Board Component
```typescript
// src/components/Board/Board.tsx
import React from 'react';
import { Square } from '../Square';
import { Board as BoardType } from '../../types/game';
import styles from './Board.module.css';

interface BoardProps {
  board: BoardType;
  onSquareClick: (index: number) => void;
}

export function Board({ board, onSquareClick }: BoardProps) {
  return (
    <div className={styles.board}>
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
```

### Square Component
```typescript
// src/components/Square/Square.tsx
import React from 'react';
import { Square as SquareType } from '../../types/game';
import styles from './Square.module.css';

interface SquareProps {
  value: SquareType;
  onClick: () => void;
}

export function Square({ value, onClick }: SquareProps) {
  return (
    <button 
      className={`${styles.square} ${value ? styles.filled : ''}`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}
```

## 🎨 Basic CSS Styling

### TicTacToe.module.css
```css
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.status {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.winner {
  color: #28a745;
  font-weight: bold;
}

.draw {
  color: #6c757d;
  font-weight: bold;
}

.resetButton {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.resetButton:hover {
  background-color: #0056b3;
}
```

### Board.module.css
```css
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 300px;
  height: 300px;
  background-color: #333;
  padding: 4px;
  border-radius: 8px;
}
```

### Square.module.css
```css
.square {
  background-color: white;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
}

.square:hover:not(:disabled) {
  background-color: #f8f9fa;
}

.square:disabled {
  cursor: not-allowed;
}

.filled {
  background-color: #e9ecef;
}
```

## 🧠 Interview Variations

### 1. **Basic Questions**
- Implement the game logic
- Check for winner
- Handle invalid moves

### 2. **Advanced Questions** 
- Add AI player (minimax algorithm)
- Make it N×N instead of 3×3
- Add move history and undo
- Optimize win checking for large boards

### 3. **Minimax Algorithm (AI)**
```javascript
function minimax(board, depth, isMaximizing, player, opponent) {
  const winner = checkWinner(board);
  
  // Base cases
  if (winner === player) return 10 - depth;
  if (winner === opponent) return depth - 10;
  if (isBoardFull(board)) return 0;
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = player;
        const eval = minimax(board, depth + 1, false, player, opponent);
        board[i] = '';
        maxEval = Math.max(maxEval, eval);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = opponent;
        const eval = minimax(board, depth + 1, true, player, opponent);
        board[i] = '';
        minEval = Math.min(minEval, eval);
      }
    }
    return minEval;
  }
}

function getBestMove(board, player) {
  let bestMove = -1;
  let bestValue = -Infinity;
  const opponent = player === 'X' ? 'O' : 'X';
  
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = player;
      const moveValue = minimax(board, 0, false, player, opponent);
      board[i] = '';
      
      if (moveValue > bestValue) {
        bestMove = i;
        bestValue = moveValue;
      }
    }
  }
  
  return bestMove;
}
```

## ⚡ Key Points for Interviews

1. **Start simple** - Basic 3×3 grid, two players
2. **Clean code** - Separate concerns (game logic vs UI)
3. **Edge cases** - Invalid moves, game over scenarios
4. **Optimization** - Early returns, efficient win checking
5. **Testing** - Think about how you'd test each function

## 🎮 Practice Challenges

1. **Basic**: Implement working 2-player game
2. **Intermediate**: Add simple AI (random moves)
3. **Advanced**: Implement minimax AI
4. **Expert**: Make it N×N with M-in-a-row to win

## 🔗 Resources

- [Minimax Algorithm Explained](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/)
- [React Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)