function handleMouseCLick(evt){
  if (showingWinScreen){
    paddle1Score = 0;
    paddle2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {
   var framesPersecond = 60;
  setInterval(function(){
     moveEverything();
       drawEverything();
   },1000/framesPersecond);

  gameCanvas.addEventListener('mousedown' , handleMouseCLick);

  gameCanvas.addEventListener('mousemove', function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle2X = mousePos.x - (PADDLE_WIDTH/2);  // minus half paddle height/width to center
  } );
  gameCanvasContext.textAlign = 'center';//All texts are centered 
}