export default class Ball {
    constructor( pos, radius, velocity, color, pong ) {
        this.pong = pong;
        this.pongConfig = this.pong.config;
        this.radius = radius;

        //this.velocity = velocity;
        this.vx = velocity;
        this.vy = velocity;

        this.color = color;
        this.pos = pos;

        console.log(this);

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

    update(paddle1, paddle2) {

        if (this.pos.y + this.radius >= this.pongConfig.height || this.pos.y - this.radius <= 0) {
            this.vy = -this.vy;
        }

        if ( this.pos.x < 0 ) {
            paddle1.score++;
            console.log(paddle1.score);
            console.log(paddle2.score);

            this.pos = this.pong.getCenter();

            this.pong.setState("start");

        } else if (this.pos.x > this.pongConfig.width) {
            paddle2.score++;
            this.pos = this.pong.getCenter();
            this.pong.setState("start");
        }

        this.checkPlatformCollision(paddle1);
        this.checkPlatformCollision(paddle2);


        this.pos.x += this.vx;
        this.pos.y += this.vy;
    }

    checkPlatformCollision(paddle) {
        if (this.pos.x - this.radius < paddle.pos.x + paddle.width / 2 && this.pos.x + this.radius > paddle.pos.x - paddle.width / 2) {
            if (this.pos.y > paddle.pos.y - paddle.height/2 && this.pos.y < paddle.pos.y + paddle.height / 2) {
                this.vx = -this.vx;

                return true;

            }
        }
        return false;
    }
}
