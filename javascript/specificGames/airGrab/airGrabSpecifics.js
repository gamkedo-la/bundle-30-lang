AirGrabGameClass.prototype = new GameClass();

function AirGrabGameClass()
{
  this.name = 'airGrabGame';

  this.FRAME_RATE = 1000/30;

  this.titleScreenData = [
	  {name: "Air", fontSize: 27, spacing: 15, x: 445, y: 265},
	  {name: "Grab", fontSize: 27, spacing: 15, x: 437, y: 300}
	];

  this.background = undefined;

  this.superInitialize = function()
  {
    this.background = new AirGrabBackground();
  }

  this.draw = function()
  {
    this.background.draw();
  }

  this.update = function()
  {

  }
}

const airGrabGame = new AirGrabGameClass();
