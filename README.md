## PongJS


### Домашнее задание: 
реализовать классы Rectangle и Circle, которые будут принимать в конструктор 
1. позицию относительно которой будут отрисовываться на фрейме (x и y)
2. width/height для Rectangle и radius для Circle.
3. color - экземпляр класса Color - цвет фигуры

    ```
    class Pong {
      ...
      draw() {
          let imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
          const frame = new Frame(imageData);
        
          this.rectangle = new Rectangle(new Position(10, 20), 50, 50, new Color(0, 0, 0, 255));
          this.circle = new Circle(new Position(150, 200), 40, new Color(0, 0, 0, 255));

          this.rectangle.draw(frame);
          this.circle.draw(frame);
         
          this.ctx.putImageData(frame.imageData, 0, 0);
      }
      ...
    }
    ```
    
    
Метод draw() в классах Square и Circle должен принимать аргументом инстанс класса Frame, и проводить над ним (над массивом пикселей в нем) соответствующие операции, необходимые для отрисовки в этом фрейме фигуры.

Начните с класса Rectangle - прямоугольники рисовать проще.
