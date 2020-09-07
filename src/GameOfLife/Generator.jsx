// Rules of Conway's Game of life
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React from 'react';

const Generator = props => {

  // const calculateNeighbors = (board, x, y) => {
  //   let neighbors = 0;
  //   const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  //   for (let i = 0; i < dirs.length; i++) {
  //     const dir = dirs[i];
  //     let y1 = y + dir[0];
  //     let x1 = x + dir[1];
  
  //     if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
  //       neighbors++;
  //     }
  //   }
  
  //   return neighbors;
  // }





}

export default Generator;
