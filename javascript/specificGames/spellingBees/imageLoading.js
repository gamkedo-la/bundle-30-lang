function ImagesManager()
{

  this.placeholderPlayButtonImage = document.createElement("IMG");

  this.arrayOfImagesToLoad = [];

  this.arrayOfImagesToLoad.push({documentTagBinding: this.placeholderPlayButtonImage,imageFileName:'placeholderPlayButtonImage.png'});

  this.numberOfImagesToLoad = this.arrayOfImagesToLoad.length;

  this.beginLoadingImages = function(imageVariable, fileName)
  {
    imageVariable.src = fileName;
    imageVariable.onload = countLoadedImageAndLaunchIfReady;
  }

  this.loadImages = function()
  {
    for (let imageToLoadIndex = 0; imageToLoadIndex < arrayOfImagesToLoad.length; imageToLoadIndex++)
    {
      this.beginLoadingImage(this.arrayOfImagesToLoad[imageToLoadIndex].documentTagBinding,
                             this.arrayOfImagesToLoad[imageToLoadIndex].imageFileName);
      arrayOfImagesToLoad[imageToLoadIndex].onload = numberOfImagesToLoad--;
    }
  }
}

spellingBeesGame.imagesManager = new ImagesManager();
