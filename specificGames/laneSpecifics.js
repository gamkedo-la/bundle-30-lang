var laneStartingX = 230;
var laneStartingY = 500;

var laneLetterSpawnRate = 2000;

var laneLetterSpeed = 3;

var laneLetterColor = 'red';

var laneBackButtonRectangleColor = 'Fuchsia';
var laneBackButtonTextColor = 'yellow';

function laneGameClass() {
	let arrayOfYellowCenterDashes = [-1, 0, 1, 2, 3, 4, 5, 6].map(function(dashIndex) {
		return {x: 320 - 7.5, y: dashIndex*100};
	});
	let dashHeight = 75;
	let dashWidth = 15;

	this.frameRate = 1000/50;

	this.initialize = function() {
		playerXCoordinate = laneStartingX;
		playerYCoordinate = laneStartingY;
		letterSpeed = laneLetterSpeed;
		gameInterval.reset(this.frameRate);
	};

	this.update = function() {
		moveYellowCenterDashes();
		handleDashArrayPopulation();
	};

    this.draw = function()
    {
	  // draw background
	  drawLaneGrass();
	  drawLaneRoadAsphalt();
	  drawLaneYellowCenterDashes();
	  // draw player
	  gameCanvasContext.fillStyle = 'blue';
	  gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 30,60);
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

	function moveYellowCenterDashes()
	{
		for (let dashIndex = 0; dashIndex < arrayOfYellowCenterDashes.length; dashIndex++)
		{
			arrayOfYellowCenterDashes[dashIndex].y += 3;
		}
	}

	function spawnANewDashIfAppropriate()
	{
		if (arrayOfYellowCenterDashes[0].y > 0)
		{
			arrayOfYellowCenterDashes.unshift({x:320 - 7.5,y:-100});
		}
	}

	function deleteDashesOffBottomOfScreen()
	{
		if (arrayOfYellowCenterDashes[arrayOfYellowCenterDashes.length - 1].y > 700)
		{
			arrayOfYellowCenterDashes.splice(arrayOfYellowCenterDashes.length - 1,1);
		}
	}

	function handleDashArrayPopulation()
	{
		spawnANewDashIfAppropriate();
		deleteDashesOffBottomOfScreen();
	}

	this.handleLeftArrowDown = function()
	{
		if (playerXCoordinate > 230)
		playerXCoordinate = 230;
	}

	this.handleRightArrowDown = function()
	{
		if (playerXCoordinate !== 380)
		{
			playerXCoordinate = 380;
		}
	}
}

const laneGame = new laneGameClass();
