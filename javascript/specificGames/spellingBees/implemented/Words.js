function Word(word, audioPrompt)
{
  this.word = word;
  this.arrayOfLetters = this.word.split("");

  this.audioPrompt = audioPrompt;
}

function WordsManager()
{
  this.arrayOfWords = [];

  this.manWord = undefined;
  this.menWord = undefined;

  this.initialize = function()
  {
    //define word bindings
    this.manWord = new Word('man', promptAudio.man);
    this.menWord = new Word('men', promptAudio.men);

    //populate words array
    this.arrayOfWords.push(this.manWord);
    this.arrayOfWords.push(this.menWord);
  }

  this.currentAnswer = undefined;

  this.defineCurrentAnswer = function()
  {
    let randomAnswerIndex = getRandomIntInclusive(0,this.arrayOfWords.length - 1);
    this.currentAnswer = this.arrayOfWords[randomAnswerIndex];
    this.currentAnswer.audioPrompt.play();
  }
}
