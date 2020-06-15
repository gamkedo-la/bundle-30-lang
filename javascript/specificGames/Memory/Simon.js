function Simon()
{
  this.image = "images\\sprites\\Memory\\Simon.png";
  this.leftHighlightImage = "images\\sprites\\Memory\\simonLeftHighlight.png";
  this.rightHighlightImage = "images\\sprites\\Memory\\simonRightHighlight.png";

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

  this.timeToWaitBeforePlayingPattern = 1000;

  this.computerTurnText = "Listen carefully";
  this.computerTurnTextXPosition = gameCanvas.width/2 - 100;
  this.playerTurnText = "Repeat the pattern";
  this.playerTurnTextXPosition = gameCanvas.width/2 - 120;

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
  this.currentPhonicToPlayIndex = 0;
  this.isPlayingPatternOfPhonics = true;

  this.playPatternOfPhonics = function()
  {
    if (!this.isPlayingPatternOfPhonics)
    {
      this.isPlayingPatternOfPhonics = true;
    }

    let currentPhonic = this.currentPatternOfCorrectPhonics[this.currentPhonicToPlayIndex];
    if (this.currentPhonicToPlayIndex < this.currentPatternOfCorrectPhonics.length)
    {
      this.currentPhonicToPlayIndex++;
      currentPhonic.promptAudio.sfx.play();
      if (currentPhonic === this.leftPhonic)
      {
        this.leftPhonicIsBeingHeard = true;
        currentPhonic.promptAudio.sfx.onended = function()
        {
          memoryGame.simon.leftPhonicIsBeingHeard = false;
          memoryGame.simon.playPatternOfPhonics();
        }
      }
      else if (currentPhonic === this.rightPhonic)
      {
        this.rightPhonicIsBeingHeard = true;
        currentPhonic.promptAudio.sfx.onended = function()
        {
          memoryGame.simon.rightPhonicIsBeingHeard = false;
          memoryGame.simon.playPatternOfPhonics();
        }
      }
    }
    else if (this.currentPhonicToPlayIndex >= this.currentPatternOfCorrectPhonics.length)
    {
      this.currentPhonicToPlayIndex = 0;
      this.isPlayingPatternOfPhonics = false;
    }
  }


  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    if (this.leftPhonicIsBeingHeard === true)
    {
      drawFromSheet(this.leftHighlightImage, this.x,this.y, this.width,this.height);
      //gameCanvasContext.drawImage(this.leftHighlightImage, this.x,this.y, this.width,this.height);
    }
    if (this.rightPhonicIsBeingHeard === true)
    {
      drawFromSheet(this.rightHighlightImage, this.x,this.y, this.width,this.height);
      //gameCanvasContext.drawImage(this.rightHighlightImage, this.x,this.y, this.width,this.height);
    }
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.font = '100px Helvetica';
    gameCanvasContext.fillText(this.leftPhonic.textAssociation, this.leftPhonicX,this.leftPhonicY);
    gameCanvasContext.fillText(this.rightPhonic.textAssociation, this.rightPhonicX,this.rightPhonicY);

    if (this.isPlayingPatternOfPhonics){
      gameCanvasContext.fillStyle = "gold";
      gameCanvasContext.fillRect(0, 0, gameCanvas.width, 50);
      customFontFillText(
        [this.computerTurnText], 30, 12,
        this.computerTurnTextXPosition, 10
      );
    }
    else{
      gameCanvasContext.fillStyle = "gold";
      gameCanvasContext.fillRect(0, 0, gameCanvas.width, 50);
      customFontFillText(
        [this.playerTurnText], 30, 12,
        this.playerTurnTextXPosition, 10
      );
    }

  }

  this.phonicToCheckIndex = 0;
  this.handleClick = function()
  {
    if(!this.isPlayingPatternOfPhonics)
    {
      if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width/2 &&
          inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
          {//left button clicked
            gameAudio.buttonPress.play();
            if (this.leftPhonic === this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
            {
              this.processCorrectAnswer();
            }
            else if (this.leftPhonic !== this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
            {
              this.processIncorrectAnswer();
            }
          }
      else if (inputManager.mouseCoordinates.x > this.x + this.width/2 && inputManager.mouseCoordinates.x < this.x + this.width &&
              inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
          {//right button clicked
            gameAudio.buttonPress.play();
            if (this.rightPhonic === this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
            {
              this.processCorrectAnswer();
            }
            else if (this.rightPhonic !== this.currentPatternOfCorrectPhonics[this.phonicToCheckIndex])
            {
              this.processIncorrectAnswer();
            }
          }
    }
  }

  this.updatePatternOfPhonics = function() {
    this.phonicToCheckIndex = 0;
    this.chooseCorrectPhonicAndAddToArray();

    this.isPlayingPatternOfPhonics = true;
    setTimeout(
      this.playPatternOfPhonics.bind(this),
      this.timeToWaitBeforePlayingPattern
    );
  }

  this.processCorrectFullAnswer = function() {
    amountCorrect++;
    calculateAccuracy();
    this.updatePatternOfPhonics();
  }

  this.processIncorrectAnswer = function() {
    genAudio.negative.play();
    amountIncorrect++;
    calculateAccuracy();

    this.currentPatternOfCorrectPhonics = [];
    this.updatePatternOfPhonics();
  }

  this.processCorrectAnswer = function() {
    genAudio.positive.play();
    this.phonicToCheckIndex++;
    if (this.phonicToCheckIndex >= this.currentPatternOfCorrectPhonics.length) {
      this.processCorrectFullAnswer();
    }
  }
}
