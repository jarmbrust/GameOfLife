import React, { useState } from 'react';
import Cell from './Cell';
import '../styles/App.scss';

const Grid = () => {

  const numRows = 20;
  const numCols = 20;

	const cellStatus = () => {
		return Math.random() < 0.2 ? 'live' : 'dead';
	}

	const initialBoard = () => {
		let cellRow = [];
		let cellGrid = [];
		
		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				cellRow.push(<Cell key={[i,j]} status={cellStatus()} />);
			}
			cellGrid.push(<div className="row" key={i} >{cellRow}</div>);
			cellRow = [];
		}
		return cellGrid;
	}


	return (
		<div className="grid-space">
			{initialBoard()}
    </div>
  );
};

export default Grid;
