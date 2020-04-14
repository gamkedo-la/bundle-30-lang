let womanPromptAndAnswer = {};
let womenPromptAndAnswer = {};
let manPromptAndAnswer = {};
let menPromptAndAnswer = {};
let hePromptAndAnswer = {};
let shePromptAndAnswer = {};
let beePromptAndAnswer = {};
let flowerPromptAndAnswer = {};

let womanVersusWomenPairGrouping = {};
let manVersusMenPairGrouping = {};
let heVersusShePairGrouping = {};
let flowerVersusBeePairGrouping = {};

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
let mandarinBluePromptAndAnswer = {};
let mandarinPurplePromptAndAnswer = {};
let mandarinPinkPromptAndAnswer = {};
let mandarinGreenPromptAndAnswer = {};
let mandarinColorsGrouping = {};

let mandarin0PromptAndAnswer = {};
let mandarin1PromptAndAnswer = {};
let mandarin2PromptAndAnswer = {};
let mandarin3PromptAndAnswer = {};
let mandarin4PromptAndAnswer = {};
let mandarin5PromptAndAnswer = {};
let mandarin6PromptAndAnswer = {};
let mandarin7PromptAndAnswer = {};
let mandarin8PromptAndAnswer = {};
let mandarin9PromptAndAnswer = {};
let mandarinNumbersGrouping = {};


function PromptAndAnswerClass(nameString, textAssociation, imageAssociation, audioAssociation)
{
  this.name = nameString;
  this.textAssociation = textAssociation;
  this.textAssociation.datatype = 'string';
  this.imageAssociation = imageAssociation;
  this.imageAssociation.datatype = 'image';
  this.audioAssociation = audioAssociation;
  this.audioAssociation.datatype = 'audio';

  this.answerHolder = undefined;

  this.arrayOfPossiblePrompts = [this.textAssociation, this.imageAssociation, this.audioAssociation];
  this.arrayOfPossibleAnswers = [this.textAssociation, this.imageAssociation, this.audioAssociation];

  this.xCoordinate = undefined;
  this.yCoordinate = undefined;
  this.xDirection = undefined;
  this.xSpeed = undefined;
  this.ySpeed = undefined;

  this.whackAnAnswerPositionName = undefined;
  this.whackAnAnswerXStartingPosition = undefined;
  this.whackAnAnswerYStartingPosition = undefined;
  this.whackAnAnswerGridIndex = undefined;

  this.oscillationVelocity = undefined;
  this.radians = 0;

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

  beePromptAndAnswer = new PromptAndAnswerClass('bee', 'bee', beeImage, promptAudio.englishBee);
  flowerPromptAndAnswer = new PromptAndAnswerClass('flower', 'flower', flowerImage, promptAudio.englishFlower);

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
  mandarinPurplePromptAndAnswer = new PromptAndAnswerClass("mandarin purple", '紫色', purpleImage, promptAudio.mandarinPurple);
  mandarinPinkPromptAndAnswer = new PromptAndAnswerClass("mandarin pink", '粉', pinkImage, promptAudio.mandarinPink);
  mandarinGreenPromptAndAnswer = new PromptAndAnswerClass("mandarin green", '绿色', greenImage, promptAudio.mandarinGreen);
  mandarinBluePromptAndAnswer = new PromptAndAnswerClass("mandarin blue", '蓝色', blueImage, promptAudio.mandarinBlue);

  mandarin0PromptAndAnswer = new PromptAndAnswerClass("mandarin 0", '零', number0, promptAudio.mandarin0);
  mandarin1PromptAndAnswer = new PromptAndAnswerClass("mandarin 1", '一', number1, promptAudio.mandarin1);
  mandarin2PromptAndAnswer = new PromptAndAnswerClass("mandarin 2", '二', number2, promptAudio.mandarin2);
  mandarin3PromptAndAnswer = new PromptAndAnswerClass("mandarin 3", '三', number3, promptAudio.mandarin3);
  mandarin4PromptAndAnswer = new PromptAndAnswerClass("mandarin 4", '四', number4, promptAudio.mandarin4);
  mandarin5PromptAndAnswer = new PromptAndAnswerClass("mandarin 5", '五', number5, promptAudio.mandarin5);
  mandarin6PromptAndAnswer = new PromptAndAnswerClass("mandarin 6", '六', number6, promptAudio.mandarin6);
  mandarin7PromptAndAnswer = new PromptAndAnswerClass("mandarin 7", '七', number7, promptAudio.mandarin7);
  mandarin8PromptAndAnswer = new PromptAndAnswerClass("mandarin 8", '八', number8, promptAudio.mandarin8);
  mandarin9PromptAndAnswer = new PromptAndAnswerClass("mandarin 9", '九', number9, promptAudio.mandarin9);

  //Vietnamese Section
}

function populatePromptAndAnswerArrays()
{
  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings = [];

  promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings = [];
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings = [];
  promptsAndAnswersManager.arrayOfLogicalVietnamesePromptAnswerGroupings = [];

  womanVersusWomenPairGrouping = {name: 'woman vs women', arrayOfObjects: []};
  manVersusMenPairGrouping = {name: 'man vs men', arrayOfObjects: []};
  heVersusShePairGrouping = {name: 'he vs she', arrayOfObjects: []};

  flowerVersusBeePairGrouping = {name: 'flower vs bee', arrayOfObjects: []};

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
  mandarinNumbersGrouping = {name: 'mandarin numbers', arrayOfObjects:[]};

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

  flowerVersusBeePairGrouping.arrayOfObjects.push(flowerPromptAndAnswer);
  flowerVersusBeePairGrouping.arrayOfObjects.push(beePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalEnglishPromptAnswerGroupings.push(flowerVersusBeePairGrouping);

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
  mandarinColorsGrouping.arrayOfObjects.push(mandarinPurplePromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinPinkPromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinGreenPromptAndAnswer);
  mandarinColorsGrouping.arrayOfObjects.push(mandarinBluePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinColorsGrouping);

  mandarinNumbersGrouping.arrayOfObjects.push(mandarin0PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin1PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin2PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin3PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin4PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin5PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin6PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin7PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin8PromptAndAnswer);
  mandarinNumbersGrouping.arrayOfObjects.push(mandarin9PromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinNumbersGrouping);

  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings);

  //vietnamese
  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalVietnamesePromptAnswerGroupings);
}
