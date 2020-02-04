function TextPrompter()
{
  this.currentText = undefined;
  this.loadCurrentText = function(textToLoad)
  {
    this.currentText = textToLoad;
  }

  this.drawTextPrompt = function()
  {
    customFontFillText(this.currentText, 100, 20, gameCanvas.width/2 - 50,gameCanvas.height/2 + 50);
  }
}

let textPrompter = new TextPrompter();
