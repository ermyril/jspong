import { Color, Position } from './utils.js'
import Frame from './frame.js';
import Paddle from './paddle.js';
import Ball from './ball.js';



class Pong {
    constructor(canvas, width, height) {
        this.config = {
            width,
            height
        }

        this.canvas = canvas;
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.canvas.style = "border: 3px solid #bababa";
        this.lastRender = 0;

        this.ctx = canvas.getContext('2d');
    }

    start() {
        this.player1 = new Paddle(
            new Position(20, this.config.height / 2),
            10, // width
            60, // height
            5,  // velocity
            new Color(0, 0, 0, 255),
            this.config // pongConfig
        );

        this.ball = new Ball(
            new Position(this.config.width / 2, this.config.height / 2),
            7, // radius
            2,  // velocity
            new Color(0, 0, 0, 255),
            this.config // pongConfig
        );


        window.requestAnimationFrame(this.loop);
    }

    loop = (timestamp) => {

        let progress = timestamp - this.lastRender;

        this.render();

        this.lastRender = timestamp;

        window.requestAnimationFrame(this.loop);
    }

    render() {
        let imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);

        const frame = new Frame(imageData);


        this.player1.update();
        this.player1.draw(frame);

        this.ball.update();
        this.ball.draw(frame);
       

        this.ctx.putImageData(frame.imageData, 0, 0);
    }

}


const pong = new Pong(document.getElementById('pong'), 640, 480);
pong.start();
