function MultisoundPlayer()
{
  this.playARandomSoundInAMultisoundArray = function(targetMultisoundArray)
  {
    let range = targetMultisoundArray.length - 1;
    let randomNumberInRange = Math.floor(Math.random() * (range - 1) + 1);
    targetMultisoundArray[randomNumberInRange].play();
  }

  //UI section
  this.arrayOfUIButtonSounds = [];
  this.arrayOfGeneralPositiveFeedbackSounds = [];
  this.arrayOfGeneralNegativeFeedbackSounds = [];

  this.populateMultisoundArrays = function()
  {
    this.arrayOfUIButtonSounds.push(audioManager.uiButtonSound1);
    this.arrayOfUIButtonSounds.push(audioManager.uiButtonSound2);
    this.arrayOfUIButtonSounds.push(audioManager.uiButtonSound3);
    this.arrayOfUIButtonSounds.push(audioManager.uiButtonSound4);

    this.arrayOfGeneralNegativeFeedbackSounds.push(audioManager.generalNegativeFeedbackSound1);
    this.arrayOfGeneralNegativeFeedbackSounds.push(audioManager.generalNegativeFeedbackSound2);
    this.arrayOfGeneralNegativeFeedbackSounds.push(audioManager.generalNegativeFeedbackSound3);
    this.arrayOfGeneralNegativeFeedbackSounds.push(audioManager.generalNegativeFeedbackSound4);

    this.arrayOfGeneralPositiveFeedbackSounds.push(audioManager.generalPositiveFeedbackSound1);
    this.arrayOfGeneralPositiveFeedbackSounds.push(audioManager.generalPositiveFeedbackSound2);
    this.arrayOfGeneralPositiveFeedbackSounds.push(audioManager.generalPositiveFeedbackSound3);
    this.arrayOfGeneralPositiveFeedbackSounds.push(audioManager.generalPositiveFeedbackSound4);
  }
}

let multisoundPlayer = new MultisoundPlayer();
