class Color {
    constructor(red, green, blue, alpha) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }
}

class Frame {
    constructor(imageData) {
        this.imageData = imageData;
        this.pixels = this.imageData.data;
    }


    setPixel(x, y, color) {
        const index = ( y * 640 + x ) * 4;

        if ( index < this.pixels.length && index >= 0) {
            this.pixels[index] = color.r;
            this.pixels[index+1] = color.g;
            this.pixels[index+2] = color.b;
            this.pixels[index+3] = color.a;
        }

    }

}

class Pong {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = "border: 3px solid #bababa";
        this.lastRender = 0;

        this.ctx = canvas.getContext('2d');
    }

    start() {

        window.requestAnimationFrame(this.loop);
    }

    loop = (timestamp) => {

        let progress = timestamp - this.lastRender;

        this.draw();

        this.lastRender = timestamp;

        window.requestAnimationFrame(this.loop);
    }

    draw() {
        let imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);

        const frame = new Frame(imageData);
       

        for (let w = 0; w < 640; w++) {
            for (let h = 0; h < 480; h++ ) {
                //frame.setPixel(w, h, new Color(0, 0, 0, w/2));
                frame.setPixel(w, h, new Color(0, 0, 0, (w^h)));
            }
        }


        this.ctx.putImageData(frame.imageData, 0, 0);
    }

}


const pong = new Pong(document.getElementById('pong'), 640, 480);
pong.start();
