export default class Ball {
    constructor( pos, radius, velocity, color, pongConfig ) {
        this.pongConfig = pongConfig;
        this.radius = radius;

        //this.velocity = velocity;
        this.vx = velocity;
        this.vy = velocity;

        this.color = color;
        this.pos = pos;


    }

    draw(frame) {
        for (let y = -this.radius; y < this.radius; y++) {
            for (let x = -this.radius; x < this.radius; x++) {
                const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

                if (z < this.radius) {
                    frame.setPixel(this.pos.x + x, this.pos.y + y, this.color, frame.pixels);
                }
            }
        }
    }

    update() {
        if (this.pos.x + this.radius >= this.pongConfig.width || this.pos.x - this.radius <= 0) {
            this.vx = -this.vx;
        }

        if (this.pos.y + this.radius >= this.pongConfig.height || this.pos.y - this.radius <= 0) {
            this.vy = -this.vy;
        }


        this.pos.x += this.vx;
        this.pos.y += this.vy;
    }
}
