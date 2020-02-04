function drawBackButton()
{
  if (playerIsPlayingAnyGame)
  {
    //draw the rectangle
    if (playerShouldBePlayingBird){
      gameCanvasContext.fillStyle = birdBackButtonRectangleColor;
    } else if (playerShouldBePlayingSnake) {
      gameCanvasContext.fillStyle = SNAKE_BACK_BUTTON_RECTANGLE_COLOR;
    } else if (laneGame.isPlaying()) {
      gameCanvasContext.fillStyle = laneBackButtonRectangleColor;
    } else if (playerShouldBePlayingJumper) {
      gameCanvasContext.fillStyle = jumperBackButtonRectangleColor;
    }
    gameCanvasContext.fillRect(540,650, 100,50);

    //draw the text
    if (playerShouldBePlayingBird){
      gameCanvasContext.fillStyle = birdBackButtonTextColor;
    } else if (playerShouldBePlayingSnake) {
      gameCanvasContext.fillStyle = SNAKE_BACK_BUTTON_TEXT_COLOR;
    } else if (laneGame.isPlaying()) {
      gameCanvasContext.fillStyle = laneBackButtonTextColor;
    } else if (playerShouldBePlayingJumper)
    {
      gameCanvasContext.fillStyle = jumperBackButtonTextColor;
    }
      // gameCanvasContext.font = '27px Helvetica';
      // gameCanvasContext.fillText('Back', 560,685);
      customFontFillText('Back', 27, 15, 555,660);
  }
}

function handleBackButtonClick()
{
  if (mouseCoordinates.mouseX > 540 && mouseCoordinates.mouseX < 640 &&
      mouseCoordinates.mouseY > 650 && mouseCoordinates.mouseY < 700)
      {
        playerShouldSeeTitleScreen = true;
        playerIsPlayingAnyGame = false;
        playerShouldBePlayingBird = false;
        SNAKE_GAME.stopPlaying() = false;
        laneGame.stopPlaying();
        playerShouldBePlayingJumper = false;
        playerShouldBePlayingPinata = false;
		runnerGame.stopPlaying();
        arrayOfAnswers = [];
        playARandomSoundInAMultisoundArray(arrayOfUIButtonSounds);
        if (gameIsOnAServerAndCanUseWebAudioAPI)
        {
          backgroundMusicBufferSource.stop();
        } else
        {
            currentBackgroundMusic.pause();
            currentBackgroundMusic = undefined;
        }
      }
}
