export default class Dot {
	constructor(value, ctx) {
		const initialValue = parseInt(value, 10);
		this.ctx = ctx;
		this.x = ctx.canvas.width/2;
		this.y = ctx.canvas.height * ((initialValue + 1000)/2000);
	}

	render() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	shift() {
		this.x -= 2;
	}
}
