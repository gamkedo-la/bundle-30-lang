cVcShooterGameClass.prototype = new GameClass();
function cVcShooterGameClass()
{
  this.name = 'cVcShooter Game';
  this.FRAME_RATE = 1000/30;
  this.titleScreenData = [
	{name: "cVc", fontSize: 22, spacing: 12, x: 47, y: 270},
	{name: "Shooter", fontSize: 22, spacing: 12, x: 26, y: 300}
  ];

  this.drawTransitionText = function()
  {
    customFontFillText(['Shoot the answers!', symbolExclamationPointImage], 60,30, 50,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText(['Space bar', ' ', symbolEqualsImage, ' Shoot'], 30,15, 175,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.playerCharacter = undefined;
  this.cVcManager = undefined;
  this.background = undefined;

  this.backButtonColor = 'rgb(227,227,227)';
  this.backButtonTextColor = 'brown';

  this.playerShouldBeTargetingFirstLetter = true;
  this.playerShouldBeTargetingSecondLetter = false;
  this.playerShouldBeTargetingThirdLetter = false;

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/shootingGalleryMusic.mp3', 47.5);

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.targetHit = new sfxOneShot("audio/cVcSFX/targetHit1.mp3");

    gameAudio.gunPop = new sfxOneShot('audio/cVcSFX/gunPop1.mp3');
    gameAudio.gunshotBass = new sfxOneShot('audio/cVcSFX/gunshotBass1.mp3');
  };

  this.initialize = function()
  {
    this.background = new cVcShooterBackground();
    this.playerCharacter = new ShooterPlayer();
    this.cVcManager = new CVCManager();
    this.cVcManager.initializeArraysOfCVCs();
    this.setCurrentLanguageArray();
    this.cVcManager.currentCVC = this.cVcManager.chooseARandomCVC(this.currentLanguageArray);
    this.cVcManager.currentCVC.initialize();
    promptersManager.loadCurrentPrompter(imageAndAudioPrompterForCVCs);
    promptersManager.currentPrompter.loadCurrentImage(this.cVcManager.currentCVC.imageAssociation);
    promptersManager.currentPrompter.loadCurrentAudio(this.cVcManager.currentCVC.audioAssociation);
  }

  this.currentLanguageArray = undefined;
  this.setCurrentLanguageArray = function()
  {
    if (languageSelectionScreen.languageNum === 0)
    {
      this.currentLanguageArray = this.cVcManager.arrayOfEnglishCVCs;
    }
    else if (languageSelectionScreen.languageNum === 1)
    {
      this.currentLanguageArray = this.cVcManager.arrayOfMandarinCVCs;
    }
    else if (languageSelectionScreen.languageNum === 2)
    {
      this.currentLanguageArray = this.cVcManager.arrayOfCentralVietnameseCVCs;
    }
    //console.log('this.currentLanguageArray: ' + this.currentLanguageArray);
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    if (this.playerCharacter.arrayOfGunSmokeParticles.length > 0)
    {
      for (let i = 0; i < this.playerCharacter.arrayOfGunSmokeParticles.length; i++)
      {
        this.playerCharacter.arrayOfGunSmokeParticles[i].draw();
      }
    }
    this.cVcManager.currentCVC.draw();
    drawBullets();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      moveBullets();
      for (let i = 0; i < arrayOfBullets.length; i++)
      {
        arrayOfBullets[i].handleLetterCollisions(i);
      }

      for (let i = 0; i < this.playerCharacter.arrayOfGunSmokeParticles.length; i++)
      {
        this.playerCharacter.arrayOfGunSmokeParticles[i].move();
        if (this.playerCharacter.arrayOfGunSmokeParticles[i].alpha < 0.1)
        {
          gameClassManager.currentGame.playerCharacter.arrayOfGunSmokeParticles.splice(i,1);
        }
      }
    }
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.position -= 1;
    if (this.playerCharacter.position < 0)
    {
      this.playerCharacter.position = 2;
    }
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.position += 1;
    if (this.playerCharacter.position > 2)
    {
      this.playerCharacter.position = 0;
    }
  }

  this.handleSpaceBarDown = function()
  {
    fireBullet();
    this.playerCharacter.rotateGun();
    this.playerCharacter.generateSmoke();
  }

}

const cVcShooterGame = new cVcShooterGameClass();

function cVcShooterBackground()
{
  this.tileCount = 9;
  this.arrayOfGameBoardLetterPositions = [0,1,2];

  this.image = 'images\\Backgrounds\\ShootGallery.png';

  this.color = 'lime';

  this.draw = function()
  {
    // gameCanvasContext.fillStyle = this.color;
    // gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function ShooterPlayer()
{
  this.position = 1;

  this.gunRotated = false;

  this.image = 'images\\sprites\\cVc shooter\\Gun.png';

  this.draw = function()
  {
    if (this.gunRotated === true)
    {
      drawFromSheet(this.image, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350, undefined, 15*Math.PI/180, this.position*(gameCanvas.width*0.165) - 3,gameCanvas.height);
      // gameCanvasContext.save();
      // gameCanvasContext.translate(this.position*(gameCanvas.width*0.165) - 3,gameCanvas.height);
      // gameCanvasContext.rotate(15*Math.PI/180);
      // gameCanvasContext.translate( -(this.position*(gameCanvas.width*0.165) - 3),-(gameCanvas.height) );
      // gameCanvasContext.drawImage(galleryGunImage, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350);
      // gameCanvasContext.restore();
    }
    else if (this.gunRotated === false)
    {
      drawFromSheet(this.image, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350)
      //gameCanvasContext.drawImage(galleryGunImage, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350);
    }

  }

  this.rotateGun = function()
  {
    this.gunRotated = true;
    setTimeout(unRotateGun, 200);
  }

  this.arrayOfGunSmokeParticles = [];
  this.generateSmoke = function()
  {
    let x = this.position*(gameCanvas.width/3) + 50;
    let y = gameCanvas.height - 175;
    let smoke = new GunSmokeParticle(x,y);
    this.arrayOfGunSmokeParticles.push(smoke);
  }
}

function unRotateGun()
{
  gameClassManager.currentGame.playerCharacter.gunRotated = false;
}

function GunSmokeParticle(x,y)
{

  this.image = 'images\\sprites\\cVc shooter\\smokeParticle.png';
  this.x = x;
  this.y = y;

  this.alpha = 1;
  this.alphaDecreaseRate = 0.99;
  this.width = getRandomArbitrary(75,125);
  this.height = getRandomArbitrary(100,150);
  this.xVelocity = getRandomArbitrary(-1,1);
  this.yVelocity = getRandomArbitrary(1,2);

  this.draw = function()
  {
    gameCanvasContext.globalAlpha = this.alpha;
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.globalAlpha = 1;
  }

  this.move = function()
  {
    this.x += this.xVelocity;
    this.y -= this.yVelocity;

    this.width -= 1;
    this.height -= 1;

    this.alpha *= this.alphaDecreaseRate;

  }
}

function Bullet(i)
{
  this.xPosition = cVcShooterGame.playerCharacter.position*200 + 97;
  this.yPosition = gameCanvas.height - 170;

  this.move = function()
  {
    this.yPosition -= 50;
  }

  this.draw = function()
  {
    drawFromSheet('images\\sprites\\cVc shooter\\bullet.png', this.xPosition,this.yPosition, 10,30);
    //gameCanvasContext.drawImage(galleryBulletImage, this.xPosition,this.yPosition, 10,30);
  }

  this.handleLetterCollisions = function(i)
  {
    if (this.yPosition <= 150)
    {
      if (cVcShooterGame.playerShouldBeTargetingFirstLetter &&
          this.xPosition > cVcShooterGame.cVcManager.currentCVC.firstLetterCollisionRangeLeftPoint &&
          this.xPosition < cVcShooterGame.cVcManager.currentCVC.firstLetterCollisionRangeRightPoint)
      {
        amountCorrect++;
        cVcShooterGame.playerShouldBeTargetingFirstLetter = false;
        cVcShooterGame.playerShouldBeTargetingSecondLetter = true;
        arrayOfBullets.splice(i,1);
        gameAudio.targetHit.play();
        calculateAccuracy();
        return;
      }
      else if (cVcShooterGame.playerShouldBeTargetingSecondLetter &&
               this.xPosition > cVcShooterGame.cVcManager.currentCVC.secondLetterCollisionRangeLeftPoint &&
               this.xPosition < cVcShooterGame.cVcManager.currentCVC.secondLetterCollisionRangeRightPoint)
      {
          amountCorrect++;
          cVcShooterGame.playerShouldBeTargetingSecondLetter = false;
          cVcShooterGame.playerShouldBeTargetingThirdLetter = true;
          arrayOfBullets.splice(i,1);
          gameAudio.targetHit.play();
          calculateAccuracy();
          return;
      }
      else if (cVcShooterGame.playerShouldBeTargetingThirdLetter &&
               this.xPosition > cVcShooterGame.cVcManager.currentCVC.thirdLetterCollisionRangeLeftPoint &&
               this.xPosition < cVcShooterGame.cVcManager.currentCVC.thirdLetterCollisionRangeRightPoint)
      {
        {
          amountCorrect++;
          cVcShooterGame.playerShouldBeTargetingThirdLetter = false;
          arrayOfBullets = [];
          gameAudio.targetHit.play();
          calculateAccuracy();
          cVcShooterGame.cVcManager.currentCVC = cVcShooterGame.cVcManager.chooseARandomCVC(cVcShooterGame.currentLanguageArray);
          cVcShooterGame.cVcManager.currentCVC.initialize();
          promptersManager.loadCurrentPrompter(imageAndAudioPrompterForCVCs);
          promptersManager.currentPrompter.loadCurrentImage(cVcShooterGame.cVcManager.currentCVC.imageAssociation);
          promptersManager.currentPrompter.loadCurrentAudio(cVcShooterGame.cVcManager.currentCVC.audioAssociation);
          cVcShooterGame.playerShouldBeTargetingFirstLetter = true;
          // promptersManager.currentPrompter.togglePromptingBoolean();
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
            if (cycleCount === CYCLE_LIMIT_FOR_RANDOM_GAME_RELOAD)
            {
              loadRandomGame();
              cycleCount = 0;
            }
          }

          promptersManager.currentPrompter.promptThePlayer();
          return;
        }
      }
      else
      {
        amountIncorrect++;
        arrayOfBullets.splice(i,1);
        calculateAccuracy();
        return;
      }//end of letter order checks and collision range checks
    }//end of y position check
  }//end of handleLetterCollisions
}//end of bulletClass

var arrayOfBullets = [];

function fireBullet()
{
  let bullet = new Bullet();
  arrayOfBullets.push(bullet);
  gameAudio.gunPop.play();
  gameAudio.gunshotBass.play();
}

function moveBullets()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].move();
  }
}

function drawBullets()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].draw();
  }
}

function handleBulletCollisionsWithLetters()
{
  for (let i = 0; i < arrayOfBullets.length; i++)
  {
    arrayOfBullets[i].handleLetterCollisions();
  }

}

function cVc(firstLetter,secondLetter,thirdLetter, imageAssociation, audioAssociation)
{
  this.backgroundImage = 'images\\Backgrounds\\target.png';

  this.imageAssociation = imageAssociation;
  this.audioAssociation = audioAssociation;

  this.firstLetter = firstLetter;//string
  this.firstLetterPosition = undefined;//integer from arrayOfLetterPositions
  this.firstLetterCollisionRangeLeftPoint = undefined;
  this.firstLetterCollisionRangeRightPoint = undefined;

  this.secondLetter = secondLetter;
  this.secondLetterPosition = undefined;
  this.secondLetterCollisionRangeLeftPoint = undefined;
  this.secondLetterCollisionRangeRightPoint = undefined;

  this.thirdLetter = thirdLetter;
  this.thirdLetterPosition = undefined;
  this.thirdLetterCollisionRangeLeftPoint = undefined;
  this.thirdLetterCollisionRangeRightPoint = undefined;

  this.arrayOfLetterPositions = [this.firstLetterPosition,this.secondLetterPosition,this.thirdLetterPosition];

  this.assignLetterPositions = function()
  {
    cVcShooterGame.background.arrayOfGameBoardLetterPositions = [0,1,2];
    let arrayOfGameBoardLetterPositionsLength = 3;
    for (let i = 0; i < arrayOfGameBoardLetterPositionsLength; i++)
    {
      let randomArrayOfLetterPositionsIndex = Math.floor(Math.random()*cVcShooterGame.background.arrayOfGameBoardLetterPositions.length);
      this.arrayOfLetterPositions[i] = cVcShooterGame.background.arrayOfGameBoardLetterPositions[randomArrayOfLetterPositionsIndex];
      cVcShooterGame.background.arrayOfGameBoardLetterPositions.splice(randomArrayOfLetterPositionsIndex,1);
    }
  }

  this.defineCollisionRanges = function()
  {
    this.firstLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[0] * 199;
    this.firstLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[0] * 200 + 199;

    this.secondLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[1] * 199;
    this.secondLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[1] * 200 + 199;

    this.thirdLetterCollisionRangeLeftPoint = this.arrayOfLetterPositions[2] * 199;
    this.thirdLetterCollisionRangeRightPoint = this.arrayOfLetterPositions[2] * 200 + 199;
  }

  this.initialize = function()
  {
    this.assignLetterPositions();
    this.defineCollisionRanges();
  }

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.font = '30px Helvetica';

    if (cVcShooterGame.playerShouldBeTargetingFirstLetter)
    {

      //gameCanvasContext.drawImage(this.backgroundImage, this.arrayOfLetterPositions[0]*200 + 55,100);
      drawFromSheet(this.backgroundImage, this.arrayOfLetterPositions[0]*200 + 55,100);
      gameCanvasContext.fillText(this.firstLetter, this.arrayOfLetterPositions[0]*200 + 102,153);

      //gameCanvasContext.drawImage(this.backgroundImage, this.arrayOfLetterPositions[1]*200 + 55,100);
      drawFromSheet(this.backgroundImage, this.arrayOfLetterPositions[1]*200 + 55,100);
      gameCanvasContext.fillText(this.secondLetter, this.arrayOfLetterPositions[1]*200 + 102,153);

      //gameCanvasContext.drawImage(this.backgroundImage, this.arrayOfLetterPositions[2]*200 + 55,100);
      drawFromSheet(this.backgroundImage, this.arrayOfLetterPositions[2]*200 + 55,100);
      gameCanvasContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 102,153);
    }
    else if (cVcShooterGame.playerShouldBeTargetingSecondLetter)
    {
      //gameCanvasContext.drawImage(this.backgroundImage, this.arrayOfLetterPositions[1]*200 + 55,100);
      drawFromSheet(this.backgroundImage, this.arrayOfLetterPositions[1]*200 + 55,100);
      gameCanvasContext.fillText(this.secondLetter, this.arrayOfLetterPositions[1]*200 + 102,153);
      //gameCanvasContext.drawImage(this.backgroundImage, this.arrayOfLetterPositions[2]*200 + 55,100);
      drawFromSheet(this.backgroundImage, this.arrayOfLetterPositions[2]*200 + 55,100);
      gameCanvasContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 102,153);
    }
    else if (cVcShooterGame.playerShouldBeTargetingThirdLetter)
    {
      //gameCanvasContext.drawImage(this.backgroundImage, this.arrayOfLetterPositions[2]*200 + 55,100);
      drawFromSheet(this.backgroundImage, this.arrayOfLetterPositions[2]*200 + 55,100);
      gameCanvasContext.fillText(this.thirdLetter, this.arrayOfLetterPositions[2]*200 + 102,153);
    }
    else
    {
      //gameCanvasContext.fillText("You win!!!", gameCanvas.width/2,gameCanvas.height/2);
    }
  }
}

function CVCManager()
{
  //english section
  this.CVCcat = new cVc('c','a','t', "images\\sprites\\PromptsAndAnswers\\cat.png", promptAudio.blendedCat);
  this.CVCcot = new cVc('c','o','t', "images\\sprites\\PromptsAndAnswers\\cot.png", promptAudio.blendedCot);

  //mandarin section
  this.CVCMandarinHowAreYou = new cVc('你','好','吗', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howAreYou.png", promptAudio.mandarinHowAreYou);
  this.CVCMandarinHowAmI = new cVc('我','怎么','样', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howAmI.png", promptAudio.mandarinHowAmI);
  this.CVCMandarinHowAreThey = new cVc('他们','怎么','样', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howAreThey.png", promptAudio.mandarinHowAreThey);
  this.CVCMandarinHowAreWe = new cVc('我们','怎么','样', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howAreWe.png", promptAudio.mandarinHowAreWe);
  this.CVCMandarinHowIsHe = new cVc('他','怎么','样', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howIsHe.png", promptAudio.mandarinHowIsHe);
  this.CVCMandarinHowIsShe = new cVc('她','怎么','样', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howIsShe.png", promptAudio.mandarinHowIsShe);
  this.CVCMandarinHowIsItDoing = new cVc('它','怎么','样', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howIsItDoing.png", promptAudio.mandarinHowIsHe);
  this.CVCMandarinImVeryGood = new cVc('我','很','好', "images\\sprites\\PromptsAndAnswers\\Mandarin\\imVeryGood.png", promptAudio.mandarinImVeryGood);
  this.CVCMandarinNotBad = new cVc('还','不','错', "images\\sprites\\PromptsAndAnswers\\Mandarin\\notBad.png", promptAudio.mandarinNotBad);
  this.CVCMandarinImAlsoVeryGood = new cVc('我','也','很好', "images\\sprites\\PromptsAndAnswers\\Mandarin\\imAlsoVeryGood.png", promptAudio.mandarinImAlsoVeryGood);
  this.CVCMandarinVeryNiceToMeetYou = new cVc('很','高兴','认识你', "images\\sprites\\PromptsAndAnswers\\Mandarin\\niceToMeetYou.png", promptAudio.mandarinVeryNiceToMeetYou);
  this.CVCMandarinWhereAreYouFrom = new cVc('你是','哪里','人', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whereAreYouFrom.png", promptAudio.mandarinWhereAreYouFrom);
  this.CVCMandarinImFromAmerica = new cVc('我','来自','美国', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iAmFromAmerica.png", promptAudio.mandarinImFromAmerica);
  this.CVCMandarinWhatDoYouLikeToDo = new cVc('你喜欢','做','什么', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whatDoYouLikeToDo.png", promptAudio.mandarinWhatDoYouLikeToDo);
  this.CVCMandarinWhatPartOfChina = new cVc('你来自','中国','哪里', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whatPartOfChina.png", promptAudio.mandarinWhatPartOfChina);
  this.CVCMandarinWhereDoYouLive = new cVc('你','住在','哪里', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whereDoYouLive.png", promptAudio.mandarinWhereDoYouLive);
  this.CVCMandarinILiveInVietnam = new cVc('我','住在','越南', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iLiveInVietnam.png", promptAudio.mandarinILiveInVietnam);
  this.CVCMandarinMeToo = new cVc('我','也','是', "images\\sprites\\PromptsAndAnswers\\Mandarin\\meToo.png", promptAudio.mandarinMeToo);
  this.CVCMandarinILikeProgramming = new cVc('我','喜欢','编程', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iLikeProgramming.png", promptAudio.mandarinILikeProgramming);
  this.CVCMandarinIAlsoLikeFitness = new cVc('我也','喜欢','健身', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iAlsoLikeFitness.png", promptAudio.mandarinIAlsoLikeFitness);
  this.CVCMandarinWhatIsYourJob = new cVc('你的','工作','是什么', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whatIsYourJob.png", promptAudio.mandarinWhatIsYourJob);
  this.CVCMandarinIAmATeacher = new cVc('我','是','老师', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iAmATeacher.png", promptAudio.mandarinIAmATeacher);
  this.CVCMandarinAnythingElse = new cVc('还','有','吗', "images\\sprites\\PromptsAndAnswers\\Mandarin\\somethingElse.png", promptAudio.mandarinAnythingElse);
  this.CVCMandarinILikeWatchingMovies = new cVc('我','喜欢','看电影', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iLikeWatchingMovies.png", promptAudio.mandarinILikeWatchingMovies);
  this.CVCMandarinILikeRockClimbing = new cVc('我','喜欢','攀岩', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iLikeRockClimbing.png", promptAudio.mandarinILikeRockClimbing);
  this.CVCMandarinWhatIsYourName = new cVc('你叫','什么','名字', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whatIsYourName.png", promptAudio.mandarinWhatIsYourName);
  this.CVCMandarinMyNameIsSteven = new cVc('我叫','史','蒂文', "images\\sprites\\PromptsAndAnswers\\Mandarin\\myNameIsSteven.png", promptAudio.mandarinMyNameIsSteven);
  this.CVCMandarinHowOldAreYou = new cVc('你','几','岁', "images\\sprites\\PromptsAndAnswers\\Mandarin\\howOldAreYou.png", promptAudio.mandarinHowOldAreYou);
  this.CVCMandarinIAm37YearsOld = new cVc('我今年','三十七','岁', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iAm37.png", promptAudio.mandarinIAm37YearsOld);

  //central vietnamese Section
  this.CVCCentralVietnameseHelloMan = new cVc('xin', 'chào', 'anh', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\helloMan.png", promptAudio.centralVietnameseHelloMan);
  this.CVCCentralVietnameseHelloWoman = new cVc('xin', 'chào', 'em', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\helloWoman.png", promptAudio.centralVietnameseHelloWoman);
  this.CVCCentralVietnameseWhatsYourNameGeneral = new cVc('bạn', 'tên', 'là gì', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\whatIsYourNameBrother.png", promptAudio.centralVietnameseWhatsYourNameGeneral);
  this.CVCCentralVietnameseWhatsYourNameBrother = new cVc('anh', 'tên', 'là gì', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\whatIsYourNameBrother.png", promptAudio.centralVietnameseWhatsYourNameBrother);
  this.CVCCentralVietnameseWhatsYourNameBaby = new cVc('em', 'tên', 'là gì', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\whatIsYourNameBaby.png", promptAudio.centralVietnameseWhatsYourNameBaby);
  this.CVCCentralVietnameseMyNameIsSteven = new cVc('tôi', 'tên', 'là Steven', "images\\sprites\\PromptsAndAnswers\\Mandarin\\myNameIsSteven.png", promptAudio.centralVietnameseMyNameIsSteven);
  this.CVCCentralVietnameseWhereAreYouFrom = new cVc('anh là','người nước','nào', "images\\sprites\\PromptsAndAnswers\\Mandarin\\whereAreYouFrom.png", promptAudio.centralVietnameseWhereAreYouFrom);
  this.CVCCentralVietnameseIAmFromAmerica = new cVc('tôi là','người', 'Mỹ', "images\\sprites\\PromptsAndAnswers\\Mandarin\\iAmFromAmerica.png", promptAudio.centralVietnameseIAmFromAmerica);
  this.CVCCentralVietnameseVeryNiceToMeetYou = new cVc('rất vui', 'được', 'bạn', "images\\sprites\\PromptsAndAnswers\\Mandarin\\niceToMeetYou.png", promptAudio.centralVietnameseVeryNiceToMeetYou);
  this.CVCCentralVietnameseWhatDoYouLikeToEat = new cVc('Bạn', 'thích ăn', 'gì', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\whatDoYouLikeToEat.png", promptAudio.centralVietnameseWhatDoYouLikeToEat);
  this.CVCCentralVietnameseILikeToEatVegetarian = new cVc('tôi', 'thích ăn', 'chay', "images\\sprites\\PromptsAndAnswers\\CentralVietnamese\\iLikeToEatVegetarian.png", promptAudio.centralVietnameseILikeToEatVegetarian);



  this.arrayOfEnglishCVCs = [];
  this.arrayOfMandarinCVCs = [];
  this.arrayOfCentralVietnameseCVCs = [];

  this.initializeArraysOfCVCs = function()
  {
    //english
    this.arrayOfEnglishCVCs.push(this.CVCcat);
    this.arrayOfEnglishCVCs.push(this.CVCcot);


    //mandarin

    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreYou);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAmI);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreThey);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreWe);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsHe);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsShe);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsItDoing);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImVeryGood);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinNotBad);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImAlsoVeryGood);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinVeryNiceToMeetYou);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhereAreYouFrom);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImFromAmerica);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhatDoYouLikeToDo);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhatPartOfChina);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhereDoYouLive);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILiveInVietnam);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinMeToo);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILikeProgramming);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinIAlsoLikeFitness);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinIAmATeacher);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinAnythingElse);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILikeWatchingMovies);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILikeRockClimbing);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhatIsYourName);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinMyNameIsSteven);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowOldAreYou);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinIAm37YearsOld);

    //central vietnamese
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseHelloWoman);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseHelloMan);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseWhatsYourNameGeneral);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseWhatsYourNameBrother);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseWhatsYourNameBaby);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseMyNameIsSteven);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseWhereAreYouFrom);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseIAmFromAmerica);
    this.arrayOfCentralVietnameseCVCs.push(this.CVCCentralVietnameseVeryNiceToMeetYou);


  }

  this.chooseARandomCVC = function(currentLanguageArray)
  {
    let randomArrayOfCVCsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    return currentLanguageArray[randomArrayOfCVCsIndex];
  }

  this.currentCVC = undefined;
}
