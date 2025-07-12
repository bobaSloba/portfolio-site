import React, { useState } from 'react';

export default function TicTacToe({ onClose }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', color: 'black' }}>
        <h2>Tic-Tac-Toe Easter Egg!</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px', margin: '20px auto' }}>
          {board.map((cell, i) => (
            <button key={i} onClick={() => handleClick(i)} style={{ width: '50px', height: '50px', fontSize: '24px' }}>
              {cell}
            </button>
          ))}
        </div>
        <p>{winner ? `Winner: ${winner}` : `Next: ${xIsNext ? 'X' : 'O'}`}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}