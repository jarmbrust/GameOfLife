import React, { useState, useEffect } from 'react';
import Generator from './Generator';

const Interface = props => {
  
  // these two values need to be set by user
  let numRows = 30;
  let numCols = 30;

  const [start, setStart] = useState(false);
  const [numGenerations, setNumGenerations] = useState(0);
  const [maxGenerations, setMaxGenerations] = useState(0);

  const startGenerating = () => {
    setStart(true);
  };

  const seedInitialGrid = () => {
    // resets the grid to the inital population, called from resetGame and at the start of a new game
  };

  const resetGame = () => {
    setStart(false);
    setNumGenerations(0);
    seedInitialGrid();
  }

  const setGeneration = value => {
    if (value && (value < 1 || value > 100)) {
      alert('between 1 and 100 generations allowed at this time');
    } else {
      setMaxGenerations(value);
    }
  }

  const incrementGeneration = () => {
    setNumGenerations(numGenerations + 1);
  };

  useEffect(() => {
    if (numGenerations > maxGenerations) {
      setStart(false);
    }
  }, [numGenerations, maxGenerations]);

  return (
    <>
      <div className="user-interface">
        <div>
          <button className="btn-reset" onClick={resetGame}>
            Reset
          </button>
          <button className="btn-start" onClick={startGenerating}>
            Start
          </button>
        </div>
        <div>
          <button className="btn-set-gen" onClick={setGeneration}>
            Set Max Generation
          </button>
          <input type="number" id="num-generations" name="Generations" size="7" onChange={event => setGeneration(event.target.value)}/>
        </div>
        <div>Generation: {numGenerations} out of {maxGenerations}</div>
      </div>
      <Generator 
        numRows={numRows}
        numCols={numCols}
        seedChance={0.4}
        numGenerations={maxGenerations}
        incrementGeneration={incrementGeneration}
        start={start}
        speed={700}
      />
    </>
  );
}

export default Interface;
