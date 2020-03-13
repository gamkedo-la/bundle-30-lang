function BackButton()
{
  this.x = gameCanvas.width - gameCanvas.width/6;
  this.y = gameCanvas.height - gameCanvas.height/12;

  this.draw = function()
  {
    if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      //rectangle
      gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonColor;
      gameCanvasContext.fillRect(this.x,this.y, gameCanvas.width,gameCanvas.height);

      //text
      gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonTextColor;
      customFontFillText('Back', 27, 15, 555,660);
    }
  }

  this.insideClickCoordinates = function()
  {
    return (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < gameCanvas.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < gameCanvas.height)
  }

  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < gameCanvas.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < gameCanvas.height)
        {
          switch (nextGame)
          {
            case NEXT_GAME_NONE:
              break;
            case NEXT_GAME_REPEAT:
              break;
            case NEXT_GAME_RANDOM:
              break;
          }
          fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToTitleScreen);
          transitionToTitleScreen.changeFullGameStateAfterTwoSeconds();
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          gameClassManager.currentGame.stopPlaying();
          gameClassManager.currentGame = undefined;
          playerShouldBePlayingPinata = false;
          arrayOfAnswers = [];
          promptsAndAnswersManager.setOrResetPromptsAndAnswers();
          audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfUIButtonSounds);
          if (gameIsOnAServerAndCanUseWebAudioAPI)
          {
            backgroundMusicBufferSource.stop();
          } else
          {
              audioManager.currentBackgroundMusic.pause();
              audioManager.currentBackgroundMusic = audioManager.titleScreenMusic;
              audioManager.currentBackgroundMusic.play();
          }
        }
  }
}
