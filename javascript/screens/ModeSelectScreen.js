function ModeSelectScreen()
{
  this.height = gameCanvas.height * 0.666;
  this.name = 'mode select screen';
  this.arrayOfModeSelectBoxes = [];

  this.singlePlayerEndlessModeBox = undefined;
  this.singlePlayerRandomModeBox = undefined;
  this.twoPlayerRandomModeBox = undefined;

  this.initializeBoxes = function()
  {
    this.singlePlayerEndlessModeBox = new ModeSelectBox(0,'Single Player Endless',SINGLE_PLAYER_ENDLESS, true);
    this.singlePlayerRandomModeBox = new ModeSelectBox(1,'Single Player Random',SINGLE_PLAYER_RANDOM, false);
    this.twoPlayerRandomModeBox = new ModeSelectBox(2,'Two Player Random',TWO_PLAYER_RANDOM, false);
  }

  this.initializeArrayOfModeSelectBoxes = function()
  {
    this.arrayOfModeSelectBoxes.push(this.singlePlayerEndlessModeBox);
    this.arrayOfModeSelectBoxes.push(this.singlePlayerRandomModeBox);
    this.arrayOfModeSelectBoxes.push(this.twoPlayerRandomModeBox);
  }

  this.initialize = function()
  {
    this.initializeBoxes();
    this.initializeArrayOfModeSelectBoxes();
  }

  this.drawRadioButtons = function()
  {
    for (let radioButtonIndex = 0; radioButtonIndex < this.arrayOfModeSelectBoxes.length; radioButtonIndex++)
    {
      this.arrayOfModeSelectBoxes[radioButtonIndex].draw();
    }//end of for loop
  }//end of draw radio buttons

  this.handleRadioButtonClicks = function()
  {

    for (let radioButtonIndex = 0; radioButtonIndex < this.arrayOfModeSelectBoxes.length; radioButtonIndex++)
    {
      let mouseX = inputManager.mouseCoordinates.x;
      let mouseY = inputManager.mouseCoordinates.y;
      let radioButtonX = this.arrayOfModeSelectBoxes[radioButtonIndex].radioButtonX;
      let radioButtonY = this.arrayOfModeSelectBoxes[radioButtonIndex].radioButtonY;
      let xDistanceSquared = (mouseX - radioButtonX)*(mouseX - radioButtonX);
      let yDistanceSquared = (mouseY - radioButtonY)*(mouseY - radioButtonY);
      let radioButtonRadius = this.arrayOfModeSelectBoxes[radioButtonIndex].radioButtonRadius;

      if ( Math.sqrt(xDistanceSquared + yDistanceSquared) < radioButtonRadius )
        {
          this.arrayOfModeSelectBoxes[radioButtonIndex].selectedStatus = true;
          genAudio.playClick();
          nextGame = this.arrayOfModeSelectBoxes[radioButtonIndex].mode;
          //console.log('nextGame: ' + nextGame);
          for (let reiterativeArrayIndex = 0; reiterativeArrayIndex < this.arrayOfModeSelectBoxes.length; reiterativeArrayIndex++)
          {
            if (reiterativeArrayIndex !== radioButtonIndex)
            {
              this.arrayOfModeSelectBoxes[reiterativeArrayIndex].selectedStatus = false;
            }
          }
        }
    }
  }

  this.drawNextButton = function()
  {
    let width = gameCanvas.width/4;
    let height = gameCanvas.height/7;
    let startingX = gameCanvas.width/2 - (width/2);
    let startingY = gameCanvas.height - (height*1.5);

    gameCanvasContext.strokeStyle = 'black';
    gameCanvasContext.strokeRect(startingX,startingY, width,height);
    customFontFillText('Next', 30, 15, startingX + width/4,startingY + height/4);
  }

  this.handleNextButtonClick = function()
  {
    let width = gameCanvas.width/4;
    let height = gameCanvas.height/7;
    let startingX = gameCanvas.width/2 - (width/2);
    let startingY = gameCanvas.height - (height*1.5);

    if (inputManager.mouseCoordinates.x > startingX && inputManager.mouseCoordinates.x < startingX + width &&
        inputManager.mouseCoordinates.y > startingY && inputManager.mouseCoordinates.y < startingY + height)
        {
          genAudio.playClick();
          fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.languageSelectionScreen);
        }

    for (let i = 0; i < this.arrayOfModeSelectBoxes.length; i++)
    {
      if (this.arrayOfModeSelectBoxes[i].selectedStatus === true)
      {
        console.log(this.arrayOfModeSelectBoxes[i].name + ' mode selected');
      }
    }
  }



  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    fancyBG();
  }

  this.draw = function()
  {
    //console.log('inside mode select screen draw');
    this.drawBackground();
    this.drawRadioButtons();
    this.drawNextButton();
  }
}//end of mode select screen

let modeSelectScreen;
