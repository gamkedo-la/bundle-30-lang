function MazeGameClass(){
    GameClass.call(this);

    this.name = "MazeGame";
    this.FRAME_RATE = 1000/30;

    this.maze = undefined;
    this.isGenerationAlgoRunning = true;
    this.isGamePlaying = false;

    this.deadEndCellForCorrectAnswer = undefined
    this.deadEndCellForIncorrectAnswer = undefined
    this.areAnswersPlacedInDeadEndCells = false;

    this.textAnswerFontSize = 20;
    this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

    this.imageAnswerWidth = 55;
    this.imageAnswerHeight = 55;
    this.imageAnswerHolderWidth = 60;
    this.imageAnswerHolderHeight = 60;
    this.audioImageAnswerWidth = 75;
    this.audioImageAnswerHeight = 75;
    this.audioImageAnswerHolderWidth = 60;
    this.audioImageAnswerHolderHeight = 60;

    this.correctTextAnswerHolderWidth = undefined;
    this.incorrectTextAnswerHolderWidth = undefined;

    this.answerHolderImage = moleFoodImage;

    this.assignAnswerHolder = function()
    {
      let moleFoodAnswerHolder = new MoleFoodAnswerHolder(this.answerHolderImage);
      return moleFoodAnswerHolder;
    }

    this.LETTER_COLOR = "black";

    this.playerCharacter = undefined;
    this.defineAndInitializePlayerCharacter = function()
    {
        this.playerCharacter = new MazePlayer();
        this.playerCharacter.isPlaced = false;
    }

    this.titleScreenData = [
        {
            name: "Maze",
            fontSize: 27,
            spacing: 15,
            x: 37,
            y: 385
        }
    ];

    this.backgroundMusic = new MusicTrack('audio/backgroundTracks/mazeRaceMusic.mp3', 11.2);

    this.collisionsWithAnswersManager = new MazeCollisionsManager();

    this.superInitialize = function () {
        this.maze = new MazeClass();
        this.maze.initializeArrayOfCells();
        this.isGenerationAlgoRunning = true;
        this.isGamePlaying = false;

        this.deadEndCellForCorrectAnswer = undefined
        this.deadEndCellForIncorrectAnswer = undefined
        this.areAnswersPlacedInDeadEndCells = false;

        gameAudio.moleNav = new sfxOverlap('audio/V/moleNav.mp3');
    }

    this.update = function (){

        if (this.maze.isGenerationRunning){
            this.maze.generate();
        }
        else if (!this.areAnswersPlacedInDeadEndCells){
            this.selectDeadEndCellsForAnswers();
            this.placeAnswerAtCenterOfCell(
                promptsAndAnswersManager.correctTargetPromptAndAnswerPairing, this.deadEndCellForCorrectAnswer
            )
            this.placeAnswerAtCenterOfCell(
                promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing, this.deadEndCellForIncorrectAnswer
            )

            this.areAnswersPlacedInDeadEndCells = true;
        }
        else if (!this.playerCharacter.isPlaced){
            this.playerCharacter.placeInMazeAndAvoidAnswersCells();
        }
        else{
            this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.playerCharacter);
        }
    }

    this.reset = function (){
        this.isGenerationAlgoRunning = true;
        this.isGamePlaying = false;

        this.areAnswersPlacedInDeadEndCells = false;
        this.deadEndCellForCorrectAnswer = undefined
        this.deadEndCellForIncorrectAnswer = undefined

        this.playerCharacter.resetPosition();
        this.maze.reset();
    }

    this.draw = function()
    {
        this.drawBackGround();
        this.maze.drawCells();

        if (this.areAnswersPlacedInDeadEndCells){
            drawAnswersManager.draw();
        }

        this.playerCharacter.draw();

        promptersManager.drawPromptsWhenAppropriate();

        // FOR DEBUG
        if (debugOn){
            this.drawMousePosition();
            gameCanvasContext.fillStyle="white";
            gameCanvasContext.fillRect(this.playerCharacter.x-5, this.playerCharacter.y-5, 10, 10);
        }
    }

    this.drawMousePosition = function(){
        gameCanvasContext.save();
        gameCanvasContext.font = "15px Arial"
        gameCanvasContext.fillStyle = "gold";
        gameCanvasContext.fillText(
            "( " + inputManager.mouseCoordinates.x +
            " , " + inputManager.mouseCoordinates.y +
            " )",
            inputManager.mouseCoordinates.x + 10,
            inputManager.mouseCoordinates.y
        );
        gameCanvasContext.fillStyle = "red";
        gameCanvasContext.fillText(
            (
                Math.floor(inputManager.mouseCoordinates.x / CELL_WIDTH) +
                Math.floor(inputManager.mouseCoordinates.y / CELL_HEIGHT)* NUMBER_OF_COLUMNS
            ) + " : " +
            "( "  + Math.floor(inputManager.mouseCoordinates.x / CELL_WIDTH) +
            " , " + Math.floor(inputManager.mouseCoordinates.y / CELL_HEIGHT)+
            " )",
            inputManager.mouseCoordinates.x + 10,
            inputManager.mouseCoordinates.y + 20
        );
        gameCanvasContext.restore();
    }

    this.drawBackGround = function ()
    {
        gameCanvasContext.drawImage(mazeFloor, 0, 0, gameCanvas.width, gameCanvas.height);
    }

    this.selectDeadEndCellsForAnswers = function () {

        this.deadEndCellForCorrectAnswer = getRandomElementFromArray(this.maze.arrayOfDeadEndCells);
        while (this.deadEndCellForCorrectAnswer.isOccupiedByPlayer){
            this.deadEndCellForCorrectAnswer = getRandomElementFromArray(this.maze.arrayOfDeadEndCells);
        }

        this.deadEndCellForIncorrectAnswer = getRandomElementFromArray(this.maze.arrayOfDeadEndCells);
        while (
            this.deadEndCellForCorrectAnswer.index == this.deadEndCellForIncorrectAnswer.index ||
            this.deadEndCellForCorrectAnswer.isOccupiedByPlayer
        ) {
            this.deadEndCellForIncorrectAnswer = getRandomElementFromArray(this.maze.arrayOfDeadEndCells);
        }
    }

    this.placeAnswerAtCenterOfCell = function(answer, cell){
        answer.xCoordinate = cell.columnIndex * CELL_WIDTH;
        answer.yCoordinate = cell.rowIndex * CELL_HEIGHT;
        this.centerAnswerPositionInCorrespondingCell(answer);
    }

    this.centerAnswerPositionInCorrespondingCell = function(answer) {
        var adjustShift = this.adjustAnswerCenteringDependingOnDataType(answer);

        answer.xCoordinate += CELL_WIDTH / 2  - adjustShift.x;
        answer.yCoordinate += CELL_HEIGHT / 2 - adjustShift.y;
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

    this.handleSpaceBarDown = function () {
        if (debugOn){
            var cellIdx = Math.floor(inputManager.mouseCoordinates.x / CELL_WIDTH) +
                Math.floor(inputManager.mouseCoordinates.y / CELL_HEIGHT) * NUMBER_OF_COLUMNS;

            this.playerCharacter.currentCell = this.maze.arrayOfCells[cellIdx];
            this.playerCharacter.placeAtCenteOfCurrentCell();
        }
    }

    this.handleUpArrowDown = function(){
        if (this.playerCharacter.isPlaced){
            this.playerCharacter.moveUp();
            gameAudio.moleNav.play();
        }
    }

    this.handleDownArrowDown = function(){
        if (this.playerCharacter.isPlaced){
            this.playerCharacter.moveDown();
            gameAudio.moleNav.play();
        }
    }

    this.handleLeftArrowDown = function(){
        if (this.playerCharacter.isPlaced){
            this.playerCharacter.moveLeft();
            gameAudio.moleNav.play();
        }
    }

    this.handleRightArrowDown = function(){
        if (this.playerCharacter.isPlaced){
            this.playerCharacter.moveRight();
            gameAudio.moleNav.play();
        }
    }
}
MazeGameClass.prototype = new GameClass();
MazeGameClass.prototype.constructor = MazeGameClass;

const mazeGame = new MazeGameClass();
