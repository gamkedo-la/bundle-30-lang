function Bee()
{

  this.x = undefined;
  this.y = undefined;

  this.radiusX = undefined;
  this.radiusY = undefined;

  this.rotation = 0;

  this.color = 'Gold';

  this.letter = undefined;
  this.letterColor = 'black';

  this.initialize = function()
  {
    this.x = getRandomIntWithExclusionaryRange(0,spellingBeesGame.canvas.width - spellingBeesGame.beeCatcher.width,
                  spellingBeesGame.beeCatcher.x,spellingBeesGame.beeCatcher.x + spellingBeesGame.beeCatcher.width);
    this.y = getRandomIntWithExclusionaryRange(0,spellingBeesGame.canvas.height - spellingBeesGame.beeCatcher.height,
                  spellingBeesGame.beeCatcher.y,spellingBeesGame.beeCatcher.y + spellingBeesGame.beeCatcher.height);

    this.radiusX = spellingBeesGame.canvas.width/14;
    this.radiusY = spellingBeesGame.canvas.height/27;

    this.letter = 'm';
  }

  this.draw = function()
  {
    spellingBeesGame.canvasContext.fillStyle = this.color;
    spellingBeesGame.canvasContext.beginPath();
    spellingBeesGame.canvasContext.ellipse(this.x,this.y, this.radiusX,this.radiusY, this.rotation,
                                           0,Math.PI*2);
    spellingBeesGame.canvasContext.fill();
  }
}

spellingBeesGame.bee1 = new Bee();

function getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return (randomNumber >= excludedMin && randomNumber <= excludedMax) ?
    getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) : randomNumber;
}
