import React, { useState, useEffect } from 'react';

import '../styles/App.scss';

const Grid = props => {

  console.log('props.cellGrid', props.cellGrid)
	
	return (
		<div className="grid-space">
			{props.cellGrid}
    </div>
  );
};

export default Grid;
