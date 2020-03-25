let womanPromptAndAnswer = {};
let womenPromptAndAnswer = {};
let manPromptAndAnswer = {};
let menPromptAndAnswer = {};
let hePromptAndAnswer = {};
let shePromptAndAnswer = {};

let womanVersusWomenPairGrouping = {};
let manVersusMenPairGrouping = {};
let heVersusShePairGrouping = {};

let mandarinBuyPromptAndAnswer = {};//'buy' in English
let mandarinSellPromptAndAnswer = {};//'sell' in English
let mandarinBuyVersusMandarinSellPairGrouping = {};

let mandarinMomPromptAndAnswer = {};
let mandarinHorsePromptAndAnswer = {};
let mandarinMomVersusHorsePairGrouping = {};



function PromptAndAnswerClass(nameString, textAssociation, imageAssociation, audioAssociation)
{
  this.name = nameString;
  this.textAssociation = textAssociation;
  this.textAssociation.datatype = 'string';
  this.imageAssociation = imageAssociation;
  this.imageAssociation.datatype = 'image';
  this.audioAssociation = audioAssociation;
  this.audioAssociation.datatype = 'audio';

  this.arrayOfPossiblePrompts = [this.textAssociation, this.imageAssociation, this.audioAssociation];
  this.arrayOfPossibleAnswers = [this.textAssociation, this.imageAssociation, this.audioAssociation];

  this.xCoordinate = undefined;
  this.yCoordinate = undefined;
  this.xDirection = undefined;
  this.xSpeed = undefined;

  this.width = undefined;
  this.height = undefined;

  this.containsTheCurrentCorrectAnswer = undefined;

  this.shouldBeFlashing = false;
  this.globalCompositeOperationForCanvasContext = 'source-over';
}//end of prompt and answer class


function initializePromptAndAnswerObjects()
{
  console.log('prompts and answers initializing');

  //English section
  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', womanImage, audioManager.womanAudio);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', womenImage, audioManager.womenAudio);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', manImage, audioManager.manAudio);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", menImage, audioManager.menAudio);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', heImage, audioManager.heAudio);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', sheImage, audioManager.sheAudio);

  //Mandarin section
  mandarinBuyPromptAndAnswer = new PromptAndAnswerClass('mandarin buy','买', mandarinBuyImage, audioManager.mandarinBuyAudio);
  mandarinSellPromptAndAnswer = new PromptAndAnswerClass('mandarin sell','卖', mandarinSellImage, audioManager.mandarinSellAudio);


  mandarinMomPromptAndAnswer = new PromptAndAnswerClass('mandarin mom', '妈', mandarinMomImage, audioManager.mandarinMomAudio);
  mandarinHorsePromptAndAnswer = new PromptAndAnswerClass('mandarin horse', '马', mandarinHorseImage, audioManager.mandarinHorseAudio);

  //Vietnamese Section
}

function populatePromptAndAnswerArrays()
{
  console.log('inside populatePromptAndAnswerArrays');
  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings = [];

  promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings = [];
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings = [];
  promptsAndAnswersManager.arrayOfLogicalVietnamesePromptAnswerGroupings = [];

  womanVersusWomenPairGrouping = {name: 'woman vs women', arrayOfObjects: []};
  manVersusMenPairGrouping = {name: 'man vs men', arrayOfObjects: []};
  heVersusShePairGrouping = {name: 'he vs she', arrayOfObjects: []};
  mandarinBuyVersusMandarinSellPairGrouping = {name: 'mandarin buy vs sell', arrayOfObjects:[]};
  mandarinMomVersusHorsePairGrouping = {name: 'mandarin mom vs horse', arrayOfObjects:[]};

  //English
  womanVersusWomenPairGrouping.arrayOfObjects.push(womanPromptAndAnswer);
  womanVersusWomenPairGrouping.arrayOfObjects.push(womenPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings.push(womanVersusWomenPairGrouping);

  manVersusMenPairGrouping.arrayOfObjects.push(manPromptAndAnswer);
  manVersusMenPairGrouping.arrayOfObjects.push(menPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings.push(manVersusMenPairGrouping);

  heVersusShePairGrouping.arrayOfObjects.push(hePromptAndAnswer);
  heVersusShePairGrouping.arrayOfObjects.push(shePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings.push(heVersusShePairGrouping);

  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings);

  //mandarin
  mandarinBuyVersusMandarinSellPairGrouping.arrayOfObjects.push(mandarinBuyPromptAndAnswer);
  mandarinBuyVersusMandarinSellPairGrouping.arrayOfObjects.push(mandarinSellPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinBuyVersusMandarinSellPairGrouping);

  mandarinMomVersusHorsePairGrouping.arrayOfObjects.push(mandarinMomPromptAndAnswer);
  mandarinMomVersusHorsePairGrouping.arrayOfObjects.push(mandarinHorsePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinMomVersusHorsePairGrouping);

  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings);

  //vietnamese
  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalVietnamesePromptAnswerGroupings);

  console.log('promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings: ' + promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings);
}
