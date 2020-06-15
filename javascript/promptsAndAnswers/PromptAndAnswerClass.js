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

let mandarinPleasePromptAndAnswer = {};
let mandarinSorryPromptAndAnswer = {};
let mandarinExcuseMeQuestionAskingContextPromptAndAnswer = {};
let mandarinWaitAMomentPromptAnswer = {};
let mandarinThankYouPromptAndAnswer = {};
let mandarinAnyTimePromptAndAnswer = {};
let mandarinYoureWelcomePromptAndAnswer = {};
let mandarinExcuseMePassingThroughContextPromptAndAnswer = {};
let mandarinIAppreciateThatPromptAndAnswer = {};
let mandarinYouHaveWorkedHardPromptAndAnswer = {};

//polite phrases 2
let mandarinLongTimeNoSeePromptAndAnswer = {};
let mandarinIllLetYouGoPromptAndAnswer = {};
let mandarinPleaseAdviseMePromptAndAnswer = {};
let mandarinIRespectfullyWaitPromptAndAnswer = {};
let mandarinInMyHumbleOpinionPromptAndAnswer = {};
let mandarinExcuseMeForSayingThisPromptAndAnswer = {};
let mandarinItsOKPromptAndAnswer = {};
let mandarinItsMyDutyPromptAndAnswer = {};
let mandarinExcuseMyLowSkillPromptAndAnswer = {};

//mandarin common words 1
let mandarinToBePromptAndAnswer = {};
let mandarinOfPromptAndAnswer = {};
let mandarinNotPromptAndAnswer = {};
let mandarinOccurPromptAndAnswer = {};
let mandarinPersonPromptAndAnswer = {};
let mandarinIPromptAndAnswer = {};
let mandarinYouPromptAndAnswer = {};
let mandarinHavePromptAndAnswer = {};
let mandarinInPromptAndAnswer = {};


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
  this.circlePathVelocity = 0.25;

  this.width = undefined;
  this.height = undefined;

  this.containsTheCurrentCorrectAnswer = undefined;

  this.shouldBeFlashing = false;
  this.globalCompositeOperationForCanvasContext = 'source-over';
}//end of prompt and answer class


function initializePromptAndAnswerObjects()
{

  //English section
  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', 'images\\sprites\\PromptsAndAnswers\\woman.png', promptAudio.woman);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', 'images\\sprites\\PromptsAndAnswers\\women.png', promptAudio.women);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', 'images\\sprites\\PromptsAndAnswers\\man.png', promptAudio.man);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", 'images\\sprites\\PromptsAndAnswers\\men.png', promptAudio.men);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', 'images\\sprites\\PromptsAndAnswers\\man.png', promptAudio.he);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', 'images\\sprites\\PromptsAndAnswers\\woman.png', promptAudio.she);

  beePromptAndAnswer = new PromptAndAnswerClass('bee', 'bee', "images\\sprites\\PromptsAndAnswers\\bee.png", promptAudio.englishBee);
  flowerPromptAndAnswer = new PromptAndAnswerClass('flower', 'flower', "images\\sprites\\PromptsAndAnswers\\flower.png", promptAudio.englishFlower);

  //Mandarin section
  mandarinBuyPromptAndAnswer = new PromptAndAnswerClass('mandarin buy','买', "images\\sprites\\PromptsAndAnswers\\Mandarin\\mandarinBuy.png", promptAudio.mandarinBuy);
  mandarinSellPromptAndAnswer = new PromptAndAnswerClass('mandarin sell','卖', "images\\sprites\\PromptsAndAnswers\\Mandarin\\mandarinSell.png", promptAudio.mandarinSell);

  mandarinMomPromptAndAnswer = new PromptAndAnswerClass('mandarin mom', '妈', "images\\sprites\\PromptsAndAnswers\\Mandarin\\mom.png", promptAudio.mandarinMom);
  mandarinHorsePromptAndAnswer = new PromptAndAnswerClass('mandarin horse', '马', "images\\sprites\\PromptsAndAnswers\\Mandarin\\horse.png", promptAudio.mandarinHorse);

  mandarinThisOnePromptAndAnswer = new PromptAndAnswerClass('mandarin this one', '这个', "images\\sprites\\PromptsAndAnswers\\Mandarin\\thisOne.png", promptAudio.mandarinThisOne);
  mandarinThatOnePromptAndAnswer = new PromptAndAnswerClass('mandarin that one', '那个', "images\\sprites\\PromptsAndAnswers\\Mandarin\\thatOne.png", promptAudio.mandarinThatOne);
  mandarinTheseOnesPromptAndAnswer = new PromptAndAnswerClass('mandarin these ones', '这些', "images\\sprites\\PromptsAndAnswers\\Mandarin\\theseOnes.png", promptAudio.mandarinTheseOnes);
  mandarinThoseOnesPromptAndAnswer = new PromptAndAnswerClass('mandarin those ones', '那些', "images\\sprites\\PromptsAndAnswers\\Mandarin\\thoseOnes.png", promptAudio.mandarinThoseOnes);

  mandarinHePromptAndAnswer = new PromptAndAnswerClass('mandarin he', '他', 'images\\sprites\\PromptsAndAnswers\\man.png', promptAudio.mandarinHe);
  mandarinCouchPromptAndAnswer = new PromptAndAnswerClass("mandarin couch", '榻', "images\\sprites\\PromptsAndAnswers\\Mandarin\\couch.png", promptAudio.mandarinCouch);
  mandarinTowerPromptAndAnswer = new PromptAndAnswerClass("mandarin tower", '塔', "images\\sprites\\PromptsAndAnswers\\Mandarin\\tower.png", promptAudio.mandarinTower);

  mandarinThisAreaPromptAndAnswer = new PromptAndAnswerClass('mandarin this area', '这里', "images\\sprites\\PromptsAndAnswers\\Mandarin\\here.png", promptAudio.mandarinThisArea);
  mandarinThatAreaPromptAndAnswer = new PromptAndAnswerClass("mandarin that area", '那里', "images\\sprites\\PromptsAndAnswers\\Mandarin\\there.png", promptAudio.mandarinThatArea);

  mandarinSleepPromptAndAnswer = new PromptAndAnswerClass('mandarin sleep', '睡觉', "images\\sprites\\PromptsAndAnswers\\Mandarin\\sleep.png", promptAudio.mandarinSleep);
  mandarinDumplingsPromptAndAnswer = new PromptAndAnswerClass('mandarin dumplings', '水饺', "images\\sprites\\PromptsAndAnswers\\Mandarin\\dumplings.png", promptAudio.mandarinDumplings);

  mandarinTodayPromptAndAnswer = new PromptAndAnswerClass("mandarin today", '今天', "images\\sprites\\PromptsAndAnswers\\Mandarin\\blankCalendarPage.png", promptAudio.mandarinToday);
  mandarinTomorrowPromptAndAnswer = new PromptAndAnswerClass("mandarin tomorrow", '明天', "images\\sprites\\PromptsAndAnswers\\Mandarin\\blankCalendarPage.png", promptAudio.mandarinTomorrow);
  mandarinYesterdayPromptAndAnswer = new PromptAndAnswerClass('mandarin yesterday', '昨天', "images\\sprites\\PromptsAndAnswers\\Mandarin\\blankCalendarPage.png", promptAudio.mandarinYesterday);

  mandarinBlackPromptAndAnswer = new PromptAndAnswerClass("mandarin black", '黑色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\black.png", promptAudio.mandarinBlack);
  mandarinWhitePromptAndAnswer = new PromptAndAnswerClass("mandarin white", '白色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\white.png", promptAudio.mandarinWhite);
  mandarinGrayPromptAndAnswer = new PromptAndAnswerClass("mandarin gray", '灰色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\gray.png", promptAudio.mandarinGray);
  mandarinRedPromptAndAnswer = new PromptAndAnswerClass("mandarin red", '红色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\red.png", promptAudio.mandarinRed);
  mandarinBrownPromptAndAnswer = new PromptAndAnswerClass("mandarin brown", '棕色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\brown.png", promptAudio.mandarinBrown);
  mandarinYellowPromptAndAnswer = new PromptAndAnswerClass("mandarin yellow", '黄色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\yellow.png", promptAudio.mandarinYellow);
  mandarinPurplePromptAndAnswer = new PromptAndAnswerClass("mandarin purple", '紫色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\purple.png", promptAudio.mandarinPurple);
  mandarinPinkPromptAndAnswer = new PromptAndAnswerClass("mandarin pink", '粉', "images\\sprites\\PromptsAndAnswers\\Mandarin\\pink.png", promptAudio.mandarinPink);
  mandarinGreenPromptAndAnswer = new PromptAndAnswerClass("mandarin green", '绿色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\green.png", promptAudio.mandarinGreen);
  mandarinBluePromptAndAnswer = new PromptAndAnswerClass("mandarin blue", '蓝色', "images\\sprites\\PromptsAndAnswers\\Mandarin\\blue.png", promptAudio.mandarinBlue);

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

  //polite phrases 1
  mandarinPleasePromptAndAnswer = new PromptAndAnswerClass('mandarin please', '请', "images\\sprites\\PromptsAndAnswers\\Mandarin\\please.png", promptAudio.mandarinPlease);
  mandarinSorryPromptAndAnswer = new PromptAndAnswerClass('mandarin sorry', '抱歉', "images\\sprites\\PromptsAndAnswers\\Mandarin\\sorry.png", promptAudio.mandarinSorry);
  mandarinExcuseMeQuestionAskingContextPromptAndAnswer = new PromptAndAnswerClass('mandarin excuse me question', '请问', "images\\sprites\\PromptsAndAnswers\\Mandarin\\excuseMeQuestionAskingContext.png", promptAudio.mandarinExcuseMeQuestionAskingContext);
  mandarinWaitAMomentPromptAnswer = new PromptAndAnswerClass('mandarin wait a moment', '稍等', 'images\\sprites\\PromptsAndAnswers\\Mandarin\\oneMoment.png', promptAudio.mandarinWaitAMoment);
  mandarinThankYouPromptAndAnswer = new PromptAndAnswerClass('mandarin thank you', '谢谢', "images\\sprites\\PromptsAndAnswers\\Mandarin\\thankYou.png", promptAudio.mandarinThankYou);
  mandarinAnyTimePromptAndAnswer = new PromptAndAnswerClass('mandarin any time', '随时 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\anyTime2.png", promptAudio.mandarinAnyTime);
  mandarinYoureWelcomePromptAndAnswer = new PromptAndAnswerClass('mandarin youre welcome', '别客气', "images\\sprites\\PromptsAndAnswers\\Mandarin\\youreWelcome.png", promptAudio.mandarinYoureWelcome);
  mandarinExcuseMePassingThroughContextPromptAndAnswer = new PromptAndAnswerClass('mandarin excuse me passing through', '借过', "images\\sprites\\PromptsAndAnswers\\Mandarin\\excuseMePassingThroughContext.png", promptAudio.mandarinExcuseMePassingThroughContext);
  mandarinIAppreciateThatPromptAndAnswer = new PromptAndAnswerClass('mandarin I appreciate that', '我很感激', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iAppreciateThat.png", promptAudio.mandarinIAppreciateThat);
  mandarinYouHaveWorkedHardPromptAndAnswer = new PromptAndAnswerClass('mandarin you have worked hard', '您辛苦', "images\\sprites\\PromptsAndAnswers\\Mandarin\\youHaveWorkedHard.png", promptAudio.mandarinYouHaveWorkedHard);

  //polite phrases 2
  mandarinLongTimeNoSeePromptAndAnswer = new PromptAndAnswerClass('mandarin long time no see', '久违 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\longTimeNoSee.png", promptAudio.mandarinLongTimeNoSee);
  mandarinIllLetYouGoPromptAndAnswer = new PromptAndAnswerClass('mandarin Ill let you go', '您失陪', "images\\sprites\\PromptsAndAnswers\\Mandarin\\illLetYouGo.png", promptAudio.mandarinIllLetYouGo);
  mandarinPleaseAdviseMePromptAndAnswer = new PromptAndAnswerClass('mandarin please advise me', '您指教', "images\\sprites\\PromptsAndAnswers\\Mandarin\\pleaseAdviseMe.png", promptAudio.mandarinPleaseAdviseMe);
  mandarinIRespectfullyWaitPromptAndAnswer = new PromptAndAnswerClass('mandarin I respectfully wait', '我恭候', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iRespectfullyWait.png", promptAudio.mandarinIRespectfullyWait);
  mandarinInMyHumbleOpinionPromptAndAnswer = new PromptAndAnswerClass('mandarin in my humble opinion', ' 依本人拙见', "images\\sprites\\PromptsAndAnswers\\Mandarin\\myHumbleOpinion.png", promptAudio.mandarinMyHumbleOpinion);
  mandarinExcuseMeForSayingThisPromptAndAnswer = new PromptAndAnswerClass('mandarin excuse me for saying this', '冒昧 ', 'images\\sprites\\PromptsAndAnswers\\Mandarin\\excuseMeForSayingThis.png', promptAudio.mandarinExcuseMeForSayingThis);
  mandarinItsOKPromptAndAnswer = new PromptAndAnswerClass('mandarin its OK', '没关系', "images\\sprites\\PromptsAndAnswers\\Mandarin\\itsOK.png", promptAudio.mandarinItsOK);
  mandarinItsMyDutyPromptAndAnswer = new PromptAndAnswerClass('mandarin its my duty', '我应该的 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\itsMyDuty.png", promptAudio.mandarinItsMyDuty);
  mandarinExcuseMyLowSkillPromptAndAnswer = new PromptAndAnswerClass('mandarin excuse my low skill', '献丑', "images\\sprites\\PromptsAndAnswers\\Mandarin\\excuseMyLowSkill.png", promptAudio.mandarinSorryForMyLowSkill);

  //common words
  mandarinToBePromptAndAnswer = new PromptAndAnswerClass('mandarin to be', '是 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\toBeImage.png", promptAudio.mandarinToBe);
  mandarinOfPromptAndAnswer = new PromptAndAnswerClass('mandarin of', '的 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\of.png", promptAudio.mandarinOf);
  mandarinNotPromptAndAnswer = new PromptAndAnswerClass('mandarin not', '不 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\notImage.png", promptAudio.mandarinNot);
  mandarinOccurPromptAndAnswer = new PromptAndAnswerClass('mandarin occur/le', '了 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\leImage.png", promptAudio.mandarinLe);
  mandarinPersonPromptAndAnswer =  new PromptAndAnswerClass('mandarin person', '人	 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\personImage.png", promptAudio.mandarinPerson);
  mandarinIPromptAndAnswer =  new PromptAndAnswerClass('mandarin I', '我	 ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\mandarinMeMyIImage.png", promptAudio.mandarinI);
  mandarinYouPromptAndAnswer =  new PromptAndAnswerClass('mandarin You', '你', "images\\sprites\\PromptsAndAnswers\\Mandarin\\you.png", promptAudio.mandarinYou);
  mandarinAtPromptAndAnswer = new PromptAndAnswerClass('mandarin At', '在', "images\\sprites\\PromptsAndAnswers\\Mandarin\\at.png", promptAudio.mandarinAt);
  mandarinHavePromptAndAnswer = new PromptAndAnswerClass('mandarin Have', '有', "images\\sprites\\PromptsAndAnswers\\Mandarin\\have.png", promptAudio.mandarinHave);
  mandarinInPromptAndAnswer = new PromptAndAnswerClass('mandarin In', '中', "images\\sprites\\PromptsAndAnswers\\Mandarin\\in.png", promptAudio.mandarinIn);

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
  mandarinPolitePhrasesGroup1 = {name: 'mandarin polite phrases group 1', arrayOfObjects:[]};
  mandarinPolitePhrasesGroup2 = {name: 'mandarin polite phrases group 2', arrayOfObjects:[]};
  mandarinCommonWordsGroup1 = {name: 'mandarin common words group 1', arrayOfObjects:[]};

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

  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinPleasePromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinSorryPromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinExcuseMeQuestionAskingContextPromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinWaitAMomentPromptAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinThankYouPromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinAnyTimePromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinYoureWelcomePromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinExcuseMePassingThroughContextPromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinIAppreciateThatPromptAndAnswer);
  mandarinPolitePhrasesGroup1.arrayOfObjects.push(mandarinYouHaveWorkedHardPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinPolitePhrasesGroup1);

  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinLongTimeNoSeePromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinIllLetYouGoPromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinPleaseAdviseMePromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinIRespectfullyWaitPromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinInMyHumbleOpinionPromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinExcuseMeForSayingThisPromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinItsOKPromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinItsMyDutyPromptAndAnswer);
  mandarinPolitePhrasesGroup2.arrayOfObjects.push(mandarinYouHaveWorkedHardPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinPolitePhrasesGroup2);

  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinToBePromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinOfPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinNotPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinOccurPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinPersonPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinIPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinYouPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinAtPromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinHavePromptAndAnswer);
  mandarinCommonWordsGroup1.arrayOfObjects.push(mandarinInPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings.push(mandarinCommonWordsGroup1);

  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalMandarinPromptAnswerGroupings);

  //vietnamese
  // centralVietnameseCasualConversationPatternsGroup1.arrayOfObjects.push(centralVietnameseWhatsYourNameQandA);
  promptsAndAnswersManager.arrayOfLanguagePromptAndAnswerGroupings.push(promptsAndAnswersManager.arrayOfLogicalVietnamesePromptAnswerGroupings);
}
