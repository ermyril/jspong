## PongJS


### Домашнее задание: 

Реализовать класс Circle, который будут принимать в конструктор:
1. позицию относительно которой они будут отрисовываться на фрейме (x и y)
2. radius
3. color - экземпляр класса Color - цвет фигуры

Для отрисовки фигуры должен использоваться метод setPixel, класса Frame 

    ```
    class Pong {
      ...
      draw() {
          let imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
          const frame = new Frame(imageData);
        
          this.circle = new Circle(new Position(150, 200), 40, new Color(0, 0, 0, 255));

          this.rectangle.draw(frame);
          this.circle.draw(frame);
         
          this.ctx.putImageData(frame.imageData, 0, 0);
      }
      ...
    }
    ```
    

Класс должен реализовывать метод draw(), который должен принимать входным аргументом экземпляр объекта класса Frame, и проводить над ним (над массивом пикселей в нем) соответствующие операции, необходимые для отрисовки в этом фрейме фигуры.


