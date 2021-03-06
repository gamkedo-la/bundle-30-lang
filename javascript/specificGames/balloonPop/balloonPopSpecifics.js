
var balloonPopGame = new bubblePoppingEngine('balloonPop',true);
balloonPopGame.titleScreenData = [
  {name: "Balloon", fontSize: 27, spacing: 12, x: 420, y: 370},
  {name: "Pop", fontSize: 27, spacing: 12, x: 440, y: 405}
];

// morph the defaults
balloonPopGame.noIntro = true; // no swinging pinata
balloonPopGame.noConfetti = true;
balloonPopGame.gravity = -0.001; // going UP!
balloonPopGame.alwaysPopLetters = true;
balloonPopGame.titleTXT1 = "Balloon Pop";
balloonPopGame.titleTXT2 = "Pop the balloons";
balloonPopGame.titleTXT3 = "before they fly away";
balloonPopGame.introComplete = true; // no swinging pinata
balloonPopGame.noIntro = true;
balloonPopGame.spritesheet = balloonPopSpritesheet;
balloonPopGame.spawnRandomly = true;
balloonPopGame.spawnChance = 0.05;
balloonPopGame.shrinking = false;
balloonPopGame.smashSound = null;//window.audioManager?audioManager.balloonPopSound:document.getElementById('smashSound');
balloonPopGame.successSound = window.audioManager?audioManager.pinataEatSound:document.getElementById('successSound');;
balloonPopGame.failSound = null;//window.audioManager?audioManager.pinataFailSound:document.getElementById('failSound');;


// build a grid of bubbles
balloonPopGame.gameSpecificInits = function() {
    //console.log("Balloon Pop Game specific inits...");
    /*
    var r = 25;
    var margin = 24;
    var spacing = (r*2)+margin;
    var yoffset = gameCanvas.height; // start below screen
    var rows = Math.floor(gameCanvas.height / spacing);
    var cols = Math.floor(gameCanvas.width / spacing)-1;
    for (var col=0; col<cols; col++) {
        for (var row=0; row<rows; row++) {
            this.newcircle(margin+r+col*spacing, margin+r+row*spacing + yoffset, r, 10); // given some mass
        }
    }
    */
}


// attempting to leverage for this game type, seems to not work for this case though
balloonPopGame.postLoadInit = function() { // code may not be getting called
    //console.log("postLoadInit for balloonPopGame");
    gameInterval.reset(PINATAFRAMERATE);
    // do we still need to set these?
    playerShouldSeeTitleScreen = false;
    fullGameStateMachine.playingAGameState = true;
    levelIsTransitioning = true;
}

//balloonPopGame.drawBG = function() {
    //gameCanvasContext.drawImage(balloonPopBG,0,0);
//}
