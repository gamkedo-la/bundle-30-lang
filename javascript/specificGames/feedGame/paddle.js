function Paddle()
{
var ballX = 75, ballY = 75;
var ballSpeedX = 3, ballSpeedY = 4;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 3;
const PADDLE_COMPUTER_MOVE_SPEED = 7.0;

const AI_SIT_STILL_MARGIN = 35;

var paddle1X = 250, paddle1Y = 300;
var paddle2X = 250, paddle2Y = 300;

var paddle1Score = 0, paddle2Score = 0;
var paddle3Score = 0, paddle4Score = 0;
var showingWinScreen = false;
 
function ballReset() {
  if (paddle1Score >= WINNING_SCORE || paddle2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }


// reverse ball heading, so whoever lost a point "serves"
ballSpeedY = -ballSpeedY;

//center ball on screen
ballX = canvas.width/2;
ballY = canvas.height/2;
}

function moveComputerPaddle3() {
var paddle3Center = paddle1X + (PADDLE_HEIGHT/2)
var paddle3Center = paddle1X + (PADDLE_HEIGHT/2)
var topChaseLine = paddle3Center - AI_SIT_STILL_MARGIN;
var bottomChaseLine = paddle3Center + AI_SIT_STILL_MARGIN;

if (ballX < topChaseLine) {
  paddle1X -= PADDLE_COMPUTER_MOVE_SPEED;
}

if (ballX >  bottomChaseLine) {
  paddle1X += PADDLE_COMPUTER_MOVE_SPEED;
}
}

function moveComputerPaddle2() {
var paddle2Center = paddle2Y + (PADDLE_HEIGHT/2)
var paddle2Center = paddle2Y + (PADDLE_HEIGHT/2)
var topChaseLine = paddle2Center - AI_SIT_STILL_MARGIN;
var bottomChaseLine = paddle2Center + AI_SIT_STILL_MARGIN;

if (ballY < topChaseLine) {
  paddle2Y -= PADDLE_COMPUTER_MOVE_SPEED;
}

if (ballY >  bottomChaseLine) {
  paddle2Y += PADDLE_COMPUTER_MOVE_SPEED;
}
}

function moveComputerPaddle1() {
var paddle1Center = paddle1Y + (PADDLE_HEIGHT/2)
var paddle1Center = paddle1Y + (PADDLE_HEIGHT/2)
var topChaseLine = paddle1Center - AI_SIT_STILL_MARGIN;
var bottomChaseLine = paddle1Center + AI_SIT_STILL_MARGIN;

if (ballY < topChaseLine) {
  paddle1Y -= PADDLE_COMPUTER_MOVE_SPEED;
}

if (ballY >  bottomChaseLine) {
  paddle1Y += PADDLE_COMPUTER_MOVE_SPEED;
}
}

function moveEverything() {
if (showingWinScreen){
  return;
}


//moveComputerPaddle1();
// moveComputerPaddle2();
moveComputerPaddle3();

if(ballX < 0) { // if ball has moved beyond the left edge
    if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
      ballSpeedY *= -1;

      var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.25;
    } else{
      ballSpeedX *= -1;
    }
  }

if(ballX > canvas.width) {// if ball has moved beyond the right edge
  if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
    ballSpeedY *= -1;

    var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
      ballSpeedY = deltaY * 0.35;
  }else{
    ballSpeedX *= -1;
  }
}

if(ballY < 0) {// if ball has moved beyond the top edge
  if(ballX > paddle1X && ballX < paddle1X+PADDLE_WIDTH) {
    ballSpeedY *= -1;

    var deltaX = ballX - (paddle1X+PADDLE_HEIGHT/2);
    ballSpeedX = deltaX * 0.25;
  } else {
    paddle1Score++;
    ballReset();
  }
}

if(ballY > canvas.height) {// if ball has moved beyond the bottom edge
  if(ballX > paddle2X && ballX < paddle2X+PADDLE_WIDTH) {
    ballSpeedY *= -1;

    var deltaX = ballX - (paddle2X+PADDLE_HEIGHT/2);
    ballSpeedX = deltaX * 0.25;
  } else {
    paddle2Score++;
    ballReset();
  }
}


  // if (paddle2Y < 0) {paddle2Y = 0}; 
  // if (paddle2Y + PADDLE_HEIGHT > gameCanvas.height) {paddle2Y = gameCanvas.width - PADDLE_HEIGHT/2};

  // if (paddle1Y < 0) {paddle1Y = 0}; 
  // if (paddle1Y + PADDLE_HEIGHT > gameCanvas.height) {paddle1Y = gameCanvas.width - PADDLE_HEIGHT/2};

  // if (paddle1X < 0) {paddle1X = 0}; 
  // if (paddle1X + PADDLE_WIDTH > gameCanvas.width) {paddle1X = gameCanvas.width - PADDLE_WIDTH};

ballX += ballSpeedX; // move the ball based on its current horizontal speed 
ballY += ballSpeedY;// same as above, but for vertical
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
canvasContext.fillStyle = fillColor;
canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

function colorCircle(centerX, centerY, radius, fillColor){
canvasContext.fillStyle = fillColor;
canvasContext.beginPath();
canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
canvasContext.fill();
};

function colorLine(startX, startY, endX, endY, fillColor){
canvasContext.fillStyle = fillColor;
canvasContext.beginPath();
canvasContext.moveTo(startX, startY);
canvasContext.lineTo(endX, endY);
canvasContext.stroke();
}

function colorText(showWords, textX, textY, fillColor){
canvasContext.fillStyle = fillColor;
canvasContext.fillText(showWords, textX, textY);
}

function drawNet(){
for (var i =10; i < canvas.width; i+=40){
  colorRect(i ,canvas.height/2-1, 20, 2, 'white');
}
}
function drawEverything(){
colorRect(0, 0, canvas.width, canvas.height, '#203030');

if(showingWinScreen){
  if(paddle1Score >= WINNING_SCORE){
    colorText('player1 wins', canvas.width/2 , canvas.height/2,'white'); 
  }else if(paddle2Score >= WINNING_SCORE){
    colorText('CPU wins', canvas.width/2 , canvas.height/2,'white');
  }
  colorText("click anywhere to beging a new match", canvas.width/2, canvas.height/2+20, 'white');
} else {
  drawNet();

  colorRect(0, paddle1Y, PADDLE_THICKNESS , PADDLE_HEIGHT, 'white');//P1
  colorRect(canvas.width - PADDLE_THICKNESS , paddle2Y, PADDLE_THICKNESS , PADDLE_HEIGHT, 'white');//P2
  colorRect(paddle1X, 0, PADDLE_WIDTH , PADDLE_THICKNESS, 'red');//P3
  colorRect(paddle2X, canvas.height - PADDLE_THICKNESS, PADDLE_WIDTH , PADDLE_THICKNESS, 'red');//P4

  colorCircle(ballX, ballY, 10, 'white');
}
colorText(paddle2Score, 100, 100, 'white');
colorText(paddle1Score, canvas.width-100, canvas.height-100, 'white');
}
}
