export default class Dot {
    constructor(colour, value, ctx) {
        this.ctx = ctx;
        this.value = parseInt(value, 10);
        this.ctx = ctx;
        const yValue =  this.value * -1;
        this.colour = colour;
        this.x = 0;
        this.y = ctx.canvas.height * ((yValue + 1000)/2000);
        this.dead = false;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }

    shift() {
        this.x += 2;
        if (this.x > this.ctx.canvas.width) {
            this.dead = true;
        }
    }
}
