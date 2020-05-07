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

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.message = undefined;

  this.highlighted = false;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}
