////////////////////////////////////////
var pinataGame = new bubblePoppingEngine('pinataGame',true);
//pinataGame.titleScreenData = [{name:"Piñata",fontSize:27,spacing:15,x:322,y:285}]; // n with an accent missing in drawFromSheet
pinataGame.titleScreenData = [{name:"Pinata",fontSize:27,spacing:15,x:322,y:285}];
// these USED to work but seem to do nothing now
pinataGame.smashSound = window.audioManager?audioManager.pinataHitSound:document.getElementById('smashSound');
pinataGame.successSound = window.audioManager?audioManager.pinataEatSound:document.getElementById('successSound');;
pinataGame.failSound = window.audioManager?audioManager.pinataFailSound:document.getElementById('failSound');;
const PINATAFRAMERATE = 1000/60;
if (window.AVAILABLE_GAMES) AVAILABLE_GAMES.push(pinataGame);
////////////////////////////////////////
