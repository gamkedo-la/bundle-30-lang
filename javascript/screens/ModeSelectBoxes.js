function ModeSelectBox(arrayIndex, name, mode, selectedStatus)
{
  this.arrayIndex = arrayIndex;
  this.name = name;
  this.mode = mode;

  this.selectedStatus = selectedStatus;

  this.radioButtonX = gameCanvas.width/8;
  this.radioButtonY = (arrayIndex*modeSelectScreen.height/3) + gameCanvas.height/8;
  this.radioButtonRadius = gameCanvas.width/25;
  this.radioButtonStartingAngle = 0;
  this.radioButtonEndingAngle = 2 * Math.PI;

  this.drawEmptyRadioButton = function(radioButtonIndex)
  {
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(this.radioButtonX,this.radioButtonY, this.radioButtonRadius,
                          this.radioButtonStartingAngle,this.radioButtonEndingAngle);
    gameCanvasContext.stroke();
  }

  this.drawFilledRadioButton = function()
  {
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(this.radioButtonX,this.radioButtonY, this.radioButtonRadius,
                          this.radioButtonStartingAngle,this.radioButtonEndingAngle);
    gameCanvasContext.fill();
  }

  this.drawText = function()
  {
    customFontFillText(this.name, 40, 20, this.radioButtonX + gameCanvas.width/10,this.radioButtonY - modeSelectScreen.height/20);
  }

  this.draw = function()
  {
    if (this.selectedStatus === true)
    {
      this.drawFilledRadioButton();
    }
    else
    {
      this.drawEmptyRadioButton();
    }
    this.drawText();
  }
}
