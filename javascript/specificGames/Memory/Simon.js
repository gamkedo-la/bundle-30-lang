function Simon()
{
  this.image = simon1Image;
  this.arrayOfImages = [simon1Image,simon2Image,simon3Image];

  this.width = gameCanvas.width*0.75;
  this.height = gameCanvas.height*0.75;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.leftPhonic = undefined;
  this.rightPhonic = undefined;

  this.leftPhonicX = this.x + this.width*0.15;
  this.leftPhonicY = this.y + this.height/2 + 10;
  this.rightPhonicX = this.x + this.width - this.width*0.3;
  this.rightPhonicY = this.y + this.height/2 + 10;

  this.pickARandomImage = getRandomIntInclusive(0,this.arrayOfImages.length - 1);

  this.grabLeftAndRightPhonics = function()
  {
    let randomPhonicIndex1 = getRandomIntInclusive(0,gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics.length - 1);
    let randomPhonicIndex2 = getRandomIntInclusive(0,gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics.length - 1);
    while (randomPhonicIndex1 === randomPhonicIndex2)
    {
      randomPhonicIndex2 = getRandomIntInclusive(0,gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics.length - 1);
    }
    this.leftPhonic = gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics[randomPhonicIndex1];
    console.log('randomPhonicIndex1: ' + randomPhonicIndex1);
    console.log('this.leftPhonic: ' + this.leftPhonic);
    this.rightPhonic = gameClassManager.currentGame.phonicClassManager.temporaryArrayOfPhonics[randomPhonicIndex2];
    console.log('randomPhonicIndex1: ' + randomPhonicIndex2);
    console.log('this.rightPhonic: ' + this.rightPhonic);
  }

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.font = '100px Helvetica';
    gameCanvasContext.fillText(this.leftPhonic.textAssociation, this.leftPhonicX,this.leftPhonicY);
    gameCanvasContext.fillText(this.rightPhonic.textAssociation, this.rightPhonicX,this.rightPhonicY);
  }
}
