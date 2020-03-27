//standard image declaration section

//Prompt and Answer Class Section
let womanImage = document.createElement("img");
let womenImage = document.createElement("img");
let manImage = document.createElement("img");
let menImage = document.createElement("img");
let heImage = document.createElement("img");
let sheImage = document.createElement("img");

let cotImage = document.createElement("img");
let catImage = document.createElement("img");

let mandarinBuyImage = document.createElement("img");//'buy' in English
let mandarinSellImage = document.createElement("img");//'sell' in English

let mandarinMomImage = document.createElement("img");
let mandarinHorseImage = document.createElement('img');

let mandarinThisOneImage = document.createElement("img");
let mandarinThatOneImage = document.createElement("img");
let mandarinTheseOnesImage = document.createElement("img");
let mandarinThoseOnesImage = document.createElement("img");

let mandarinCouchImage = document.createElement("img");
let mandarinTowerImage = document.createElement("img");

//runner images
let runnerSunAndSkyBackgroundImage = document.createElement("img");
let runnerCloud1 = document.createElement("img");
let runnerGrassImage = document.createElement("img");
let runnerMountain1Image = document.createElement("img");
let runnerRunning1Image = document.createElement('img');
let runnerRunning2Image = document.createElement('img');
let runnerRunning3Image = document.createElement('img');
let runnerJumpingImage = document.createElement("img");

//snake images
let snakeGrassBackground = document.createElement('img');

//bird images
let skyBackground = document.createElement('img');

//lane images
let laneGrassBackground1 = document.createElement('img');
let laneGrassBackground2 = document.createElement('img');
let laneRoad1 = document.createElement('img');
let laneRoad2 = document.createElement('img');
let laneCarImage = document.createElement('img');
let roadDash1 = document.createElement('img');
let roadDash2 = document.createElement('img');
let roadDash3 = document.createElement('img');

//jumper images
let jumperBackground = document.createElement('img');

//space shooter images
let spaceShooterBackgroundImage = document.createElement('img');
let spaceShooterBackgroundImage2 = document.createElement('img');
let spaceshipImage = document.createElement('img');

//flower images
let simpleFlower = document.createElement('img');
let flowerBackground = document.createElement('img');
let jupiterImage = document.createElement('img');

// maze images
let mazeFloor = document.createElement('img');
let mazeTopWall = document.createElement('img');
let mazeBottomWall = document.createElement('img');
let mazeLeftWall = document.createElement('img');
let mazeRightWall = document.createElement('img');
let mazeCharacter = document.createElement('img');

//air grab
let airBoothImage = document.createElement('img');
let armlessBodyImage = document.createElement('img');
let rightArmImage = document.createElement('img');
let leftArmImage = document.createElement('img');

//Frog
let frogRiverBackgroundImage = document.createElement('img');
let lilyImage1 = document.createElement('img');
let lilyImage2 = document.createElement('img');
let lilyImage3 = document.createElement('img');
let lilyImage4 = document.createElement('img');

let fishingGameWaterBackgroundImage = document.createElement('img');

//special characters for custom font
let upArrowImage = document.createElement("img");
let rightArrowImage = document.createElement("img");
let downArrowImage = document.createElement("img");
let leftArrowImage = document.createElement("img");

//custom font symbols that do not function easily in condensed code
//var arrayOfTextSymbols = '~!@#$%=,.';
let symbolTildeImage = document.createElement("img");//~
let symbolExclamationPointImage = document.createElement("img");//!
let symbolEmailAtImage = document.createElement("img");//@
let symbolHashImage = document.createElement("img");//#
let symbolDollarSignImage = document.createElement("img");//$
let symbolPercentImage = document.createElement("img");//%
let symbolEqualsImage = document.createElement("img");//=
let symbolQuestionMarkImage = document.createElement("img");//?
let symbolPeriodImage = document.createElement("img");//.

let placeholderPlayButtonImage = document.createElement("img");

// bubble wrap game
let bubbleWrapBG = document.createElement("img");
let bubbleWrapSpritesheet = document.createElement("img");
//let balloonPopBG = document.createElement("img");
let balloonPopSpritesheet = document.createElement("img");
let pinataImage = document.createElement("img");

//custom font image loading section, used loops for less typing... just to see if i could
var arrayOfTextLetters = 'abcdefghijklmnopqrstuvwxyzñ';
var arrayOfTextNumbers = '0123456789';
var arrayOfTextSymbols = [upArrowImage, rightArrowImage, downArrowImage, leftArrowImage, symbolTildeImage, symbolExclamationPointImage,
symbolEmailAtImage, symbolHashImage, symbolDollarSignImage, symbolPercentImage, symbolEqualsImage, symbolQuestionMarkImage,
symbolPeriodImage];


(function () {//cycle through letter and number names, create image elements for them

  //letters
  for (let arrayOfTextLettersIndex = 0; arrayOfTextLettersIndex < arrayOfTextLetters.length; arrayOfTextLettersIndex++)
  {

    //small letters
    let smallLetterVariableName = 'small' + arrayOfTextLetters[arrayOfTextLettersIndex];
    window[smallLetterVariableName] = document.createElement("img");

    //big letters
    let bigLetterVariableName = 'big' + arrayOfTextLetters[arrayOfTextLettersIndex];
    window[bigLetterVariableName] = document.createElement("img");
  }

  //numbers
  for (let arrayOfTextNumbersIndex = 0; arrayOfTextNumbersIndex < arrayOfTextNumbers.length; arrayOfTextNumbersIndex++)
  {
    let numberVariableName = 'number' + arrayOfTextNumbers[arrayOfTextNumbersIndex];
    window[numberVariableName] = document.createElement("img");
  }

})();

var numberOfImagesToLoad = undefined;

function loadImages()
{
  let arrayOfImages = [];
  for (let arrayOfTextLettersIndex = 0; arrayOfTextLettersIndex < arrayOfTextLetters.length; arrayOfTextLettersIndex++)
  {
    let smallLetterImageName = 'small' + arrayOfTextLetters[arrayOfTextLettersIndex];
    arrayOfImages.push(
                    {
                    imageObjectBinding: window[smallLetterImageName],
                    theFile: 'images/Custom Font/pngs/small letters/small' + arrayOfTextLetters[arrayOfTextLettersIndex] + '.png'
                    });

    let bigLetterImageName = 'big' + arrayOfTextLetters[arrayOfTextLettersIndex];
    arrayOfImages.push(
                    {
                    imageObjectBinding: window[bigLetterImageName],
                    theFile: 'images/Custom Font/pngs/big letters/big' + arrayOfTextLetters[arrayOfTextLettersIndex] + '.png'}
                    );
  }


  for (let arrayOfTextNumbersIndex = 0; arrayOfTextNumbersIndex < arrayOfTextNumbers.length; arrayOfTextNumbersIndex++)
  {
    let numberImageName = 'number' + arrayOfTextNumbers[arrayOfTextNumbersIndex];
    arrayOfImages.push(
                    {
                    imageObjectBinding: window[numberImageName],
                    theFile: 'images/Custom Font/pngs/numbers/' + arrayOfTextNumbers[arrayOfTextNumbersIndex]  + '.png'
                    });
  }

  //somewhat standard image loading

  //prompt and answer
  arrayOfImages.push({imageObjectBinding: womanImage, theFile: 'images/sprites/PromptsAndAnswers/woman.png'});
  arrayOfImages.push({imageObjectBinding: womenImage, theFile: 'images/sprites/PromptsAndAnswers/women.png'});
  arrayOfImages.push({imageObjectBinding: manImage, theFile: 'images/sprites/PromptsAndAnswers/man.png'});
  arrayOfImages.push({imageObjectBinding: menImage, theFile: 'images/sprites/PromptsAndAnswers/men.png'});
  arrayOfImages.push({imageObjectBinding: heImage, theFile: 'images/sprites/PromptsAndAnswers/man.png'});
  arrayOfImages.push({imageObjectBinding: sheImage, theFile: 'images/sprites/PromptsAndAnswers/woman.png'});

  arrayOfImages.push({imageObjectBinding: catImage, theFile: 'images/sprites/PromptsAndAnswers/cat.png'});
  arrayOfImages.push({imageObjectBinding: cotImage, theFile: 'images/sprites/PromptsAndAnswers/cot.png'});

  arrayOfImages.push({imageObjectBinding: mandarinBuyImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/mandarinBuy.png'});//'buy' in English
  arrayOfImages.push({imageObjectBinding: mandarinSellImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/mandarinSell.png'});//'sell' in English

  arrayOfImages.push({imageObjectBinding: mandarinMomImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/mom.png'});//'sell' in English
  arrayOfImages.push({imageObjectBinding: mandarinHorseImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/horse.png'});//'sell' in English

  arrayOfImages.push({imageObjectBinding: mandarinThisOneImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/thisOne.png'});//'sell' in English
  arrayOfImages.push({imageObjectBinding: mandarinThatOneImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/thatOne.png'});//'sell' in English
  arrayOfImages.push({imageObjectBinding: mandarinTheseOnesImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/theseOnes.png'});//'sell' in English
  arrayOfImages.push({imageObjectBinding: mandarinThoseOnesImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/thoseOnes.png'});//'sell' in English

  arrayOfImages.push({imageObjectBinding: mandarinCouchImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/couch.png'});//'sell' in English
  arrayOfImages.push({imageObjectBinding: mandarinTowerImage, theFile: 'images/sprites/PromptsAndAnswers/Mandarin/tower.png'});//'sell' in English

  //runner game
  arrayOfImages.push({imageObjectBinding: runnerSunAndSkyBackgroundImage, theFile: 'images/Backgrounds/runnerSunAndSky.png'});
  arrayOfImages.push({imageObjectBinding: runnerCloud1, theFile: 'images/Backgrounds/runnerCloud1.png'});
  arrayOfImages.push({imageObjectBinding: runnerGrassImage, theFile: 'images/Backgrounds/runnerGrass.png'});
  arrayOfImages.push({imageObjectBinding: runnerMountain1Image, theFile: 'images/Backgrounds/runnerMountain1.png'});
  arrayOfImages.push({imageObjectBinding: runnerRunning1Image, theFile: 'images/sprites/runner/runnerRunning1.png'});
  arrayOfImages.push({imageObjectBinding: runnerRunning2Image, theFile: 'images/sprites/runner/runnerRunning2.png'});
  arrayOfImages.push({imageObjectBinding: runnerRunning3Image, theFile: 'images/sprites/runner/runnerRunning3.png'});
  arrayOfImages.push({imageObjectBinding: runnerJumpingImage, theFile: 'images/sprites/runner/runnerJumping.png'});

  //snake game
  arrayOfImages.push({imageObjectBinding: snakeGrassBackground, theFile: 'images/Backgrounds/Grass.png'});

  //bird game
  arrayOfImages.push({imageObjectBinding: skyBackground, theFile: 'images/Backgrounds/Sky.png'});

  //lane game
  arrayOfImages.push({imageObjectBinding: laneGrassBackground1, theFile: 'images/Backgrounds/LaneGrass1.png'});
  arrayOfImages.push({imageObjectBinding: laneGrassBackground2, theFile: 'images/Backgrounds/LaneGrass2.png'});
  arrayOfImages.push({imageObjectBinding: laneRoad1, theFile: 'images/Backgrounds/road1.png'});
  arrayOfImages.push({imageObjectBinding: laneRoad2, theFile: 'images/Backgrounds/road2.png'});
  arrayOfImages.push({imageObjectBinding: laneCarImage, theFile: 'images/sprites/Lane/car.png'});
  arrayOfImages.push({imageObjectBinding: roadDash1, theFile: 'images/Backgrounds/roadDash.png'});
  arrayOfImages.push({imageObjectBinding: roadDash2, theFile: 'images/Backgrounds/roadDash2.png'});
  arrayOfImages.push({imageObjectBinding: roadDash3, theFile: 'images/Backgrounds/roadDash3.png'});

  //jumper game
  arrayOfImages.push({imageObjectBinding: jumperBackground, theFile: 'images/Backgrounds/editedJumperBackground.png'});

  //space shooter game
  arrayOfImages.push({imageObjectBinding: spaceShooterBackgroundImage, theFile: 'images/Backgrounds/SpaceWithJupiter1.png'});
  arrayOfImages.push({imageObjectBinding: spaceShooterBackgroundImage2, theFile: 'images/Backgrounds/SpaceWithJupiter2.png'});
  arrayOfImages.push({imageObjectBinding: spaceshipImage, theFile: 'images/Sprites/spaceShooter/spaceship.png'});
  arrayOfImages.push({imageObjectBinding: jupiterImage, theFile: 'images/Sprites/spaceShooter/Jupiter.png'});



  //flower game
  arrayOfImages.push({imageObjectBinding: simpleFlower, theFile: "images/sprites/Flower/10 Second Flower.png"});
  arrayOfImages.push({imageObjectBinding: flowerBackground, theFile: "images/Backgrounds/Flower2.png"});


  // maze game
  arrayOfImages.push({imageObjectBinding: mazeFloor, theFile: "images/Backgrounds/mazefloor.png"});
  arrayOfImages.push({imageObjectBinding: mazeTopWall, theFile: "images/Backgrounds/topWall.png"});
  arrayOfImages.push({imageObjectBinding: mazeBottomWall, theFile: "images/Backgrounds/bottomWall.png"});
  arrayOfImages.push({imageObjectBinding: mazeLeftWall, theFile: "images/Backgrounds/leftWall.png"});
  arrayOfImages.push({imageObjectBinding: mazeRightWall, theFile: "images/Backgrounds/rightWall.png"});
  arrayOfImages.push({imageObjectBinding: mazeCharacter, theFile: "images/sprites/Maze/mole.png"});

  //air booth
  arrayOfImages.push({imageObjectBinding: airBoothImage, theFile: "images/Backgrounds/airBooth.png"});
  arrayOfImages.push({imageObjectBinding: armlessBodyImage, theFile: "images/sprites/air grab/armlessBody.png"});
  arrayOfImages.push({imageObjectBinding: leftArmImage, theFile: "images/sprites/air grab/leftArm.png"});
  arrayOfImages.push({imageObjectBinding: rightArmImage, theFile: "images/sprites/air grab/leftArm.png"});


  //frog
  arrayOfImages.push({imageObjectBinding: frogRiverBackgroundImage, theFile: "images/Backgrounds/river.png"});
  arrayOfImages.push({imageObjectBinding: lilyImage1, theFile: "images/sprites/frogRiver/lilyImage1.png"});
  arrayOfImages.push({imageObjectBinding: lilyImage2, theFile: "images/sprites/frogRiver/lilyImage2.png"});
  arrayOfImages.push({imageObjectBinding: lilyImage3, theFile: "images/sprites/frogRiver/lilyImage3.png"});
  arrayOfImages.push({imageObjectBinding: lilyImage4, theFile: "images/sprites/frogRiver/lilyImage4.png"});



  //pinata game
  arrayOfImages.push({imageObjectBinding: pinataImage, theFile: 'images/sprites/pinata/pinata.png'});

  //fishing game
  arrayOfImages.push({imageObjectBinding: fishingGameWaterBackgroundImage, theFile: 'images/Backgrounds/underwater2.png'});


  //symbols
  arrayOfImages.push({imageObjectBinding: upArrowImage, theFile: 'images/Custom Font/pngs/symbols/upArrow.png' });
  arrayOfImages.push({imageObjectBinding: rightArrowImage, theFile: 'images/Custom Font/pngs/symbols/rightArrow.png' });
  arrayOfImages.push({imageObjectBinding: downArrowImage, theFile: 'images/Custom Font/pngs/symbols/downArrow.png' });
  arrayOfImages.push({imageObjectBinding: leftArrowImage, theFile: 'images/Custom Font/pngs/symbols/leftArrow.png' });

  arrayOfImages.push({imageObjectBinding: symbolTildeImage, theFile: 'images/Custom Font/pngs/symbols/symbol~.png'});
  arrayOfImages.push({imageObjectBinding: symbolExclamationPointImage, theFile: 'images/Custom Font/pngs/symbols/symbol!.png'});
  arrayOfImages.push({imageObjectBinding: symbolEmailAtImage, theFile: 'images/Custom Font/pngs/symbols/symbol@.png'});
  arrayOfImages.push({imageObjectBinding: symbolDollarSignImage, theFile: 'images/Custom Font/pngs/symbols/symbol$.png'});
  //arrayOfImages.push({imageObjectBinding: symbolPercentImage, theFile: 'images/Custom Font/pngs/symbols/symbol%.png'});
  arrayOfImages.push({imageObjectBinding: symbolEqualsImage, theFile: 'images/Custom Font/pngs/symbols/symbol=.png'});
  arrayOfImages.push({imageObjectBinding: symbolPeriodImage, theFile: 'images/Custom Font/pngs/symbols/symbol..png'});

  arrayOfImages.push({imageObjectBinding: symbolHashImage, theFile: 'images/Custom Font/pngs/symbols/symbolHash.png'});
  arrayOfImages.push({imageObjectBinding: symbolQuestionMarkImage, theFile: 'images/Custom Font/pngs/symbols/symbolQuestionMark.png'});

  arrayOfImages.push({imageObjectBinding: placeholderPlayButtonImage, theFile: 'images/placeholderPlayButtonImage.png'});

  // bubble wrap game
  arrayOfImages.push({imageObjectBinding: bubbleWrapBG, theFile: 'images/Backgrounds/bubbleWrapBG.jpg'});
  arrayOfImages.push({imageObjectBinding: bubbleWrapSpritesheet, theFile: 'images/sprites/bubbleWrap/bubbleWrapSpritesheet.png'});
  //arrayOfImages.push({imageObjectBinding: balloonPopBG, theFile: 'images/Backgrounds/balloonPopBG.jpg'});
  arrayOfImages.push({imageObjectBinding: balloonPopSpritesheet, theFile: 'images/sprites/balloonPop/balloonPopSpritesheet.png'});


  // console.log(arrayOfImages);

  numberOfImagesToLoad = arrayOfImages.length;

  for (let imageToLoadIndex = 0; imageToLoadIndex < arrayOfImages.length; imageToLoadIndex++)
  {

	  beginLoadingImage(arrayOfImages[imageToLoadIndex].imageObjectBinding, encodeURI(arrayOfImages[imageToLoadIndex].theFile));
	}

}

function beginLoadingImage(imageVariable, fileName) {
  imageVariable.src = fileName;
	imageVariable.onload = countLoadedImageAndLaunchIfReady;
}

var gameIsLoadingBoolean = true;

function countLoadedImageAndLaunchIfReady()
{
	numberOfImagesToLoad--;

  if (numberOfImagesToLoad === 0)
  {

    /*
    const FAST_DEBUG_MODE = true; // skip entire menu and immeditately play a game! use only for debugging!
    if (FAST_DEBUG_MODE) {

        playerShouldBePlayingPinata = true;
        playerShouldSeeTitleScreen = false;
        fullGameStateMachine.playingAGameState = true;
        levelIsTransitioning = false;
        pinataGame.init();
        //return;
    }
    */


    loadingAndSplashScreen.promptPlayerForClickAfterLoading();// in dualLoadingSplashScreen.js
    fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.clickToLaunch);
  }

  arrayOfRunnerRunningImages.push(runnerRunning1Image,runnerRunning2Image,runnerRunning3Image);
}
