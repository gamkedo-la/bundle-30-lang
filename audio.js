function AudioManager()
{

  this.createHTMLDocumentAudioTags = function()
  {
    //prompts and answers section
    this.womanAudio = document.createElement("AUDIO");
    this.womenAudio = document.createElement("AUDIO");
    this.menAudio = document.createElement("AUDIO");
    this.manAudio = document.createElement("AUDIO");
    this.heAudio = document.createElement("AUDIO");
    this.sheAudio = document.createElement("AUDIO");

    //UI section
    this.uiButtonSound1 = document.createElement("AUDIO");
    this.uiButtonSound2 = document.createElement("AUDIO");
    this.uiButtonSound3 = document.createElement("AUDIO");
    this.uiButtonSound4 = document.createElement("AUDIO");

    //gameplay feedback
    this.generalPositiveFeedbackSound1 = document.createElement("AUDIO");
    this.generalPositiveFeedbackSound2 = document.createElement("AUDIO");
    this.generalPositiveFeedbackSound3 = document.createElement("AUDIO");
    this.generalPositiveFeedbackSound4 = document.createElement("AUDIO");

    this.generalNegativeFeedbackSound1 = document.createElement("AUDIO");
    this.generalNegativeFeedbackSound2 = document.createElement("AUDIO");
    this.generalNegativeFeedbackSound3 = document.createElement("AUDIO");
    this.generalNegativeFeedbackSound4 = document.createElement("AUDIO");

    //background music
    this.transitionToLevelMusic1 = document.createElement("AUDIO");
    this.titleScreenMusic = document.createElement("AUDIO");
    this.runnerBackgroundMusic = document.createElement("AUDIO");
    this.pinataBackgroundMusic = document.createElement("AUDIO");
  }

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

  this.currentBackgroundMusic = undefined;

  this.backgroundMusicBus = [];

  this.initializeArrayOfBackgroundMusicTracks = function()
  {
    this.backgroundMusicBus.push(this.runnerBackgroundMusic);
    this.backgroundMusicBus.push(this.pinataBackgroundMusic);
    this.backgroundMusicBus.push(this.transitionToLevelMusic1);
    this.backgroundMusicBus.push(this.titleScreenMusic);
  }

  this.setSourcesForAudioObjects = function()
  {
      //prompts and answers
      this.womanAudio.src = 'audio/PromptsAndAnswers/woman.mp3';
      this.womenAudio.src = 'audio/PromptsAndAnswers/women.mp3';
      this.menAudio.src = 'audio/PromptsAndAnswers/men.mp3';
      this.manAudio.src = 'audio/PromptsAndAnswers/man.mp3';
      this.heAudio.src = 'audio/PromptsAndAnswers/he.mp3';
      this.sheAudio.src = 'audio/PromptsAndAnswers/she.mp3';

      //gameplay feedback
      this.generalPositiveFeedbackSound1.src = "audio/Positive_01.mp3";
      this.generalPositiveFeedbackSound2.src = "audio/Positive_02.mp3";
      this.generalPositiveFeedbackSound3.src = "audio/Positive_03.mp3";
      this.generalPositiveFeedbackSound4.src = "audio/Positive_04.mp3";

      this.generalNegativeFeedbackSound1.src = "audio/Negative_01.mp3";
      this.generalNegativeFeedbackSound2.src = "audio/Negative_02.mp3";
      this.generalNegativeFeedbackSound3.src = "audio/Negative_03.mp3";
      this.generalNegativeFeedbackSound4.src = "audio/Negative_04.mp3";

      //UI
      this.uiButtonSound1.src = "audio/UI_01.mp3";
      this.uiButtonSound2.src = "audio/UI_02.mp3";
      this.uiButtonSound3.src = "audio/UI_03.mp3";
      this.uiButtonSound4.src = "audio/UI_04.mp3";

      //music
      this.transitionToLevelMusic1.src = "audio/levelTransitionSound.mp3";
      this.titleScreenMusic.src = 'audio/backgroundTracks/titleScreenMusic.mp3';
      this.runnerBackgroundMusic.src = "audio/backgroundTracks/runnerBackground.mp3";
      this.pinataBackgroundMusic.src = "audio/backgroundTracks/pinataBackgroundMusic.mp3";
      this.pinataBackgroundMusic.volume = 0.2;
  }

  this.masterBus = [];

  this.initializeMasterBus = function()
  {
    this.masterBus.push(this.promptsAndAnswersBus);
    this.masterBus.push(this.SFXBus);
    this.masterBus.push(this.backgroundMusicBus);
  }

  this.arrayOfTransitionMusic = [];
  this.arrayOfTransitionMusic.push(this.transitionToLevelMusic1);

  this.transitionToLevelMusic1.onended = function()
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
}

let audioManager = new AudioManager();

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
