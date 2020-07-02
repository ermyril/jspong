export default class Frame {
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
