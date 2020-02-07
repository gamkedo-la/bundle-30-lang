function PromptersManager()
{
  this.instantiatePrompters = function()
  {
    textPrompter = new TextPrompter();
    imagePrompter = new ImagePrompter();
    audioPrompter = new AudioPrompter();
  }

  this.currentPrompter = undefined;
  this.loadCurrentPrompter = function(prompterToLoad)
  {
    this.currentPrompter = prompterToLoad;
    console.log('this.currentPrompter.name: ' + this.currentPrompter.name);
  }


  this.loadAppropriatePrompterBasedOnCurrentPromptsDataType = function()
  {
    if (promptsAndAnswersManager.dataTypeOfCurrentPrompt === 'string')
    {
      this.loadCurrentPrompter(textPrompter);
    } else if (promptsAndAnswersManager.dataTypeOfCurrentPrompt === 'IMG')
    {
     this.loadCurrentPrompter(imagePrompter);
   } else if (promptsAndAnswersManager.dataTypeOfCurrentPrompt === 'AUDIO')
   {
     this.loadCurrentPrompter(audioPrompter);
   }
  }

  this.shouldBeDrawingAPrompt = false;
  this.promptThePlayer = function()
  {
      if (typeof(this.currentPrompter) != 'undefined') {
		  this.currentPrompter.promptThePlayer();
	  }
  }

  this.promptAudioAnswersWhenAppropriate = function()
  {
    let randomNumber = Math.random();
    this.playAudioAnswersBackToBack(randomNumber);

  }//end of prompt audio answers when appropriate

  this.playAudioAnswersBackToBack = function(randomNumber)
  {
    if (randomNumber < 0.5)
    {
      promptsAndAnswersManager.currentCorrectAnswer.onended = function()
      {
        promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing = false;
        promptsAndAnswersManager.currentIncorrectAnswer.play();
        promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing = true;
        promptsAndAnswersManager.currentIncorrectAnswer.onended = function()
        {
          promptsAndAnswersManager.currentCorrectAnswer.onended = undefined;
          promptsAndAnswersManager.currentIncorrectAnswer.onended = undefined;
          promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing = false;
        }//clear both onended functions to account for unintended play calls
      }
      promptsAndAnswersManager.currentCorrectAnswer.play();
      promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing = true;
    } else
    {
      promptsAndAnswersManager.currentIncorrectAnswer.onended = function()
      {
        promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing = false;
        promptsAndAnswersManager.currentCorrectAnswer.play();
        promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing = true;
        promptsAndAnswersManager.currentCorrectAnswer.onended = function()
        {
          promptsAndAnswersManager.currentCorrectAnswer.onended = undefined;
          promptsAndAnswersManager.currentIncorrectAnswer.onended = undefined;
          promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing = false;
        }//clear both onended functions to account for unintended play calls
      }//end of incorrect answer audio being played first
      promptsAndAnswersManager.currentIncorrectAnswer.play();
      promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing = true;
    }//end of else for coin flip
    this.flashInterval = new frameInterval(this.toggleAudioAnswersFlashWhenPlaying,100);
  }

  this.globalCompositeOperationForCanvasContext = 'source-over';
  this.highlightedAnswerCurrentAlpha = 1;
  this.toggleAudioAnswersFlashWhenPlaying = function()
  {
    if (this.globalCompositeOperationForCanvasContext !== 'lighten')
    {
      this.globalCompositeOperationForCanvasContext = 'lighten';
    } else {
      this.globalCompositeOperationForCanvasContext = 'source-over';
    }

    console.log('this.highlightedAnswerCurrentAlpha: ' + promptersManager.highlightedAnswerCurrentAlpha);
    if (promptersManager.highlightedAnswerCurrentAlpha === 1)
    {
      promptersManager.highlightedAnswerCurrentAlpha = 0;
      console.log('inside toggle flash on');
    } else if (promptersManager.highlightedAnswerCurrentAlpha === 0){
      promptersManager.highlightedAnswerCurrentAlpha = 1;
      console.log('inside toggle flash off');
    }

    console.log('inside toggle flash');
  }

  this.flashInterval = undefined;

}//end of prompters manager

let promptersManager = new PromptersManager();
