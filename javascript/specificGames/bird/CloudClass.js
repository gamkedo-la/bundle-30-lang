function Cloud(randomCloudImage)
{
  this.image = randomCloudImage;

  this.x = getRandomIntInclusive(0, gameCanvas.width);
  this.y = getRandomIntInclusive(0, gameCanvas.height);

  this.height = getRandomIntInclusive(gameCanvas.height/9, gameCanvas.height/4);
  this.width = getRandomIntInclusive(gameCanvas.width/9, gameCanvas.height/2);

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.xSpeed = (getRandomIntInclusive(10,14))/10;
  this.move = function()
  {
    this.x -= this.xSpeed;
  }

  this.handleOffScreen = function()
  {
    if (this.x + this.width < 0)
    {
      this.x = gameCanvas.width + this.width;
      this.y = getRandomIntInclusive(0, gameCanvas.height);

      let randomCloudImageIndex = getRandomIntInclusive(0,cloudManager.arrayOfCloudImages.length - 1);
      console.log('randomCloudImageIndex: ' + randomCloudImageIndex);
      let cloudImage = cloudManager.arrayOfCloudImages[randomCloudImageIndex];
      console.log('cloudImage: ' + cloudImage);
      this.image = cloudImage;
      this.xSpeed = (getRandomIntInclusive(10,14))/10;

      this.height = getRandomIntInclusive(gameCanvas.height/9, gameCanvas.height/4);
      this.width = getRandomIntInclusive(gameCanvas.width/9, gameCanvas.height/2);
    }
  }
}

function CloudManager()
{
  this.numberOfClouds = 7;

  this.arrayOfCloudImages = [];

  this.initializeArrayOfCloudImages = function()
  {
    this.arrayOfCloudImages.push(cloud1Image);
    this.arrayOfCloudImages.push(cloud2Image);
    this.arrayOfCloudImages.push(cloud3Image);
    this.arrayOfCloudImages.push(cloud4Image);
  }

  this.arrayOfClouds = [];

  this.initializeClouds = function()
  {
    for (let cloudToInitializeIndex = 0; cloudToInitializeIndex < this.numberOfClouds; cloudToInitializeIndex++)
    {
      let randomCloudImageIndex = getRandomIntInclusive(0,this.arrayOfCloudImages.length - 1);
      let cloudImage = this.arrayOfCloudImages[randomCloudImageIndex];
      let cloud = new Cloud(cloudImage);
      this.arrayOfClouds.push(cloud);
    }
  }

  this.initialize = function()
  {
      this.initializeArrayOfCloudImages();
      this.initializeClouds();
  }

  this.drawClouds = function()
  {
    for (let arrayOfCloudsIndex = 0; arrayOfCloudsIndex < this.arrayOfClouds.length; arrayOfCloudsIndex++)
    {
      this.arrayOfClouds[arrayOfCloudsIndex].draw();
    }
  }

  this.moveClouds = function()
  {
    for (let arrayOfCloudsIndex = 0; arrayOfCloudsIndex < this.arrayOfClouds.length; arrayOfCloudsIndex++)
    {
      this.arrayOfClouds[arrayOfCloudsIndex].move();
    }
  }

  this.handleCloudsOffScreen = function()
  {
    for (let arrayOfCloudsIndex = 0; arrayOfCloudsIndex < this.arrayOfClouds.length; arrayOfCloudsIndex++)
    {
      this.arrayOfClouds[arrayOfCloudsIndex].handleOffScreen();
    }
  }

  this.update = function()
  {
    this.moveClouds();
    this.handleCloudsOffScreen();
  }
}

let cloudManager = new CloudManager();
