function customFontFillText(string, fontSize, xCoordinate,yCoordinate)
{
  let arrayOfCharacterObjectLiterals = [];
  for (let stringIndex = 0; stringIndex < string.length; stringIndex++)
  {
    arrayOfCharacterObjectLiterals.push({/*characterType: undefined,*/
                                         character: string.charAt(stringIndex),
                                         imageObjectBinding: undefined});
  }

  for (let arrayOfCharactersIndex = 0; arrayOfCharactersIndex < arrayOfCharacterObjectLiterals.length; arrayOfCharactersIndex++)
  {
    for (let arrayOfTextLettersIndex = 0; arrayOfTextLettersIndex < arrayOfTextLetters.length; arrayOfTextLettersIndex++)
    {
      if (arrayOfTextLetters[arrayOfTextLettersIndex] === arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character)
      {
        //arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].characterType = 'smallLetter';
        let characterObjectBindingName = 'small' + arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character;
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding = window[characterObjectBindingName];
      }
      if (arrayOfTextLetters[arrayOfTextLettersIndex].toUpperCase() === arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character)
      {
        characterObjectBindingName = 'big' + arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character.toLowerCase();
        //arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].characterType = 'bigLetter';
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding = window[characterObjectBindingName];
      }
    }

    for (let arrayOfTextNumbersIndex = 0; arrayOfTextNumbersIndex < arrayOfTextNumbers.length; arrayOfTextNumbersIndex++)
    {
      if (arrayOfTextNumbers[arrayOfTextNumbersIndex] === arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character)
      {
        characterObjectBindingName = 'number' + arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].character;
        //arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].characterType = 'number';
        arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding = window[characterObjectBindingName];
      }
    }//end of checking for number matches
  }// end of loop through characters
  console.log(arrayOfCharacterObjectLiterals);

  for (let arrayOfCharactersIndex = 0; arrayOfCharactersIndex < arrayOfCharacterObjectLiterals.length; arrayOfCharactersIndex++)
  {
    if (arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding === undefined)
    {
      continue;
    }
    gameCanvasContext.drawImage(arrayOfCharacterObjectLiterals[arrayOfCharactersIndex].imageObjectBinding,
                                0,0, /*starting x and y coordinates on the canvas*/
                                1000,750, /*original png width and height*/
                                arrayOfCharactersIndex*20,0,/*x y on canvas, space each character by 20 pixels horizontally*/
                                20,20/*width and height of drawing on canvas*/);

  }

}//end of customFontFillText
