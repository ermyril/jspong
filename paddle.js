import { Position } from './utils.js';

const digits = [
    [
        1,1,1,
        1,0,1,
        1,0,1,
        1,0,1,
        1,1,1,
    ],
    [
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
        0,1,0,
    ],
    [
        1,1,1,
        0,0,1,
        0,1,1,
        1,0,0,
        1,1,1,
    ],
    [
        1,1,1,
        0,0,1,
        1,1,1,
        0,0,1,
        1,1,1,
    ],

];

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

    drawNumber(pos, color, size, digit, frame) {
        let startX = pos.x - (size * 3) / 2;
        let startY = pos.y - (size * 5) / 2;

        for (let i = 0; i < digit.length; i++) {
            if (digit[i] === 1) {
                for (let y = startY; y < (startY + size); y++) {
                    for (let x = startX; x < (startX + size); x++ ) {
                        frame.setPixel(x, y, color, frame.pixels);
                    }
                }
            }
            startX += size;
            if ( (i+1) % 3 === 0 ) {
                startY += size;
                startX -= size * 3;
            }
        }

    }

    lerp(a, b, pct) {
        return a + pct *  (b - a);
    }

    draw(frame) {
        const startX = this.pos.x - this.width / 2;
        const startY = this.pos.y - this.height / 2;
        for (let y = 0; y < this.height; y++ ) {
            for (let x = 0; x < this.width; x++) {
                frame.setPixel(startX + x, startY + y, this.color, frame.pixels);
            }
        }

        const posX = this.lerp(this.pos.x, this.pongConfig.width / 2, 0.4);
        this.drawNumber(new Position(posX, 50), this.color, 10, digits[this.score], frame);
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
