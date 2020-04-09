whackAnAnswerGameClass.prototype = new GameClass();
function whackAnAnswerGameClass()
  {

    this.name = 'whack an answer game';

    this.imageAnswerWidth = 75;
    this.imageAnswerHeight = 75;

    this.audioImageAnswerWidth = 75;
    this.audioImageAnswerHeight = 75;

    this.textAnswerFontSize = 30;
    this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

    this.FRAME_RATE = 1000/30;

    this.backButtonColor = 'rgb(0,127,127)';
    this.backButtonTextColor = 'rgb(224,224,224)';

    this.titleScreenData =
     [
      {name: "Whack",fontSize: 25, spacing: 12, x: 235, y: 550},
      {name: "An",fontSize: 25, spacing: 10, x: 260, y: 580},
      {name: "Answer",fontSize: 25, spacing: 10, x: 235, y: 615}
     ];

     this.initialize = function()
     {
       //document.body.style.cursor = 'none';
   	   this.playerCharacter = new Hammer();
       this.background = new WhackBackground();
       this.background.createTiles();
       this.playerCharacter.initialize();
       this.collidingObject = this.playerCharacter;
       initializePromptAndAnswerObjects();
       promptsAndAnswersManager.setOrResetPromptsAndAnswers();
       promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
       drawAnswersManager.initialize();
   	   //this.superInitialize();
     };

     this.superInitialize = this.initialize;

     this.draw = function()
     {
       this.background.draw();
       this.playerCharacter.draw();

       promptersManager.drawPromptsWhenAppropriate();
     }

     this.update = function()
     {
       this.playerCharacter.update();
       this.moveAnswers();
     }

     this.handleClick = function()
     {
       this.playerCharacter.handleMouseClick();
     }

     this.moveAnswers = function()
     {
       let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
       let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;

       correctAnswer.radians += correctAnswer.oscillationVelocity;
       incorrectAnswer.radians += incorrectAnswer.oscillationVelocity;

       correctAnswer.xSpeed = 2;
       correctAnswer.ySpeed = 2;
       incorrectAnswer.xSpeed = 2;
       incorrectAnswer.ySpeed = 2;

       // console.log('correctAnswer.whackAnAnswerPositionName: ' + correctAnswer.whackAnAnswerPositionName);
       if (correctAnswer.whackAnAnswerPositionName === 'left')
       {
         //left and right
         // console.log('inside left position move function');
         correctAnswer.xCoordinate =
         correctAnswer.whackAnAnswerXStartingPosition + 50 + (Math.cos(correctAnswer.radians) * 25) + correctAnswer.xSpeed;
       }
       else if (correctAnswer.whackAnAnswerPositionName === 'right')
       {
         // console.log('inside right position move function');
         correctAnswer.xCoordinate =
         correctAnswer.whackAnAnswerXStartingPosition - 75 + (Math.cos(correctAnswer.radians) * 25) + correctAnswer.xSpeed;
       }
       else if (correctAnswer.whackAnAnswerPositionName === 'above')
       {
         // console.log('inside above position move function');
         //up and down
         correctAnswer.yCoordinate =
         correctAnswer.whackAnAnswerYStartingPosition + 75 + (Math.sin(correctAnswer.radians) * 25) + correctAnswer.ySpeed;
       }
       else if (correctAnswer.whackAnAnswerPositionName === 'below')
       {
         // console.log('inside below position move function');
         correctAnswer.yCoordinate =
         correctAnswer.whackAnAnswerYStartingPosition - 60 + (Math.sin(correctAnswer.radians) * 25) + correctAnswer.ySpeed;
       }

       if (incorrectAnswer.whackAnAnswerPositionName === 'left')
       {
         //left and right
         incorrectAnswer.xCoordinate =
         incorrectAnswer.whackAnAnswerXStartingPosition + 50 + (Math.cos(incorrectAnswer.radians) * 25) + incorrectAnswer.xSpeed;
       }
       else if (incorrectAnswer.whackAnAnswerPositionName === 'right')
       {
         incorrectAnswer.xCoordinate =
         incorrectAnswer.whackAnAnswerXStartingPosition - 75 + (Math.cos(incorrectAnswer.radians) * 25) + incorrectAnswer.xSpeed;
       }
       else if (incorrectAnswer.whackAnAnswerPositionName === 'above')
       {
         //up and down
         incorrectAnswer.yCoordinate =
         incorrectAnswer.whackAnAnswerYStartingPosition + 75 + (Math.sin(incorrectAnswer.radians) * 25) + incorrectAnswer.ySpeed;
       }
       else if (incorrectAnswer.whackAnAnswerPositionName === 'below')
       {
         incorrectAnswer.yCoordinate =
         incorrectAnswer.whackAnAnswerYStartingPosition - 60 + (Math.sin(incorrectAnswer.radians) * 25) + incorrectAnswer.ySpeed;
       }
     }
  }

let whackAnAnswerGame = new whackAnAnswerGameClass();
