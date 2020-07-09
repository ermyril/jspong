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

        this.state = "start";

        this.ctx = canvas.getContext('2d');

        this.registerHandlers();
    }

    registerHandlers() {
        document.addEventListener("keydown", event => {
            if (event.code === "Space") {
                if (this.player1.score === 3 || this.player2.score === 3) {
                    this.player1.score = 0;
                    this.player2.score = 0;
                }
                this.state = "play";
            }
        });
    }

    setState(state) {
        this.state = state;
    }

    getCenter() {
        return new Position(this.config.width / 2, this.config.height / 2);
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
        this.player1.registerHandlers();

        this.player2 = new Paddle(
            new Position(620, this.config.height / 2),
            10, // width
            60, // height
            5,  // velocity
            new Color(0, 0, 0, 255),
            this.config // pongConfig
        );

        this.ball = new Ball(
            new Position(this.config.width / 2, this.config.height / 2),
            7, // radius
            4,  // velocity
            new Color(0, 0, 0, 255),
            this // Pong
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

        this.player2.aiUpdate(this.ball);
        this.player2.draw(frame);

        if (this.state == "play") {
            this.ball.update(this.player1, this.player2);
        }

        this.ball.draw(frame);
       

        this.ctx.putImageData(frame.imageData, 0, 0);
    }

}


const pong = new Pong(document.getElementById('pong'), 640, 480);
pong.start();
