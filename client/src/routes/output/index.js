import React, { Component } from 'react';
import sentimo from 'api/sentimo';
import Dot from './dot';

export default class Output extends Component {
	state = {
		ctx: null,
		value: 0,
		dots: {},
		colours: []
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
		const ctx = document.getElementById('output').getContext('2d');
		this.setState({
			ctx,
			dots: {
				black: [new Dot('black', 0, ctx)]
			}
		}, this.visualise);

		sentimo.on('update', data => {
			console.log('update received', data.value);
			this.setState(prevState => {
				console.log(prevState.dots);
				const newDot = new Dot(data.colour, data.value, this.state.ctx);
				const newBlackDots = this.newAverage(newDot);
				let newDots = prevState.dots;
				if (newDots[data.colour]) {
					newDots[data.colour].push(newDot);
				} else {
					newDots[data.colour] = [newDot]
				}
				
				return {
					value: data.value,
					dots: newDots,
				}
			});
		});
	}

	newAverage = (newDot) => {
		const total = Object.keys(this.state.dots).reduce((subTotal, key) => {
			if (key !== 'black') {
				console.log(this.state.dots[key][this.state.dots[key].length - 1]);
				subTotal += this.state.dots[key][this.state.dots[key].length - 1].value
			}
			return subTotal;
		}, 0);
		console.log(total);
		const average = total/Object.keys(this.state.dots).length;
		const newBlackDot = new Dot('black', average, this.state.ctx);
		const newBlackDots = this.state.dots.black.length
			? [...this.state.dots.black, newBlackDot]
			: [newBlackDot];
		console.log('black dots will now be', newBlackDots);
		this.setState(prevState => ({
			dots: {
				...prevState.dots,
				black: newBlackDots
			}
		}));
	}

	visualise = () => {
		setInterval(
			this.renderFrame,
			1000/60
		);
	}

	renderFrame = () => {
		this.state.ctx.clearRect(0, 0, this.state.ctx.canvas.width, this.state.ctx.canvas.height);
		console.log(this.state.dots);
		Object.keys(this.state.dots).forEach(colour => {
			console.log(colour);
			this.renderLine(colour);
		});
	}

	renderLine(colour) {
		const dots = this.state.dots[colour];
		if (dots.length) {
			this.state.ctx.beginPath();
			this.state.ctx.moveTo(dots[0].x, dots[0].y);
			dots.forEach(dot => {
				this.state.ctx.lineTo(dot.x, dot.y);
			});
			this.state.ctx.lineTo(this.state.ctx.canvas.width/2, dots[dots.length-1].y);
			this.state.ctx.strokeStyle = colour;
			this.state.ctx.stroke();
			this.setState(prevState => {
				const updatedDots = {
					...prevState.dots,
					[colour]: this.updateDots(dots)
				}
				return { dots: updatedDots }
			});
		}
	}

	updateDots(dots) {
		return dots.reduce((arr, dot) => {
			if (!dot.dead || dots.length === 1) {
				dot.render(this.state.ctx);
				dot.shift();
				arr.push(dot);
			}
			return arr;
		}, []);
	}
}
