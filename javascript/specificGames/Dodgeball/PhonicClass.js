function PhonicClass(name, promptAudio,textAssociation)
{
  this.name = name;

  this.isTheCorrectChoice = false;

  this.promptAudio = promptAudio;
  this.textAssociation = textAssociation;
}

function PhonicClassManager()
{
  this.centralVietnameseStraightToneA = new PhonicClass('central vietnamese a', promptAudio.centralVietnameseStraightToneA,'a');
  this.centralVietnameseFallingToneA = new PhonicClass('central vietnamese à', promptAudio.centralVietnameseFallingToneA,'à');
  this.centralVietnameseRisingToneA = new PhonicClass('central vietnamese á', promptAudio.centralVietnameseRisingToneA,'á');
  this.centralVietnameseRisingStutterToneA = new PhonicClass('central vietnamese ã', promptAudio.centralVietnameseRisingStutterToneA,'ã');
  this.centralVietnameseLowStaccatoToneA = new PhonicClass('central vietnamese ạ', promptAudio.centralVietnameseLowStaccatoToneA,'ạ');
  this.centralVietnameseRisingHatAU = new PhonicClass('central vietnamese â', promptAudio.centralVietnameseRisingHatAU,'â');
  this.centralVietnameseStraightI = new PhonicClass('central vietnamese i', promptAudio.centralVietnameseStraightI, 'i');
  this.centralVietnameseHatE = new PhonicClass('central vietnamese hat e', promptAudio.centralVietnameseHatE, 'ê');
  this.centralVietnameseE = new PhonicClass('central vietnamese e', promptAudio.centralVietnameseE, 'e');
  this.centralVietnameseFallingI = new PhonicClass('central vietnamese falling i', promptAudio.centralVietnameseFallingI, 'ì');
  this.centralVietnameseU = new PhonicClass('central vietnamese u', promptAudio.centralVietnameseU, 'u');
  this.centralVietnameseHatO = new PhonicClass('central vietnamese ô', promptAudio.centralVietnameseHatO, 'ô');
  this.centralVietnameseO = new PhonicClass('central vietnamese ô', promptAudio.centralVietnameseO, 'o');
  this.centralVietnameseQuestionU = new PhonicClass('central vietnamese ư', promptAudio.centralVietnameseQuestionU, 'ư');
  this.centralVietnameseQuestionO = new PhonicClass('central vietnamese ơ', promptAudio.centralVietnameseQuestionO, 'ơ');
  this.centralVietnameseFallingE = new PhonicClass('central vietnamese è', promptAudio.centralVietnameseFallingE, 'è');
  this.centralVietnameseFallingO = new PhonicClass('central vietnamese ò', promptAudio.centralVietnameseFallingO, 'ò');
  this.centralVietnameseFallingU = new PhonicClass('central vietnamese ù', promptAudio.centralVietnameseFallingU, 'ù');
  this.centralVietnameseStutterE = new PhonicClass('central vietnamese ẽ', promptAudio.centralVietnameseStutterE, 'ẽ');
  this.centralVietnameseStutterI = new PhonicClass('central vietnamese ĩ', promptAudio.centralVietnameseStutterI, 'ĩ');
  this.centralVietnameseStutterO = new PhonicClass('central vietnamese õ', promptAudio.centralVietnameseStutterO, 'õ');
  this.centralVietnameseStutterU = new PhonicClass('central vietnamese ũ', promptAudio.centralVietnameseStutterU, 'ũ');
  this.centralVietnameseYoYoA = new PhonicClass('central vietnamese ả', promptAudio.centralVietnameseYoYoA, 'ả');
  this.centralVietnameseYoYoE = new PhonicClass('central vietnamese ẻ', promptAudio.centralVietnameseYoYoE, 'ẻ');
  this.centralVietnameseYoYoI = new PhonicClass('central vietnamese ỉ', promptAudio.centralVietnameseYoYoI, 'ỉ');
  this.centralVietnameseYoYoO = new PhonicClass('central vietnamese ỏ', promptAudio.centralVietnameseYoYoO, 'ỏ');
  this.centralVietnameseYoYoU = new PhonicClass('central vietnamese ủ', promptAudio.centralVietnameseYoYoU, 'ủ');
  this.centralVietnameseRisingE = new PhonicClass('central vietnamese é', promptAudio.centralVietnameseRisingE, 'é');
  this.centralVietnameseRisingO = new PhonicClass('central vietnamese ó', promptAudio.centralVietnameseRisingO, 'ó');
  this.centralVietnameseRisingI = new PhonicClass('central vietnamese í', promptAudio.centralVietnameseRisingI, 'í');
  this.centralVietnameseRisingU = new PhonicClass('central vietnamese ú', promptAudio.centralVietnameseRisingU, 'ú');
  this.centralVietnameseStaccatoE = new PhonicClass('central vietnamese ẹ', promptAudio.centralVietnameseStaccatoE, 'ẹ');
  this.centralVietnameseStaccatoO = new PhonicClass('central vietnamese ọ', promptAudio.centralVietnameseStaccatoO, 'ọ');
  this.centralVietnameseStaccatoI = new PhonicClass('central vietnamese ị', promptAudio.centralVietnameseStaccatoI, 'ị');
  this.centralVietnameseStaccatoU = new PhonicClass('central vietnamese ụ', promptAudio.centralVietnameseStaccatoU, 'ụ');
  this.centralVietnameseHookO = new PhonicClass('central vietnamese ơ', promptAudio.centralVietnameseHookO, 'ơ');
  this.centralVietnameseHalfPipeA = new PhonicClass('central vietnamese ă', promptAudio.centralVietnameseHalfPipeA, 'ă');
  this.centralVietnameseRisingHatA = new PhonicClass('central vietnamese ấ', promptAudio.centralVietnameseRisingHatA, 'ấ');
  this.centralVietnameseFallingHatA = new PhonicClass('central vietnamese ầ', promptAudio.centralVietnameseFallingHatA, 'ầ');
  this.centralVietnameseYoYoHatA = new PhonicClass('central vietnamese ẩ', promptAudio.centralVietnameseYoYoHatA, 'ẩ');
  this.centralVietnameseStutterHatA = new PhonicClass('central vietnamese ẫ', promptAudio.centralVietnameseStutterHatA, 'ẫ');
  this.centralVietnameseStaccatoHatA = new PhonicClass('central vietnamese ậ', promptAudio.centralVietnameseStaccatoHatA, 'ậ');

  //consonants
  this.centralVietnameseB = new PhonicClass('central vietnamese b', promptAudio.centralVietnameseB, 'b');
  this.centralVietnameseC = new PhonicClass('central vietnamese c', promptAudio.centralVietnameseC, 'c');
  this.centralVietnameseD = new PhonicClass('central vietnamese d', promptAudio.centralVietnameseD, 'd');
  this.centralVietnameseTh = new PhonicClass('central vietnamese th', promptAudio.centralVietnameseTh, 'th');
  this.centralVietnameseNg = new PhonicClass('central vietnamese ng', promptAudio.centralVietnameseNg, 'ng');
  this.centralVietnameseLinedD = new PhonicClass('central vietnamese linedD', promptAudio.centralVietnameseLinedD, 'đ');
  this.centralVietnameseG = new PhonicClass('central vietnamese g', promptAudio.centralVietnameseG, 'g');
  this.centralVietnameseH = new PhonicClass('central vietnamese h', promptAudio.centralVietnameseH, 'h');
  this.centralVietnameseK = new PhonicClass('central vietnamese k', promptAudio.centralVietnameseK, 'k');
  this.centralVietnameseL = new PhonicClass('central vietnamese l', promptAudio.centralVietnameseL, 'l');
  this.centralVietnameseM = new PhonicClass('central vietnamese m', promptAudio.centralVietnameseM, 'm');
  this.centralVietnameseN = new PhonicClass('central vietnamese n', promptAudio.centralVietnameseN, 'n');
  this.centralVietnameseP = new PhonicClass('central vietnamese p', promptAudio.centralVietnameseP, 'p');
  this.centralVietnameseQ = new PhonicClass('central vietnamese q', promptAudio.centralVietnameseQ, 'q');
  this.centralVietnameseR = new PhonicClass('central vietnamese r', promptAudio.centralVietnameseR, 'r');
  this.centralVietnameseS = new PhonicClass('central vietnamese s', promptAudio.centralVietnameseS, 's');
  this.centralVietnameseT = new PhonicClass('central vietnamese t', promptAudio.centralVietnameseT, 't');
  this.centralVietnameseV = new PhonicClass('central vietnamese v', promptAudio.centralVietnameseV, 'v');
  this.centralVietnameseX = new PhonicClass('central vietnamese x', promptAudio.centralVietnameseX, 'x');


  this.arrayOfEnglishPhonics = [];
  this.arrayOfPinyinPhonics = [];
  this.arrayOfCentralVietnamesePhonics = [];

  this.initializeArraysOfPhonics = function()
  {
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStraightToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingStutterToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseLowStaccatoToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingHatAU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStraightI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHatE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHatO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseQuestionU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseQuestionO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHookO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHalfPipeA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoHatA);

    //consonants
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseB);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseC);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseD);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseTh);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseNg);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseLinedD);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseG);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseH);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseK);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseL);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseM);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseN);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseP);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseQ);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseR);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseS);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseT);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseV);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseX);

  }

  this.currentLanguageArray = [];
  this.setCurrentLanguageArray = function(languageNumFromLanguageScreen)
  {
    if (languageNumFromLanguageScreen === 0)
    {
      this.currentLanguageArray = this.arrayOfEnglishPhonics;
    }
    else if (languageNumFromLanguageScreen === 1)
    {
      this.currentLanguageArray = this.arrayOfPinyinPhonics;
    }
    else if (languageNumFromLanguageScreen === 2)
    {
      this.currentLanguageArray = this.arrayOfCentralVietnamesePhonics;
    }
  }

  this.temporaryArrayOfPhonics = [];
  this.populateTemporaryArrayOfPhonics = function()
  {
    let randomArrayOfPhonicsIndex = undefined;
    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn1 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn1[0]);


    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn2 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn2[0]);
    this.examplePhonic2 = phonicToMoveAndReturn2;

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn3 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn3[0]);
    this.examplePhonic3 = phonicToMoveAndReturn3;

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn4 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn4[0]);
    this.examplePhonic4 = phonicToMoveAndReturn4;

    this.currentLanguageArray.push(phonicToMoveAndReturn1[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn2[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn3[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn4[0]);
  }

  this.currentCorrectPhonic = undefined;
  this.chooseCorrectPhonic = function()
  {
    let randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics.length - 1);
    this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].isTheCorrectChoice = true;
    this.currentCorrectPhonic = this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex];
  }

  this.assignPhonicsToDodgeballs = function()
  {
    let randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic1ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[0].phonicClass = phonic1ArrayResultFromSplice[0];

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic2ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[1].phonicClass = phonic2ArrayResultFromSplice[0];

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic3ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[2].phonicClass = phonic3ArrayResultFromSplice[0];

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic4ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[3].phonicClass = phonic4ArrayResultFromSplice[0];

  }

  this.setOrResetPhonicsOnDodgeballsAndPlayPromptAudio = function()
  {
    for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
    {
      gameClassManager.currentGame.arrayOfDodgeballs[i].phonicClass.isTheCorrectChoice = false;
    }
    this.populateTemporaryArrayOfPhonics();
    this.chooseCorrectPhonic();
    this.assignPhonicsToDodgeballs();
    this.currentCorrectPhonic.promptAudio.sfx.play();
  }
}
