/***********************************************************************************************
 * Rules of Conway's Game of life
 * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
 * Any live cell with two or three live neighbours lives on to the next generation.
 * Any live cell with more than three live neighbours dies, as if by overpopulation.
 * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 ***********************************************************************************************/

import React, { useEffect, useState, useCallback } from 'react';
import Grid from './Grid';
import Cell from './Cell';

const Generator = props => {

  const { numRows, numCols, seedChance, numGenerations, start, speed, incrementGeneration } = props;
  const [generation, setGeneration] = useState(0);
  const [gridResults, setGridResults] = useState([]);


  const findNeighbors = (universe, x, y) => {
    let neighborCount = 0;
    const directions = [[-1, 0], [-1, -1], [1, 0], [1, -1], [0, 1], [1, 1], [-1, 1], [0, -1]];
    
    directions.map(dir => {
      let newx = x + dir[0];
      let newy = y + dir[1];
      let result = universe[newx] && universe[newy] && universe[newx][newy] ? universe[newx][newy].props.status : 'dead';
      neighborCount = result === 'live' ? neighborCount + 1 : neighborCount;
      return neighborCount;
    });

    const homeCell = universe[x][y];
    if (homeCell) {
      return [homeCell.props.status, neighborCount];
    } else {
      return [];
    }
  };

   
  const mapNeighbors = useCallback(() => {
      const universe = gridResults.map(grid => grid.props.children);
      let tempGrid = [];
      universe.map(row => {
        let rows = row.map(c => {
          return findNeighbors(universe, c.props.cordx, c.props.cordy);
        });
        return tempGrid.push(rows);
      });
      return tempGrid;
  }, [gridResults]);


  const buildGrid = useCallback(() => {
    const setInitialGrid = () => {
      return Math.random() < seedChance ? 'live' : 'dead';
    };

    let cellRow = [];
    let tempGrid = [];
    let tempResults = [];
    if (generation > 0) { tempGrid = mapNeighbors(); }
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        cellRow.push(
          <Cell 
            key={[i,j]} 
            status={generation === 0 ? setInitialGrid() : cellStatus(tempGrid[i][j])} 
            cordx={i} 
            cordy={j} 
          />
        );
      }
      const row = <div className="row" key={i} >{cellRow}</div>;
      tempResults.push(row)
      cellRow = [];
    }
    return tempResults;
  }, [generation, mapNeighbors, numRows, numCols, seedChance]);


  useEffect(() => {
    const test = setInterval(function () {
      if (generation < numGenerations && start) {
        setGridResults(buildGrid())
        setGeneration(generation + 1);
        incrementGeneration();
      }
    }, speed);
    return () => {
      clearInterval(test);
    }
  }, [start, buildGrid, generation, numGenerations, speed, incrementGeneration])


	const cellStatus = cell=> {
    if (cell[0] === 'live' && cell[1] < 2) {
      return 'dead';
    } else if (cell[0] === 'live' && (cell[1] === 2 || cell[1] === 3)) {
      return 'live';
    } else if (cell[0] === 'live' && cell[1] > 3) {
      return 'dead';
    } else if (cell[0] === 'dead' && cell[1] === 3) {
      return 'live';
    } else {
      return cell[0];
    }
  }


  return (
    <Grid 
      cellGrid={gridResults}
    />
  );
}

export default Generator;
