function LaneBackgroundClass()
{

  this.laneGrassImage1 = undefined;
  this.laneGrassImage2 = undefined;

  this.asphaltImage1 = undefined;
  this.asphaltImage2 = undefined;

  this.billboard = undefined;

  this.initialize = function()
  {
    this.laneGrassImage1 = new LaneGrassImage(0, 'images\\Backgrounds\\LaneGrass1.png');
    this.laneGrassImage2 = new LaneGrassImage(-gameCanvas.height, 'images\\Backgrounds\\LaneGrass2.png');

    this.asphaltImage1 = new AsphaltImage(0, 'images\\Backgrounds\\road1.png');
    this.asphaltImage2 = new AsphaltImage(-gameCanvas.height, 'images\\Backgrounds\\road2.png');

    this.billboard = new Billboard();
  }

  let dashPictureNumber = 1;
  let currentDashPicture = 'images\\Backgrounds\\roadDash.png';

  function chooseDashPicture()
  {
    if (dashPictureNumber === 1)
    {
      currentDashPicture = 'images\\Backgrounds\\roadDash.png';
      dashPictureNumber = 2;
    }
    else if (dashPictureNumber === 2)
    {
      currentDashPicture = 'images\\Backgrounds\\roadDash3.png';
      dashPictureNumber = 1;
    }
    return currentDashPicture;
  }

  let arrayOfYellowCenterDashes = [-1, 0, 1, 2, 3, 4, 5, 6].map(function(dashIndex) {
		return {x: 320 - 7.5, y: dashIndex*100, image:chooseDashPicture()};
	});
	let dashHeight = 75;
	let dashWidth = 15;

  this.draw = function()
	{
		this.drawLaneGrass();

	  this.drawLaneRoadAsphalt();
	  drawLaneYellowCenterDashes();
    this.billboard.draw();
	}

	this.drawLaneGrass = function()
	{
    this.laneGrassImage1.draw();
    this.laneGrassImage2.draw();
	}

	this.drawLaneRoadAsphalt = function()
	{
    this.asphaltImage1.draw();
    this.asphaltImage2.draw();
	}

	function drawLaneYellowCenterDashes()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
      drawFromSheet(arrayOfYellowCenterDashes[dashIndex].image, arrayOfYellowCenterDashes[dashIndex].x,
                                  arrayOfYellowCenterDashes[dashIndex].y, dashWidth,dashHeight)
      // gameCanvasContext.drawImage(arrayOfYellowCenterDashes[dashIndex].image, arrayOfYellowCenterDashes[dashIndex].x,
      //                             arrayOfYellowCenterDashes[dashIndex].y, dashWidth,dashHeight);
		}
	}

	this.moveYellowCenterDashes = function()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
			arrayOfYellowCenterDashes[dashIndex].y += 3;
		}
	}

	this.spawnANewDashIfAppropriate = function()
	{
		if (arrayOfYellowCenterDashes[0].y > 0)
		{
			arrayOfYellowCenterDashes.unshift({x:320 - 7.5,y:-100,image:chooseDashPicture()});
		}
	}

	this.deleteDashesOffBottomOfScreen = function()
	{
		if (arrayOfYellowCenterDashes[arrayOfYellowCenterDashes.length - 1].y > 700)
		{
			arrayOfYellowCenterDashes.splice(arrayOfYellowCenterDashes.length - 1,1);
		}
	}

	this.handleDashArrayPopulation = function()
	{
		this.spawnANewDashIfAppropriate();
		this.deleteDashesOffBottomOfScreen();
	}
}

function LaneGrassImage(drawingStartingY,image)
{
  this.drawingStartingX = 0;
  this.drawingStartingY = drawingStartingY;
  this.width = gameCanvas.width;
  this.height = gameCanvas.height;
  this.image = image;

  this.draw = function()
  {
    drawFromSheet(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
    //gameCanvasContext.drawImage(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
  }

  this.scrollDown = function()
  {
    this.drawingStartingY += 3;
  }

  this.handleScrollingOffScreen = function()
  {
    if (this.drawingStartingY > gameCanvas.height)
    {
      this.drawingStartingY = -gameCanvas.height;
    }
  }
}

function AsphaltImage(drawingStartingY, image)
{
  this.drawingStartingX = gameCanvas.width/2 - gameCanvas.width/4;
  this.drawingStartingY = drawingStartingY;
  this.width = gameCanvas.width/2;
  this.height = gameCanvas.height;

  this.image = image;

  this.draw = function()
  {
    drawFromSheet(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
    //gameCanvasContext.drawImage(image, this.drawingStartingX,this.drawingStartingY, this.width,this.height);
  }

  this.scrollDown = function()
  {
    this.drawingStartingY += 3;
  }

  this.handleScrollingOffScreen = function()
  {
    if (this.drawingStartingY > gameCanvas.height)
    {
      this.drawingStartingY = -gameCanvas.height;
    }
  }
}

function Billboard()
{
  this.image = 'images\\sprites\\Lane\\billboard.png';
  this.width = gameCanvas.width/4;
  this.height = gameCanvas.height/3;

  this.x = 10;
  this.y = 0;

  this.yVelocity = 3;

  this.move = function()
  {
    this.y += this.yVelocity;
  }

  this.handleOffScreen = function()
  {
    if (this.y > gameCanvas.height)
    {
      this.y = -this.height;
    }
  }

  this.bannerMessageCharacters = ['G','o','o','d',' ','J','o','b','!'];

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);

    let arrayOfCharacterTypes = [];
    for (let bannerMessageIndex = 0; bannerMessageIndex < gameClassManager.currentGame.amountCorrect; bannerMessageIndex++)
             {
               arrayOfCharacterTypes.push(this.bannerMessageCharacters[bannerMessageIndex])
             }
             console.log()
             customFontFillText(arrayOfCharacterTypes, 30, 15, this.x + 15,this.y + 60);
  }
}
