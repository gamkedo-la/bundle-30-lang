var arrayOfTextLetters = 'abcdefghijklmnopqrstuvwxyz';
var arrayOfTextNumbers = '0123456789';

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
    arrayOfImages.push({imageObjectBinding: window[smallLetterImageName],
                    theFile: 'images/Custom Font/pngs/small letters/small' + arrayOfTextLetters[arrayOfTextLettersIndex] + '.png'});

    let bigLetterImageName = 'big' + arrayOfTextLetters[arrayOfTextLettersIndex];
    arrayOfImages.push({imageObjectBinding: window[bigLetterImageName],
                    theFile: 'images/Custom Font/pngs/big letters/big' + arrayOfTextLetters[arrayOfTextLettersIndex] + '.png'});
  }


  for (let arrayOfTextNumbersIndex = 0; arrayOfTextNumbersIndex < arrayOfTextNumbers.length; arrayOfTextNumbersIndex++)
  {
    let numberImageName = 'number' + arrayOfTextNumbers[arrayOfTextNumbersIndex];
    arrayOfImages.push({imageObjectBinding: window[numberImageName],
                    theFile: 'images/Custom Font/pngs/numbers/' + arrayOfTextNumbers[arrayOfTextNumbersIndex]  + '.png'});
  }

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
