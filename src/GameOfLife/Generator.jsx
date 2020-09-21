// Rules of Conway's Game of life
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useEffect, useState, useCallback } from 'react';
import Grid from './Grid';
import Cell from './Cell';

const Generator = props => {

  // console.log('ptopd', props)

  const numRows = 20;
	const numCols = 20;
	
	const [cellGrid, setCellGrid] = useState([]);
  const [generation, setGeneration] = useState(0);


  const findNeighbors = (universe, x, y) => {
    let neighborCount = 0;
    const directions = [[-1, 0], [-1, -1], [1, 0], [1, -1], [0, 1], [1, 1], [-1, 1], [0, -1]];
    
    directions.map(dir => {
      let newx = x + dir[0];
      let newy = y + dir[1];
      let result = universe[newx] && universe[newy] && universe[newx][newy] ? universe[newx][newy].props.status : 'dead';
      neighborCount = result === 'live' ? neighborCount + 1 : neighborCount;
      return neighborCount;
    })

    // console.log('livingNeighbors', livingNeighbors, neighborCount)
    return neighborCount;
  };

  
  useEffect(() => {
    setTimeout(function () {
      if (generation < 3) {
        console.log('generation', generation);
        setGeneration(generation => generation + 1);
      }
    }, 2000);
  }, [generation]);



	const setInitialGrid = () => {
    return Math.random() < 0.2 ? 'live' : 'dead';
	};
	
	const cellStatus = () => {
		return 1;
  }
  
  
  const advanceGeneration = () => {
    const universe = cellGrid.map(grid => grid.props.children);
    console.log('universe', universe)
    
    const rows = universe.map((row) => {

      let cell = row.map(c => {
        // console.log('>>>', c );//c[index].props.cordx, c[index].props.cordy, index)
        const neighbors = findNeighbors(universe, c.props.cordx, c.props.cordy);
        // console.log('neighbors', neighbors)
        return neighbors;
      })
      
      // console.log('cell', cell);
      return cell;
      
    })
    // console.log('rows', rows)
    return rows;
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
							// pendingStatus={cellPendingStatus()} 
							cordx={i} 
							cordy={j} 
						/>
					);
				}
				addRow(<div className="row" key={i} >{cellRow}</div>);
				cellRow = [];
			}
    } 
    else {
      const gen = advanceGeneration();
      console.log('gen', gen);
      // let cellRow = [];
			// for (let i = 0; i < numRows; i++) {
			// 	for (let j = 0; j < numCols; j++) {
			// 		cellRow.push(
			// 			<Cell 
			// 				key={[i,j]} 
			// 				status={advanceGeneration()} 
			// 				// pendingStatus={cellPendingStatus()} 
			// 				cordx={i} 
			// 				cordy={j} 
			// 			/>
			// 		);
			// 	}
			// 	addRow(<div className="row" key={i} >{cellRow}</div>);
			// 	cellRow = [];
			// }
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
