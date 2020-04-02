function HelperPrompt()
{
  this.isOn = false;

  this.wrongWord = '';

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.fillText('The game suggests that you practice: ', gameCanvas.width/2,gameCanvas.height/2);
    gameCanvasContext.fillText(this.wrongWord, gameCanvas.width/2,gameCanvas.height/2 + 50);
  }

  this.popUp = function(gotWrong)
  {
    this.isOn = true;
    this.wrongWord = gotWrong;
  }
}

let helperPrompt = new HelperPrompt();
