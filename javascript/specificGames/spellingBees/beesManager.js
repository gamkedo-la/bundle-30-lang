function BeesManager()
{
  this.arrayOfBees = [];

  this.initialize = function()
  {
    for (let arrayOfWordsIndex = 0; arrayOfWordsIndex < spellingBeesGame.wordsManager.arrayOfWords.length; arrayOfWordsIndex++)
    {
      for (let letterIndex = 0; letterIndex < spellingBeesGame.wordsManager.arrayOfWords[arrayOfWordsIndex].arrayOfLetters.length; letterIndex++)
      {
        let letter = spellingBeesGame.wordsManager.arrayOfWords[arrayOfWordsIndex].arrayOfLetters[letterIndex];
        let bee = new Bee(letter);
        bee.initialize();
        this.arrayOfBees.push(bee);
      }
    }
  }

  this.updateBees = function()
  {
    for (let beeIndex = 0; beeIndex < this.arrayOfBees.length; beeIndex++)
    {
      this.arrayOfBees[beeIndex].update();
    }
  }

  this.drawBees = function()
  {
    for (let beeIndex = 0; beeIndex < this.arrayOfBees.length; beeIndex++)
    {
      this.arrayOfBees[beeIndex].draw();
    }
  }
}

spellingBeesGame.beesManager = new BeesManager();
