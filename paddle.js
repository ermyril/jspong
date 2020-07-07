import { Position } from './utils.js';


export default class Paddle {
    constructor( pos, width, height, velocity, color, pongConfig ) {
        this.pongConfig = pongConfig;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.color = color;
        this.score = 0;

        this.movingUp = false;
        this.movingDown = false;

        this.pos = new Position(
            pos.x - width / 2,
            pos.y - height / 2
        );


    }

    draw(frame) {
        const startX = this.pos.x - this.width / 2;
        const startY = this.pos.y - this.height / 2;
        for (let y = 0; y < this.height; y++ ) {
            for (let x = 0; x < this.width; x++) {
                frame.setPixel(startX + x, startY + y, this.color, frame.pixels);
            }
        }
    }

    update() {
        if (this.movingDown && (this.pos.y + this.height / 2) < this.pongConfig.height) {
            this.pos.y += this.velocity;
        } else if (this.movingUp && this.pos.y - this.height / 2 > 0) {
            this.pos.y -= this.velocity;
        }
    }

    aiUpdate(ball) {
        this.pos.y = ball.pos.y;
    }

    registerHandlers() {
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowDown") {
                this.movingDown = true;
            } else if (event.code === "ArrowUp") {
                this.movingUp = true;
            }
        });

        document.addEventListener("keyup", event => {
            if (event.code === "ArrowDown") {
                this.movingDown = false;
            } else if (event.code === "ArrowUp") {
                this.movingUp = false;
            }
        });
    }
}
