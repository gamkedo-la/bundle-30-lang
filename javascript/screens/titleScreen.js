const GAME_SPACE_SHOOTER = 7;

var fancyticks = 0;
var fancysprite = [];
var fancycount = 100;
var fancydecay = 0.02;
var fancymaxspeed = -12;
var fancysize = 100;
var showingCredits = false;

function fancyBG(bottomImages=["images\\sprites\\transitions\\heart.png"],topImages=["images\\sprites\\transitions\\star.png"]) {
    var i = 0;

    if (!fancysprite.length) {
        for (i=0; i<fancycount; i++) {
            fancysprite[i] = { x:0,y:-9999999,a:0.5+Math.random()*0.5,s:1,a:0,i:bottomImages[0] };
        }
    }

    for (i=0; i<fancycount; i++) {
        if (fancysprite[i].a<fancydecay) {
            // respawn
            fancysprite[i].x = Math.random() * gameCanvas.width - 64;
            fancysprite[i].a = 0.5+Math.random()*0.5;
            if (Math.random()>0.5) {
                // bottom up
                fancysprite[i].y = gameCanvas.height + 64 + Math.random()*128;
                fancysprite[i].s = Math.random() * fancymaxspeed;
                fancysprite[i].i = bottomImages[Math.floor(Math.random() * bottomImages.length)];

            } else {
                // top down
                fancysprite[i].y = -256-Math.random()*128;
                fancysprite[i].s = Math.random() * fancymaxspeed * -1;
                fancysprite[i].i = topImages[Math.floor(Math.random() * topImages.length)];
            }
        }

        fancysprite[i].a -= fancydecay;
        fancysprite[i].y += fancysprite[i].s;

        gameCanvasContext.globalAlpha = fancysprite[i].a;

        drawFromSheetSimple(
            fancysprite[i].i,
            fancysprite[i].x,fancysprite[i].y,
            fancysize,fancysize); // scaled down
    }

    gameCanvasContext.globalAlpha = 1;
}

function TitleScreenClass()
{
  this.cellXTopLeftCoordinate = 0;
  this.cellYTopLeftCoordinate = 0;

  this.drawHeader = function()
  {
    customFontFillText(['Bundle of 30 Language Games'], 40, 20, 50,25);
    customFontFillText(['Choose A Game ', symbolExclamationPointImage], 50, 20, 175,100);

    // which image to use? path can be browsed from imageList.js!
    // drawFromSheet("images\\sprites\\PromptsAndAnswers\\Mandarin\\excuseMePassingThroughContext.png",
    //         inputManager.mouseCoordinates.x,inputManager.mouseCoordinates.y, // where to draw?
    //         150,150, // what dimensions?
    //         true); // flip horizontally?
  }

  this.drawCellsAndCheckForHighlighting = function()
  {
    //basic cell outlines
    gameCanvasContext.strokeStyle = 'white';
    for (let cellRowIndex = 0; cellRowIndex < 5; cellRowIndex++)
    {
      for (let cellColumnIndex = 0; cellColumnIndex < 6; cellColumnIndex++)
      {
        this.cellXTopLeftCoordinate = cellColumnIndex*100 + 20;
        this.cellYTopLeftCoordinate = cellRowIndex*100 + 150;
        gameCanvasContext.strokeRect(this.cellXTopLeftCoordinate,this.cellYTopLeftCoordinate, 100,100);
        //highlight cell if the mouse is inside it
        if (inputManager.mouseCoordinates.x > this.cellXTopLeftCoordinate &&
            inputManager.mouseCoordinates.x < this.cellXTopLeftCoordinate + 100 &&
            inputManager.mouseCoordinates.y > this.cellYTopLeftCoordinate &&
            inputManager.mouseCoordinates.y < this.cellYTopLeftCoordinate + 100)
            {
              gameCanvasContext.fillStyle = 'white';
              gameCanvasContext.fillRect(this.cellXTopLeftCoordinate,this.cellYTopLeftCoordinate, 100,100);
            }
      }
    }
  };
  /* NOTE: this is a list of game names for unimplemented games, when implementing a game,
	 move the corresponding data to its titleScreenData attribute */
  const GAME_NAMES = [
    // [{name: "Finder", fontSize: 27, spacing: 15, x: 420, y: 185}],//5
    //[{name: "Air", fontSize: 27, spacing: 15, x: 445, y: 265}, {name: "Grab", fontSize: 27, spacing: 15, x: 437, y: 300}],//11
    //[{name: "Frogger", fontSize: 27, spacing: 13, x: 520, y: 285}],//12
    // [{name: "Memory", fontSize: 27, spacing: 15, x: 122, y: 385}],//14
    // [{name: "Penalty", fontSize: 17, spacing: 12, x: 325, y: 375},{name: "Shootout", fontSize: 17, spacing: 12, x: 324, y: 405}],//16 // TODO: game is not implemented yet. Will remove comments when it is implemented.
    //[{name: "Balloon", fontSize: 17, spacing: 12, x: 425, y: 375},{name: "Pop", fontSize: 17, spacing: 12, x: 450, y: 405}],
    // [{name: "Daytime", fontSize: 24, spacing: 12, x: 525, y: 380}],
    // [{name: "Dodgeball", fontSize: 20, spacing: 10, x: 22, y: 480}],
    //[{name: "Unscrambler", fontSize: 19, spacing: 9, x: 122, y: 480}],
    // [{name: "Nighttime", fontSize: 20, spacing: 10, x: 222, y: 480}],
    // [{name: "Frog", fontSize: 25, spacing: 15, x: 330, y: 465},{name: "Crate", fontSize: 25, spacing: 10, x: 330, y: 505}],
    // [{name: "Flying", fontSize: 25, spacing: 15, x: 420, y: 465},{name: "Bee", fontSize: 25, spacing: 10, x: 440, y: 505}],
    //[{name: "Fishing", fontSize: 25, spacing: 12, x: 520, y: 480}],
    // [{name: "Egg", fontSize: 25, spacing: 12, x: 45, y: 565},{name: "Catch", fontSize: 25, spacing: 10, x: 37, y: 605}],
    // [{name: "Whack", fontSize: 25, spacing: 12, x: 235, y: 550},{name: "a", fontSize: 25, spacing: 10, x: 260, y: 580},{name: "Letter", fontSize: 25, spacing: 10, x: 235, y: 615}],
    // [{name: "Vacuum", fontSize: 25, spacing: 12, x: 327, y: 580}],
    // [{name: 'Spelling', fontSize: 25, spacing: 12, x:418, y: 560},{name: 'Bees', fontSize: 25, spacing: 12, x:436, y: 598}]
    ];

  this.drawGameNames = function()
  {
    gameList.forEach(function (game) {
	  if (game !== null) {
		//console.log("Adding game to title screen: " + game.name);
		const nameDataArray = game.titleScreenData;
  		nameDataArray.forEach(function(nameData) {
  		  customFontFillText(nameData.name, nameData.fontSize, nameData.spacing, nameData.x, nameData.y);
  		});
	  }
    });
	// NOTE: old code kept for drawing names of unavailable games
	GAME_NAMES.forEach(function (nameDataArray) {
  	  nameDataArray.forEach(function(nameData) {
  		customFontFillText(nameData.name, nameData.fontSize, nameData.spacing, nameData.x, nameData.y);
  	  });
    });
  }

  var bgrainbow;
  function generateBGColours()
  {
    var size = 32;
    bgrainbow = new Array(size);
    for (var i = 0; i < size; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg
        bgrainbow[i] = "#" + red + green + blue;
    }
    function sin_to_hex(i, phase) {
        var sin = Math.sin(Math.PI / size * 2 * i + phase);
        var int = Math.floor(sin * 127) + 128;
        var hex = int.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
  }

  var bgcounter = 0;
  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = 'orange';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);

    // a fun scrolling rainbow
    bgcounter = Math.cos(performance.now()/2500) * 450 + 450;
    if (!bgrainbow) generateBGColours();
    for (i = 0; i < bgrainbow.length; i++) {
        gameCanvasContext.fillStyle = bgrainbow[i];
        gameCanvasContext.beginPath();
        var yy = 900 + (i * 50) - bgcounter;
        gameCanvasContext.arc(320, yy, 1000, 0, 7);
        gameCanvasContext.fill();
    }

    // a cute little picture frame
    drawFromSheetSimple("images\\Backgrounds\\menu_border.png",0,0);
    //gameCanvasContext.drawImage("images\\Backgrounds\\menu_border.png",0,0);
}

  this.draw = function()
  {
    if(showingCredits) {
      gameCanvasContext.fillStyle="black";
      gameCanvasContext.fillRect(0,0,gameCanvas.width,gameCanvas.height);
      drawCredits();
      return;
    }
    this.drawBackground();
    this.drawHeader();
    this.drawCellsAndCheckForHighlighting();
    this.drawGameNames();
    customFontFillText("Click down here to see credits", 20, 12, 130, gameCanvas.height-39);
  }

  this.gameNum = -1;

  this.handleGameCellClicks = function()
  {
    if(showingCredits) {
      showingCredits = false;
      return;
    }
    // TODO: all the x,y,w,h are stored in GAME_NAMES
    // we could use that data and avoid the giant IF and hardcoded values here

    //console.log("MAIN MENU mouse pos is "+inputManager.mouseCoordinates.x+"," +inputManager.mouseCoordinates.y);

    var mouseCol = Math.floor((inputManager.mouseCoordinates.x - 20)/100);
    var mouseRow = Math.floor((inputManager.mouseCoordinates.y - 150)/100);

    if(mouseRow>=5) {
      showingCredits = true;
      return;
    }

    if (mouseCol >= 0 && mouseCol < 6 && mouseRow >= 0 && mouseRow < 5)
    {
      this.gameNum = mouseCol + mouseRow *6;
    }
    //console.log('this.gameNum: ' + this.gameNum);
    //console.log('gameList[this.gameNum].name: ' + gameList[this.gameNum].name);
    gameClassManager.loadCurrentGame(gameList[this.gameNum]);
    //console.log('gameClassManager.currentGame.name: ' + gameClassManager.currentGame.name);

    // FIXME why is this undefined sometimes?
    if (typeof gameClassManager.currentGame == "undefined") {
        //console.log("currentGame is null - ignoring click. this.gameNum="+this.gameNum);
        return;
    }

    // any game
    if (inputManager.mouseCoordinates.x > 20 && inputManager.mouseCoordinates.x < 620 &&
        inputManager.mouseCoordinates.y > 150 && inputManager.mouseCoordinates.y < 650)
        {
          genAudio.playClick();
          if (gameClassManager.currentGame.skipCustomizationScreens) {

            //console.log("skipping customization screens for this game");
            // the bubble popping games are only A-Z seeking games
            // and do not use the prompts and answers databases

            // same as LanguageSelectScreen.startGame() function
            gameClassManager.initializeCurrentGame();
            //promptsAndAnswersManager.setOrResetPromptsAndAnswers();
            miniGameTransitioner.initialize();
            fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.transitionToMiniGame);
            genAudio.playTransitionMusic();

          } else {

            // start all other games the normal way: with mode select GUIs first
            fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.modeSelectScreen);

          }
        }
  }


}

let titleScreen = new TitleScreenClass();

/*//1st row
//snake
else if (inputManager.mouseCoordinates.x > 20 && inputManager.mouseCoordinates.x < 120 &&
         inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
    {
      spaceShooterGame.startPlaying();
      playerShouldSeeTitleScreen = false;
      fullGameStateMachine.playingAGameState = true;
      levelIsTransitioning = true;
    }
else if (inputManager.mouseCoordinates.x > 220 && inputManager.mouseCoordinates.x < 320 &&
     inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
{
  // BUBBLE WRAP:
  else if (inputManager.mouseCoordinates.x > 120 && inputManager.mouseCoordinates.x < 220 &&
    inputManager.mouseCoordinates.y > 550 && inputManager.mouseCoordinates.y < 650)
{
  console.log("Clicked Bubble Wrap Button");
    gameClassManager.loadCurrentGame(bubbleWrapGame);

}
  // PINATA GAME:
  else if (inputManager.mouseCoordinates.x > 320 && inputManager.mouseCoordinates.x < 420 &&
      inputManager.mouseCoordinates.y > 250 && inputManager.mouseCoordinates.y < 350)
  {
    console.log("Clicked Pinata Button");
    gameClassManager.loadCurrentGame(pinataGame);
    gameInterval.reset(PINATAFRAMERATE);
  // do we still need to set these?
  playerShouldSeeTitleScreen = false;
  fullGameStateMachine.playingAGameState = true;
      levelIsTransitioning = true;
      if (gameIsOnAServerAndCanUseWebAudioAPI)
      {
          backgroundMusicBufferSource = webAudioAPIContext.createBufferSource();
          currentBackgroundMusic = backgroundMusicBufferSource;
          // FIXME: change to a new song for pinata
          loadWebAudioAPISound('audio/backgroundTracks/runnerBackground.mp3', backgroundMusicBufferSource);
          backgroundMusicBufferSource.loop = true;
          backgroundMusicBufferSource.loopStart = 6.9;
          backgroundMusicBufferSource.loopEnd = 1;
      }

  }
  // FIXME: this may trigger when you click the background and never started a game?
  */

var creditsList = [
" ",
"                                          CLICK ANYWHERE TO CLOSE AND RETURN TO THE GAME",
" ",
"Stebs: Project lead, majority of cored functionality shared between minigames, clue images+recordings, language data set authoring, file count reduction for itch, many of the minigames not mentioned below, foreign language character support, additional font, many small fixes to minigames, additional sounds and art",
"Ian Cherabier: Maze game and fishing game (implementation and art), collision manager, dynamic bounding boxes, game transition debugging, answer positions, various fixes (including for snake game, frog river, egg catch, space shooter, also for language selection screen), replay prompt functionality",
"Vaan Hope Khani: Majority of game art sprites (including coins, letters, characters, bills, food), many backgrounds, assorted sounds (including bomb, dodgeball, running), some art fixes",
"Michael \"Misha\" Fewkes: Audio engine code, sounds (UI, positive/negative feedback, correct/incorrect answers, back, radio select, snake game sound, bird, duck, fade, space shooter), music (runner, maze, title, frog river, jumper, air grab, space shooter, lane, transition songs, several additional songs)",
"Christer \"McFunkypants\" Kaitila: Several games with related implementation and art+audio (pinata, bubble wrap, balloon pop), main menu and transition animated background, title and transition particles, custom font, stats display gui improvements, letter voiceover recordings",
"Gonzalo Delgado: Runner game, lane game, snake game related fixes, code architecture/organization improvements, loading improvements, cross-platform fixes",
"Brian Nielsen: Bird game updates, flower game, bee and flower art+audio,  question/answer pair authoring text tool (based on foundation by H from Warped Radar)",
"Barış Köklü: Penalty shot game (including animation)",
"Michelly Oliveira: Image loading fix, game change fix, cross-platform support improvement, audio debugging",
"H Trayford: Pair authoring text tool foundation",
"Chris DeLeon: Minor debugging, spritesheet atlas script, credits",
"Lexi \"LexiGameDev\" Kunkel: First practice commit!",
  " ",
  "Game made in HomeTeam GameDev, apply to join us at",
  "HomeTeamGameDev.com"
];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 127;
  var findEnd;
  for(var i=0;i<creditsList.length;i++) {
    while(creditsList[i].length > 0) {
      findEnd = maxLineChar;
      if(creditsList[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(creditsList[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newCut.push(creditsList[i].substring(0, findEnd));
      creditsList[i] = creditsList[i].substring(findEnd, creditsList[i].length);
    }
  }

  const newerCut = [];
  for(let i = 0; i < newCut.length; i++) {
    const currentLine = newCut[i];
    for(let j = 0; j < currentLine.length; j++) {
      const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newerCut.push("\n");
        }

        newerCut.push(currentLine.substring(0, j + 1));
        newerCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else if(j === currentLine.length - 1) {
        if((i === 0) || (i >= newCut.length - 2)) {
          newerCut.push(currentLine);
        } else {
          newerCut.push(currentLine.substring(1, currentLine.length));
        }
      }
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function

const drawCredits = function() {
  var creditPosY = 10;
  var leftX = 20;
  var wasFont = gameCanvasContext.font;
  var wasAlign = gameCanvasContext.textAlign;

    for(var i=0; i<creditsList.length; i++) {
      var yPos = creditPosY + i * 12;
      //if (200 < yPos && yPos < 600) {
        if((i > 0) && (creditsList[i - 1] === "\n")) {
          gameCanvasContext.font= "13px Arial";
          gameCanvasContext.fillStyle="white";
          gameCanvasContext.textAlign="left";
          gameCanvasContext.fillText(creditsList[i],leftX,yPos);
        } else if(i === creditsList.length - 2) {
          gameCanvasContext.font= "11px Arial";
          gameCanvasContext.fillStyle="white";
          gameCanvasContext.textAlign="center";
          gameCanvasContext.fillText(creditsList[i],gameCanvas.width/2,yPos);
        } else if(i === creditsList.length - 1) {
          gameCanvasContext.font= "11px Arial";
          gameCanvasContext.fillStyle="#54b0bd";
          gameCanvasContext.textAlign="center";
          gameCanvasContext.fillText(creditsList[i],gameCanvas.width/2,yPos);
        } else {
          gameCanvasContext.font= "11px Arial";
          gameCanvasContext.fillStyle="white";
          gameCanvasContext.textAlign="left";
          gameCanvasContext.fillText(creditsList[i],leftX,yPos);
        }
      // }
    }
    gameCanvasContext.font= wasFont;
    gameCanvasContext.textAlign=wasAlign; // cleaning up after itself
  };
