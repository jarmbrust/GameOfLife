import React from 'react';
import '../styles/App.scss';

const Cell = props => {



  return (
    <div className={`cell ${props.status}`} />
  )
}

export default Cell;
