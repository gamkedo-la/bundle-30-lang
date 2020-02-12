function Bee(letter)
{

  this.x = undefined;
  this.y = undefined;

  this.radiusX = undefined;
  this.radiusY = undefined;

  this.rotation = 0;

  this.color = 'Gold';

  this.letter = letter;
  this.letterColor = 'black';

  this.xDirection = undefined;
  this.yDirection = undefined;

  this.velocity = 10;

  this.initialize = function()
  {
    this.x = getRandomIntWithExclusionaryRange(0,spellingBeesGame.canvas.width - spellingBeesGame.beeCatcher.width,
                  spellingBeesGame.beeCatcher.x,spellingBeesGame.beeCatcher.x + spellingBeesGame.beeCatcher.width);
    this.y = getRandomIntWithExclusionaryRange(0,spellingBeesGame.canvas.height - spellingBeesGame.beeCatcher.height,
                  spellingBeesGame.beeCatcher.y,spellingBeesGame.beeCatcher.y + spellingBeesGame.beeCatcher.height);

    this.radiusX = spellingBeesGame.canvas.width/14;
    this.radiusY = spellingBeesGame.canvas.height/27;

    if (spellingBeesGame.beeCatcher.x > this.x)
    {
      this.xDirection = -1;
    } else {
      this.xDirection = 1;
    }
    if (spellingBeesGame.beeCatcher.y > this.y)
    {
      this.yDirection = -1;
    } else {
      this.yDirection = 1;
    }
  }

  this.update = function()
  {
    this.move();
    this.checkForWallCollisions();
  }

  this.checkForWallCollisions = function()
  {
    if (this.x + this.radiusX > spellingBeesCanvas.width || this.x - this.radiusX < 0)
    {
      this.xDirection *= -1;
    }
    if (this.y + this.radiusY > spellingBeesCanvas.height || this.y - this.radiusY < 0)
    {
      this.yDirection *= -1;
    }
  }

  this.move = function()
  {
    this.x += this.velocity*this.xDirection;
    this.y += this.velocity*this.yDirection;
  }
  this.draw = function()
  {
    //ellipse
    spellingBeesGame.canvasContext.fillStyle = this.color;
    spellingBeesGame.canvasContext.beginPath();
    spellingBeesGame.canvasContext.ellipse(this.x,this.y, this.radiusX,this.radiusY, this.rotation,
                                           0,Math.PI*2);
    spellingBeesGame.canvasContext.fill();

    //letter
    spellingBeesGame.canvasContext.fillStyle = 'black';
    spellingBeesGame.canvasContext.font = '30px Helvetica';
    spellingBeesGame.canvasContext.fillText(this.letter, this.x - 10,this.y + 5);
  }
}

function getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return (randomNumber >= excludedMin && randomNumber <= excludedMax) ?
    getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) : randomNumber;
}
