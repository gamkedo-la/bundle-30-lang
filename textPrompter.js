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
    console.log('promptersManager.shouldBeDrawingAPrompt: ' + promptersManager.shouldBeDrawingAPrompt);
  }

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,1000);
  }
}

let textPrompter;
