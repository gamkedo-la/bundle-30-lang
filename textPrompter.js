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

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,1000);
  }
}

let textPrompter;
