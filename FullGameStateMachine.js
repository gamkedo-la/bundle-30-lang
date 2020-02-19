function FullGameStateMachineClass()
{
  this.FULL_GAME_ENUMERABLE_STATES =
  Object.freeze
  ({
    loading: {status:'loading full game'},
    clickToLaunch: {status:'waiting for user click to launch full game'},
    transitionToTitleScreen: {status:'transitioning to title screen'},
    titleScreen: {status:'title screen'},
    transitionToMiniGame: {status: 'transitioning to mini game'},
    playingMiniGame: {status: 'playing mini game'}
  });

  this.currentState = this.FULL_GAME_ENUMERABLE_STATES.loading;
  console.log('initial state is loading the game');

  this.loadCurrentState = function(stateToLoad)
  {
    this.currentState = stateToLoad;
    console.log('the current state is: ' + fullGameStateMachine.currentState.status);
  }

}

let fullGameStateMachine = new FullGameStateMachineClass();
