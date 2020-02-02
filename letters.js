var arrayOfAnswers = [];

var letterDimensionX = 45;
var letterDimensionY = 45;
var letterSpeed = undefined;

var correctLetterAudioTag = undefined;

var currentCorrectLetter = undefined;

// function setOrResetCorrectLetter()
// {
//   let randomNumber = Math.random()*10;
//
//   if (randomNumber < 5)
//   {
//     currentCorrectLetter = 'm';
//   } else {
//     currentCorrectLetter = 'n';
//   }
//   correctLetterAudioTag.src = "audio/" + currentCorrectLetter + '.mp3';
//   // console.log('level is transitioning' + levelIsTransitioning);
//   if (!levelIsTransitioning)
//   {
//     // console.log("level is transitioning " + levelIsTransitioning);
//     playCorrectLetterAudioTag();
//   }
// }

function playCorrectLetterAudioTag()
{
  correctLetterAudioTag.play();
}

function initializeCorrectLetterAudioTag()
{
  correctLetterAudioTag = document.getElementById('correctLetter');
}

var letterSpawnRate = undefined;

function spawnALetterIfAppropriate()
{
  let randomNumber = Math.random()*10;
  let name = undefined;
  if (randomNumber < 5)
  {
    name = 'm';
  } else {
    name = 'n';
  }
  if (playerShouldBePlayingBird || playerShouldBePlayingSpaceShooter)
  {
    arrayOfAnswers.push({xCoordinate:640,yCoordinate:Math.random()*700, name:name, correctAnswer:false});
  } else if (playerShouldBePlayingLane)
  {
    let randomNumber2 = Math.random()*10;
    let randomChoiceOf2XStartingPositions = undefined;
    if (randomNumber2 < 5)
    {
      randomChoiceOf2XStartingPositions = 230;
    } else {
      randomChoiceOf2XStartingPositions = 380;
    }
    arrayOfAnswers.push({xCoordinate:randomChoiceOf2XStartingPositions,yCoordinate:-20, name:name, correctAnswer:false});
  } else if (runnerGame.isPlaying()) {
	  let coinToss = Math.random() < 0.5;
	  arrayOfAnswers.push({
		  name: name,
		  correctAnswer: false,
		  xCoordinate: gameCanvas.width,
		  yCoordinate: coinToss ? RUNNERMAXJUMPHEIGHT + 40 : gameCanvas.height*0.75 // NOTE(Gonzalo): 16 is letter height guesstimate
	  });
  }

}

function moveLettersIfAppropriate()
{
	if (playerShouldBePlayingBird || playerShouldBePlayingSpaceShooter || runnerGame.isPlaying())
  {
    for (var letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      arrayOfAnswers[letterIndex].xCoordinate -= letterSpeed;//letters move right to left in bird
    }
  } else if (playerShouldBePlayingLane)
  {
    for (var letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      arrayOfAnswers[letterIndex].yCoordinate += letterSpeed;//letters move top to bottom in lane
    }
  }
}

function drawLetters()
{
  if (playerShouldBePlayingSnake)
  {
    gameCanvasContext.fillStyle = SNAKE_LETTER_COLOR;
  } else if (playerShouldBePlayingBird)
  {
    gameCanvasContext.fillStyle = birdLetterColor;
  } else if (playerShouldBePlayingLane)
  {
    gameCanvasContext.fillStyle = laneLetterColor;
  } else if (playerShouldBePlayingJumper)
  {
    gameCanvasContext.fillStyle = jumperLetterColor;
  } else if (playerShouldBePlayingSpaceShooter)
  {
    gameCanvasContext.fillStyle = spaceShooterLetterColor;
  } else if (runnerGame.isPlaying())
  {
    gameCanvasContext.fillStyle = RUNNERLETTERCOLOR;
  }
  gameCanvasContext.font = '30px Helvetica';
  for (var letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
  {
    gameCanvasContext.fillText(arrayOfAnswers[letterIndex].name,
    arrayOfAnswers[letterIndex].xCoordinate,arrayOfAnswers[letterIndex].yCoordinate);
  }
}

function handleCollisionsWithLetters()
{
  if (SNAKE_GAME.isPlaying())
  {
    console.log('playerXCoordinate: ' + playerXCoordinate);
    console.log('playerYCoordinate: ' + playerYCoordinate);
    for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      if (playerXCoordinate > arrayOfAnswers[letterIndex].xCoordinate - 15 && playerXCoordinate < arrayOfAnswers[letterIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfAnswers[letterIndex].yCoordinate - 30 && playerYCoordinate < arrayOfAnswers[letterIndex].yCoordinate + 5)
        {
          console.log('letter collision detected');
          if (arrayOfAnswers[letterIndex].name === currentCorrectLetter)
          {
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
          } else if (arrayOfAnswers[letterIndex].name !== currentCorrectLetter)
          {
            amountIncorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          }
          calculateAccuracy();
          populateArrayOfAnswersForSnake();
          // setOrResetCorrectLetter();

        }
    }
  } else if (playerShouldBePlayingBird)
  {
    for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      if (playerXCoordinate > arrayOfAnswers[letterIndex].xCoordinate - 15 && playerXCoordinate < arrayOfAnswers[letterIndex].xCoordinate + 40
        && playerYCoordinate > arrayOfAnswers[letterIndex].yCoordinate - 30 && playerYCoordinate < arrayOfAnswers[letterIndex].yCoordinate + 5)
        {
          if (arrayOfAnswers[letterIndex].name === currentCorrectLetter)
          {
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
          } else if (arrayOfAnswers[letterIndex].name !== currentCorrectLetter)
          {
            amountIncorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          }
          calculateAccuracy();
          // setOrResetCorrectLetter();
          arrayOfAnswers.splice(letterIndex,1);
        }
    }
  } else if (playerShouldBePlayingLane)
  {
    for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      if (arrayOfAnswers[letterIndex].yCoordinate - 5 > playerYCoordinate && arrayOfAnswers[letterIndex].yCoordinate - 5 < playerYCoordinate + 60 &&
        arrayOfAnswers[letterIndex].xCoordinate === playerXCoordinate &&
        arrayOfAnswers[letterIndex].name === currentCorrectLetter)
      {
        amountCorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
        calculateAccuracy();
        // setOrResetCorrectLetter();
        arrayOfAnswers.splice(letterIndex,1);
      } else if (arrayOfAnswers[letterIndex].yCoordinate - 5 > playerYCoordinate && arrayOfAnswers[letterIndex].yCoordinate - 5 < playerYCoordinate + 60 &&
        arrayOfAnswers[letterIndex].xCoordinate === playerXCoordinate &&
        arrayOfAnswers[letterIndex].name !== currentCorrectLetter)
      {
        amountIncorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
        calculateAccuracy();
        // setOrResetCorrectLetter();
        arrayOfAnswers.splice(letterIndex,1);
      }
    }
  }
  else if (playerShouldBePlayingJumper)
  {
    for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      if (playerYCoordinate + 20 > arrayOfAnswers[letterIndex].yCoordinate - 20 &&
        playerYCoordinate < arrayOfAnswers[letterIndex].yCoordinate &&
        playerXCoordinate + 20 > arrayOfAnswers[letterIndex].xCoordinate &&
        playerXCoordinate < arrayOfAnswers[letterIndex].xCoordinate + 20 &&
        arrayOfAnswers[letterIndex].name === currentCorrectLetter)
      {
        amountCorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
        calculateAccuracy();
        // setOrResetCorrectLetter();
        initializeLettersForJumper();
      } else if (playerYCoordinate + 20 > arrayOfAnswers[letterIndex].yCoordinate - 20 &&
        playerYCoordinate < arrayOfAnswers[letterIndex].yCoordinate &&
        playerXCoordinate + 20 > arrayOfAnswers[letterIndex].xCoordinate &&
        playerXCoordinate < arrayOfAnswers[letterIndex].xCoordinate + 20 &&
        arrayOfAnswers[letterIndex].name !== currentCorrectLetter)
      {
        amountIncorrect++;
        playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
        calculateAccuracy();
        // setOrResetCorrectLetter();
        initializeLettersForJumper();
      }
    }
  }
	else if (runnerGame.isPlaying()) {
		for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
		{
			const letter = arrayOfAnswers[letterIndex];
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
					// setOrResetCorrectLetter();
				} else {
					amountIncorrect++;
					playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
					calculateAccuracy();
					// setOrResetCorrectLetter();
				}
				arrayOfAnswers.splice(letterIndex, 1);
			}
		}
	}
}


// function checkForLettersOffLeftSideOfScreen()
// {
//   for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
//   {
//     if (arrayOfAnswers[letterIndex].x < 0)
//     {
//       arrayOfAnswers.splice(letterIndex,1);
//     }
//   }
// }
