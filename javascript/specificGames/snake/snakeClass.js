function SnakeClass()
{
    let snake = this;
    this.name = 'snake player';
    this.x = undefined;
    this.y = undefined;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 10;
    this.height = 20;

    this.middleX = undefined;
    this.middleY = undefined;

    this.tailX = undefined;
    this.tailY = undefined;

    this.snakeHeadImage = snakeHeadImage;
    this.snakeMiddleImage = snakeMiddleImage;
    this.snakeTailImage = snakeTailImage;

    this.headOrientation = 0;
    this.previousHeadOrientation = 0;
    this.middleOrientation = 0;
    this.previousMiddleOrientation = 0;
    this.tailOrientation = 0;

    const MAX_TAIL_LENGTH = 5;

    this.color = 'lime';



    this.initialize = function()
    {
      this.x = getRandomIntInclusive(0,gameCanvas.width);
      this.y = getRandomIntInclusive(0,gameCanvas.height);
    }

    this.draw = function()
    {

      if (this.tailX && this.tailY)
      {
        gameCanvasContext.save();
        gameCanvasContext.translate(
            this.tailX, this.tailY
        )
        switch(this.tailOrientation){
            case 0:
                break;
            case 1:
                gameCanvasContext.rotate(-Math.PI / 2);
                break;
            case 2:
                gameCanvasContext.rotate(Math.PI);
                break;
            case 3:
                gameCanvasContext.rotate(Math.PI / 2);
                break;
        }

        gameCanvasContext.drawImage(
            this.snakeTailImage,
            - (this.width*2) / 2,
            - (this.height*2) / 2,
            this.width*2.3, this.height*2
        )
        gameCanvasContext.restore();
      }

        if (this.middleX && this.middleY)
        {
          gameCanvasContext.save();
          gameCanvasContext.translate(
              this.middleX, this.middleY
          )
          switch(this.middleOrientation){
              case 0:
                  break;
              case 1:
                  gameCanvasContext.rotate(-Math.PI / 2);
                  break;
              case 2:
                  gameCanvasContext.rotate(Math.PI);
                  break;
              case 3:
                  gameCanvasContext.rotate(Math.PI / 2);
                  break;
          }

          gameCanvasContext.drawImage(
              this.snakeMiddleImage,
              - (this.width*2) / 2,
              - (this.height*2) / 2,
              this.width*2, this.height*2
          )
          gameCanvasContext.restore();
        }

        gameCanvasContext.save();
        gameCanvasContext.translate(
            this.x, this.y
        )
        switch(this.headOrientation){
            case 0:
                break;
            case 1:
                gameCanvasContext.rotate(-Math.PI / 2);
                break;
            case 2:
                gameCanvasContext.rotate(Math.PI);
                break;
            case 3:
                gameCanvasContext.rotate(Math.PI / 2);
                break;
        }

        gameCanvasContext.drawImage(
            this.snakeHeadImage,
            - (this.width*2) / 2,
            - (this.height*2) / 2,
            this.width*2, this.height*2
        )
        gameCanvasContext.restore();
    }


    this.move = function()
    {
      if (this.middleX)
      {
        this.tailX = this.middleX;
        this.tailY = this.middleY;
      }
      if (this.middleX)
      {
        this.middleX = this.x;
        this.middleY = this.y;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    }

    this.orientatePieces = function()
    {
      this.tailOrientation = this.middleOrientation;
      this.middleOrientation = this.headOrientation;
    }

    this.wrapIfOffScreen = function()
    {
      if (this.x > gameCanvas.width)
      {
        this.x = 0;
      } else if (this.x < 0)
      {
        this.x = gameCanvas.width;
      } else if (this.y > gameCanvas.height)
      {
        this.y = 0;
      } else if (this.y < 0)
      {
        this.y = gameCanvas.height;
      }
    }

    this.update = function()
    {
      this.orientatePieces();
      this.move();
      //this.tail.update();
      this.wrapIfOffScreen();
    }


}
