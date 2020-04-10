function LanguageCustomizationScreen(nameString, specificParentLanguageObject)
{
  this.name = nameString;
  this.parentLanguageObject = specificParentLanguageObject;

  console.log('this.parentLanguageObject: ' + this.parentLanguageObject);

  this.x = 0;
  this.y = 0;

  this.width = gameCanvas.width;
  this.height = gameCanvas.height;

  this.arrayOfPromptAndAnswerGroupCheckBoxes = [];

  this.initializePromptAndAnswerGroupCheckBoxes = function()
  {
      for (let parentPromptAndAnswerArrayIndex = 0; parentPromptAndAnswerArrayIndex < this.parentLanguageObject.length; parentPromptAndAnswerArrayIndex++)
      {
        let groupCheckBox = new PromptAndAnswerGroupCheckBox
                                (this.parentLanguageObject[parentPromptAndAnswerArrayIndex].name + 'group check box',
                                 this.parentLanguageObject[parentPromptAndAnswerArrayIndex]);

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

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);


  }
}

let mandarinCustomizationScreen;

function PromptAndAnswerGroupCheckBox(nameString, promptAndAnswerGroup)
{
  this.name = nameString;
  this.promptAndAnswerGroup = promptAndAnswerGroup;

  this.boxImage = checkBoxImage;
  this.checkImage = checkForCheckBoxImage;

  this.arrayOfIndividualPromptAndAnswerCheckBoxes = [];

  this.initializeIndividualPromptsAndAnswers = function()
  {
    console.log('iniside parent function call of initialize individual check boxes');
    console.log('this.promptAndAnswerGroup: ' + this.promptAndAnswerGroup);
    for (let individualPromptAndAnswerIndex = 0; individualPromptAndAnswerIndex < this.promptAndAnswerGroup.arrayOfObjects.length; individualPromptAndAnswerIndex++)
    {
      console.log('inside for loop of initialize individual check boxes');
      let individualCheckBox = new IndividualPromptAndAnswerCheckBox
                                  (this.promptAndAnswerGroup.arrayOfObjects[individualPromptAndAnswerIndex].name + 'check box',
                                   this.promptAndAnswerGroup.arrayOfObjects[individualPromptAndAnswerIndex]);

      this.arrayOfIndividualPromptAndAnswerCheckBoxes.push(individualCheckBox);
    }
  }
}

function IndividualPromptAndAnswerCheckBox(nameString, promptAndAnswer)
{
  this.name = nameString;

  this.boxImage = checkBoxImage;
  this.checkImage = checkForCheckBoxImage;

  this.promptAndAnswer = promptAndAnswer;
}
