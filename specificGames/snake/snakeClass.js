function SnakeClass()
{
    this.x = undefined;
    this.y = undefined;
    this.speedX = 0;
    this.speedY = 0;
    this.dimension = 20;
    this.MAX_TAIL_LENGTH = 5;

    this.color = 'lime';

    this.tail =
    {
      pieces: [],

      populatePieces: function()
      {
        this.pieces.push({x:this.x,y:this.y});
      },

      deleteExcessPieces: function()
      {
        while (this.pieces.length > this.MAX_TAIL_LENGTH)
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

      for(let snakeTailIndex = 0; snakeTailIndex < this.tail.length; snakeTailIndex++)
      {
        gameCanvasContext.fillRect(this.tail[snakeTailIndex].x,this.tail[snakeTailIndex].y,
        this.dimension - 2,this.dimension - 2);
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
