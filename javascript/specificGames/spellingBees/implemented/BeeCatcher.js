function BeeCatcher()
{
  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.1;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.image = "images\\sprites\\dodgeBall\\Player2.png";

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.velocity = 7;
  this.move = function()
  {
    if (inputManager.upArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y -= this.velocity;
		}
		if (inputManager.rightArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x += this.velocity;
		}
		if (inputManager.downArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y += this.velocity;
		}
		if (inputManager.leftArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x -= this.velocity;
		}
  }

  this.checkForBeeCollisions = function()
  {
    let arrayOfBees = gameClassManager.currentGame.beesManager.arrayOfBees;
    for (let beeIndex = 0; beeIndex < arrayOfBees.length; beeIndex++)
    {
      let currentBee = arrayOfBees[beeIndex];
      if (currentBee.x + currentBee.width > this.x &&
          currentBee.x < this.x + this.width &&
          currentBee.y + currentBee.height > this.y &&
          currentBee.y < this.y + this.height)
          {
            currentBee.shouldBeMoving = false;
            let boxToBeFilled = gameClassManager.currentGame.background.arrayOfBoxes[gameClassManager.currentGame.background.currentBoxToBeFilledIndex];
            console.log('boxToBeFilled: ' + boxToBeFilled);
            currentBee.x = boxToBeFilled.x + 10;
            currentBee.y = boxToBeFilled.y - 10;
            boxToBeFilled.letter = currentBee.letter;

            if (gameClassManager.currentGame.background.currentBoxToBeFilledIndex === 2)
            {
              let wordStringToCheck = '';
              let arrayOfBoxes = gameClassManager.currentGame.background.arrayOfBoxes;
              wordStringToCheck = arrayOfBoxes[0].letter + arrayOfBoxes[1].letter + arrayOfBoxes[2].letter;
              console.log('wordStringToCheck: ' + wordStringToCheck);
              gameClassManager.currentGame.background.currentBoxToBeFilledIndex = 0;
              if (wordStringToCheck === gameClassManager.currentGame.wordsManager.currentAnswer.word)
              {
                amountCorrect++;
                genAudio.positive.play();
              }
              else {
                amountIncorrect++;
                genAudio.negative.play();
              }
              gameClassManager.currentGame.wordsManager.defineCurrentAnswer();
              gameClassManager.currentGame.beesManager.arrayOfBees = [];
              gameClassManager.currentGame.beesManager.initialize();
            }
            else
            {
              gameClassManager.currentGame.background.currentBoxToBeFilledIndex++;
            }


            // spellingBeesGame.caughtBeesManager.submitLetterToSubmissionsManager(caughtBee);
            // spellingBeesGame.letterSubmissionManager.checkSubmittedLettersForCorrectSpelling();
          }
    }
  }
}
