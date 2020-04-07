function WhackBackground()
{
  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableBeneathSurface, 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(whackTableSurface, 0,0, gameCanvas.width,gameCanvas.height);
    this.drawGrid();
  }

  this.grid = [];

  this.createTiles = function()
  {
    for (let rowIndex = 0; rowIndex < 3; rowIndex++)
    {
      for (let columnIndex = 0; columnIndex < 3; columnIndex++)
      {
        let tile = new WhackTile(rowIndex,columnIndex);
        this.grid.push(tile);
      }
    }
  }

  this.drawGrid = function()
  {
    for (let gridIndex = 0; gridIndex < this.grid.length; gridIndex++)
    {
      this.grid[gridIndex].draw();
    }
  }
}

function WhackTile(rowIndex,columnIndex)
{
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;

  this.answer = undefined;

  this.gridIndex = this.rowIndex*3 + this.columnIndex;

  this.width = 150;
  this.height = 150;

  this.x = this.columnIndex*this.height + 95;
  this.y = this.rowIndex*this.height + 120;

  this.draw = function()
  {
    gameCanvasContext.strokeStyle = 'white';
    gameCanvasContext.strokeRect(this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillText(this.gridIndex.toString(), this.x + 30,this.y + 30);
  }

  this.drawAnswer = function()
  {
    if (this.answer !== undefined)
    {
      
    }
  }
}
