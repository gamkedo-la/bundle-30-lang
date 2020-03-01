function LaneBackgroundClass()
{
  let arrayOfYellowCenterDashes = [-1, 0, 1, 2, 3, 4, 5, 6].map(function(dashIndex) {
		return {x: 320 - 7.5, y: dashIndex*100};
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
		gameCanvasContext.fillStyle = 'green';
		gameCanvasContext.fillRect(0,0, 640,700);
	}

	function drawLaneRoadAsphalt()
	{
		gameCanvasContext.fillStyle = 'gray';
		gameCanvasContext.fillRect(140,0, 360,700);
	}

	function drawLaneYellowCenterDashes()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
			gameCanvasContext.fillStyle = 'yellow';
			gameCanvasContext.fillRect(arrayOfYellowCenterDashes[dashIndex].x,arrayOfYellowCenterDashes[dashIndex].y,
									   dashWidth,dashHeight);
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
			arrayOfYellowCenterDashes.unshift({x:320 - 7.5,y:-100});
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
