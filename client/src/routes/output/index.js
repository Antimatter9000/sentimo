import React, { Component } from 'react';
import sentimo from 'api/sentimo';
import Dot from './dot';

export default class Output extends Component {
	state = {
		ctx: null,
		value: 0
	}

	render() {
		return (
			<main>
				<p>Maybe I will put a youtube video here that we have data for</p>
				<canvas
				  id="output"
				  width={window.innerWidth}
				  height={window.innerHeight} />		
			</main>
		)
	}

	componentDidMount() {
		this.setState({
			ctx: document.getElementById('output').getContext('2d')
		}, this.visualise);

		sentimo.on('update', data => {
			console.log('update received', data.value);
			this.setState({value: data.value});
		});
	}

	visualise = () => {
		setInterval(
			this.renderFrame,
			1000/60
		);
	}

	renderFrame = () => {
		this.state.ctx.clearRect(0, 0, this.state.ctx.canvas.width, this.state.ctx.canvas.height);
		let dots = [];
		if (this.state.dots && this.state.dots.length) {
			dots = this.updateDots();
		}
		dots.push(
			new Dot(this.state.value, this.state.ctx)
		);
		this.setState({dots});
	}

	updateDots() {
		return this.state.dots.map(dot => {
			dot.render();
			dot.shift();
			return dot;
		});
	}
}
