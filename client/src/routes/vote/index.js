import React, { Component } from 'react';
import ColourPrompt from './ColourPrompt';
import sentimo from 'api/sentimo';

export default class Vote extends Component {
	state = {
		value: 0,
		colour: 'red'
	}

	render() {
		return (
			<>
				<ColourPrompt selectColour={this.selectColour} />
				<input
				  type="range"
				  min="-1000"
				  max="1000"
				  value={this.state.value}
				  onChange={this.sendValue} />
			</>
		)
	}

	selectColour = colour => {
		this.setState({ colour })
	}

	sendValue = event => {
		this.setState({
			value: event.target.value
		}, () => {
			const { value, colour } = this.state;
			const data = { value, colour };
			sentimo.send('userUpdated', data);
		});
	}
}
