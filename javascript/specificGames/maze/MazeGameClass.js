function MazeGameClass(){
    GameClass.call(this);

    this.name = "MazeGame";
    this.FRAME_RATE = 1000/30;

    this.maze = undefined;
    this.isGenerationAlgoRunning = true;
    this.isGamePlaying = false;

    this.titleScreenData = [
        {
            name: "Maze", 
            fontSize: 27, 
            spacing: 15, 
            x: 37, 
            y: 385
        }
    ];

    this.superInitialize = function () {
        this.maze = new MazeClass();
        this.maze.initializeArrayOfCells();
    }

    this.update = function (){
        if (this.maze.isGenerationRunning){
            this.maze.generate();
        }
    }

    this.generateMaze = function () {

    }

    this.draw = function()
    {
      this.drawBackGround();
      this.maze.drawCells();
    }

    this.drawBackGround = function () 
    {
        gameCanvasContext.fillStyle = 'black';
        gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    }
}
MazeGameClass.prototype = new GameClass();
MazeGameClass.prototype.constructor = MazeGameClass;

const mazeGame = new MazeGameClass();
AVAILABLE_GAMES.push(mazeGame);