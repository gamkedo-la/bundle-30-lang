function BeeCatcher()
{
  this.x = undefined;
  this.y = undefined;

  this.width = undefined;
  this.height = undefined;

  this.color = 'blue';

  this.initialize = function()
  {
    this.width = spellingBeesGame.canvas.width/10;
    this.height = spellingBeesGame.canvas.height/10;

    this.x = getRandomIntInclusive(0,spellingBeesGame.canvas.width - this.width);
    this.y = getRandomIntInclusive(0,spellingBeesGame.canvas.height - this.height);
  }

  this.draw = function()
  {
    spellingBeesGame.canvasContext.fillStyle = this.color,
    spellingBeesGame.canvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.checkForBeeCollisions = function()
  {
    for (let beeIndex = 0; beeIndex < spellingBeesGame.beesManager.arrayOfBees.length; beeIndex++)
    {
      if (spellingBeesGame.beesManager.arrayOfBees[beeIndex].x > this.x &&
          spellingBeesGame.beesManager.arrayOfBees[beeIndex].x < this.x + this.width &&
          spellingBeesGame.beesManager.arrayOfBees[beeIndex].y > this.y &&
          spellingBeesGame.beesManager.arrayOfBees[beeIndex].y < this.y + this.height)
          {
            let letterSubmission = spellingBeesGame.beesManager.arrayOfBees.splice(beeIndex,1);
            spellingBeesGame.caughtBeesManager.placeCaughtBeeInAppropriateBox(letterSubmission);
          }
    }
  }
}

spellingBeesGame.beeCatcher = new BeeCatcher();

function CaughtBeesManager()
{
  this.currentBoxToBeFilledIndex = 0;
  this.placeCaughtBeeInAppropriateBox = function(bee)
  {
    bee.x = spellingBeesGame.beeBoxes.arrayOfBoxes[this.currentBoxToBeFilledIndex].x +
            spellingBeesGame.beeBoxes.arrayOfBoxes[this.currentBoxToBeFilledIndex].width/2;
    bee.velocity = 0;
            
    spellingBeesGame.beeBoxes.arrayOfBoxes[this.currentBoxToBeFilledIndex].bee = bee;
    this.currentBoxToBeFilledIndex++;
  }
}

spellingBeesGame.caughtBeesManager = new CaughtBeesManager();
