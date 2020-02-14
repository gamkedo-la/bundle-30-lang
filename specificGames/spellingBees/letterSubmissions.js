function LetterSubmission(letterSubmission)
{
  this.letter = letterSubmission;
}

function LetterSubmissionManager()
{
  this.arrayOfLetters = [];

  this.checkSubmittedLettersForCorrectSpelling = function()
  {
    console.log('this.arrayOfLetters: ' + this.arrayOfLetters);
    console.log('spellingBeesGame.answersManager.currentSplitAnswer: ' + spellingBeesGame.answersManager.currentSplitAnswer);
    if (this.arrayOfLetters.toString() === spellingBeesGame.answersManager.currentSplitAnswer.toString())
    {
      console.log('correct answer submitted');
    } else if (this.arrayOfLetters.length === spellingBeesGame.answersManager.currentSplitAnswer.length &&
               this.arrayOfLetters.toString !== spellingBeesGame.answersManager.currentSplitAnswer.toString())
               {
                 console.log('incorrect answer submitted');
               }
  }
}

spellingBeesGame.letterSubmissionManager = new LetterSubmissionManager();

function BeeBoxes()
{
  this.arrayOfBoxes = [];

  this.initialize = function()
  {
    for (let boxIndex = 0; boxIndex < 8; boxIndex++)
    {
      let box =
      {
        width: spellingBeesGame.canvas.width/8,
        height: spellingBeesGame.canvas.height/10,
        x: boxIndex*(spellingBeesGame.canvas.width/8),
        y: spellingBeesGame.canvas.height*0.9,

        bee: undefined,

        draw: function()
        {
          spellingBeesGame.canvasContext.strokeStyle = 'black';
          spellingBeesGame.canvasContext.strokeRect(this.x,this.y, this.width,this.height);
        }
      }

      this.arrayOfBoxes.push(box);
    }
  }


  this.draw = function()
  {
    for (let boxIndex = 0; boxIndex < this.arrayOfBoxes.length; boxIndex++)
    {
      this.arrayOfBoxes[boxIndex].draw();
    }
  }
}
