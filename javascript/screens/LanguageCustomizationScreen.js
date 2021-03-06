let isLanguageCustomizationActive = true;

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

  this.arrayOfPages = [];
  this.currentPageIndexForInitialization = 0;
  this.currentPageIndex = 0;

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
    if (this.arrayOfPages.length === 0)
    {
      let page = new Page(this.currentPageIndexForInitialization)
      this.arrayOfPages.push(page);
    }

    for (let arrayOfGroupCheckBoxesIndex = 0; arrayOfGroupCheckBoxesIndex < this.arrayOfPromptAndAnswerGroupCheckBoxes.length; arrayOfGroupCheckBoxesIndex++)
    {
      let languageGroupDiv = new LanguageGroupDiv(this, this.arrayOfPromptAndAnswerGroupCheckBoxes[arrayOfGroupCheckBoxesIndex],
                                                  this.currentColumnIndex, arrayOfGroupCheckBoxesIndex, this.currentPageIndexForInitialization);

      languageGroupDiv.defineXAndYCoordinates();
      languageGroupDiv.defineGroupCheckBoxXandY();
      languageGroupDiv.defineChildCheckBoxXandYs();
      languageGroupDiv.checkIfDivOffScreenAndRedefineIfSo(languageGroupDiv);
      this.arrayOfPages[this.currentPageIndexForInitialization].arrayOfDivs.push(languageGroupDiv);
      this.arrayOfDivs.push(languageGroupDiv);
    }
  }

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);

    //header
    customFontFillText(["What would you like to train", symbolQuestionMarkImage], 40,20, 20,35);

    this.drawDivs(this.currentPageIndex);

    //previous/next page buttons
    gameCanvasContext.strokeStyle = 'black';
    gameCanvasContext.strokeRect(gameCanvas.width/2 - 90,2, 70,40);
    gameCanvasContext.strokeRect(gameCanvas.width/2,2, 70,40);

    //customFontFillText([leftArrowImage, rightArrowImage], 70,90, gameCanvas.width/2 - 90,-10);
    drawFromSheetSimple("images\\Custom Font\\pngs\\symbols\\leftArrow.png", gameCanvas.width/2 - 90,-17, 70,85);
    drawFromSheetSimple("images\\Custom Font\\pngs\\symbols\\rightArrow.png", gameCanvas.width/2,-17, 70,85);

    //play button
    gameCanvasContext.strokeRect(gameCanvas.width-100,2, 98,40);
    customFontFillText('Play', 35,15, gameCanvas.width-90,5);
    //customFontFillText([rightArrowImage], 80,20, gameCanvas.width/2 + 40,5);
  }

  this.drawDivs = function(pageIndex)
  {
    let page = this.arrayOfPages[pageIndex];
    for (let divIndex = 0; divIndex < page.arrayOfDivs.length; divIndex++)
    {
      page.arrayOfDivs[divIndex].draw();
    }
  }

  this.handleClicks = function()
  {
    for (let divIndex = 0; divIndex < this.arrayOfPages[this.currentPageIndex].arrayOfDivs.length; divIndex++)
    {
      this.arrayOfPages[this.currentPageIndex].arrayOfDivs[divIndex].parentPromptAndAnswerGroupCheckBox.handleClick();
      for (let childBoxIndex = 0; childBoxIndex < this.arrayOfPages[this.currentPageIndex].arrayOfDivs[divIndex].parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childBoxIndex++)
      {
        this.arrayOfPages[this.currentPageIndex].arrayOfDivs[divIndex].parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childBoxIndex].handleClick();
      }
    }

    if (inputManager.mouseCoordinates.x > 230 && inputManager.mouseCoordinates.x < 300 &&
        inputManager.mouseCoordinates.y > 0 && inputManager.mouseCoordinates.y < 40)
        {
          genAudio.playClick();
          this.currentPageIndex -= 1;
          if (this.currentPageIndex < 0)
          {
            this.currentPageIndex = 0;
          }
        }
      if (inputManager.mouseCoordinates.x > 320 && inputManager.mouseCoordinates.x < 390 &&
          inputManager.mouseCoordinates.y > 0 && inputManager.mouseCoordinates.y < 40)
          {
            genAudio.playClick();
            this.currentPageIndex += 1;
            if (this.currentPageIndex === this.arrayOfPages.length)
            {
              this.currentPageIndex = this.arrayOfPages.length - 1;
            }
          }

      if (inputManager.mouseCoordinates.x > gameCanvas.width-90 && inputManager.mouseCoordinates.x < gameCanvas.width &&
          inputManager.mouseCoordinates.y > 5 && inputManager.mouseCoordinates.y < 45)
          {
            genAudio.playClick();
            languageSelectionScreen.startGame();
          }
    //console.log('this.arrayOfDivs[0].parentPromptAndAnswerGroupCheckBox.checked: ' + this.arrayOfDivs[0].parentPromptAndAnswerGroupCheckBox.checked);
  }
}

let mandarinCustomizationScreen;
let englishCustomizationScreen;

function Page(pageIndex)
{
  this.number = undefined;
  this.arrayOfDivs = [];
}

function LanguageGroupDiv(parentScreenObject, parentPromptAndAnswerGroupCheckBox, currentColumnIndex, arrayOfDivsIndex)
{
  this.columnIndex = currentColumnIndex;
  //this.currentRowIndex = currentRowIndex;
  this.arrayOfDivsIndex = arrayOfDivsIndex;
  this.previousDivIndex = this.arrayOfDivsIndex - 1;
  this.previousDiv = parentScreenObject.arrayOfDivs[this.previousDivIndex];

  this.pageIndex = parentScreenObject.currentPageIndexForInitialization;

  this.parentPromptAndAnswerGroupCheckBox = parentPromptAndAnswerGroupCheckBox;

  this.parentCheckBoxHeight = gameCanvas.height/20;
  this.lastChildBoxIndex = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length - 1;
  this.lastChildBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[this.lastChildBoxIndex];
  this.lastChildBox.bottomY = this.lastChildBox.y + this.lastChildBox.height;

  this.x = undefined;
  this.y = undefined;

  this.defineXAndYCoordinates = function()
  {
    if (this.previousDiv)
    {

    }

    if (!this.previousDiv)
    {
      this.y = 100;
    }
    else if (this.columnIndex === this.previousDiv.columnIndex)
    {
        this.y = this.previousDiv.lastChildBox.y + this.previousDiv.lastChildBox.height + 15;
    } else
    {
      this.y = 100;
    }
    this.columnIndex = parentScreenObject.currentColumnIndex;
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
    for (let childIndex = 0; childIndex < this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
    {
      let childBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex];
      let currentYOffSet = (childBox.height*1.1*(childIndex + 1)) + 17;
      childBox.x = this.x + 10;
      childBox.y = this.y + currentYOffSet;

      childBox.textX = childBox.x + childBox.width + 5;
      childBox.textY = childBox.y + childBox.height/2 + 3;

      childBox.bottomY = childBox.y + childBox.height;
    }
  }

  this.checkIfDivOffScreenAndRedefineIfSo = function(languageGroupDiv)
  {
    if (languageGroupDiv.pageIndex === 1)
    {

    }

    if (this.lastChildBox.bottomY > gameCanvas.height)
    {
      if (languageGroupDiv.pageIndex === 1)
      {

      }
      parentScreenObject.currentColumnIndex++;
      languageGroupDiv.columnIndex++;
      this.y = 100;
      languageGroupDiv.defineXAndYCoordinates();
      languageGroupDiv.defineGroupCheckBoxXandY();
      languageGroupDiv.defineChildCheckBoxXandYs();
      if (parentScreenObject.currentColumnIndex > 2)
      {

        parentScreenObject.currentColumnIndex = 0;
        parentScreenObject.currentPageIndexForInitialization++;
        let page = new Page(parentScreenObject.currentPageIndexForInitialization);
        parentScreenObject.arrayOfPages.push(page);
        languageGroupDiv.pageIndex = parentScreenObject.currentPageIndexForInitialization;
        languageGroupDiv.columnIndex = 0;
        this.y = 100;
        languageGroupDiv.defineXAndYCoordinates();
        languageGroupDiv.defineGroupCheckBoxXandY();
        languageGroupDiv.defineChildCheckBoxXandYs();
      }
    }
  }

  this.draw = function()
  {
    // console.log('inside draw div function');
    drawFromSheet(this.parentPromptAndAnswerGroupCheckBox.boxImage,
                                this.parentPromptAndAnswerGroupCheckBox.x,this.parentPromptAndAnswerGroupCheckBox.y,
                                this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height)
    // gameCanvasContext.drawImage(this.parentPromptAndAnswerGroupCheckBox.boxImage,
    //                             this.parentPromptAndAnswerGroupCheckBox.x,this.parentPromptAndAnswerGroupCheckBox.y,
    //                             this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height);
    if (this.parentPromptAndAnswerGroupCheckBox.checked)
    {
      drawFromSheet(this.parentPromptAndAnswerGroupCheckBox.checkImage,
                                this.parentPromptAndAnswerGroupCheckBox.x,this.parentPromptAndAnswerGroupCheckBox.y,
                                this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height);
      // gameCanvasContext.drawImage(this.parentPromptAndAnswerGroupCheckBox.checkImage,
      //                           this.parentPromptAndAnswerGroupCheckBox.x,this.parentPromptAndAnswerGroupCheckBox.y,
      //                           this.parentPromptAndAnswerGroupCheckBox.width,this.parentPromptAndAnswerGroupCheckBox.height);
    }

    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.font = '12px Helvetica';

    gameCanvasContext.fillText(this.parentPromptAndAnswerGroupCheckBox.name,
      this.parentPromptAndAnswerGroupCheckBox.textX,this.parentPromptAndAnswerGroupCheckBox.textY);


    for (let childIndex = 0; childIndex < this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes.length; childIndex++)
    {

      let childBox = this.parentPromptAndAnswerGroupCheckBox.arrayOfIndividualPromptAndAnswerCheckBoxes[childIndex];

      drawFromSheet(childBox.boxImage, childBox.x,childBox.y,
                                  childBox.width,childBox.height);
      // gameCanvasContext.drawImage(childBox.boxImage, childBox.x,childBox.y,
      //                             childBox.width,childBox.height);
      if (childBox.checked)
      {
        drawFromSheet(childBox.checkImage, childBox.x,childBox.y,
                                    childBox.width,childBox.height);
        // gameCanvasContext.drawImage(childBox.checkImage, childBox.x,childBox.y,
        //                             childBox.width,childBox.height);
      }

      gameCanvasContext.fillStyle = 'black';
      gameCanvasContext.font = '12px Helvetica';
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

  this.boxImage = 'images\\checkBox.png';
  this.checkImage = 'images\\checkForCheckBox.png';

  this.width = gameCanvas.width/20;
  this.height = gameCanvas.height/20;

  this.bottomY = undefined;

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

  this.checked = true;
  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
        {
          genAudio.playClick();
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
          for (let currentGroupArrayIndex = 0; currentGroupArrayIndex < promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.length; currentGroupArrayIndex++)
          {

            if (this.name === promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].name)
            {

              promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.splice(currentGroupArrayIndex,1);
            }
          }

          //console.log('currentArrayOfLogicalPromptAnswerGroupings: ' + promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings);
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
          promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.push(this.promptAndAnswerGroup);
          //console.log('currentArrayOfLogicalPromptAnswerGroupings: ' + promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings);
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

  this.boxImage = 'images\\checkBox.png';
  this.checkImage = 'images\\checkForCheckBox.png';

  this.x = undefined;
  this.y = undefined;

  this.textX = undefined;
  this.textY = undefined;

  this.checked = true;

  this.width = gameCanvas.width/25;
  this.height = gameCanvas.height/25;

  this.promptAndAnswer = promptAndAnswer;

  this.handleClick = function()
  {
    if (inputManager.mouseCoordinates.x > this.x && inputManager.mouseCoordinates.x < this.x + this.width &&
        inputManager.mouseCoordinates.y > this.y && inputManager.mouseCoordinates.y < this.y + this.height)
    {
        genAudio.playClick();
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
    //console.log('currentArrayOfLogicalPromptAnswerGroupings ' + promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings);

  }

  this.addPromptAndAnswerToCustomizedArray = function()
  {
    for (let currentGroupArrayIndex = 0; currentGroupArrayIndex < promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.length; currentGroupArrayIndex++)
    {
      for (let individualPromptAnswersIndex = 0; individualPromptAnswersIndex < promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].arrayOfObjects.length; individualPromptAnswersIndex++)
      {
        if (promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].arrayOfObjects[individualPromptAnswersIndex].name === this.promptAndAnswer.name)
        {
          return;
        }
        else
        {
          promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].arrayOfObjects.push(this.promptAndAnswer);
          return;
        }
      }

    }
  }


  this.removePromptAndAnswerToCustomizedArray = function()
  {
    for (let currentGroupArrayIndex = 0; currentGroupArrayIndex < promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.length; currentGroupArrayIndex++)
    {
      for (let individualPromptAnswersIndex = 0; individualPromptAnswersIndex < promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].arrayOfObjects.length; individualPromptAnswersIndex++)
      {

        let individualBoxCheckedTally = 0;
        for (let individualBoxIndex = 0; individualBoxIndex < parentGroup.arrayOfIndividualPromptAndAnswerCheckBoxes.length; individualBoxIndex++)
        {
          if (parentGroup.arrayOfIndividualPromptAndAnswerCheckBoxes[individualBoxIndex].checked)
          {
            individualBoxCheckedTally++;
          }
        }

        if (individualBoxCheckedTally <= 2)
        {
          alert('Groups are designed to help practice common mistakes among tricky words, so you must leave at least 2 individual boxes selected in a group. You can also turn off or turn on the whole group.');
          return;
        }
        else
        {
          if (promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].arrayOfObjects[individualPromptAnswersIndex].name === this.promptAndAnswer.name)
          {
            promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[currentGroupArrayIndex].arrayOfObjects.splice(individualPromptAnswersIndex,1);
          }
        }

      }
    //console.log('promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings: ' + promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings);
    }
  }
}
