function TextPrompter()
{
  this.name = 'text prompter';
  this.currentText = undefined;
  this.loadCurrentText = function(textToLoad)
  {
    this.currentText = textToLoad;
  }

  this.promptThePlayer = function()
  {
    customFontFillText(this.currentText, 100, 20, gameCanvas.width/2 - 50,gameCanvas.height/2 + 50);
    console.log('inside text prompter draw code');
  }
}

let textPrompter = new TextPrompter();
