function BusManager()
{
  this.promptsAndAnswersBus = [];

  this.initializePromptsAndAnswersBus = function()
  {
    this.promptsAndAnswersBus.push(this.womanAudio);
    this.promptsAndAnswersBus.push(this.womenAudio);
    this.promptsAndAnswersBus.push(this.menAudio);
    this.promptsAndAnswersBus.push(this.manAudio);
    this.promptsAndAnswersBus.push(this.heAudio);
    this.promptsAndAnswersBus.push(this.sheAudio);
  }

  this.SFXBus = [];

  this.initializeSFXBus = function()
  {
    //UI
    this.SFXBus.push(this.uiButtonSound1);
    this.SFXBus.push(this.uiButtonSound2);
    this.SFXBus.push(this.uiButtonSound3);
    this.SFXBus.push(this.uiButtonSound4);

    //correct and incorrect answer feedback sounds
    this.SFXBus.push(this.generalPositiveFeedbackSound1);
    this.SFXBus.push(this.generalPositiveFeedbackSound2);
    this.SFXBus.push(this.generalPositiveFeedbackSound3);
    this.SFXBus.push(this.generalPositiveFeedbackSound4);

    this.SFXBus.push(this.generalNegativeFeedbackSound1);
    this.SFXBus.push(this.generalNegativeFeedbackSound2);
    this.SFXBus.push(this.generalNegativeFeedbackSound3);
    this.SFXBus.push(this.generalNegativeFeedbackSound4);
  }

  this.backgroundMusicBus = [];

  this.initializeBackgroundMusicBus = function()
  {
    this.backgroundMusicBus.push(this.runnerBackgroundMusic);
    this.backgroundMusicBus.push(this.pinataBackgroundMusic);
    this.backgroundMusicBus.push(this.transitionToLevelMusic1);
    this.backgroundMusicBus.push(this.titleScreenMusic);
  }

  this.masterBus = [];

  this.initializeMasterBus = function()
  {
    this.masterBus.push(this.promptsAndAnswersBus);
    this.masterBus.push(this.SFXBus);
    this.masterBus.push(this.backgroundMusicBus);
  }

  this.initializeBuses = function()
  {
    this.initializePromptsAndAnswersBus();
    this.initializeSFXBus();
    this.initializeBackgroundMusicBus();
    this.initializeMasterBus();
  }
}
