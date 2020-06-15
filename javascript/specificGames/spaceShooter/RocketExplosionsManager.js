function RocketExplosion(x,y)
{
  this.x = x;
  this.y = y;

  this.image = 'images\\sprites\\spaceShooter\\rocketExplosion.png';

  this.alpha = 1;
  this.width = 1;
  this.height = 1;

  this.alphaDecreaseRate = 0.05;
  this.widthIncreaseRate = 10;
  this.heightIncreaseRate = 10;

  this.update = function()
  {
    this.alpha -= this.alphaDecreaseRate;
    this.width += this.widthIncreaseRate;
    this.height += this.heightIncreaseRate;
    this.x -= this.widthIncreaseRate/2;
    this.y -= this.heightIncreaseRate/2;
  }

  this.draw = function()
  {
    gameCanvasContext.globalAlpha = this.alpha;
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.globalAlpha = 1;
  }
}

function RocketExplosionsManager()
{
  this.arrayOfExplosions = [];

  this.createAnExplosion = function()
  {
    let currentCollidedAnswer = gameClassManager.currentGame.collisionsWithAnswersManager.currentCollidedAnswer;
    let x = undefined;
    let y = undefined;

    if (currentCollidedAnswer === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing)
    {
      x = drawAnswersManager.currentCorrectAnswerHolderX + gameClassManager.currentGame.bulletDimensionX;
      y = drawAnswersManager.currentCorrectAnswerHolderY + drawAnswersManager.currentCorrectAnswerHolderHeight/2;
    }
    else if (currentCollidedAnswer === promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing){

      x = drawAnswersManager.currentIncorrectAnswerHolderX + gameClassManager.currentGame.bulletDimensionX;
      y = drawAnswersManager.currentIncorrectAnswerHolderY + drawAnswersManager.currentIncorrectAnswerHolderHeight/2;
    }

    let explosion = new RocketExplosion(x,y);
    this.arrayOfExplosions.push(explosion);
    gameAudio.laserShoot.play();
    gameAudio.rockExplosion.play();
  }

  this.drawExplosions = function()
  {
    for (let i = 0; i < this.arrayOfExplosions.length; i++)
    {
      this.arrayOfExplosions[i].draw();
    }
  }

  this.updateExplosions = function()
  {
    for (let i = 0; i < this.arrayOfExplosions.length; i++)
    {
      this.arrayOfExplosions[i].update();
    }
  }

  this.handleFadedExplosions = function()
  {
    for (let i = 0; i < this.arrayOfExplosions.length; i++)
    {
      if (this.arrayOfExplosions[i].alpha < 0.2)
      {
        this.arrayOfExplosions.splice(i,1);
      }
    }
  }
}
