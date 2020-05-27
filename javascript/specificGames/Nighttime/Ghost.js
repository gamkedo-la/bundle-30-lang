function Ghost(image, initialDirectionNumber, oscillationVelocityY)
{
  this.image = image;
  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.15;
  this.x = getRandomArbitrary(0,gameCanvas.width - this.width);
  this.y = getRandomArbitrary(this.height*2,gameCanvas.height*0.3);

  this.answerStringWidth = 10;
  this.answerStringHeight = 100;
  this.answerStringX = this.x + this.width/2 - this.answerStringWidth;
  this.answerStringY = this.y + this.height/2;

  this.isCorrectAnswer = undefined;
  this.answerX = this.answerStringX - 50;
  this.answerY = this.answerStringY + this.answerStringHeight + this.answerStringHeight;

  this.direction = initialDirectionNumber;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'brown';
    gameCanvasContext.fillRect(this.answerStringX,this.answerStringY, this.answerStringWidth,this.answerStringHeight);
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.oscillationVelocityY = oscillationVelocityY;
  this.circleAngleInRadians = 0;
  this.move = function()
  {
    this.x += 3*this.direction;
    this.circleAngleInRadians += this.oscillationVelocityY;
    this.y = this.y + Math.sin(this.circleAngleInRadians);

    this.answerStringX += 3*this.direction;
    this.answerStringY = this.answerStringY + Math.sin(this.circleAngleInRadians);

    if (this.isCorrectAnswer === true)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate += 3*this.direction;
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = this.y + Math.sin(this.circleAngleInRadians);
    }
    else if (this.isCorrectAnswer === false)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate += 3*this.direction;
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = this.y + Math.sin(this.circleAngleInRadians);
    }
    this.answerX += 3*this.direction;
    this.answerY = this.y + Math.sin(this.circleAngleInRadians);
  }

  this.handleEndOfScreenDirectionChanges = function()
  {
    if (this.x <= 0)
    {
      this.direction *= -1;
    }
    if (this.x + this.width >= gameCanvas.width)
    {
      this.direction *= - 1;
    }
  }
}
