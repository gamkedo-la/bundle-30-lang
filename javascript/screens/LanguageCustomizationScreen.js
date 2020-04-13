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
      languageGroupDiv.defineGroupCheckBoxXandY();
      languageGroupDiv.defineChildCheckBoxXandYs();
      languageGroupDiv.checkIfDivOffScreenAndRedefineIfSo(languageGroupDiv);
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
    //console.log('this.arrayOfDivs[0].parentPromptAndAnswerGroupCheckBox.checked: ' + this.arrayOfDivs[0].parentPromptAndAnswerGroupCheckBox.checked);
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
  this.lastChildBoxIndex = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length - 1;
  this.lastChildBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[this.lastChildBoxIndex];
  this.lastChildBoxBottomY = this.lastChildBox.y + this.lastChildBox.height;

  this.x = undefined;
  this.y = undefined;

  this.defineXAndYCoordinates = function()
  {

    if (!this.previousDiv)
    {
      this.y = 100;
    }
    else if (this.columnIndex === this.previousDiv.columnIndex)
    {
        this.y = this.previousDiv.lastChildBox.y + this.previousDiv.lastChildBox.height + 15;
    } else
    {
      this.columnIndex = parentScreenObject.currentColumnIndex;
      this.y = 100;
    }
    this.x = 15 + this.columnIndex*parentScreenObject.columnWidth;
  }

  this.defineGroupCheckBoxXandY = function()
  {
    this.parentPromptAndAnswerGroupCheckBox.x = this.x;
    this.parentPromptAndAnswerGroupCheckBox.y = this.y;

    this.parentPromptAndAnswerGroupCheckBox.textX = this.x + this.parentPromptAndAnswerGroupCheckBox.width + 5;
    this.parentPromptAndAnswerGroupCheckBox.textY = this.y + this.parentPromptAndAnswerGroupCheckBox.height/2 + 3;
  }

  this.defineChildCheckBoxXandYs = function()
  {
    console.log('inside definition of child coordinates function');
    for (let childIndex = 0; childIndex < this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
    {
      console.log('inside for look of child coordinates function');
      let childBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex];
      let currentYOffSet = (childBox.height*1.1*(childIndex + 1)) + 17;
      childBox.x = this.x + 10;
      childBox.y = this.y + currentYOffSet;

      childBox.textX = childBox.x + childBox.width + 5;
      childBox.textY = childBox.y + childBox.height/2 + 3;
    }
  }

  this.checkIfDivOffScreenAndRedefineIfSo = function(languageGroupDiv)
  {
    if (this.lastChildBox.y + this.lastChildBox.height > gameCanvas.height)
    {
      parentScreenObject.currentColumnIndex++;
      this.y = 100;
      languageGroupDiv.defineXAndYCoordinates();
      languageGroupDiv.defineGroupCheckBoxXandY();
      languageGroupDiv.defineChildCheckBoxXandYs();
    }
  }

  this.draw = function()
  {
    // console.log('inside draw div function');
    gameCanvasContext.drawImage(this.parentPromptAndAnswerGroupCheckBox.boxImage,
                                this.parentPromptAndAnswerGroupCheckBox.x,this.parentPromptAndAnswerGroupCheckBox.y,
                                this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height);
    if (this.parentPromptAndAnswerGroupCheckBox.checked)
    {
      gameCanvasContext.drawImage(this.parentPromptAndAnswerGroupCheckBox.checkImage,
                                this.parentPromptAndAnswerGroupCheckBox.x,this.parentPromptAndAnswerGroupCheckBox.y,
                                this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height);
    }

    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.font = '15px Helvetica';

    gameCanvasContext.fillText(this.parentPromptAndAnswerGroupCheckBox.name,
      this.parentPromptAndAnswerGroupCheckBox.textX,this.parentPromptAndAnswerGroupCheckBox.textY);


    for (let childIndex = 0; childIndex < this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
    {

      let childBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex];

      gameCanvasContext.drawImage(childBox.boxImage, childBox.x,childBox.y,
                                  childBox.width,childBox.height);
      if (childBox.checked)
      {
        gameCanvasContext.drawImage(childBox.checkImage, childBox.x,childBox.y,
                                    childBox.width,childBox.height);
      }

      gameCanvasContext.fillStyle = 'black';
      gameCanvasContext.font = '15px Helvetica';
      gameCanvasContext.fillText(childBox.name, childBox.textX,childBox.textY);

    }
  }
}

function PromptAndAnswerGroupCheckBox(parentScreenObject, nameString, promptAndAnswerGroup, arrayIndex)
{
  this.parentScreenObject = parentScreenObject;
  this.name = nameString;
  this.promptAndAnswerGroup = promptAndAnswerGroup;
  this.arrayIndex = arrayIndex;

  this.x = undefined;
  this.y = undefined;

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
    console.log('this: ' + this);
    console.log('this.x: ' + this.x);
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
      this.checked = false;
      for (let childIndex = this.arrayOfIndividualPromptAndAnswerCheckBoxes.length - 1; childIndex > -1; childIndex--)
      {
        if (this.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].checked)
        {
          this.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].checked = false;
          promptsAndAnswersManager.customizedLanguageArray.splice(childIndex,1);
        }
        else
        {
          continue;
        }
      }
    }
    else
    {
      this.checked = true;
      for (let childIndex = 0; childIndex < this.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
      {
        if (!this.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].checked)
        {
          this.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].checked = true;
          promptsAndAnswersManager.customizedLanguageArray.push(this.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex].promptAndAnswer);
        }
        else
        {
          continue;
        }//end of else for individual prompt/answer check box true/false
      }// end of for loop for adding checks to boxes and adding prompts/answers to custom array
    }// end of else for checking group check box true/false
  }// end of toggle child check boxes
}// end of group check box class/function

function IndividualPromptAndAnswerCheckBox(parentGroup, nameString, promptAndAnswer, arrayIndex)
{
  this.name = nameString;

  this.boxImage = checkBoxImage;
  this.checkImage = checkForCheckBoxImage;

  this.x = undefined;
  this.y = undefined;

  this.textX = undefined;
  this.textY = undefined;

  this.checked = false;

  this.width = gameCanvas.width/25;
  this.height = gameCanvas.height/25;

  this.promptAndAnswer = promptAndAnswer;

  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
        {
          this.toggleCheck();
        }
  }

  this.toggleCheck = function()
  {
    if (this.checked)
    {
      this.checked = false;
      this.removePromptAndAnswerToCustomizedArray();
    }
    else
    {
      this.checked = true;
      this.addPromptAndAnswerToCustomizedArray();
    }
  }

  this.addPromptAndAnswerToCustomizedArray = function()
  {
    if (promptsAndAnswersManager.customizedLanguageArray.length === 0)
    {
      promptsAndAnswersManager.customizedLanguageArray.push(this.promptAndAnswer);
    }
    else
    {
      for (let customArrayIndex = 0; customArrayIndex < promptsAndAnswersManager.customizedLanguageArray.length; customArrayIndex++)
      {
        if (promptsAndAnswersManager.customizedLanguageArray[customArrayIndex].name === this.promptAndAnswer.name)
        {
          return;
        }
        else
        {
          promptsAndAnswersManager.customizedLanguageArray.push(this.promptAndAnswer);
          return;
        }
      }
    }
  }

  this.removePromptAndAnswerToCustomizedArray = function()
  {
    for (let customArrayIndex = 0; customArrayIndex < promptsAndAnswersManager.customizedLanguageArray.length; customArrayIndex++)
    {
      if (promptsAndAnswersManager.customizedLanguageArray[customArrayIndex].name === this.promptAndAnswer.name)
      {
        promptsAndAnswersManager.customizedLanguageArray.splice(customArrayIndex,1);
      }
    }
    console.log('promptsAndAnswersManager.customizedLanguageArray: ' + promptsAndAnswersManager.customizedLanguageArray);
  }
}
