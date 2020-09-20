// Rules of Conway's Game of life
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useEffect, useState, useCallback } from 'react';
import Grid from './Grid';
import Cell from './Cell';

const Generator = props => {

  console.log('ptopd', props)

  const numRows = 20;
	const numCols = 20;
	
	const [cellGrid, setCellGrid] = useState([]);
  const [generation, setGeneration] = useState(0);


  const findNeighbors = () => {
    const directions = [[1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0]];
  };

  
  useEffect(() => {
    setTimeout(function () {
      if (generation < 5) {
        console.log('generation', generation);
        setGeneration(generation => generation + 1);
      }
    }, 2000);
  }, [generation]);

  


  // const calculateNeighbors = (board, x, y) => {[]
  //     let x1 = x + dir[1];
  
  //     if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
  //       neighbors++;
  //     }
  //   }
  
  //   return neighbors;
  // }



	const setInitialGrid = () => {
    return Math.random() < 0.2 ? 'live' : 'dead';
	};
	
	const cellStatus = () => {
		return 1;
  }
  
  
  const advanceGeneration = () => {
    const universe = cellGrid.map(grid => grid.props.children);
    console.log('universe', universe)
    
    const rows = universe.map((row, index) => row[index].props)
    console.log('rows', rows)


    // const test2 = rows.map(grid => grid[5].props)

    // console.log('test2',test2, test2[4].x, test2[4].y, test2.x, test2.y);

    // let count = 0;
    // for (let x of test) {
    //   // console.log(value);
    //   for (let y of x) {
    //     console.log(y);
    //     // console.log(y.props.status);
    //     // console.log(y.props.x);
    //     // y.props.status = Math.random() < 0.2 ? 'live' : 'dead';
    //   }
    //   count = count + 1;
    // }

    

    // console.log('cellGrid:', cellGrid[1].props.children[0].props.x, cellGrid[0].props.children[0].props.y, cellGrid[1].props.children);
  }

  const cellPendingStatus = () => {

	}

	const addRow = row => {
		setCellGrid(cellGrid => [...cellGrid, row]);
	}


  useEffect(() => {
		if (generation === 0) {
			let cellRow = [];
			for (let i = 0; i < numRows; i++) {
				for (let j = 0; j < numCols; j++) {
					cellRow.push(
						<Cell 
							key={[i,j]} 
							status={setInitialGrid()} 
							pendingStatus={cellPendingStatus()} 
							cordx={i} 
							cordy={j} 
						/>
					);
				}
				addRow(<div className="row" key={i} >{cellRow}</div>);
				cellRow = [];
			}
		} else {
			advanceGeneration();
		}
	}, [generation]);




  return (
      <Grid 
        // cellGen={generation}
        cellGrid={cellGrid}
      />
  );


}

export default Generator;
