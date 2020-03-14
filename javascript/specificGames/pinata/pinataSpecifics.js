////////////////////////////////////////
var pinataGame = new bubblePoppingEngine('pinataGame',true);
pinataGame.titleScreenData = [{name:"Piñata",fontSize:27,spacing:15,x:322,y:285}];
const PINATAFRAMERATE = 1000/60;
if (window.AVAILABLE_GAMES) AVAILABLE_GAMES.push(pinataGame);
////////////////////////////////////////
