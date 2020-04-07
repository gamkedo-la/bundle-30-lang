whackAnAnswerGameClass.prototype = new GameClass();
function whackAnAnswerGameClass()
  {

    this.name = 'whack an answer game';

    // this.imageWidth = 75;
    // this.imageHeight = 75;
    //
    // this.audioImageWidth = 75;
    // this.audioImageHeight = 75;

    this.textAnswerFontSize = 30;
    this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

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
     }

     this.handleClick = function()
     {
       this.playerCharacter.handleMouseClick();
     }

     this.answerVelocity = 2;
     this.oscillationVelocity1 = undefined;
     this.oscillationVelocity2 = undefined;
     this.radians = 0;
     
     this.moveAnswers = function()
     {

     }
  }

let whackAnAnswerGame = new whackAnAnswerGameClass();
