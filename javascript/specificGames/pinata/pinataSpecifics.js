////////////////////////////////////////
var pinataGame = new bubblePoppingEngine('pinataGame',true);
pinataGame.titleScreenData = [{
  name: "Piñata",
  fontSize: 27,
  spacing: 15,
  x: 322, y: 285
}];
var playerShouldBePlayingPinata = false; // FIXME is this still used elsewhere?
const PINATAFRAMERATE = 1000/60;
AVAILABLE_GAMES.push(pinataGame);
////////////////////////////////////////
