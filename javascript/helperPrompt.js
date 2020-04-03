function HelperPrompt()
{
  this.isOn = false;

  this.wrongWord = '';

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.fillStyle = 'black';
    customFontFillText('The game suggests that you practice: ', 20, 15, 50,gameCanvas.height/2 - 30);
    customFontFillText(this.wrongWord, 30, 20, gameCanvas.width/2 - 100,gameCanvas.height/2);
  }

  this.popUp = function(gotWrong)
  {
    this.isOn = true;
    this.wrongWord = gotWrong;
  }
}

let helperPrompt = new HelperPrompt();
