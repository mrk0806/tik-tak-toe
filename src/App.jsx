/* eslint-disable react/prop-types */

import { useState } from "react"


function Sequare({value, onSquareClick}) {

  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({xIsNext, square, onPlay, draw}) {
  function handleClick(i){
    if(square[i] || calculateWinner(square)) return;
    const nextSquares = square.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
    
  }

  const winner = calculateWinner(square);
  const status = winner ? `Winner ${winner}` : draw ? 'Draw' : `Next Player ${xIsNext ? 'X' : 'O'}`;
  
  
  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Sequare value={square[0]} onSquareClick={()=>handleClick(0)}/>
        <Sequare value={square[1]} onSquareClick={()=>handleClick(1)}/>
        <Sequare value={square[2]} onSquareClick={()=>handleClick(2)}/>
        <Sequare value={square[3]} onSquareClick={()=>handleClick(3)}/>
        <Sequare value={square[4]} onSquareClick={()=>handleClick(4)}/>
        <Sequare value={square[5]} onSquareClick={()=>handleClick(5)}/>
        <Sequare value={square[6]} onSquareClick={()=>handleClick(6)}/>
        <Sequare value={square[7]} onSquareClick={()=>handleClick(7)}/>
        <Sequare value={square[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  )
}

export default function Game(){
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [draw, setDraw] = useState(false); 

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    if (draw) {
      setDraw(false);
    }
  }

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    const winner = calculateWinner(nextSquares);

    if (!winner && nextHistory.length === 10) {
      setDraw(true); 
    }
  }

  const moves = history.map((square, move)=>{
    let description = '';
    if(move > 0){
      description='Go to move # '+move;
    }else{
      description = 'Go to start game';
    }
    return (
      <li key={move}>
          <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    );
  })
  return(
    <div>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} square={currentSquares} onPlay={handlePlay} draw={draw}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }
  return false
}