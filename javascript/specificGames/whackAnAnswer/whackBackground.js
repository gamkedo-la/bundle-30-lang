function WhackBackground()
{
  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableBeneathSurface, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableSurface, 0,0, gameCanvas.width,gameCanvas.height);
  }

  this.drawGrid = function()
  {
    for (let rowIndex = 0; rowIndex < 3; rowIndex++)
    {

    }
  }
}

function WhackTile(rowIndex,columnIndex)
{
  this.rowIndex = rowIndex;
  this.columntIndex = columnIndex;

  this.width = 150;
  this.height = 130;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(this.columnIndex*this.height + 95,this.rowIndex*this.height + 125,
                               this.width,this.height);
  }
}
