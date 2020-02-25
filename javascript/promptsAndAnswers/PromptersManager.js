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

    this.flashInterval = undefined;
    this.flashInterval = new frameInterval(this.toggleAudioAnswersFlashWhenPlaying,100);

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
          promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing = false;
          promptersManager.flashInterval.stop();
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
          promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing = false;
          promptersManager.flashInterval.stop();
        }//clear both onended functions to account for unintended play calls
      }//end of incorrect answer audio being played first
      promptsAndAnswersManager.currentIncorrectAnswer.play();
      promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing = true;
    }//end of else for coin flip
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

    if (promptersManager.highlightedAnswerCurrentAlpha === 1)
    {
      promptersManager.highlightedAnswerCurrentAlpha = 0;
    } else if (promptersManager.highlightedAnswerCurrentAlpha === 0){
      promptersManager.highlightedAnswerCurrentAlpha = 1;
    }
  }

  this.flashInterval = undefined;

}//end of prompters manager

let promptersManager = new PromptersManager();
