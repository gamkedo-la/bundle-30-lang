function FullGameStateMachineClass()
{
  this.FULL_GAME_ENUMERABLE_STATES =
  Object.freeze
  ({
    loading: {},
    clickToLanunch: {},
    transitionToTitleScreen: {},
    titleScreen: {},
    transitionToMiniGame: {},
    playingMiniGame: {}
  })

  this.currentState = this.FULL_GAME_ENUMERABLE_STATES.loading;

  this.loadCurrentState = function(stateToLoad)
  {
    this.currentState = stateToLoad;
  }

}

let fullGameStateMachine = new FullGameStateMachineClass();
