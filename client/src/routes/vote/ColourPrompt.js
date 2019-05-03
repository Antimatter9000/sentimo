import React from 'react';
import ColourButton from './ColourButton';

export default ({ selectColour }) => (
	<div className="colour-prompt">
		<h3>Pick your favourite colour</h3>
		<ColourButton selectColour={selectColour} colour="red" />
		<ColourButton selectColour={selectColour} colour="yellow" />
	</div>
)
