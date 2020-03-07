function LaneBackgroundClass()
{
  let dashPictureNumber = 1;
  let currentDashPicture = roadDash1;

  function chooseDashPicture()
  {
    if (dashPictureNumber === 1)
    {
      currentDashPicture = roadDash1;
      dashPictureNumber = 2;
    }
    else if (dashPictureNumber === 2)
    {
      currentDashPicture = roadDash2;
      dashPictureNumber = 1;
    }
    console.log(currentDashPicture);
    return currentDashPicture;
  }

  let arrayOfYellowCenterDashes = [-1, 0, 1, 2, 3, 4, 5, 6].map(function(dashIndex) {
		return {x: 320 - 7.5, y: dashIndex*100, image:chooseDashPicture()};
	});
	let dashHeight = 75;
	let dashWidth = 15;

  this.draw = function()
	{
		drawLaneGrass();
	  drawLaneRoadAsphalt();
	  drawLaneYellowCenterDashes();
	}

	function drawLaneGrass()
	{
    let startingXOnCanvas = 0;
    let startingYOnCanvas = 0;
    let endingXOnCanvas = gameCanvas.width;
    let endingYOnCanvas = gameCanvas.height;
		gameCanvasContext.drawImage(laneGrassBackground, startingXOnCanvas,startingYOnCanvas, endingXOnCanvas,endingYOnCanvas);

	}

	function drawLaneRoadAsphalt()
	{
    let startingXOnCanvas = gameCanvas.width/2 - gameCanvas.width/4;
    let startingYOnCanvas = 0;
    let endingXOnCanvas = gameCanvas.width/2;
    let endingYOnCanvas = gameCanvas.height;
		gameCanvasContext.drawImage(laneRoad, startingXOnCanvas,startingYOnCanvas, endingXOnCanvas,endingYOnCanvas);

	}

	function drawLaneYellowCenterDashes()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
      gameCanvasContext.drawImage(arrayOfYellowCenterDashes[dashIndex].image, arrayOfYellowCenterDashes[dashIndex].x,
                                  arrayOfYellowCenterDashes[dashIndex].y, dashWidth,dashHeight);
			// gameCanvasContext.fillStyle = 'yellow';
			// gameCanvasContext.fillRect(arrayOfYellowCenterDashes[dashIndex].x,arrayOfYellowCenterDashes[dashIndex].y,
			// 						   dashWidth,dashHeight);
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
