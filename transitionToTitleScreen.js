function transitionToTitleScreen()
{
  console.log('transitioning to title screen, should switch states in 1 second');
  setTimeout(function()
  {
    fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen)
  }, 1000);
}
