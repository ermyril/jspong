class Color {
    constructor(red, green, blue, alpha) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Frame {
    constructor(imageData) {
        this.imageData = imageData;
        this.pixels = this.imageData.data;
    }

    setPixel(x, y, color) {
        const index = (y * 640 + x) * 4;

        if (index < this.pixels.length && index >= 0) {
            this.pixels[index] = color.r;
            this.pixels[index + 1] = color.g;
            this.pixels[index + 2] = color.b;
            this.pixels[index + 3] = color.a;
        }
    }

    setCirclePixel(radius, color) {
        const index = (Math.PI * radius ^ 2);

        this.pixels[index] = color.r;
        this.pixels[index + 1] = color.g;
        this.pixels[index + 2] = color.b;
        this.pixels[index + 3] = color.a;
    }
}

class Paddle {
    constructor(pos, width, height, velocity, color, pongConfig) {
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
        for (let y = 0; y < this.height; y++) {
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

class Circle {
    constructor(pos, radius, color, pongConfig) {
        this.pongConfig = pongConfig
        this.radius = radius
        this.color = color

        this.pos = new Position(
            pos.x - this.pongConfig.width / 2,
            pos.y - this.pongConfig.height / 2
        )
    }

    draw(frame) {
        frame.setCirclePixel(this.radius, this.color, frame.pixels);
    }
}

class Pong {
    constructor(canvas, width, height) {
        this.config = {
            width,
            height
        }

        this.canvas = canvas;
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.canvas.style = "border: 2px solid #BC8F8F";
        this.lastRender = 0;

        this.ctx = canvas.getContext('2d');
    }

    start() {
        this.player1 = new Paddle(
            new Position(15, this.config.height / 2),
            10, // width
            60, // height
            7,  // velocity
            new Color(128, 128, 128, 255),
            this.config // pongConfig
        );

        window.requestAnimationFrame(this.loop);
        
        this.obje = new Circle(new Position(this.config.width / 2, this.config.height / 2),
            30, // radius
            new Color(0, 255, 255, 255),
            this.config //pongConfig
        );
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


        this.ctx.putImageData(frame.imageData, 0, 0);
    }
}


const pong = new Pong(document.getElementById('pong'), 640, 480);
pong.start();
