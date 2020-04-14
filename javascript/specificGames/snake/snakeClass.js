function SnakeClass()
{
    let snake = this;
    this.name = 'snake player';
    this.x = undefined;
    this.y = undefined;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 20;
    this.height = 20;

    this.snakeHeadImage = snakeHeadImage;

    const MAX_TAIL_LENGTH = 5;

    this.color = 'lime';

    this.tail =
    {
      name:'tail',
      pieces: [],

      populatePieces: function()
      {
        this.pieces.push({x:snake.x,y:snake.y});
      },

      deleteExcessPieces: function()
      {
        while (this.pieces.length > MAX_TAIL_LENGTH)
        {
          this.pieces.shift();
        }
      },

      update: function()
      {
        this.populatePieces();
        this.deleteExcessPieces();
      }
    },

    this.initialize = function()
    {
      this.x = getRandomIntInclusive(0,gameCanvas.width);
      this.y = getRandomIntInclusive(0,gameCanvas.height);
    },

    this.draw = function()
    {
      gameCanvasContext.fillStyle = this.color;
      for(let snakeTailIndex = 0; snakeTailIndex < this.tail.pieces.length; snakeTailIndex++)
      {
        gameCanvasContext.fillRect(this.tail.pieces[snakeTailIndex].x,this.tail.pieces[snakeTailIndex].y,
        this.width - 2,this.height - 2);
      }
    },

    this.move = function()
    {
      this.x += this.speedX;
      this.y += this.speedY;
    },

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
      this.move();
      this.tail.update();
      this.wrapIfOffScreen();
    }
}
