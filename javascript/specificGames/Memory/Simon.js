function Simon()
{
  this.image = simon1Image;
  this.leftHighlightImage = simonLeftHighlightImage;
  this.rightHighlightImage = simonRightHighlightImage;

  this.width = gameCanvas.width*0.75;
  this.height = gameCanvas.height*0.75;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.leftPhonic = undefined;
  this.rightPhonic = undefined;
  this.currentCorrectPhonic = undefined;

  this.leftPhonicX = this.x + this.width*0.15;
  this.leftPhonicY = this.y + this.height/2 + 10;
  this.rightPhonicX = this.x + this.width - this.width*0.3;
  this.rightPhonicY = this.y + this.height/2 + 10;

  this.leftPhonicIsBeingHeard = false;
  this.rightPhonicIsBeingHeard = false;

  this.grabLeftAndRightPhonics = function()
  {
    let randomPhonicIndex1 = getRandomIntInclusive(0,gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics.length - 1);
    let randomPhonicIndex2 = getRandomIntInclusive(0,gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics.length - 1);
    while (randomPhonicIndex1 === randomPhonicIndex2)
    {
      randomPhonicIndex2 = getRandomIntInclusive(0,gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics.length - 1);
    }

    this.leftPhonic = gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics[randomPhonicIndex1];
    this.rightPhonic = gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics[randomPhonicIndex2];
  }

  this.currentPhonicToPlayIndex = 0;
  this.assignOnendedFunctionsOfPhonics = function()
  {
    memoryGame.simon.leftPhonic.promptAudio.sfx.onended = function()
    {
      memoryGame.simon.leftPhonicIsBeingHeard = false;
      memoryGame.simon.currentPhonicToPlayIndex++;
      if (this.currentPhonicToPlayIndex < memoryGame.simon.currentPatternOfCorrectPhonics.length)
      {
        memoryGame.simon.currentPatternOfCorrectPhonics[this.currentPhonicToPlayIndex].promptAudio.sfx.play();
      }
      else if (memoryGame.simon.currentPhonicToPlayIndex >= memoryGame.simon.currentPatternOfCorrectPhonics.length)
      {
        memoryGame.simon.currentPhonicToPlayIndex = 0;
      }
    }

    memoryGame.simon.rightPhonic.promptAudio.sfx.onended = function()
    {
      memoryGame.simon.rightPhonicIsBeingHeard = false;
      memoryGame.simon.currentPhonicToPlayIndex++;
      if (memoryGame.simon.currentPhonicToPlayIndex < memoryGame.simon.currentPatternOfCorrectPhonics.length)
      {
        memoryGame.simon.currentPatternOfCorrectPhonics[memoryGame.simon.currentPhonicToPlayIndex].promptAudio.sfx.play();
        if (memoryGame.simon.currentPatternOfCorrectPhonics[0] === memoryGame.simon.leftPhonic)
        {
          memoryGame.simon.leftPhonicIsBeingHeard = true;
        }
        else if (memoryGame.simon.currentPatternOfCorrectPhonics[0] === memoryGame.simon.rightPhonic)
        {
          memoryGame.simon.rightPhonicIsBeingHeard = true;
        }
      }
      else if (memoryGame.simon.currentPhonicToPlayIndex >= memoryGame.simon.currentPatternOfCorrectPhonics.length)
      {
        memoryGame.simon.currentPhonicToPlayIndex = 0;
      }
    }
  }

  this.chooseCorrectPhonicAndAddToArray = function()
  {
    let fiftyFiftyResult = Math.random();
    if (fiftyFiftyResult < 0.5)
    {
      this.currentCorrectPhonic = this.leftPhonic;
    }
    else if (fiftyFiftyResult >= 0.5)
    {
      this.currentCorrectPhonic = this.rightPhonic;
    }
    let phonicToPush = this.currentCorrectPhonic;
    this.currentPatternOfCorrectPhonics.push(phonicToPush);
  }

  this.currentPatternOfCorrectPhonics = [];

  this.playPatternOfPhonics = function()
  {
    this.currentPatternOfCorrectPhonics[0].promptAudio.sfx.play();
    if (this.currentPatternOfCorrectPhonics[0] === this.leftPhonic)
    {
      this.leftPhonicIsBeingHeard = true;
    }
    else if (this.currentPatternOfCorrectPhonics[0] === this.rightPhonic)
    {
      this.rightPhonicIsBeingHeard = true;
    }
  }


  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    if (this.leftPhonicIsBeingHeard === true)
    {
      gameCanvasContext.drawImage(this.leftHighlightImage, this.x,this.y, this.width,this.height);
    }
    if (this.rightPhonicIsBeingHeard === true)
    {
      gameCanvasContext.drawImage(this.rightHighlightImage, this.x,this.y, this.width,this.height);
    }
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.font = '100px Helvetica';
    gameCanvasContext.fillText(this.leftPhonic.textAssociation, this.leftPhonicX,this.leftPhonicY);
    gameCanvasContext.fillText(this.rightPhonic.textAssociation, this.rightPhonicX,this.rightPhonicY);
  }

  this.phonicToCheckIndex = 0;
  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width/2 &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
        {//left button clicked
          if (this.leftPhonic === this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
          {
            genAudio.positive.play();
            if (this.phonicToCheckIndex < this.currentPatternOfCorrectPhonics.length)
            {
              this.phonicToCheckIndex++;
            }
            if (this.phonicToCheckIndex >= this.currentPatternOfCorrectPhonics.length)
            {
             this.chooseCorrectPhonicAndAddToArray();
             this.playPatternOfPhonics();
            }
          }
          else if (this.leftPhonic !== this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
          {
            genAudio.negative.play();
            this.playPatternOfPhonics();
          }
        }
    else if (inputManager.mouseCoordinates.x > this.x + this.width/2 && inputManager.mouseCoordinates.x < this.x + this.width &&
             inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
        {//right button clicked
          if (this.rightPhonic === this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
          {
            genAudio.positive.play();
            if (this.phonicToCheckIndex < this.currentPatternOfCorrectPhonics.length)
            {
              this.phonicToCheckIndex++;
            }
            if (this.phonicToCheckIndex >= this.currentPatternOfCorrectPhonics.length)
            {
              this.chooseCorrectPhonicAndAddToArray();
              this.playPatternOfPhonics();
            }
          }
          else if (this.rightPhonic !== this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
          {
            genAudio.negative.play();
            this.playPatternOfPhonics();
          }
        }
  }
}
