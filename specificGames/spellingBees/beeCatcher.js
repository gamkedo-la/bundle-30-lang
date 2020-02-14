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
            let caughtBee = spellingBeesGame.beesManager.arrayOfBees[beeIndex];
            spellingBeesGame.caughtBeesManager.placeCaughtBeeInAppropriateBox(caughtBee);
            spellingBeesGame.caughtBeesManager.submitLetterToSubmissionsManager(caughtBee);
            spellingBeesGame.letterSubmissionManager.checkSubmittedLettersForCorrectSpelling();
            console.log(spellingBeesGame.letterSubmissionManager.arrayOfLetters);
          }
    }
  }

  this.moveWhenAppropriate = function()
  {
    if (spellingBeesGame.inputManager.leftArrowIsBeingHeld)
    {
      this.x -= 6;
    }
    if (spellingBeesGame.inputManager.upArrowIsBeingHeld)
    {
      this.y -= 6;
    }
    if (spellingBeesGame.inputManager.rightArrowIsBeingHeld)
    {
      this.x += 6;
    }
    if (spellingBeesGame.inputManager.downArrowIsBeingHeld)
    {
      this.y += 6;
    }
  }
}

spellingBeesGame.beeCatcher = new BeeCatcher();

function CaughtBeesManager()
{
  this.arrayOfCaughtBees = [];
  this.currentBoxToBeFilledIndex = 0;
  this.boxLeftX = spellingBeesGame.canvas.width/8;
  this.boxCenterXOffset =  (spellingBeesGame.canvas.width/8)/2;
  this.boxCenterY = spellingBeesGame.canvas.height*0.9 + (spellingBeesGame.canvas.height/10)/2;

  this.placeCaughtBeeInAppropriateBox = function(caughtBee)
  {
    caughtBee.x = (this.currentBoxToBeFilledIndex*this.boxLeftX) + this.boxCenterXOffset;
    caughtBee.y = this.boxCenterY;
    caughtBee.velocity = 0;
    this.currentBoxToBeFilledIndex++;
  }

  this.submitLetterToSubmissionsManager = function(caughtBee)
  {
    let letterToSubmit = caughtBee.letter;
    spellingBeesGame.letterSubmissionManager.arrayOfLetters.push(letterToSubmit);
  }
}
