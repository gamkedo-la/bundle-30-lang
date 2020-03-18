function MazeGameClass(){
    GameClass.call(this);

    this.name = "MazeGame";
    this.FRAME_RATE = 1000/30;

    this.maze = undefined;
    this.isGenerationAlgoRunning = true;
    this.isGamePlaying = false;

    this.areAnswersCenteredInCells = false;

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
        else if (!this.areAnswersCenteredInCells){
            this.centerCorrectAnswerInCorrespondingCell();
            this.centerIncorrectAnswerInCorrespondingCell();

            this.areAnswersCenteredInCells = true;
        }
    }

    this.draw = function()
    {
      this.drawBackGround();
      this.maze.drawCells();
      if (this.areAnswersCenteredInCells){
          drawAnswersManager.draw();
      }

      promptersManager.drawPromptsWhenAppropriate();
    }

    this.drawBackGround = function () 
    {
        gameCanvasContext.drawImage(mazeFloor, 0, 0, gameCanvas.width, gameCanvas.height);
    }

    this.centerCorrectAnswerInCorrespondingCell = function() {
        var correctAnswerCenteredPosition = this.centerAnswerPositionInCorrespondingCell(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing);
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = correctAnswerCenteredPosition.x;
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = correctAnswerCenteredPosition.y;
    }

    this.centerIncorrectAnswerInCorrespondingCell = function() {
        var incorrectAnswerCenteredPosition = this.centerAnswerPositionInCorrespondingCell(promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing);
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = incorrectAnswerCenteredPosition.x;
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = incorrectAnswerCenteredPosition.y;
    }

    this.centerAnswerPositionInCorrespondingCell = function(answer) {
        var centerX = this.centerXPositionInCorrespondingCell(answer.xCoordinate);
        var centerY = this.centerYPositionInCorrespondingCell(answer.yCoordinate);

        var adjustShift = this.adjustAnswerCenteringDependingOnDataType(answer);

        return {
            x: centerX - adjustShift.x,
            y: centerY - adjustShift.y,
        }
    }

    this.adjustAnswerCenteringDependingOnDataType = function(answer){
        var adjustShifX = 0;
        var adjustShifY = 0;

        if (promptsAndAnswersManager.currentAnswerDataType === 'string') {
            var answerWidth = promptsAndAnswersManager.getTextWidthFromFontStyle(
                answer.textAssociation, drawAnswersManager.textAnswerFontStyle
            );
            adjustShifX = answerWidth / 2;
        }
        else {
            adjustShifX = drawAnswersManager.imageWidth / 2;
            adjustShifY = drawAnswersManager.imageHeight / 2;
        }

        return {
            x: adjustShifX,
            y: adjustShifY
        }
    }
    
    this.centerXPositionInCorrespondingCell = function(x) {
        var centerX  = Math.floor(x / CELL_WIDTH);
        centerX *= CELL_WIDTH;
        centerX += CELL_WIDTH / 2;

        return centerX;
    }

    this.centerYPositionInCorrespondingCell = function(y) {
        var centerY  = Math.floor(y / CELL_HEIGHT);
        centerY *= CELL_HEIGHT;
        centerY += CELL_HEIGHT / 2;

        return centerY;
    }
}
MazeGameClass.prototype = new GameClass();
MazeGameClass.prototype.constructor = MazeGameClass;

const mazeGame = new MazeGameClass();
