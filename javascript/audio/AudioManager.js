function AudioManager()
{

  this.multisoundPlayer = new MultisoundPlayer();
  this.busManager = new BusManager();

  this.createHTMLDocumentAudioTags = function()
  {
    //prompts and answers section
    this.womanAudio = document.createElement("AUDIO");
    this.womenAudio = document.createElement("AUDIO");
    this.menAudio = document.createElement("AUDIO");
    this.manAudio = document.createElement("AUDIO");
    this.heAudio = document.createElement("AUDIO");
    this.sheAudio = document.createElement("AUDIO");

    this.mandarinBuyAudio = document.createElement("AUDIO");//'buy' in English
    this.mandarinSellAudio = document.createElement("AUDIO");//'sell' in English
    this.mandarinMomAudio = document.createElement("AUDIO");
    this.mandarinHorseAudio = document.createElement("AUDIO");

    this.blendedCat = document.createElement("AUDIO");
    this.blendedCot = document.createElement("AUDIO");

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

    // game specific sound effects
    this.balloonPopSound = document.createElement("AUDIO");
    this.bubbleWrapPopSound = document.createElement("AUDIO");

    this.pinataEatSound = document.createElement("AUDIO");
    this.pinataHitSound = document.createElement("AUDIO");
    this.pinataFailSound = undefined;

    //background music
    this.transitionToLevelMusic1 = document.createElement("AUDIO");
    this.titleScreenMusic = document.createElement("AUDIO");
    this.runnerBackgroundMusic = document.createElement("AUDIO");
    this.pinataBackgroundMusic = document.createElement("AUDIO");
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

      this.blendedCat.src = 'audio/PromptsAndAnswers/blendedCat.mp3';
      this.blendedCot.src = 'audio/PromptsAndAnswers/blendedCot.mp3';

      this.mandarinBuyAudio.src = 'audio/PromptsAndAnswers/Mandarin/mandarinBuy.mp3';
      this.mandarinSellAudio.src = 'audio/PromptsAndAnswers/Mandarin/mandarinSell.mp3';
      this.mandarinMomAudio.src = 'audio/PromptsAndAnswers/Mandarin/mandarinMom.mp3';
      this.mandarinHorseAudio.src = 'audio/PromptsAndAnswers/Mandarin/mandarinHorse.mp3';

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

        // game specific
      this.balloonPopSound.src = "audio/balloonPop.mp3";
      this.bubbleWrapPopSound.src = "audio/bubbleWrapPop.mp3";
      this.pinataEatSound.src = "audio/pinataEat.mp3";
      this.pinataHitSound.src = "audio/pinataHit.mp3";

      //music
      this.transitionToLevelMusic1.src = "audio/levelTransitionSound.mp3";
      this.titleScreenMusic.src = 'audio/backgroundTracks/titleScreenMusic.mp3';
      this.runnerBackgroundMusic.src = "audio/backgroundTracks/runnerBackground.mp3";
      this.pinataBackgroundMusic.src = "audio/backgroundTracks/pinataBackgroundMusic.mp3";
      this.pinataBackgroundMusic.volume = 0.2;
  }

  this.currentBackgroundMusic = undefined;

  this.arrayOfTransitionMusic = [];
  this.arrayOfTransitionMusic.push(this.transitionToLevelMusic1);

  
  this.defineOnendedFunctionOfTransitionToLevel1Music = function()
  {
    this.transitionToLevelMusic1.onended = function()
    {
      fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame);
      promptersManager.promptThePlayer();
      gameCanvasContext.globalAlpha = 1;
      if (gameIsOnAServerAndCanUseWebAudioAPI /*&& currentBackgroundMusic.playbackState !== 'playing'*/)
      {
        if (audioManager.currentBackgroundMusic) { // bugfix: skip if undefined
            audioManager.currentBackgroundMusic.start();
        }
      }
      else
      {
        if (audioManager.currentBackgroundMusic !== undefined)
        {
          audioManager.currentBackgroundMusic.loop = true;
          audioManager.currentBackgroundMusic.addEventListener('timeupdate', function(){
                          var buffer = 0.32;
                          if(audioManager.currentBackgroundMusic.currentTime > audioManager.currentBackgroundMusic.duration - buffer){
                            // console.log('hello loop point');
                              audioManager.currentBackgroundMusic.currentTime = 0;
                              audioManager.currentBackgroundMusic.play();
                          }}, false);
          audioManager.currentBackgroundMusic.play();
          audioManager.currentBackgroundMusic.volume = 0; //for meetings
          console.log('not on a server, standard HTML5 audio tag should be playing');
        }
      }
    }
  }


  this.initialize = function()
  {
    this.createHTMLDocumentAudioTags();
    this.setSourcesForAudioObjects();
    this.busManager.initializeBuses();
    this.multisoundPlayer.populateMultisoundArrays();
    this.defineOnendedFunctionOfTransitionToLevel1Music();
  }

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

//not sure if this is obsolete
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
