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

let mandarinTodayPromptAndAnswer = {};
let mandarinTomorrowPromptAndAnswer = {};
let mandarinYesterdayPromptAndAnswer = {};

let mandarinTodayVersusTomorrowPairGrouping = {};
let mandarinTodayVersusYesterdayPairGrouping = {};
let mandarinYesterdayVersusTomorrowPairGrouping = {};

let mandarinBlackPromptAndAnswer = {};
let mandarinWhitePromptAndAnswer = {};
let mandarinGrayPromptAndAnswer = {};
let mandarinRedPromptAndAnswer = {};
let mandarinBrownPromptAndAnswer = {};
let mandarinYellowPromptAndAnswer = {};
let mandarinColorsGrouping = {};


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
  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', womanImage, promptAudio.woman);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', womenImage, promptAudio.women);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', manImage, promptAudio.man);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", menImage, promptAudio.men);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', heImage, promptAudio.he);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', sheImage, promptAudio.she);

  //Mandarin section
  mandarinBuyPromptAndAnswer = new PromptAndAnswerClass('mandarin buy','买', mandarinBuyImage, promptAudio.mandarinBuy);
  mandarinSellPromptAndAnswer = new PromptAndAnswerClass('mandarin sell','卖', mandarinSellImage, promptAudio.mandarinSell);

  mandarinMomPromptAndAnswer = new PromptAndAnswerClass('mandarin mom', '妈', mandarinMomImage, promptAudio.mandarinMom);
  mandarinHorsePromptAndAnswer = new PromptAndAnswerClass('mandarin horse', '马', mandarinHorseImage, promptAudio.mandarinHorse);

  mandarinThisOnePromptAndAnswer = new PromptAndAnswerClass('mandarin this one', '这个', mandarinThisOneImage, promptAudio.mandarinThisOne);
  mandarinThatOnePromptAndAnswer = new PromptAndAnswerClass('mandarin that one', '那个', mandarinThatOneImage, promptAudio.mandarinThatOne);
  mandarinTheseOnesPromptAndAnswer = new PromptAndAnswerClass('mandarin these ones', '这些', mandarinTheseOnesImage, promptAudio.mandarinTheseOnes);
  mandarinThoseOnesPromptAndAnswer = new PromptAndAnswerClass('mandarin those ones', '那些', mandarinThoseOnesImage, promptAudio.mandarinThoseOnes);

  mandarinHePromptAndAnswer = new PromptAndAnswerClass('mandarin he', '他', heImage, promptAudio.mandarinHe);
  mandarinCouchPromptAndAnswer = new PromptAndAnswerClass("mandarin couch", '榻', mandarinCouchImage, promptAudio.mandarinCouch);
  mandarinTowerPromptAndAnswer = new PromptAndAnswerClass("mandarin tower", '塔', mandarinTowerImage, promptAudio.mandarinTower);

  mandarinThisAreaPromptAndAnswer = new PromptAndAnswerClass('mandarin this area', '这里', hereImage, promptAudio.mandarinThisArea);
  mandarinThatAreaPromptAndAnswer = new PromptAndAnswerClass("mandarin that area", '那里', thereImage, promptAudio.mandarinThatArea);

  mandarinSleepPromptAndAnswer = new PromptAndAnswerClass('mandarin sleep', '睡觉', sleepImage, promptAudio.mandarinSleep);
  mandarinDumplingsPromptAndAnswer = new PromptAndAnswerClass('mandarin dumplings', '水饺', dumplingsImage, promptAudio.mandarinDumplings);

  mandarinTodayPromptAndAnswer = new PromptAndAnswerClass("mandarin today", '今天', calendarImage, promptAudio.mandarinToday);
  mandarinTomorrowPromptAndAnswer = new PromptAndAnswerClass("mandarin tomorrow", '明天', calendarImage, promptAudio.mandarinTomorrow);
  mandarinYesterdayPromptAndAnswer = new PromptAndAnswerClass('mandarin yesterday', '昨天', calendarImage, promptAudio.mandarinYesterday);

  mandarinBlackPromptAndAnswer = new PromptAndAnswerClass("mandarin black", '黑色', blackImage, promptAudio.mandarinBlack);
  mandarinWhitePromptAndAnswer = new PromptAndAnswerClass("mandarin white", '白色', whiteImage, promptAudio.mandarinWhite);
  mandarinGrayPromptAndAnswer = new PromptAndAnswerClass("mandarin gray", '灰色', grayImage, promptAudio.mandarinGray);
  mandarinRedPromptAndAnswer = new PromptAndAnswerClass("mandarin red", '红色', redImage, promptAudio.mandarinRed);
  mandarinBrownPromptAndAnswer = new PromptAndAnswerClass("mandarin brown", '棕色', brownImage, promptAudio.mandarinBrown);
  mandarinYellowPromptAndAnswer = new PromptAndAnswerClass("mandarin yellow", '黄色', yellowImage, promptAudio.mandarinYellow);

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
  mandarinThisVersusThatPairGrouping = {name: 'mandarin this vs that', arrayOfObjects:[]};
  mandarinTheseVersusThosePairGrouping = {name: 'mandarin these vs those', arrayOfObjects:[]};
  mandarinHeVersusCouchPairGrouping = {name: 'mandarin he vs couch', arrayOfObjects:[]};
  mandarinHeVersusTowerPairGrouping = {name: 'mandarin he vs tower', arrayOfObjects:[]};
  mandarinHereVersusTherePairGrouping = {name: 'mandarin here vs there', arrayOfObjects:[]};
  mandarinSleepVersusDumplingsPairGrouping = {name: 'mandarin sleep vs dumplings', arrayOfObjects:[]};
  mandarinTodayVersusTomorrowPairGrouping = {name: 'mandarin today vs tomorrow', arrayOfObjects:[]};
  mandarinTodayVersusYesterdayPairGrouping = {name: 'mandarin today vs yesterday', arrayOfObjects:[]};
  mandarinYesterdayVersusTomorrowPairGrouping = {name: 'mandarin yesterday vs tomorrow', arrayOfObjects:[]};
  mandarinColorsGrouping = {name: 'mandarin colors', arrayOfObjects:[]};

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

  mandarinThisVersusThatPairGrouping.arrayOfObjects.push(mandarinThisOnePromptAndAnswer);
  mandarinThisVersusThatPairGrouping.arrayOfObjects.push(mandarinThatOnePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinThisVersusThatPairGrouping);

  mandarinTheseVersusThosePairGrouping.arrayOfObjects.push(mandarinTheseOnesPromptAndAnswer);
  mandarinTheseVersusThosePairGrouping.arrayOfObjects.push(mandarinThoseOnesPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinTheseVersusThosePairGrouping);

  mandarinHeVersusCouchPairGrouping.arrayOfObjects.push(mandarinHePromptAndAnswer);
  mandarinHeVersusCouchPairGrouping.arrayOfObjects.push(mandarinCouchPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinHeVersusCouchPairGrouping);

  mandarinHeVersusTowerPairGrouping.arrayOfObjects.push(mandarinHePromptAndAnswer);
  mandarinHeVersusTowerPairGrouping.arrayOfObjects.push(mandarinTowerPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinHeVersusTowerPairGrouping);

  mandarinHereVersusTherePairGrouping.arrayOfObjects.push(mandarinThisAreaPromptAndAnswer);
  mandarinHereVersusTherePairGrouping.arrayOfObjects.push(mandarinThatAreaPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinHereVersusTherePairGrouping);

  mandarinSleepVersusDumplingsPairGrouping.arrayOfObjects.push(mandarinSleepPromptAndAnswer);
  mandarinSleepVersusDumplingsPairGrouping.arrayOfObjects.push(mandarinDumplingsPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinSleepVersusDumplingsPairGrouping);

  mandarinTodayVersusTomorrowPairGrouping.arrayOfObjects.push(mandarinTodayPromptAndAnswer);
  mandarinTodayVersusTomorrowPairGrouping.arrayOfObjects.push(mandarinTomorrowPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinTodayVersusTomorrowPairGrouping);

  mandarinTodayVersusYesterdayPairGrouping.arrayOfObjects.push(mandarinTodayPromptAndAnswer);
  mandarinTodayVersusYesterdayPairGrouping.arrayOfObjects.push(mandarinYesterdayPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinTodayVersusYesterdayPairGrouping);

  mandarinYesterdayVersusTomorrowPairGrouping.arrayOfObjects.push(mandarinYesterdayPromptAndAnswer);
  mandarinYesterdayVersusTomorrowPairGrouping.arrayOfObjects.push(mandarinTomorrowPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinYesterdayVersusTomorrowPairGrouping);

  mandarinColorsGrouping.arrayOfObjects.push(mandarinBlackPromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinWhitePromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinGrayPromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinRedPromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinBrownPromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinYellowPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinColorsGrouping);


  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings);

  //vietnamese
  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalVietnamesePromptAnswerGroupings);

  console.log('promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings: ' + promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings);
}
