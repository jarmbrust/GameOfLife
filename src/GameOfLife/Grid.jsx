import React, { useState } from 'react';


const Grid = () => {

  const numRows = 10;
  const numCols = 10;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let num of Array(numRows)) {
      console.log('test')
      rows.push(Array(numCols).fill(0));
    }
    return rows;
  });

  console.log(grid);

  return (
    <>
      <span>Grid goes here.</span>
    </>
  );
};

export default Grid;
