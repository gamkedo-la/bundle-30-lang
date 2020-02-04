function ImagePrompter()
{
  this.name = 'image prompter';
  this.currentImage = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.currentImage = imageToLoad;
  }

  this.promptThePlayer = function()
  {
    gameCanvasContext.drawImage(this.currentImage,
                         gameCanvas.width/2 - this.currentImage.width/2,gameCanvas.height/2 - this.currentImage.height/2);
                         console.log('inside image prompt draw code');
  }
}

let imagePrompter = new ImagePrompter();
