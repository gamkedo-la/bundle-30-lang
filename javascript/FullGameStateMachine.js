function FullGameStateMachineClass()
{
  this.FULL_GAME_ENUMERABLE_STATES =
  {
    loading: {status:'loading full game', associatedObject:loadingAndSplashScreen},
    clickToLaunch: {status:'waiting for user click to launch full game', associatedObject: loadingAndSplashScreen},
    transitionToTitleScreen: {status:'transitioning to title screen', associatedObject: transitionToTitleScreen},
    titleScreen: {status:'title screen', associatedObject: titleScreen},
    transitionToMiniGame: {status: 'transitioning to mini game', associatedObject: miniGameTransitioner},
    playingMiniGame: {status: 'playing mini game', associatedObject: gameClassManager.currentGame}
  };

  this.currentState = this.FULL_GAME_ENUMERABLE_STATES.loading;

  this.loadCurrentState = function(stateToLoad)
  {
    this.currentState = stateToLoad;
    console.log('the current state is: ' + fullGameStateMachine.currentState.status);
  }

}

let fullGameStateMachine = new FullGameStateMachineClass();
