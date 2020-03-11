
var bubbleWrapGame = new bubblePoppingEngine('bubbleWrap',false);

// morph the defaults
bubbleWrapGame.titleTXT1 = "Bubble Wrap";
bubbleWrapGame.titleTXT2 = "Pop the bubbles";
bubbleWrapGame.titleTXT3 = "as fast as you can";
bubbleWrapGame.introComplete = true; // no swinging pinata
bubbleWrapGame.spritesheet = bubbleWrapSpritesheet; 

// build a grid of bubbles
bubbleWrapGame.gameSpecificInits = function() {
    console.log("Bubble Wrap game specific inits...");
    var r = 20;
    var margin = 20;
    var spacing = (r*2)+margin;
    var rows = Math.floor(gameCanvas.height / spacing);
    var cols = Math.floor(gameCanvas.width / spacing);
    for (var col=0; col<cols; col++) {
        for (var row=0; row<rows; row++) {
            this.newcircle(margin+r+col*spacing, margin+r+row*spacing, r, 10); // given some mass
        }
    }
}

bubbleWrapGame.drawBG = function() { 
    gameCanvasContext.drawImage(bubbleWrapBG,0,0);
}

