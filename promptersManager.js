function PromptersManager()
{
  this.currentPrompter = undefined;
  this.loadCurrentPrompter = function(prompterToLoad)
  {
    this.currentPrompter = prompterToLoad;
  }

  this.defineCurrentPrompterDataType = function()
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

  this.promptThePlayer = function()
  {
    this.currentPrompter.promptThePlayer();
  }
}

let promptersManager = new PromptersManager();
