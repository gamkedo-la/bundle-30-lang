var arrayOfUIButtonSounds = [];
var arrayOfGeneralPositiveFeedbackSounds = [];
var arrayOfGeneralNegativeFeedbackSounds = [];

var generalPositiveFeedbackSound1 = document.createElement("AUDIO");
var generalPositiveFeedbackSound2 = document.createElement("AUDIO");
var generalPositiveFeedbackSound3 = document.createElement("AUDIO");
var generalPositiveFeedbackSound4 = document.createElement("AUDIO");

var generalNegativeFeedbackSound1 = document.createElement("AUDIO");
var generalNegativeFeedbackSound2 = document.createElement("AUDIO");
var generalNegativeFeedbackSound3 = document.createElement("AUDIO");
var generalNegativeFeedbackSound4 = document.createElement("AUDIO");

var uiButtonSound1 = document.createElement("AUDIO");
var uiButtonSound2 = document.createElement("AUDIO");
var uiButtonSound3 = document.createElement("AUDIO");
var uiButtonSound4 = document.createElement("AUDIO");

var currentBackgroundMusic = undefined;

var runnerBackgroundMusic = document.createElement("AUDIO");

var transitionToLevelMusic1 = document.createElement("AUDIO");

function setSourcesForAudioObjects()//for after loading screen
{
  generalPositiveFeedbackSound1.src = "audio/Positive_01.mp3";
  generalPositiveFeedbackSound2.src = "audio/Positive_02.mp3";
  generalPositiveFeedbackSound3.src = "audio/Positive_03.mp3";
  generalPositiveFeedbackSound4.src = "audio/Positive_04.mp3";

  generalNegativeFeedbackSound1.src = "audio/Negative_01.mp3";
  generalNegativeFeedbackSound2.src = "audio/Negative_02.mp3";
  generalNegativeFeedbackSound3.src = "audio/Negative_03.mp3";
  generalNegativeFeedbackSound4.src = "audio/Negative_04.mp3";

  uiButtonSound1.src = "audio/UI_01.mp3";
  uiButtonSound2.src = "audio/UI_02.mp3";
  uiButtonSound3.src = "audio/UI_03.mp3";
  uiButtonSound4.src = "audio/UI_04.mp3";

  transitionToLevelMusic1.src = "audio/levelTransitionSound.mp3";

  runnerBackgroundMusic.src = "audio/backgroundTracks/runnerBackground.mp3";
}

// transitionToLevelMusic1.onended = "correctLetterAudioTag.play()";
// transitionToLevelMusic1.addEventListener("ended", playCorrectLetterAudioTag());
transitionToLevelMusic1.onended = function()
{playCorrectLetterAudioTag();
  levelIsTransitioning = false;
  transitionIsFadingIn = false;
  transitionIsFadingOut = false;
  gameCanvasContext.globalAlpha = 1;
  currentBackgroundMusic.loop = true;
  currentBackgroundMusic.addEventListener('timeupdate', function(){
                  var buffer = 0.32;
                  if(this.currentTime > this.duration - buffer){
                    console.log('hello loop point');
                      this.currentTime = 6.8;
                      this.play();
                  }}, false);
  currentBackgroundMusic.play();
};


function populateMultisoundArrays()
{
  arrayOfUIButtonSounds.push(uiButtonSound1);
  arrayOfUIButtonSounds.push(uiButtonSound2);
  arrayOfUIButtonSounds.push(uiButtonSound3);
  arrayOfUIButtonSounds.push(uiButtonSound4);

  arrayOfGeneralNegativeFeedbackSounds.push(generalNegativeFeedbackSound1);
  arrayOfGeneralNegativeFeedbackSounds.push(generalNegativeFeedbackSound2);
  arrayOfGeneralNegativeFeedbackSounds.push(generalNegativeFeedbackSound3);
  arrayOfGeneralNegativeFeedbackSounds.push(generalNegativeFeedbackSound4);

  arrayOfGeneralPositiveFeedbackSounds.push(generalPositiveFeedbackSound1);
  arrayOfGeneralPositiveFeedbackSounds.push(generalPositiveFeedbackSound2);
  arrayOfGeneralPositiveFeedbackSounds.push(generalPositiveFeedbackSound3);
  arrayOfGeneralPositiveFeedbackSounds.push(generalPositiveFeedbackSound4);
}

function playARandomSoundInAMultisoundArray(targetMultisoundArray)
{
  let range = targetMultisoundArray.length - 1;
  let randomNumberInRange = Math.floor(Math.random() * (range - 1) + 1);
  targetMultisoundArray[randomNumberInRange].play();
}
