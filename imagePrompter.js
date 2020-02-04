function ImagePrompter()
{
  this.currentImage = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.currentImage = imageToLoad;
  }

  this.drawImagePrompt = function()
  {
    gameCanvasContext.drawImage(this.currentImage,
                         gameCanvas.width/2 - this.currentImage.width/2,gameCanvas.height/2 - this.currentImage.height/2);
  }
}

let imagePrompter = new ImagePrompter();
