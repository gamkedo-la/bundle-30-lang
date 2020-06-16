//** To use the custom font fill text, please create an array where numbers and letters can be put in together in a string
//at one index,and then symbols and punctuation get their own index.
//Example: let yourSentenceArray = ['These are words and 1', symbolCommaImage, ' 2', symbolCommaImage, ' and 3 numbers', symbolPeriodImage];
//Here is the current list of symbols:
// upArrowImage
// rightArrowImage
// downArrowImage
// leftArrowImage
// symbolTildeImage ~
// symbolExclamationPointImage !
// symbolEmailAtImage @
// symbolHashImage #
// symbolDollarSignImage $
// symbolPercentImage %
// symbolEqualsImage =
// symbolQuestionMarkImage ?
// symbolPeriodImage .

function customFontFillText(arrayOfCharacterTypes, fontSize, spacing, xCoordinate,yCoordinate)
{

  let arrayOfCharacterObjectLiterals = [];

  for (let arrayOfCharactersTypesIndex = 0; arrayOfCharactersTypesIndex < arrayOfCharacterTypes.length; arrayOfCharactersTypesIndex++)
  {
    if (typeof arrayOfCharacterTypes[arrayOfCharactersTypesIndex] === 'string')
    {
      let string = arrayOfCharacterTypes[arrayOfCharactersTypesIndex];
      for (let stringIndex = 0; stringIndex < string.length; stringIndex++)
      arrayOfCharacterObjectLiterals.push({

                                           character: string.charAt(stringIndex),
                                           imageObjectBinding: undefined
                                         });
    } else
    {
      let specialCharacter = arrayOfCharacterTypes[arrayOfCharactersTypesIndex];
      arrayOfCharacterObjectLiterals.push({
                                           imageObjectBinding: specialCharacter
                                         });
    }

  }



  for (let arrayOfCharactersIndex = 0; arrayOfCharactersIndex < arrayOfCharacterObjectLiterals.length; arrayOfCharactersIndex++)
  {
    for (let arrayOfTextLettersIndex = 0; arrayOfTextLettersIndex < arrayOfTextLetters.length; arrayOfTextLettersIndex++)
    {
      if (arrayOfTextLetters[arrayOfTextLettersIndex] === arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character)
      {
        let characterObjectBindingName = 'small' + arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character;
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding = window[characterObjectBindingName];
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].sheetFilename = 
            "images\\Custom Font\\pngs\\small letters\\"
            +characterObjectBindingName
            +".png";
      }
      if (arrayOfTextLetters[arrayOfTextLettersIndex].toUpperCase() === arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character)
      {
        characterObjectBindingName = 'big' + arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character.toLowerCase();
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding = window[characterObjectBindingName];
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].sheetFilename = 
            "images\\Custom Font\\pngs\\big letters\\"
            +characterObjectBindingName
            +".png";
      }
    }

    for (let arrayOfTextNumbersIndex = 0; arrayOfTextNumbersIndex < arrayOfTextNumbers.length; arrayOfTextNumbersIndex++)
    {
      if (arrayOfTextNumbers[arrayOfTextNumbersIndex] === arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character)
      {
        characterObjectBindingName = 'number' + arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character;
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding = window[characterObjectBindingName];
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].sheetFilename = 
            "images\\Custom Font\\pngs\\numbers\\"
            +arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character//characterObjectBindingName
            +".png";
      }
    }//end of checking for number matches
  }// end of loop through characters

  for (let arrayOfCharactersIndex = 0; arrayOfCharactersIndex < arrayOfCharacterObjectLiterals.length; arrayOfCharactersIndex++)
  {
    // new way, using name lookup to spritesheet
    if (arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].sheetFilename) {
        drawFromSheetSimple(arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].sheetFilename,
            xCoordinate + arrayOfCharactersIndex*spacing,yCoordinate,
            fontSize,fontSize);
    } else {
        // old way, using many images: works fine
        if (arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding === undefined) {
            continue;
        }
        gameCanvasContext.drawImage(arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding,
        0,0, /*starting x and y coordinates of original png*/
        1000,750, /*original png width and height*/
        xCoordinate + arrayOfCharactersIndex*spacing,yCoordinate,/*x y on canvas, space each character by 20 pixels horizontally*/
        fontSize,fontSize/*width and height of drawing on canvas*/);
    }
  }

}//end of customFontFillText
