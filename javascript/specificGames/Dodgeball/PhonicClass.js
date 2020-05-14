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

    console.log('this.temporaryArrayOfPhonics: ' + this.temporaryArrayOfPhonics);
    this.currentLanguageArray.push(phonicToMoveAndReturn1[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn2[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn3[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn4[0]);
    console.log('this.currentLanguageArray: ' + this.currentLanguageArray);
  }

  this.currentCorrectPhonic = undefined;
  this.chooseCorrectPhonic = function()
  {
    let randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics.length - 1);
    console.log('randomArrayOfPhonicsIndex: ' + randomArrayOfPhonicsIndex);
    console.log('this.temporaryArrayOfPhonics: ' + this.temporaryArrayOfPhonics);
    console.log('this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].name: ' + this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].name);
    this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].isTheCorrectChoice = true;
    this.currentCorrectPhonic = this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex];
    console.log('this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].isTheCorrectChoice: ' + this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].isTheCorrectChoice);
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

    console.log('gameClassManager.currentGame.arrayOfDodgeballs: ' + gameClassManager.currentGame.arrayOfDodgeballs);
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
