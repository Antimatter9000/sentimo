import React, { Component } from 'react';
import sentimo from 'api/sentimo';

export default class Vote extends Component {
	state = {
		value: 0
	}

	render() {
		return (
			<>
				<p>A slider will go here</p>
				<input
				  type="range"
				  min="-1000"
				  max="1000"
				  value={this.state.value}
				  onChange={this.sendValue} />
			</>
		)
	}

	sendValue = event => {
		this.setState({
			value: event.target.value
		});
		sentimo.send('userUpdated', event.target.value);
	}
}
