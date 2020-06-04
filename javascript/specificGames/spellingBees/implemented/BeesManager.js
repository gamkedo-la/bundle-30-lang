function BeesManager()
{
  this.arrayOfBees = [];

  this.initialize = function()
  {
    let wordsManager = gameClassManager.currentGame.wordsManager;
    for (let arrayOfWordsIndex = 0; arrayOfWordsIndex < wordsManager.arrayOfWords.length; arrayOfWordsIndex++)
    {
      for (let letterIndex = 0; letterIndex < wordsManager.arrayOfWords[arrayOfWordsIndex].arrayOfLetters.length; letterIndex++)
      {
        let letter = wordsManager.arrayOfWords[arrayOfWordsIndex].arrayOfLetters[letterIndex];
        let bee = new Bee(letter);
        bee.initialize();
        this.arrayOfBees.push(bee);
      }
    }
  }

  this.drawBees = function()
  {
    for (let i = 0; i < this.arrayOfBees.length; i++)
    {
      this.arrayOfBees[i].draw();
    }
  }

  this.updateBees = function()
  {
    for (let i = 0; i < this.arrayOfBees.length; i++)
    {
      this.arrayOfBees[i].update();
    }
  }
}
