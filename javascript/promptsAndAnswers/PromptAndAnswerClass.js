let womanPromptAndAnswer = {};
let womenPromptAndAnswer = {};
let manPromptAndAnswer = {};
let menPromptAndAnswer = {};
let hePromptAndAnswer = {};
let shePromptAndAnswer = {};

let womanVersusWomenPairGrouping = {};
let manVersusMenPairGrouping = {};
let heVersusShePairGrouping = {};

function PromptAndAnswerClass(nameString, textAssociation, imageAssociation, audioAssociation)
{
  this.name = nameString;
  this.textAssociation = textAssociation;
  this.textAssociation.datatype = 'string';
  this.imageAssociation = imageAssociation;
  this.imageAssociation.datatype = 'image';
  this.audioAssociation = audioAssociation;
  this.audioAssociation.datatype = 'audio';

  this.arrayOfPossiblePrompts = [this.textAssociation, this.imageAssociation, this.audioAssociation];
  this.arrayOfPossibleAnswers = [this.textAssociation, this.imageAssociation, this.audioAssociation];

  this.xCoordinate = undefined;
  this.yCoordinate = undefined;
  this.xDirection = undefined;
  this.xSpeed = undefined;

  this.width = undefined;
  this.height = undefined;

  this.containsTheCurrentCorrectAnswer = undefined;

  this.shouldBeFlashing = false;
  this.globalCompositeOperationForCanvasContext = 'source-over';
}//end of prompt and answer class


function initializePromptAndAnswerObjects()
{
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings = [];
  womanVersusWomenPairGrouping = {name: 'woman vs women', arrayOfObjects: []};
  manVersusMenPairGrouping = {name: 'man vs men', arrayOfObjects: []};
  heVersusShePairGrouping = {name: 'he vs she', arrayOfObjects: []};

  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', womanImage, audioManager.womanAudio);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', womenImage, audioManager.womenAudio);
  womanVersusWomenPairGrouping.arrayOfObjects.push(womanPromptAndAnswer);
  womanVersusWomenPairGrouping.arrayOfObjects.push(womenPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.push(womanVersusWomenPairGrouping);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', manImage, audioManager.manAudio);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", menImage, audioManager.menAudio);
  manVersusMenPairGrouping.arrayOfObjects.push(manPromptAndAnswer);
  manVersusMenPairGrouping.arrayOfObjects.push(menPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.push(manVersusMenPairGrouping);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', heImage, audioManager.heAudio);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', sheImage, audioManager.sheAudio);
  heVersusShePairGrouping.arrayOfObjects.push(hePromptAndAnswer);
  heVersusShePairGrouping.arrayOfObjects.push(shePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.push(heVersusShePairGrouping);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return (randomNumber >= excludedMin && randomNumber <= excludedMax) ?
    getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) : randomNumber;
}


//everything below might be obsolete
let currentAnswer = undefined;


var answerSpeed = 0;
function moveAnswersIfAppropriate()
{
  if (birdGame.isPlaying() || spaceShooterGame.isPlaying() || runnerGame.isPlaying())
  {
    for (var answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      arrayOfAnswers[answerIndex].xCoordinate -= answerSpeed;//letters move right to left in bird
    }
  } else if (laneGame.isPlaying())
  {
    for (var answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      arrayOfAnswers[answerIndex].yCoordinate += answerSpeed;//letters move top to bottom in lane
    }
  }
}

function handleCollisionsWithAnswers()
{
  if (SNAKE_GAME.isPlaying())
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (gameClassManager.currentGame.playerCharacter.x > arrayOfAnswers[answerIndex].xCoordinate - 15 && gameClassManager.currentGame.playerCharacter.x < arrayOfAnswers[answerIndex].xCoordinate + 40
        && gameClassManager.currentGame.playerCharacter.y > arrayOfAnswers[answerIndex].yCoordinate - 30 && gameClassManager.currentGame.playerCharacter.y < arrayOfAnswers[answerIndex].yCoordinate + 5)
        {
          if (arrayOfAnswers[answerIndex] === currentAnswer)
          {
            amountCorrect++;
            //playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
          } else if (arrayOfAnswers[answerIndex] !== currentAnswer)
          {
            amountIncorrect++;
            //playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          }
          //calculateAccuracy();
          SNAKE_GAME.populateArrayOfAnswers();
          //setOrResetCorrectLetter();

        }
    }
  } else if (birdGame.isPlaying())
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (gameClassManager.currentGame.playerCharacter.x > arrayOfAnswers[answerIndex].xCoordinate - 15 && gameClassManager.currentGame.playerCharacter.x < arrayOfAnswers[answerIndex].xCoordinate + 40
        && gameClassManager.currentGame.playerCharacter.y > arrayOfAnswers[answerIndex].yCoordinate - 30 && gameClassManager.currentGame.playerCharacter.y < arrayOfAnswers[answerIndex].yCoordinate + 5)
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
  } else if (laneGame.isPlaying())
  {
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (arrayOfAnswers[answerIndex].yCoordinate - 5 > gameClassManager.currentGame.playerCharacter.y && arrayOfAnswers[answerIndex].yCoordinate - 5 < gameClassManager.currentGame.playerCharacter.y + 60 &&
        arrayOfAnswers[answerIndex].xCoordinate === gameClassManager.currentGame.playerCharacter.x &&
        arrayOfAnswers[answerIndex].name === currentCorrectLetter)
      {
        amountCorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
        calculateAccuracy();
        setOrResetCorrectLetter();
        arrayOfAnswers.splice(answerIndex,1);
      } else if (arrayOfAnswers[answerIndex].yCoordinate - 5 > gameClassManager.currentGame.playerCharacter.y && arrayOfAnswers[answerIndex].yCoordinate - 5 < gameClassManager.currentGame.playerCharacter.y + 60 &&
        arrayOfAnswers[answerIndex].xCoordinate === gameClassManager.currentGame.playerCharacter.x &&
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
      if (gameClassManager.currentGame.playerCharacter.y + 20 > arrayOfAnswers[answerIndex].yCoordinate - 20 &&
        gameClassManager.currentGame.playerCharacter.y < arrayOfAnswers[answerIndex].yCoordinate &&
        gameClassManager.currentGame.playerCharacter.x + 20 > arrayOfAnswers[answerIndex].xCoordinate &&
        gameClassManager.currentGame.playerCharacter.x < arrayOfAnswers[answerIndex].xCoordinate + 20 &&
        arrayOfAnswers[answerIndex].name === currentCorrectLetter)
      {
        amountCorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
        calculateAccuracy();
        setOrResetCorrectLetter();
        initializeLettersForJumper();
      } else if (gameClassManager.currentGame.playerCharacter.y + 20 > arrayOfAnswers[answerIndex].yCoordinate - 20 &&
        gameClassManager.currentGame.playerCharacter.y < arrayOfAnswers[answerIndex].yCoordinate &&
        gameClassManager.currentGame.playerCharacter.x + 20 > arrayOfAnswers[answerIndex].xCoordinate &&
        gameClassManager.currentGame.playerCharacter.x < arrayOfAnswers[answerIndex].xCoordinate + 20 &&
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
	else if (runnerGame.isPlaying()) {
		for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
		{
			const letter = arrayOfAnswers[answerIndex];
			const letterIsOnFloor = letter.yCoordinate == runnerFloorLevel;
			const letterIsColliding = letter.xCoordinate <= gameClassManager.currentGame.playerCharacter.x && letter.xCoordinate >= gameClassManager.currentGame.playerCharacter.x - RUNNERWIDTH;
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
	}else if(flowerGame.isPlaying()){
    //handle collissions
    for (let answerIndex = 0; answerIndex < arrayOfAnswers.length; answerIndex++)
    {
      if (gameClassManager.currentGame.playerCharacter.x > arrayOfAnswers[answerIndex].xCoordinate - 15 && gameClassManager.currentGame.playerCharacter.x < arrayOfAnswers[answerIndex].xCoordinate + 40
        && gameClassManager.currentGame.playerCharacter.y > arrayOfAnswers[answerIndex].yCoordinate - 30 && gameClassManager.currentGame.playerCharacter.y < arrayOfAnswers[answerIndex].yCoordinate + 5)
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
  }
}
