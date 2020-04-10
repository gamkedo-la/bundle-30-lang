let isLanguageCustomizationActive = false;

function LanguageCustomizationScreen(nameString, specificParentLanguageObject)
{
  this.name = nameString;
  this.parentLanguageObject = specificParentLanguageObject;

  this.x = 0;
  this.y = 0;

  this.width = gameCanvas.width;
  this.height = gameCanvas.height;

  this.columnWidth = gameCanvas.width/3;
  this.rowHeight = gameCanvas.height/20;

  this.currentColumnIndex = 0;
  this.currentRowIndex = 0;

  this.arrayOfPromptAndAnswerGroupCheckBoxes = [];
  this.arrayOfDivs = [];

  this.initializePromptAndAnswerGroupCheckBoxes = function()
  {
      for (let parentPromptAndAnswerArrayIndex = 0; parentPromptAndAnswerArrayIndex < this.parentLanguageObject.length; parentPromptAndAnswerArrayIndex++)
      {
        let groupCheckBox = new PromptAndAnswerGroupCheckBox
                                (this, this.parentLanguageObject[parentPromptAndAnswerArrayIndex].name,
                                 this.parentLanguageObject[parentPromptAndAnswerArrayIndex], parentPromptAndAnswerArrayIndex);

        this.arrayOfPromptAndAnswerGroupCheckBoxes.push(groupCheckBox);
      }
  }

  this.initializeIndividualPromptsAndAnswerCheckBoxes = function()
  {
    for (let groupCheckBoxesIndex = 0; groupCheckBoxesIndex < this.arrayOfPromptAndAnswerGroupCheckBoxes.length; groupCheckBoxesIndex++)
    {
      this.arrayOfPromptAndAnswerGroupCheckBoxes[groupCheckBoxesIndex].initializeIndividualPromptsAndAnswers();
    }
  }

  this.initializeArrayOfDivs = function()
  {
    for (let arrayOfGroupCheckBoxesIndex = 0; arrayOfGroupCheckBoxesIndex < this.arrayOfPromptAndAnswerGroupCheckBoxes.length; arrayOfGroupCheckBoxesIndex++)
    {
      let languageGroupDiv = new LanguageGroupDiv(this, this.arrayOfPromptAndAnswerGroupCheckBoxes[arrayOfGroupCheckBoxesIndex],
                                                  this.currentColumnIndex, arrayOfGroupCheckBoxesIndex);
      languageGroupDiv.defineXAndYCoordinates();
      this.arrayOfDivs.push(languageGroupDiv);
    }
  }

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);

    //header
    customFontFillText(["What would you like to train", symbolQuestionMarkImage], 40,20, 20,35);

    this.drawDivs();
  }

  this.drawDivs = function()
  {
    for (let divIndex = 0; divIndex < this.arrayOfDivs.length; divIndex++)
    {
      this.arrayOfDivs[divIndex].draw();
    }
  }

  this.handleClicks = function()
  {
    for (let divIndex = 0; divIndex < this.arrayOfDivs.length; divIndex++)
    {
      this.arrayOfDivs[divIndex].parentPromptAndAnswerGroupCheckBox.handleClick();
      for (let childBoxIndex = 0; childBoxIndex < this.arrayOfDivs[divIndex].parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childBoxIndex++)
      {
        this.arrayOfDivs[divIndex].parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childBoxIndex].handleClick();
      }
    }
    console.log('this.arrayOfDivs[0].parentPromptAndAnswerGroupCheckBox.checked: ' + this.arrayOfDivs[0].parentPromptAndAnswerGroupCheckBox.checked);
  }
}

let mandarinCustomizationScreen;

function LanguageGroupDiv(parentScreenObject, parentPromptAndAnswerGroupCheckBox, currentColumnIndex, arrayOfDivsIndex)
{
  this.columnIndex = currentColumnIndex;
  //this.currentRowIndex = currentRowIndex;
  this.arrayOfDivsIndex = arrayOfDivsIndex;
  this.previousDivIndex = this.arrayOfDivsIndex - 1;
  this.previousDiv = parentScreenObject.arrayOfDivs[this.previousDivIndex];

  this.parentPromptAndAnswerGroupCheckBox = parentPromptAndAnswerGroupCheckBox;

  this.parentCheckBoxHeight = gameCanvas.height/20;
  this.childCheckBoxesCombinedHeight = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length*gameCanvas.height/30;
  this.height = this.parentCheckBoxHeight + this.childCheckBoxesCombinedHeight;

  this.x = undefined;
  this.y = undefined;

  this.defineXAndYCoordinates = function()
  {
    if (!this.previousDiv)
    {
      this.y = 100;
    }
    else
    {
      this.y = this.previousDiv.y + this.previousDiv.height;
      if (this.y + this.height > gameCanvas.height)
      {
        this.columnIndex++;
        this.y = 100;
      }
    }
    this.x = 15 + this.columnIndex*parentScreenObject.columnWidth;
  }

  this.draw = function()
  {
    // console.log('inside draw div function');
    gameCanvasContext.drawImage(this.parentPromptAndAnswerGroupCheckBox.boxImage, this.x,this.y,
                                this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height);

    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.font = '15px Helvetica';
    let textStartingX = this.x + this.parentPromptAndAnswerGroupCheckBox.width + 5;
    let textStartingY = this.y + this.parentPromptAndAnswerGroupCheckBox.height/2 + 3;
    gameCanvasContext.fillText(this.parentPromptAndAnswerGroupCheckBox.name, textStartingX,textStartingY);


    for (let childIndex = 0; childIndex < this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
    {


      let childBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex];
      let currentYOffSet = (childBox.height*1.1*(childIndex + 1)) + 17;
      let childBoxStartingX = this.x + 10;
      let childBoxStartingY = this.y + currentYOffSet;
      gameCanvasContext.drawImage(childBox.boxImage, childBoxStartingX,childBoxStartingY,
                                  childBox.width,childBox.height);

      let childTextStartingX = childBoxStartingX + childBox.width + 5;
      let childTextStartingY = childBoxStartingY + childBox.height/2 + 3;
      gameCanvasContext.fillStyle = 'black';
      gameCanvasContext.font = '15px Helvetica';
      gameCanvasContext.fillText(childBox.name, childTextStartingX,childTextStartingY);

    }
  }
}

function PromptAndAnswerGroupCheckBox(parentScreenObject, nameString, promptAndAnswerGroup, arrayIndex)
{
  this.parentScreenObject = parentScreenObject;
  this.name = nameString;
  this.promptAndAnswerGroup = promptAndAnswerGroup;
  this.arrayIndex = arrayIndex;

  this.boxImage = checkBoxImage;
  this.checkImage = checkForCheckBoxImage;

  this.width = gameCanvas.width/20;
  this.height = gameCanvas.height/20;

  this.arrayOfIndividualPromptAndAnswerCheckBoxes = [];

  this.initializeIndividualPromptsAndAnswers = function()
  {


    for (let individualPromptAndAnswerIndex = 0; individualPromptAndAnswerIndex < this.promptAndAnswerGroup.arrayOfObjects.length; individualPromptAndAnswerIndex++)
    {

      let individualCheckBox = new IndividualPromptAndAnswerCheckBox
                                  (this, this.promptAndAnswerGroup.arrayOfObjects[individualPromptAndAnswerIndex].name,
                                   this.promptAndAnswerGroup.arrayOfObjects[individualPromptAndAnswerIndex]);

      this.arrayOfIndividualPromptAndAnswerCheckBoxes.push(individualCheckBox);
    }
  }

  this.checked = false;
  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
        {
          console.log('click detected');
          this.toggleThisCheckAndChildrenChecks();
        }
  }

  this.toggleThisCheckAndChildrenChecks = function()
  {
    if (this.checked)
    {
      this.checked === false;
      for (let childIndex = 0; childIndex < parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
      {
        parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].checked = false;
      }
    }
    else
    {
      this.checked === true;
      for (let childIndex = 0; childIndex < parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
      {
        parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].checked = true;
      }
    }
  }
}

function IndividualPromptAndAnswerCheckBox(parentGroup, nameString, promptAndAnswer, arrayIndex)
{
  this.name = nameString;

  this.boxImage = checkBoxImage;
  this.checkImage = checkForCheckBoxImage;

  this.x = undefined;
  this.y = undefined;

  this.checked = false;

  this.width = gameCanvas.width/25;
  this.height = gameCanvas.height/25;

  this.promptAndAnswer = promptAndAnswer;

  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
        {
          console.log('click detected');
          this.toggleCheck();
        }
  }

  this.toggleCheck = function()
  {
    if (this.checked)
    {
      this.checked = false;
    }
    else
    {
      this.checked = true;
    }
  }
}
