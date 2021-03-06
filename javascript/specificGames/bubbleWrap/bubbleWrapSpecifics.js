
var bubbleWrapGame = new bubblePoppingEngine('bubbleWrap',false);
bubbleWrapGame.titleScreenData = [
  {name: "Bubble", fontSize: 27, spacing: 12, x: 130, y: 565},
  {name: "Wrap", fontSize: 27, spacing: 12, x: 140, y: 605}
];

// morph the defaults
bubbleWrapGame.noIntro = true; // no swinging pinata
bubbleWrapGame.noConfetti = true;
bubbleWrapGame.alwaysPopLetters = true;
bubbleWrapGame.titleTXT1 = "Bubble Wrap";
bubbleWrapGame.titleTXT2 = "Pop the bubbles";
bubbleWrapGame.titleTXT3 = "as fast as you can";
bubbleWrapGame.introComplete = true; // no swinging pinata
bubbleWrapGame.noIntro = true;
bubbleWrapGame.spritesheet = bubbleWrapSpritesheet;
bubbleWrapGame.shrinking = false;
bubbleWrapGame.smashSound = null;//window.audioManager?audioManager.balloonPopSound:document.getElementById('smashSound');
bubbleWrapGame.successSound = window.audioManager?audioManager.bubbleWrapPopSound:document.getElementById('successSound');
bubbleWrapGame.failSound = null;//window.audioManager?audioManager.pinataFailSound:document.getElementById('failSound');;

// build a grid of bubbles
bubbleWrapGame.gameSpecificInits = function() {
    // console.log("Bubble Wrap game specific inits...");
    var r = 30;
    var margin = -8;
    var spacing = (r*2)+margin;
    var rows = Math.floor(gameCanvas.height / spacing) - 4; // less to allow for top+bottom header
    var cols = Math.floor(gameCanvas.width / spacing);
    var offsetx=8;
    var offsety=12 + spacing + spacing; // we add spacing for header
    for (var col=0; col<cols; col++) {
        for (var row=0; row<rows; row++) {
            this.newcircle(margin+r+col*spacing+offsetx, margin+r+row*spacing+offsety, r, 10); // given some mass
        }
    }
}

// attempting to leverage for this game type, seems to not work for this case though
bubbleWrapGame.postLoadInit = function() { // code may not be getting called
    // console.log("postLoadInit for bubble wrap");
    gameInterval.reset(PINATAFRAMERATE);
    // do we still need to set these?
    playerShouldSeeTitleScreen = false;
    fullGameStateMachine.playingAGameState = true;
    levelIsTransitioning = true;
}

bubbleWrapGame.drawBG = function() {
    gameCanvasContext.drawImage(bubbleWrapBG,0,0);
}

if (window.AVAILABLE_GAMES) AVAILABLE_GAMES.push(bubbleWrapGame);
