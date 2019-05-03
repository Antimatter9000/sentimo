import React from 'react';

export default ({ colour, selectColour }) => (
    <button
      style={{
        backgroundColor: colour,
        width: '80%',
        padding: '10px',
        margin: '5px auto',
        color: 'white'
      }}
      onClick={() => selectColour(colour)}>
        {colour}
    </button>
);