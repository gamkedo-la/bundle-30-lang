function BirthdayPerson(image, x)
{
  this.image = image;

  this.x = x;
  this.y = gameCanvas.height*0.5;

  this.width = 100;
  this.height = 200;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

function BirthdayPersonSpeechBubble(image, x,y, width,height)
{
  this.image = image;
  this.arrowImage = helloWorldArrowImage;
  this.arrowImageWidth = 50;
  this.arrowImageHeight = 100;

  this.isBeingHeard = false;

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.message = undefined;

  this.highlighted = false;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    if (this.isBeingHeard === true)
    {
      console.log('is being heard is being recognized');
      let arrowImageStartingX = this.x + this.width/2 - this.arrowImageWidth/2;
      let arrowImageStartingY = this.y - this.arrowImageHeight;
      // let arrowImageStartingX = gameCanvas.width/2;
      // let arrowImageStartingY = gameCanvas.height/2;
      gameCanvasContext.drawImage(this.arrowImage, arrowImageStartingX,arrowImageStartingY, this.arrowImageWidth,this.arrowImageHeight);
    }
  }
}
