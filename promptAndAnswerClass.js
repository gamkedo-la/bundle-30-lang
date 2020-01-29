let womanPromptAndAnswer = {};
let womenPromptAndAnswer = {};
let manPromptAndAnswer = {};
let menPromptAndAnswer = {};
let hePromptAndAnswer = {};
let shePromptAndAnswer = {};

let arrayOfLogicalPromptAnswerGroupings = [];

let womanVersusWomenPairGrouping = [];
let manVersusMenPairGrouping = [];
let heVersusShePairGrouping = [];

function initializePromptAndAnswerObjects()
{
  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', womanImage, womanAudio);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', womenImage, womenAudio);
  womanVersusWomenPairGrouping.push(womanPromptAndAnswer);
  womanVersusWomenPairGrouping.push(womenPromptAndAnswer);
  arrayOfLogicalPromptAnswerGroupings.push(womanVersusWomenPairGrouping);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', manImage, manAudio);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", menImage, menAudio);
  manVersusMenPairGrouping.push(manPromptAndAnswer);
  manVersusMenPairGrouping.push(menPromptAndAnswer);
  arrayOfLogicalPromptAnswerGroupings.push(manVersusMenPairGrouping);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', heImage, heAudio);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', sheImage, sheAudio);
  heVersusShePairGrouping.push(hePromptAndAnswer);
  heVersusShePairGrouping.push(shePromptAndAnswer);
  arrayOfLogicalPromptAnswerGroupings.push(heVersusShePairGrouping);

  console.log(arrayOfLogicalPromptAnswerGroupings);
}

function PromptAndAnswerClass(nameString, textString, imageAssociation, audioAssociation)
{
  this.name = nameString;
  this.textAssociation = textString;
  this.imageAssociation = imageAssociation;
  this.audioAssociation = audioAssociation;

  this.prompt = undefined;
  this.arrayOfPossiblePrompts = [this.text, this.imageAssociation, this.audioAssociation];
  this.chooseAPrompt = function()
  {
    let randomArrayOfPossiblePromptsIndex = getRandomIntInclusive(0, arrayOfPossiblePrompts.length - 1);
    this.prompt = arrayOfPossiblePrompts[randomArrayOfPossiblePromptsIndex];
  }

  this.answer = undefined;
  this.arrayOfPossibleAnswers = [this.text, this.imageAssociation, this.audioAssociation];
  this.assignAnAnswerBasedOnPrompt = function()
  {
    let temporaryArrayOfPossibleAnswers = this.arrayOfPossibleAnswers;
    let randomIndexToChooseAnswerInTemporaryArray = undefined;

    for (let arrayOfTemporaryAnswersIndex = 0; arrayOfTemporaryAnswersIndex < temporaryArrayOfPossibleAnswers.length; arrayOfTemporaryAnswersIndex++)
    {
      if (temporaryArrayOfPossibleAnswers[arrayOfTemporaryAnswersIndex] === this.prompt)
      {
        temporaryArrayOfPossibleAnswers.splice(arrayOfTemporaryAnswersIndex,1);
        randomIndexToChooseAnswerInTemporaryArray = getRandomIntInclusive(0, temporaryArrayOfPossibleAnswers.length - 1);
        this.answer = temporaryArrayOfPossibleAnswers[randomIndexToChooseAnswerInTemporaryArray];
      }//end of checking for prompt/answer overlap
    }//end of for loop through temporary answers array
  }//end of answer assignment
}//end of prompt and answer class


function moveAnswersIfAppropriate()
{
  if (playerShouldBePlayingBird || playerShouldBePlayingSpaceShooter || playerShouldBePlayingRunner)
  {
    for (var answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      arrayOfAnswers[answerIndex].xCoordinate -= answerSpeed;//letters move right to left in bird
    }
  } else if (playerShouldBePlayingLane)
  {
    for (var answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      arrayOfAnswers[answerIndex].yCoordinate += answerSpeed;//letters move top to bottom in lane
    }
  }
}

function handleCollisionsWithAnswers()
{
  if (playerShouldBePlayingSnake)
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (playerXCoordinate > arrayOfAnswers[answerIndex].xCoordinate - 15 && playerXCoordinate < arrayOfAnswers[answerIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfAnswers[answerIndex].yCoordinate - 30 && playerYCoordinate < arrayOfAnswers[answerIndex].yCoordinate + 5)
        {
          if (arrayOfAnswers[answerIndex].name === currentCorrectLetter)
          {
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
          } else if (arrayOfAnswers[answerIndex].name !== currentCorrectLetter)
          {
            amountIncorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          }
          calculateAccuracy();
          populatearrayOfAnswersForSnake();
          setOrResetCorrectLetter();

        }
    }
  } else if (playerShouldBePlayingBird)
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (playerXCoordinate > arrayOfAnswers[answerIndex].xCoordinate - 15 && playerXCoordinate < arrayOfAnswers[answerIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfAnswers[answerIndex].yCoordinate - 30 && playerYCoordinate < arrayOfAnswers[answerIndex].yCoordinate + 5)
        {
          if (arrayOfAnswers[answerIndex].name === currentCorrectLetter)
          {
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
          } else if (arrayOfAnswers[answerIndex].name !== currentCorrectLetter)
          {
            amountIncorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          }
          calculateAccuracy();
          setOrResetCorrectLetter();
          arrayOfAnswers.splice(answerIndex,1);
        }
    }
  } else if (playerShouldBePlayingLane)
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (arrayOfAnswers[answerIndex].yCoordinate - 5 > playerYCoordinate && arrayOfAnswers[answerIndex].yCoordinate - 5 < playerYCoordinate + 60 &&
        arrayOfAnswers[answerIndex].xCoordinate === playerXCoordinate &&
        arrayOfAnswers[answerIndex].name === currentCorrectLetter)
      {
        amountCorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
        calculateAccuracy();
        setOrResetCorrectLetter();
        arrayOfAnswers.splice(answerIndex,1);
      } else if (arrayOfAnswers[answerIndex].yCoordinate - 5 > playerYCoordinate && arrayOfAnswers[answerIndex].yCoordinate - 5 < playerYCoordinate + 60 &&
        arrayOfAnswers[answerIndex].xCoordinate === playerXCoordinate &&
        arrayOfAnswers[answerIndex].name !== currentCorrectLetter)
      {
        amountIncorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
        calculateAccuracy();
        setOrResetCorrectLetter();
        arrayOfAnswers.splice(answerIndex,1);
      }
    }
  }
  else if (playerShouldBePlayingJumper)
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (playerYCoordinate + 20 > arrayOfAnswers[answerIndex].yCoordinate - 20 &&
        playerYCoordinate < arrayOfAnswers[answerIndex].yCoordinate &&
        playerXCoordinate + 20 > arrayOfAnswers[answerIndex].xCoordinate &&
        playerXCoordinate < arrayOfAnswers[answerIndex].xCoordinate + 20 &&
        arrayOfAnswers[answerIndex].name === currentCorrectLetter)
      {
        amountCorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
        calculateAccuracy();
        setOrResetCorrectLetter();
        initializeLettersForJumper();
      } else if (playerYCoordinate + 20 > arrayOfAnswers[answerIndex].yCoordinate - 20 &&
        playerYCoordinate < arrayOfAnswers[answerIndex].yCoordinate &&
        playerXCoordinate + 20 > arrayOfAnswers[answerIndex].xCoordinate &&
        playerXCoordinate < arrayOfAnswers[answerIndex].xCoordinate + 20 &&
        arrayOfAnswers[answerIndex].name !== currentCorrectLetter)
      {
        amountIncorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
        calculateAccuracy();
        setOrResetCorrectLetter();
        initializeLettersForJumper();
      }
    }
  }
	else if (playerShouldBePlayingRunner) {
		for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
		{
			const letter = arrayOfAnswers[answerIndex];
			const letterIsOnFloor = letter.yCoordinate == runnerFloorLevel;
			const letterIsColliding = letter.xCoordinate <= playerXCoordinate && letter.xCoordinate >= playerXCoordinate - RUNNERWIDTH;
			const runnerIsStumbling = runnerStatus == 'stumble';
			const runnerIsJumping = runnerStatus == 'jump';
			const runnerIsRunning = runnerStatus == 'run';
			const runnerIsSliding = runnerStatus == 'slide';
			if (letterIsOnFloor && letterIsColliding && runnerIsRunning) {
				runnerStatus = 'stumble';
			}
			if (letterIsOnFloor && !letterIsColliding && runnerIsStumbling) {
				runnerStatus = 'run';
			}
			if (((letterIsOnFloor && runnerIsSliding)||(!letterIsOnFloor && runnerIsJumping)) && letterIsColliding) {
				if (letter.name == currentCorrectLetter) {
					amountCorrect++;
					playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
					calculateAccuracy();
					setOrResetCorrectLetter();
				} else {
					amountIncorrect++;
					playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
					calculateAccuracy();
					setOrResetCorrectLetter();
				}
				arrayOfAnswers.splice(answerIndex, 1);
			}
		}
	}
}
