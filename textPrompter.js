function TextPrompter()
{
  this.name = 'text prompter';
  this.currentText = undefined;
  this.loadCurrentText = function(textToLoad)
  {
    this.currentText = textToLoad;
  }

  this.drawThePrompt = function()
  {
    if (this.currentText !== undefined)
    {
      customFontFillText(this.currentText, 100, 50, gameCanvas.width/2 - 150,gameCanvas.height/2 - 75);
      console.log('inside text prompter draw code');
    }
  }

  this.togglePromptingBoolean = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.shouldBeDrawingAPrompt = false;
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
    }
  }

  this.promptingInterval = new frameInterval(this.togglePromptingBoolean,1000);

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    this.promptingInterval.start();
    console.log('hello text prompter interval');
  }
}

let textPrompter;
