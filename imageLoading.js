//standard image declaration section

//runner images
let runnerSunAndSkyBackgroundImage = document.createElement("img");
let runnerCloud1 = document.createElement("img");
let runnerGrassImage = document.createElement("img");
let runnerMountain1Image = document.createElement("img");

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


//custom font image loading section, used loops for less typing... just to see if i could
var arrayOfTextLetters = 'abcdefghijklmnopqrstuvwxyz';
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
  arrayOfImages.push({imageObjectBinding: runnerSunAndSkyBackgroundImage, theFile: 'images/Backgrounds/runnerSunAndSky.png'});
  arrayOfImages.push({imageObjectBinding: runnerCloud1, theFile: 'images/Backgrounds/runnerCloud1.png'});
  arrayOfImages.push({imageObjectBinding: runnerGrassImage, theFile: 'images/Backgrounds/runnerGrass.png'});
  arrayOfImages.push({imageObjectBinding: runnerMountain1Image, theFile: 'images/Backgrounds/runnerMountain1.png'});

  arrayOfImages.push({imageObjectBinding: upArrowImage, theFile: 'images/Custom Font/pngs/symbols/upArrow.png' });
  arrayOfImages.push({imageObjectBinding: rightArrowImage, theFile: 'images/Custom Font/pngs/symbols/rightArrow.png' });
  arrayOfImages.push({imageObjectBinding: downArrowImage, theFile: 'images/Custom Font/pngs/symbols/downArrow.png' });
  arrayOfImages.push({imageObjectBinding: leftArrowImage, theFile: 'images/Custom Font/pngs/symbols/leftArrow.png' });

  arrayOfImages.push({imageObjectBinding: symbolTildeImage, theFile: 'images/Custom Font/pngs/symbols/symbol~.png'});
  arrayOfImages.push({imageObjectBinding: symbolExclamationPointImage, theFile: 'images/Custom Font/pngs/symbols/symbol!.png'});
  arrayOfImages.push({imageObjectBinding: symbolEmailAtImage, theFile: 'images/Custom Font/pngs/symbols/symbol@.png'});
  arrayOfImages.push({imageObjectBinding: symbolDollarSignImage, theFile: 'images/Custom Font/pngs/symbols/symbol$.png'});
  arrayOfImages.push({imageObjectBinding: symbolPercentImage, theFile: 'images/Custom Font/pngs/symbols/symbol%.png'});
  arrayOfImages.push({imageObjectBinding: symbolEqualsImage, theFile: 'images/Custom Font/pngs/symbols/symbol=.png'});
  arrayOfImages.push({imageObjectBinding: symbolPeriodImage, theFile: 'images/Custom Font/pngs/symbols/symbol..png'});

  arrayOfImages.push({imageObjectBinding: symbolHashImage, theFile: 'images/Custom Font/pngs/symbols/symbolHash.png'});
  arrayOfImages.push({imageObjectBinding: symbolQuestionMarkImage, theFile: 'images/Custom Font/pngs/symbols/symbolQuestionMark.png'});

  console.log(arrayOfImages);

  numberOfImagesToLoad = arrayOfImages.length;

  for (let imageToLoadIndex = 0; imageToLoadIndex < arrayOfImages.length; imageToLoadIndex++)
  {

		beginLoadingImage(arrayOfImages[imageToLoadIndex].imageObjectBinding, arrayOfImages[imageToLoadIndex].theFile);
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
    promptPlayerForClickAfterLoading();// in dualLoadingSplashScreen.js
  }
}
