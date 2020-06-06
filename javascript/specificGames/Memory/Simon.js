function Simon()
{
  this.image = simon1Image;
  this.arrayOfImages = [simon1Image,simon2Image,simon3Image];

  this.width = gameCanvas.width*0.75;
  this.height = gameCanvas.height*0.75;

  this.x = gameCanvas.width*0.25;
  this.y = gameCanvas.height*0.25;

  this.leftPhonic = undefined;
  this.rightPhonic = undefined;

  this.pickARandomImage = getRandomIntInclusive(0,this.arrayOfImages.length - 1);

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.font = '30px Helvetica';
    // gameCanvasContext.fillText(this.leftPhonic.textAssociation, this.leftPhonicX,this.leftPhonicY);
    // gameCanvasContext.fillText(this.rightPhonic.textAssociation, this.rightPhonicX,this.rightPhonicY);
  }
}
