function LilyPadClass()
{
  this.xCoordinate = undefined;
  this.yCoordinate = undefined;

  this.image = undefined;
  this.answer = undefined;

  this.width = 100;
  this.height = 75;

  this.speed = 2;

  this.color = 'Chartreuse';

  this.direction = undefined;

  this.lilyNeighbourOnSameLine = undefined;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.xCoordinate,this.yCoordinate, this.width,this.height);
  }

  this.move = function()
  {
    this.xCoordinate += this.speed*this.direction;
    if (this.answer !== undefined)
    {
      this.centerAnswersXCoordinate();
    }
  }

  this.centerAnswersXCoordinate = function() {
    this.answer.xCoordinate = this.xCoordinate + this.width / 2;

    if (promptsAndAnswersManager.currentAnswerDataType === 'string'){
      var answerWidth = gameCanvasContext.measureText(this.answer.textAssociation).width;
      this.answer.xCoordinate -= answerWidth / 2;
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG'){
      this.answer.xCoordinate -= gameClassManager.currentGame.imageAnswerWidth / 2;
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO'){
      this.answer.xCoordinate -= gameClassManager.currentGame.audioImageAnswerWidth / 2;
    }
}

  this.handleOffScreen = function()
  {
    if (this.xCoordinate > 690)
    {
      {
        this.xCoordinate = -50;
        if (this.answer !== undefined)
        {
          this.centerAnswersXCoordinate();
        }
      }
    }

    if (this.xCoordinate < -50)
    {
      this.xCoordinate = 690;
      if (this.answer !== undefined)
      {
        this.centerAnswersXCoordinate();
      }
    }
  }
}
