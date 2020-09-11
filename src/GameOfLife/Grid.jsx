import React, { useState, useEffect } from 'react';

import '../styles/App.scss';

const Grid = props => {

  
	
	return (
		<div className="grid-space">
			{props.cellGrid}
    </div>
  );
};

export default Grid;
