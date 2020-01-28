let womanPromptAndAnswer = {};
let womenPromptAndAnswer = {};
let manPromptAndAnswer = {};
let menPromptAndAnswer = {};
let hePromptAndAnswer = {};
let shePromptAndAnswer = {};

let arrayOfLogicalPromptAnswerGroupings = [];

let womanVersusWomenPairGrouping = [];
let manVersusMenPairGrouping = [];
let heVersusShePairGrouping = [];

function initializePromptAndAnswerObjects()
{
  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', womanImage, womanAudio);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', womenImage, womenAudio);
  womanVersusWomenPairGrouping.push(womanPromptAndAnswer);
  womanVersusWomenPairGrouping.push(womenPromptAndAnswer);
  arrayOfLogicalPromptAnswerGroupings.push(womanVersusWomenPairGrouping);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', manImage, manAudio);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", menImage, menAudio);
  manVersusMenPairGrouping.push(manPromptAndAnswer);
  manVersusMenPairGrouping.push(menPromptAndAnswer);
  arrayOfLogicalPromptAnswerGroupings.push(manVersusMenPairGrouping);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', heImage, heAudio);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', sheImage, sheAudio);
  heVersusShePairGrouping.push(hePromptAndAnswer);
  heVersusShePairGrouping.push(shePromptAndAnswer);
  arrayOfLogicalPromptAnswerGroupings.push(heVersusShePairGrouping);

  console.log(arrayOfLogicalPromptAnswerGroupings);
}

function PromptAndAnswerClass(nameString, textString, imageAssociation, audioAssociation)
{
  this.name = nameString;
  this.textAssociation = textString;
  this.imageAssociation = imageAssociation;
  this.audioAssociation = audioAssociation;

  this.prompt = undefined;
  this.arrayOfPossiblePrompts = [this.text, this.imageAssociation, this.audioAssociation];
  this.chooseAPrompt = function()
  {
    let randomArrayOfPossiblePromptsIndex = getRandomIntInclusive(0, arrayOfPossiblePrompts.length - 1);
    this.prompt = arrayOfPossiblePrompts[randomArrayOfPossiblePromptsIndex];
  }

  this.answer = undefined;
  this.arrayOfPossibleAnswers = [this.text, this.imageAssociation, this.audioAssociation];
  this.assignAnAnswerBasedOnPrompt = function()
  {
    let temporaryArrayOfPossibleAnswers = this.arrayOfPossibleAnswers;
    let randomIndexToChooseAnswerInTemporaryArray = undefined;

    for (let arrayOfTemporaryAnswersIndex = 0; arrayOfTemporaryAnswersIndex < temporaryArrayOfPossibleAnswers.length; arrayOfTemporaryAnswersIndex++)
    {
      if (temporaryArrayOfPossibleAnswers[arrayOfTemporaryAnswersIndex] === this.prompt)
      {
        temporaryArrayOfPossibleAnswers.splice(arrayOfTemporaryAnswersIndex,1);
        randomIndexToChooseAnswerInTemporaryArray = getRandomIntInclusive(0, temporaryArrayOfPossibleAnswers.length - 1);
        this.answer = temporaryArrayOfPossibleAnswers[randomIndexToChooseAnswerInTemporaryArray];
      }//end of checking for prompt/answer overlap
    }//end of for loop through temporary answers array
  }//end of answer assignment
}//end of prompt and answer class

function pickAPromptGroup()
{
  let randomPromptGroupIndex = getRandomIntInclusive(0, arrayOfLogicalPromptAnswerGroupings.length - 1);
  let randomPromptGroup = arrayOfLogicalPromptAnswerGroupings[randomPromptGroupIndex];
}
