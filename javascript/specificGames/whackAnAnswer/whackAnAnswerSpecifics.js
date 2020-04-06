whackAnAnswerGameClass.prototype = new GameClass();
function whackAnAnswerGameClass()
  {

    this.name = 'whack an answer game';

    this.titleScreenData =
     [
      {name: "Whack",fontSize: 25, spacing: 12, x: 235, y: 550},
      {name: "An",fontSize: 25, spacing: 10, x: 260, y: 580},
      {name: "Answer",fontSize: 25, spacing: 10, x: 235, y: 615}
     ];

     this.initialize = function()
     {
   	   this.playerCharacter = new Hammer();
       this.background = new WhackBackground();
       this.playerCharacter.initialize();
       this.collidingObject = this.playerCharacter;
       initializePromptAndAnswerObjects();
       promptsAndAnswersManager.setOrResetPromptsAndAnswers();
       promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
   	  this.superInitialize();
     };
  }
