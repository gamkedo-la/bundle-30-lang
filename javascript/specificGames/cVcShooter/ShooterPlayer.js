function ShooterPlayer()
{
  this.position = 1;

  this.gunRotated = false;

  this.draw = function()
  {
    //document.body.style.cursor = 'none';
    // if (this.mouseClicked === true)
    // {
    //   gameCanvasContext.save();
    //   gameCanvasContext.translate(this.x + this.width,this.y);
    //   gameCanvasContext.rotate(-25*Math.PI/180);
    //   gameCanvasContext.translate(-(this.x + this.width),-(this.y));
    //
    //   gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215, this.width,this.height);
    //   gameCanvasContext.restore();
    // }
    // else if (this.mouseClicked === false)
    // {
    //   gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215,
    //                                           this.width,this.height);
    // }

    if (this.gunRotated === true)
    {
      gameCanvasContext.save();
      gameCanvasContext.translate(this.position*(gameCanvas.width*0.165) - 3,gameCanvas.height);
      gameCanvasContext.rotate(15*Math.PI/180);
      gameCanvasContext.translate( -(this.position*(gameCanvas.width*0.165) - 3),-(gameCanvas.height) );
      gameCanvasContext.drawImage(galleryGunImage, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350);
      gameCanvasContext.restore();
    }
    else if (this.gunRotated === false)
    {
      gameCanvasContext.drawImage(galleryGunImage, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350);
    }
    // gameCanvasContext.beginPath();
    // gameCanvasContext.moveTo(this.position*200 + 10, gameCanvas.height - 10);
    // gameCanvasContext.lineTo(this.position*200 + 100, gameCanvas.height - 150);
    // gameCanvasContext.lineTo(this.position*200 + 190, gameCanvas.height - 10);
    // gameCanvasContext.closePath();
    //
    // gameCanvasContext.lineWidth = 10;
    // gameCanvasContext.strokeStyle = '#666666';
    // gameCanvasContext.stroke();
    //
    // gameCanvasContext.fillStyle = "#FFCC00";
    // gameCanvasContext.fill();
  }

  this.rotateGun = function()
  {
    this.gunRotated = true;
    setTimeout(unRotateGun, 200);
  }

}

function unRotateGun()
{
  gameClassManager.currentGame.playerCharacter.gunRotated = false;
}
