//prompts and answers section
var womanAudio = document.createElement("AUDIO");
var womenAudio = document.createElement("AUDIO");
var menAudio = document.createElement("AUDIO");
var manAudio = document.createElement("AUDIO");
var heAudio = document.createElement("AUDIO");
var sheAudio = document.createElement("AUDIO");

//UI section
var arrayOfUIButtonSounds = [];
var arrayOfGeneralPositiveFeedbackSounds = [];
var arrayOfGeneralNegativeFeedbackSounds = [];

var uiButtonSound1 = document.createElement("AUDIO");
var uiButtonSound2 = document.createElement("AUDIO");
var uiButtonSound3 = document.createElement("AUDIO");
var uiButtonSound4 = document.createElement("AUDIO");

//gameplay feedback
var generalPositiveFeedbackSound1 = document.createElement("AUDIO");
var generalPositiveFeedbackSound2 = document.createElement("AUDIO");
var generalPositiveFeedbackSound3 = document.createElement("AUDIO");
var generalPositiveFeedbackSound4 = document.createElement("AUDIO");

var generalNegativeFeedbackSound1 = document.createElement("AUDIO");
var generalNegativeFeedbackSound2 = document.createElement("AUDIO");
var generalNegativeFeedbackSound3 = document.createElement("AUDIO");
var generalNegativeFeedbackSound4 = document.createElement("AUDIO");


//music
var currentBackgroundMusic = undefined;

var transitionToLevelMusic1 = document.createElement("AUDIO");
var titleScreenMusic = document.createElement("AUDIO");

var runnerBackgroundMusic = document.createElement("AUDIO");
var pinataBackgroundMusic = document.createElement("AUDIO");



function setSourcesForAudioObjects()//for after loading screen
{

  //prompts and answers
  womanAudio.src = 'audio/PromptsAndAnswers/woman.mp3';
  masterAudioBus.push(womanAudio);
  womenAudio.src = 'audio/PromptsAndAnswers/women.mp3';
  masterAudioBus.push(womenAudio);
  menAudio.src = 'audio/PromptsAndAnswers/men.mp3';
  masterAudioBus.push(menAudio);
  manAudio.src = 'audio/PromptsAndAnswers/man.mp3';
  masterAudioBus.push(manAudio);
  heAudio.src = 'audio/PromptsAndAnswers/he.mp3';
  masterAudioBus.push(heAudio);
  sheAudio.src = 'audio/PromptsAndAnswers/she.mp3';
  masterAudioBus.push(sheAudio);


  //gameplay feedback
  generalPositiveFeedbackSound1.src = "audio/Positive_01.mp3";
  masterAudioBus.push(generalPositiveFeedbackSound1);
  generalPositiveFeedbackSound2.src = "audio/Positive_02.mp3";
  masterAudioBus.push(generalPositiveFeedbackSound2);
  generalPositiveFeedbackSound3.src = "audio/Positive_03.mp3";
  masterAudioBus.push(generalPositiveFeedbackSound3);
  generalPositiveFeedbackSound4.src = "audio/Positive_04.mp3";
  masterAudioBus.push(generalPositiveFeedbackSound4);

  generalNegativeFeedbackSound1.src = "audio/Negative_01.mp3";
  masterAudioBus.push(generalNegativeFeedbackSound1);
  generalNegativeFeedbackSound2.src = "audio/Negative_02.mp3";
  masterAudioBus.push(generalNegativeFeedbackSound2);
  generalNegativeFeedbackSound3.src = "audio/Negative_03.mp3";
  masterAudioBus.push(generalNegativeFeedbackSound3);
  generalNegativeFeedbackSound4.src = "audio/Negative_04.mp3";
  masterAudioBus.push(generalNegativeFeedbackSound4);

  //UI
  uiButtonSound1.src = "audio/UI_01.mp3";
  masterAudioBus.push(uiButtonSound1);
  uiButtonSound2.src = "audio/UI_02.mp3";
  masterAudioBus.push(uiButtonSound2);
  uiButtonSound3.src = "audio/UI_03.mp3";
  masterAudioBus.push(uiButtonSound3);
  uiButtonSound4.src = "audio/UI_04.mp3";
  masterAudioBus.push(uiButtonSound4);

  //music
  transitionToLevelMusic1.src = "audio/levelTransitionSound.mp3";
  masterAudioBus.push(transitionToLevelMusic1);
  titleScreenMusic.src = 'audio/backgroundTracks/titleScreenMusic.mp3';
  masterAudioBus.push(titleScreenMusic);

  runnerBackgroundMusic.src = "audio/backgroundTracks/runnerBackground.mp3";
  masterAudioBus.push(runnerBackgroundMusic);
  pinataBackgroundMusic.src = "audio/backgroundTracks/pinataBackgroundMusic.mp3";
  pinataBackgroundMusic.volume = 0.2;
  masterAudioBus.push(pinataBackgroundMusic);
}

// transitionToLevelMusic1.onended = "correctLetterAudioTag.play()";
// transitionToLevelMusic1.addEventListener("ended", playCorrectLetterAudioTag());
transitionToLevelMusic1.onended = function()
{ fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame);
  promptersManager.promptThePlayer();
  levelIsTransitioning = false;
  transitionIsFadingIn = false;
  transitionIsFadingOut = false;
  gameCanvasContext.globalAlpha = 1;

  if (gameIsOnAServerAndCanUseWebAudioAPI /*&& currentBackgroundMusic.playbackState !== 'playing'*/)
  {
    if (currentBackgroundMusic) { // bugfix: skip if undefined
        currentBackgroundMusic.start();
    }
  }
  else
  {
    if (currentBackgroundMusic !== undefined)
    {
      currentBackgroundMusic.loop = true;
      currentBackgroundMusic.addEventListener('timeupdate', function(){
                      var buffer = 0.32;
                      if(this.currentTime > this.duration - buffer){
                        // console.log('hello loop point');
                          this.currentTime = 0;
                          this.play();
                      }}, false);
      currentBackgroundMusic.play();
    }
  }
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


//Web Audio API section, for extra audio features when necessary or desired

var gameIsOnAServerAndCanUseWebAudioAPI = false;
var webAudioAPIContext;
var webAudioMusicBus;

var backgroundMusicBufferSource;

function initializeWebAudioAPI()
{
  webAudioAPIContext = new (window.AudioContext || window.webkitAudioContext)();
}

function loadWebAudioAPISound(audioURL, targetWebAudioAPIBuffer) {
  var requestForAudioDataToBeDecoded = new XMLHttpRequest();
  requestForAudioDataToBeDecoded.open('GET', audioURL, true);
  requestForAudioDataToBeDecoded.responseType = 'arraybuffer';

  // Decode asynchronously
  requestForAudioDataToBeDecoded.onload = function() {
    webAudioAPIContext.decodeAudioData(requestForAudioDataToBeDecoded.response, function(bufferDataFromRequestResponse) {
      targetWebAudioAPIBuffer.buffer = bufferDataFromRequestResponse;
      targetWebAudioAPIBuffer.connect(webAudioAPIContext.destination);
      console.log(targetWebAudioAPIBuffer.length);
    });
  }
  requestForAudioDataToBeDecoded.send();
}

var masterAudioBus = [];

function turnMasterVolumeUp()
{
  for (let masterAudioBusIndex = 0; masterAudioBusIndex < masterAudioBus.length; masterAudioBusIndex++)
  {
    masterAudioBus[masterAudioBusIndex].volume += 0.1;
    if (masterAudioBus[masterAudioBusIndex].volume > 1)
    {
      masterAudioBus[masterAudioBusIndex].volume = 1;
    }
  }
  correctLetterAudioTag.volume += 0.1;
}

function turnMasterVolumeDown()
{
  for (let masterAudioBusIndex = 0; masterAudioBusIndex < masterAudioBus.length; masterAudioBusIndex++)
  {
    masterAudioBus[masterAudioBusIndex].volume -= 0.1;
    if (masterAudioBus[masterAudioBusIndex].volume < 0.1)
    {
      masterAudioBus[masterAudioBusIndex].volume = 0.1;
    }
  }
  correctLetterAudioTag.volume -= 0.1;
}
