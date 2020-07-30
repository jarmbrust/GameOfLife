import React, { useState } from 'react';
import '../styles/App.scss';

const Grid = () => {

  const numRows = 20;
  const numCols = 20;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let num of Array(numRows)) {
      rows.push(Array(numCols).fill(0));
    }
    return rows;
  });

  console.log(grid);

	return (
		<div 
			className="grid-space"
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${numCols}, 20px)`
			}}
		>
			{grid.map((rows, i) => 
				rows.map((col, j) =>  (
					<div 
						key={`${i}-${j}`} 
						className="cell"
						style={{
							backgroundColor: grid[i][j] ? 'grey' : 'white',
						  width: 20,
							height: 20,
							border: 'solid 1px black',
						}}>
					</div>
				))
      )}
      
    </div>
  );
};

export default Grid;
