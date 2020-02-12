function Word(word)
{
  this.word = word;
  this.arrayOfLetters = this.word.split("");
}

function WordsManager()
{
  this.arrayOfWords = [];
}

spellingBeesGame.wordsManager = new WordsManager();

let manWord = new Word('man');
let womanWord = new Word('woman');

spellingBeesGame.wordsManager.arrayOfWords.push(manWord);
spellingBeesGame.wordsManager.arrayOfWords.push(womanWord);
