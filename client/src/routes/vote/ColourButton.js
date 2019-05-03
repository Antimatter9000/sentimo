import React from 'react';

export default ({ colour, selectColour }) => (
	<button
	  style={{ backgroundColor: colour }}
	  onClick={() => selectColour(colour)}>
	    {colour}
	</button>
);