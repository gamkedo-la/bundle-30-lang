
var bubbleWrapGame = new bubblePoppingEngine('bubbleWrap',false);

// morph the defaults
bubbleWrapGame.titleTXT1 = "Bubble Wrap";
bubbleWrapGame.titleTXT2 = "Pop the bubbles";
bubbleWrapGame.titleTXT3 = "as fast as you can";

bubbleWrapGame.drawBG = function() { 
    gameCanvasContext.drawImage(bubbleWrapBG,0,0);
}

