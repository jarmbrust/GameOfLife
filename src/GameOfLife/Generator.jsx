// Rules of Conway's Game of life
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import React, { useEffect, useState, useCallback, useRef } from 'react';
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
    
    // console.log('(universe, x, y)',universe, x, y)


    directions.map(dir => {
      let newx = x + dir[0];
      let newy = y + dir[1];
      let result = universe[newx] && universe[newy] && universe[newx][newy] ? universe[newx][newy].props.status : 'dead';
      neighborCount = result === 'live' ? neighborCount + 1 : neighborCount;
      return neighborCount;
    })

    const homeCell = universe[x][y];
    console.log('homeCell', homeCell, neighborCount);
    if (homeCell) {
      return [homeCell.props.status, neighborCount];
    } 
    //else ??
  };

  

  // const [count, setCount] = React.useState(0);
  // React.useEffect( () => {
  //   const i_id = setInterval(() => {
  //     setCount(currCount => currCount+1)
  //   },3000);
  //   return () => {
  //     clearInterval(i_id);
  //   }
  // },[]);
  
  // const advanceGeneration = () => {
  //   const universe = cellGrid.map(grid => grid.props.children);
  //   const rows = universe.map((row) => {
  //     let cell = row.map(c => {
  //       const neighbors = findNeighbors(universe, c.props.cordx, c.props.cordy);
  //       return neighbors;
  //     });
  //     return cell;
  //   });
  //   return rows;
  // }

  // const addRowCallback = useCallback(() => {
    const addRow = row => {
      console.log('row', row)
      setCellGrid(cellGrid => [...cellGrid, row]);
      // gridRef.current = cellGrid;
    }
    // return addRow;
  // }, [cellGrid]);



  const advanceGenerationCallback = useCallback(() => {
    const universe = cellGrid.map(grid => grid.props.children);
    const rows = universe.map((row) => {
      let cell = row.map(c => {
        const neighbors = findNeighbors(universe, c.props.cordx, c.props.cordy);
        return neighbors;
      });
      return cell;
    });
    return rows;
  },[cellGrid]);


  const gridRef = useRef([]);
  gridRef.current = [];



  useEffect(() => {
    const test = setInterval(function () {
      if (generation < 3) {
        console.log('GENERATION:::', generation);
        setGeneration(generation => generation + 1);
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
            addRow(<div className="row" key={i} >{cellRow}</div>, i);
            cellRow = [];
          }
        } else {
          const gen = advanceGenerationCallback();
          console.log('gen>>>', gen);
          let cellRow = [];
          setCellGrid([]);
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              console.log('<><><><><><> ', cellStatus(gen[i][j]));
              cellRow.push(
                <Cell 
                  key={[i,j]}
                  status={cellStatus(gen[i][j])}
                  cordx={i}
                  cordy={j}
                />
              );
            }
            
            addRow(<div className="row" key={i} >{cellRow}</div>, i);
            cellRow = [];

          }
        }
      }
      // return;
    }, 2000);
    return () => {
      clearInterval(test);
    }
  }, [generation, advanceGenerationCallback]);



	const setInitialGrid = () => {
    return Math.random() < 0.2 ? 'live' : 'dead';
	};
	
	const cellStatus = cell=> {
    // console.log(':::::',cell[0], cell[1]);
    if (cell[0] === 'alive' && cell[1] < 2) {
      return 'dead';
    } else if (cell[0] === 'alive' && (cell[1] === 2 || cell[1] === 3)) {
      return 'alive';
    } else if (cell[0] === 'alive' && cell[1] > 3) {
      return 'dead';
    } else if (cell[0] === 'dead' && cell[1] === 3) {
      return 'alive';
    } else {
      return cell[0];
    }
  }
  



  



  // useEffect(() => {
		// if (generation === 0) {
		// 	let cellRow = [];
		// 	for (let i = 0; i < numRows; i++) {
		// 		for (let j = 0; j < numCols; j++) {
		// 			cellRow.push(
		// 				<Cell 
		// 					key={[i,j]} 
		// 					status={setInitialGrid()} 
		// 					// pendingStatus={cellPendingStatus()} 
		// 					cordx={i} 
		// 					cordy={j} 
		// 				/>
		// 			);
		// 		}
		// 		addRow(<div className="row" key={i} >{cellRow}</div>);
		// 		cellRow = [];
		// 	}
    // } else {
    //   const gen = advanceGeneration();
      
    //   console.log('gen>>>', gen);
    //   let cellRow = [];
    //   setCellGrid([]);
		// 	for (let i = 0; i < numRows; i++) {
		// 		for (let j = 0; j < numCols; j++) {
		// 			cellRow.push(
		// 				<Cell 
		// 					key={[i,j]} 
		// 					status={cellStatus(gen[i][j])} 
		// 					cordx={i} 
		// 					cordy={j} 
		// 				/>
		// 			);
		// 		}
		// 		addRow(<div className="row" key={i} >{cellRow}</div>);
		// 		cellRow = [];
		// 	}
		// }
	// }, [generation]);



  // console.log('cellGrid', cellGrid)

  return (
      <Grid 
        // cellGen={generation}
        cellGrid={cellGrid}
      />
  );


}

export default Generator;
