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

  this.gridIndex = this.rowIndex*this.columnIndex + this.columnIndex + 1;

  this.width = 150;
  this.height = 150;

  this.draw = function()
  {
    gameCanvasContext.strokeStyle = 'white';
    gameCanvasContext.strokeRect(this.columnIndex*this.height + 95,this.rowIndex*this.height + 120,
                               this.width,this.height);
  }
}
