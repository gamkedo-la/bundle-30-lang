function FullGameStateMachineClass()
{
  this.loadingFullGame = 'loading full game';
  this.currentState = this.initialState;

  this.waitingForSplashScreenClickState = 'waiting for splash screen click';
  this.titleScreenState = 'title screen status';

  this.playingAGameState = 'playing a game';

  this.loadCurrentState = function(stateToLoad)
  {
    this.currentState = stateToLoad;
  }
}

let fullGameStateMachine = new FullGameStateMachineClass();
