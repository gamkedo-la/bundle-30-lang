function cVc(firstLetter,secondLetter,thirdLetter, imageAssociation, audioAssociation)
{
  this.imageAssociation = imageAssociation;
  this.audioAssociation = audioAssociation;

  this.firstLetter = firstLetter;//string
  this.firstLetterPosition = undefined;//integer from arrayOfLetterPositions
  this.firstLetterCollisionRangeLeftPoint = undefined;
  this.firstLetterCollisionRangeRightPoint = undefined;

  this.secondLetter = secondLetter;
  this.secondLetterPosition = undefined;
  this.secondLetterCollisionRangeLeftPoint = undefined;
  this.secondLetterCollisionRangeRightPoint = undefined;

  this.thirdLetter = thirdLetter;
  this.thirdLetterPosition = undefined;
  this.thirdLetterCollisionRangeLeftPoint = undefined;
  this.thirdLetterCollisionRangeRightPoint = undefined;

  this.arrayOfLetterPositions = [this.firstLetterPosition,this.secondLetterPosition,this.thirdLetterPosition];

  this.assignLetterPositions = function()
  {
    cVcShooterGame.background.arrayOfGameBoardLetterPositions = [0,1,2];
    let arrayOfGameBoardLetterPositionsLength = 3;
    for (let i = 0; i < arrayOfGameBoardLetterPositionsLength; i++)
    {
      let randomArrayOfLetterPositionsIndex = Math.floor(Math.random()*cVcShooterGame.background.arrayOfGameBoardLetterPositions.length);
      this.arrayOfLetterPositions[i] = cVcShooterGame.background.arrayOfGameBoardLetterPositions[randomArrayOfLetterPositionsIndex];
      cVcShooterGame.background.arrayOfGameBoardLetterPositions.splice(randomArrayOfLetterPositionsIndex,1);
    }
  }

  this.defineCollisionRanges = function()
  {
    this.firstLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[0] * 199;
    this.firstLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[0] * 200 + 199;

    this.secondLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[1] * 199;
    this.secondLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[1] * 200 + 199;

    this.thirdLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[2] * 199;
    this.thirdLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[2] * 200 + 199;
  }

  this.initialize = function()
  {
    this.assignLetterPositions();
    this.defineCollisionRanges();
  }

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.font = '30px Helvetica';

    if (cVcShooterGame.playerShouldBeTargetingFirstLetter)
    {
      gameCanvasContext.fillText(this.firstLetter, this.arrayOfLetterPositions[0]*200 + 95,30);
      gameCanvasContext.fillText(this.secondLetter, this.arrayOfLetterPositions[1]*200 + 95,30);
      gameCanvasContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 95,30);
    }
    else if (cVcShooterGame.playerShouldBeTargetingSecondLetter)
    {
      gameCanvasContext.fillText(this.secondLetter, this.arrayOfLetterPositions[1]*200 + 95,30);
      gameCanvasContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 95,30);
    }
    else if (cVcShooterGame.playerShouldBeTargetingThirdLetter)
    {
      gameCanvasContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 95,30);
    }
    else
    {
      //gameCanvasContext.fillText("You win!!!", gameCanvas.width/2,gameCanvas.height/2);
    }
  }
}
