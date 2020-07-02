import { Position } from './utils.js';


export default class Paddle {
    constructor( pos, width, height, velocity, color, pongConfig ) {
        this.pongConfig = pongConfig;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.color = color;

        this.movingUp = false;
        this.movingDown = false;

        this.pos = new Position(
            pos.x - width / 2,
            pos.y - height / 2
        );

        this.registerHandlers();

    }

    draw(frame) {



        for (let y = 0; y < this.height; y++ ) {
            for (let x = 0; x < this.width; x++) {
                frame.setPixel(this.pos.x + x, this.pos.y + y, this.color, frame.pixels);
            }
        }
    }

    update() {
        if (this.movingDown && (this.pos.y + this.height) < this.pongConfig.height) {
            this.pos.y += this.velocity;
        } else if (this.movingUp && this.pos.y > 0) {
            this.pos.y -= this.velocity;
        }
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
