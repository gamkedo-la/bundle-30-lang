let womanPromptAndAnswer = {};
let womenPromptAndAnswer = {};
let manPromptAndAnswer = {};
let menPromptAndAnswer = {};
let hePromptAndAnswer = {};
let shePromptAndAnswer = {};

let womanVersusWomenPairGrouping = [];
let manVersusMenPairGrouping = [];
let heVersusShePairGrouping = [];

function initializePromptAndAnswerObjects()
{
  womanPromptAndAnswer = new PromptAndAnswerClass('woman', 'woman', womanImage, womanAudio);
  womenPromptAndAnswer = new PromptAndAnswerClass('women', 'women', womenImage, womenAudio);
  womanVersusWomenPairGrouping.push(womanPromptAndAnswer);
  womanVersusWomenPairGrouping.push(womenPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.push(womanVersusWomenPairGrouping);

  manPromptAndAnswer = new PromptAndAnswerClass('man', 'man', manImage, manAudio);
  menPromptAndAnswer = new PromptAndAnswerClass("men", "men", menImage, menAudio);
  manVersusMenPairGrouping.push(manPromptAndAnswer);
  manVersusMenPairGrouping.push(menPromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.push(manVersusMenPairGrouping);

  hePromptAndAnswer = new PromptAndAnswerClass('he', 'he', heImage, heAudio);
  shePromptAndAnswer = new PromptAndAnswerClass('she', 'she', sheImage, sheAudio);
  heVersusShePairGrouping.push(hePromptAndAnswer);
  heVersusShePairGrouping.push(shePromptAndAnswer);
  promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.push(heVersusShePairGrouping);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

let currentAnswer = undefined;

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

  this.width = undefined;
  this.height = undefined;

  this.containsTheCurrentCorrectAnswer = undefined;
}//end of prompt and answer class

function PromptsAndAnswersManager()
{
  this.arrayOfLogicalPromptAnswerGroupings = [];

  this.currentLogicalPromptAndAnswerGroup = undefined;
  this.pickARandomLogicalPromptAnswerGroup = function()
  {
    let randomIndexForArrayOfGroups = getRandomIntInclusive(0,promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.length - 1);
    this.currentLogicalPromptAndAnswerGroup = promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings[randomIndexForArrayOfGroups];
  }


  this.correctTargetPromptAndAnswerPairing = undefined;
  this.pickATargetPromptAndAnswerPairing = function()
  {
    let randomIndexFromCurrentPromptAndAnswerGroup = getRandomIntInclusive(0,this.currentLogicalPromptAndAnswerGroup.length - 1);
    this.correctTargetPromptAndAnswerPairing = this.currentLogicalPromptAndAnswerGroup[randomIndexFromCurrentPromptAndAnswerGroup];
    console.log("this.correctTargetPromptAndAnswerPairing: " + this.correctTargetPromptAndAnswerPairing.name);
  }


  this.currentPrompt = undefined;
  this.pickARandomPromptFromTargetPromptAndAnswerPairing = function()
  {
    let randomIndexForArrayOfPossiblePrompts = getRandomIntInclusive(0,this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts.length - 1);
    this.currentPrompt = this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts[randomIndexForArrayOfPossiblePrompts];
    console.log("this.currentPrompt: " + this.currentPrompt);
  }


  this.dataTypeOfCurrentPrompt = undefined;
  this.defineDataTypeOfCurrentPrompt = function()
  {
    if (typeof this.currentPrompt === 'string')
    {
      this.dataTypeOfCurrentPrompt = 'string';
      textPrompter.loadCurrentText(this.currentPrompt);
    }
    else if (this.currentPrompt.nodeName === 'IMG')
    {
      this.dataTypeOfCurrentPrompt = 'IMG';
      imagePrompter.loadCurrentImage(this.currentPrompt);
    }
    else if (this.currentPrompt.nodeName === 'AUDIO')
    {
      this.dataTypeOfCurrentPrompt = 'AUDIO';
      audioPrompter.loadCurrentAudioPrompt(this.currentPrompt);
    }
    else
    {
      console.log("unknown data type for current prompt");
    }
  }


  this.currentCorrectAnswer = undefined;
  this.assignAnAnswerBasedOnPrompt = function()
  {
    let temporaryArrayOfPossibleAnswers = this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers;

    let randomIndexForTemporaryArray = undefined;

    for (let arrayOfTemporaryAnswersIndex = 0; arrayOfTemporaryAnswersIndex < temporaryArrayOfPossibleAnswers.length; arrayOfTemporaryAnswersIndex++)
    {
      if (temporaryArrayOfPossibleAnswers[arrayOfTemporaryAnswersIndex] === this.currentPrompt)
      {
        temporaryArrayOfPossibleAnswers.splice(arrayOfTemporaryAnswersIndex,1);
        randomIndexToChooseAnswerInTemporaryArray = getRandomIntInclusive(0, temporaryArrayOfPossibleAnswers.length - 1);
        this.currentCorrectAnswer = temporaryArrayOfPossibleAnswers[randomIndexToChooseAnswerInTemporaryArray];
      }//end of checking for prompt/answer overlap
    }//end of for loop through temporary answers array
    console.log("this.currentCorrectAnswer: " + this.currentCorrectAnswer);
  }//end of answer assignment


  this.currentAnswerDataType = undefined;
  this.definecurrentAnswerDataType = function()
  {
    if (typeof this.currentCorrectAnswer === 'string')
    {
      this.currentAnswerDataType = 'string';
    } else if (this.currentCorrectAnswer.nodeName === 'IMG') {
      this.currentAnswerDataType = 'IMG';
    } else if (this.currentCorrectAnswer.nodeName === 'AUDIO')
    {
      this.currentAnswerDataType = 'AUDIO';
    }
  }


  this.incorrectTargetPromptAndAnswerPairing = undefined;
  this.editedPromptAndAnswerGroup = undefined;
  this.defineIncorrectTargetPromptAndAnswerPairing = function()
  {
    let editablePromptAndAnswerGroup = this.currentLogicalPromptAndAnswerGroup;
    for (let editablePromptAndAnswerGroupIndex = 0; editablePromptAndAnswerGroupIndex < editablePromptAndAnswerGroup.length; editablePromptAndAnswerGroupIndex++)
    {

      if (this.correctTargetPromptAndAnswerPairing === editablePromptAndAnswerGroup[editablePromptAndAnswerGroupIndex])
      {
        editablePromptAndAnswerGroup.splice(editablePromptAndAnswerGroupIndex,1);
        this.editedPromptAndAnswerGroup = editablePromptAndAnswerGroup;
      }
    }

    let randomIndexForEditedPromptAndAnswerGroup = getRandomIntInclusive(0,this.editedPromptAndAnswerGroup.length - 1);
    this.incorrectTargetPromptAndAnswerPairing = this.editedPromptAndAnswerGroup[randomIndexForEditedPromptAndAnswerGroup];
    console.log("this.incorrectTargetPromptAndAnswerPairing: " + this.incorrectTargetPromptAndAnswerPairing.name);
  }


  this.currentIncorrectAnswer = undefined;
  this.assignCurrentIncorrectAnswer = function()
  {
    let randomIndexForEditedPromptAndAnswerGroup = getRandomIntInclusive(0,this.editedPromptAndAnswerGroup.length - 1);

    for (let arrayOfPossibleAnswersIndex = 0; arrayOfPossibleAnswersIndex < this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.length; arrayOfPossibleAnswersIndex++)
    {
        let currentIncorrectAnswerDataType = undefined;
        if (typeof this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex] === 'string')
        {
          currentIncorrectAnswerDataType = 'string';
          if (currentIncorrectAnswerDataType !== undefined)
          {
            if (this.currentAnswerDataType === currentIncorrectAnswerDataType)
            {
              console.log('this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex]: ' + this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex]);
              this.currentIncorrectAnswer = this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex];
            }
          }
        }
        else if (this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex].nodeName === 'IMG')
        {
          currentIncorrectAnswerDataType = 'IMG';
          if (currentIncorrectAnswerDataType !== undefined)
          {
            if (this.currentAnswerDataType === currentIncorrectAnswerDataType)
            {
              this.currentIncorrectAnswer = this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex];
            }
          }
        }
        else if (this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex].nodeName === 'AUDIO')
        {
          currentIncorrectAnswerDataType = 'AUDIO';
          if (currentIncorrectAnswerDataType !== undefined)
          {
            if (this.currentAnswerDataType === currentIncorrectAnswerDataType)
            {
              this.currentIncorrectAnswer = this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex];
            }
          }
        }
    }
    console.log('this.currentIncorrectAnswer: ' + this.currentIncorrectAnswer);
  }

  this.defineXAndYCoordinatesForTargets = function()
  {
      this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,540);
      this.correctTargetPromptAndAnswerPairing.yCoordinate = getRandomIntInclusive(0,600);

      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,540);
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomIntInclusive(0,600);
  }

  this.setOrResetPromptsAndAnswers = function()
  {
    this.pickARandomLogicalPromptAnswerGroup();
    this.pickATargetPromptAndAnswerPairing();
    this.pickARandomPromptFromTargetPromptAndAnswerPairing();
    this.defineDataTypeOfCurrentPrompt();
    this.assignAnAnswerBasedOnPrompt();
    this.definecurrentAnswerDataType();
    this.defineIncorrectTargetPromptAndAnswerPairing();
    this.assignCurrentIncorrectAnswer();
    this.defineXAndYCoordinatesForTargets();
  }
}

let promptsAndAnswersManager = new PromptsAndAnswersManager();

var answerSpeed = 0;
function moveAnswersIfAppropriate()
{
  if (playerShouldBePlayingBird || playerShouldBePlayingSpaceShooter || runnerGame.isPlaying())
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
      if (playerXCoordinate > arrayOfAnswers[answerIndex].xCoordinate - 15 && playerXCoordinate < arrayOfAnswers[answerIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfAnswers[answerIndex].yCoordinate - 30 && playerYCoordinate < arrayOfAnswers[answerIndex].yCoordinate + 5)
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
  } else if (laneGame.isPlaying())
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
	else if (runnerGame.isPlaying()) {
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
