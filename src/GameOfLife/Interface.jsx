import React from 'react';

const Interface = props => {
  
  const startGenerating = () => {

  };

  const populateGrid = () => {

  };

  return (
    <div>
      <button className="btn-seed" onClick={populateGrid()}>
        Seed
      </button>
      <button className="btn-start" onClick={startGenerating()}>
        Start
      </button>
    </div>
  );
}

export default Interface;
