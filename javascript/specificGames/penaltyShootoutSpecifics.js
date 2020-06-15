//penaltySpecifics
//2 stated game. 2 letters come to the screen; one on the left, one on the right. Player has to make the correct choice about where to shoot the ball. If player does get it correctly, she wins one point
let arrayOfBallImages = [];
let arrayOfBallImagesIndex = 0
let arrayOfGoalkeeperImages = [];
let arrayOfGoalkeeperImagesIndex = 0;

arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\1.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\2.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\3.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\4.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\5.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\6.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\7.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\8.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\9.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\10.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\11.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\12.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\13.png");
arrayOfGoalkeeperImages.push("images\\sprites\\Penalty\\goalkeeper\\14.png");

arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0000.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0001.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0002.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0003.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0004.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0005.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0006.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0007.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0008.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0009.png");
arrayOfBallImages.push("images\\sprites\\Penalty\\ball\\ball0010.png");

const penaltyBackButtonRectangleColor = 'yellow';
const penaltyBackButtonTextColor = 'red';
const penaltyLetterColor = 'BlueViolet';
const penaltyGameState = {
  DecisionState: 1,
  PenaltyShootingState: 2,
};
const BALL_WIDTH = 100;
const BALL_HEIGHT = 100;
const GOAL_WIDTH = 600;
const GOAL_HEIGHT = 300;

const BALL_RIGHTSIDE_X = 520;
const BALL_RIGHTSIDE_Y = 90;
const BALL_LEFTSIDE_X = 120;
const BALL_LEFTSIDE_Y = 90;

const BALL_X = 295;
const BALL_Y = 500;
const GOAL_X = 15;
const GOAL_Y = 0;

const GOALKEEPER_WIDTH = 500;
const GOALKEEPER_HEIGHT = 300;

const GOALKEEPER_X = 70;
const GOALKEEPER_Y = 70;

penaltyGameClass.prototype = new GameClass();
function penaltyGameClass(){
    this.name = 'penaltyGame';
    this.currentState = penaltyGameState.DecisionState;
    this.selectedSide;
    this.correctSide;
    //this.totalFrameCountToChangeState = 30;
    //this.currentFrame = 0;
    this.frameCountToChangeSpriteForGoalkeeper = 2;
    this.currentFrameToChangeSpriteForGoakeeper = 0;
    this.frameRate = 30;
    this.ballWidth = BALL_WIDTH;
    this.ballHeight = BALL_HEIGHT;
    this.ballX = BALL_X;
    this.ballY = BALL_Y;
    this.goalkeeperX = GOALKEEPER_X;
    this.goalkeeperY = GOALKEEPER_Y;
    this.goalkeeperWidth = GOALKEEPER_WIDTH;
    this.goalkeeperHeight = GOALKEEPER_HEIGHT;
    this.ArrayOfGoalkeeperImages = [];
    this.ArrayOfGoalkeeperImagesIndex = 0;
    this.ArrayOfBallImages = [];
    this.ArrayOfBallImagesIndex = 0;
    this.FlipGoalkeeper = 0;
    this.sides = {
      left : {number : 1, isCorrect : false, drawX : 50, drawY : 125},
      right : {number : 2, isCorrect : false, drawX : 500, drawY : 125}
    };
    this.titleScreenData = [{
    name: "Penalty",
    fontSize: 17,
    spacing: 12,
    x: 324, y: 405
    }];
    this.superInitialize = this.initialize;
    this.initialize = function(){
        gameInterval.reset(this.frameRate);
        this.drawLettersAndCorrectSide();
        this.superInitialize();
    };
    this.defineAndInitializePlayerCharacter = function () {

    };

    this.handleLeftArrowDown = function(){
        if (this.currentState === penaltyGameState.DecisionState) {
          this.selectedSide = this.sides.left;
          this.changeState();
          this.currentFrame = 0;
        }
    };

    this.handleRightArrowDown = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        this.selectedSide = this.sides.right;
        this.changeState();
        this.currentFrame = 0;
      }
    };

    this.frameRate = 1000/30;
    this.letterSpawnInterval = 2000;

    this.initialize = function(){
      this.setCorrectSide();
      this.currentstate = penaltyGameState.DecisionState;
    };

    this.update = function(){
        this.draw();
        // if (this.currentState === penaltyGameState.PenaltyShootingState){
        //   this.handleFrameCountToChangeState();
        // }
        //collisionsWithAnswersManager.handleCollisionsWithAnswers();
    };

    this.handleFrameCountToChangeState = function(){
      if (arrayOfGoalkeeperImagesIndex >= arrayOfGoalkeeperImages.length) {
        this.changeState();
        promptersManager.promptThePlayer();
      }
    }

    this.draw = function(){
        this.drawBackground();
        this.drawBall();
        this.drawGoal();
        this.drawGoalKeeper();
      if (this.currentState === penaltyGameState.DecisionState) {
        this.drawLetters();
        drawAnswersManager.draw();
        promptersManager.drawPromptsWhenAppropriate();
      }
      else if (this.currentState === penaltyGameState.PenaltyShootingState){
        this.drawShootingAnimation();
      }
    };

    this.drawBackground = function(){
      drawFromSheet('images\\Backgrounds\\Grass.png', 0, 0, gameCanvas.width, gameCanvas.height);
    };

    this.drawBall = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        arrayOfBallImagesIndex = 0;
        this.ballX = BALL_X;
        this.ballY = BALL_Y;
        this.ballWidth = BALL_WIDTH;
        this.ballHeight = BALL_HEIGHT;
      }
      else {
        arrayOfBallImagesIndex++;
        if (this.selectedSide.number === 1) {
          var direction = Math.atan2( BALL_LEFTSIDE_Y - BALL_Y, BALL_LEFTSIDE_X - BALL_X );
        }
        else {
          var direction = Math.atan2( BALL_RIGHTSIDE_Y - BALL_Y, BALL_RIGHTSIDE_X - BALL_X );
        }
          var speedX = Math.cos(direction) * 11;
					var speedY = Math.sin(direction) * 11;
          this.ballX += speedX;
          this.ballY += speedY;
          this.ballWidth -= 1;
          this.ballHeight -= 1;
        if (arrayOfBallImagesIndex >= arrayOfBallImages.length) {
          arrayOfBallImagesIndex = 0;
        }
      }
      drawFromSheet(arrayOfBallImages[arrayOfBallImagesIndex], this.ballX, this.ballY, this.ballWidth, this.ballHeight);
    };

    this.drawGoal = function(){
      drawFromSheet("images\\sprites\\Penalty\\goal.png", GOAL_X,GOAL_Y, GOAL_WIDTH,GOAL_HEIGHT);
    };

    this.drawGoalKeeper = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        arrayOfGoalkeeperImagesIndex = 0;
      }
      else {
        if ( this.frameCountToChangeSpriteForGoalkeeper  > this.currentFrameToChangeSpriteForGoakeeper) {
          this.currentFrameToChangeSpriteForGoakeeper++;
        }
        else {
          this.currentFrameToChangeSpriteForGoakeeper = 0;
          arrayOfGoalkeeperImagesIndex++;
        }
        if (arrayOfGoalkeeperImagesIndex >= arrayOfGoalkeeperImages.length) {
          this.changeState();
          promptersManager.promptThePlayer();
          arrayOfGoalkeeperImagesIndex = 0;
        }
      }
      drawFromSheet(arrayOfGoalkeeperImages[arrayOfGoalkeeperImagesIndex], this.goalkeeperX, this.goalkeeperY, this.goalkeeperWidth, this.goalkeeperHeight, this.FlipGoalkeeper);
    };


    this.drawLetters = function(){
      for (var key of Object.keys(this.sides)) {
        // gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonColor;// FIXME: There will be drawing of the letters here.
        // gameCanvasContext.fillRect( this.sides[key].drawX, this.sides[key].drawY, 50, 50);
        if (this.correctSide === this.sides[key].number) {
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = this.sides[key].drawY;
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = this.sides[key].drawX;
        }
        else {
          promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = this.sides[key].drawY;
          promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = this.sides[key].drawX;
        }
      }
    };

    this.changeState = function(){
      switch (this.currentState) {
        case penaltyGameState.DecisionState:
          if (this.correctSide === this.selectedSide.number) {
            genAudio.playPositive();
            amountCorrect++;
            this.collisionsWithAnswersManager.processCollisionWithAnswer();
          }
          else {
            genAudio.playNegative();
            amountIncorrect++;
            this.collisionsWithAnswersManager.processCollisionWithAnswer();
          }
          this.selectedSide == null;
          this.ResetStrikerAndGoalKeeper();
          this.currentState = penaltyGameState.PenaltyShootingState;
          this.setCorrectSide();
          //penaltyGame.changeState();
          break;
        case penaltyGameState.PenaltyShootingState:
          this.ResetSelectionScreen();
          // this.UpdateScore();
          this.currentState = penaltyGameState.DecisionState;
          break;
        default:

      }
    };

    this.setCorrectSide = function(){
      if (this.correctSide === this.sides.left.number){
        this.FlipGoalkeeper = 0;
      }
      else {
        this.FlipGoalkeeper = 1;
      }
      this.correctSide = Math.floor(Math.random() * 2) + 1;
    };

    this.ResetStrikerAndGoalKeeper = function(){
      // TODO: not implemented yet. Will be used for starting animation when decision is made.
    };

    this.ResetSelectionScreen = function(){
      // TODO: not implemented yet. Will be used for reseting selection when animation is finished.
    };

    this.drawShootingAnimation = function(){
     // TODO: animation drawing not implemented yet. So this function only switches to the other state at the moment.
    }
}
function stateChanger(objWhoseStateShouldChange) {
    penaltyGame.changeState();
}
var penaltyGame = new penaltyGameClass();
