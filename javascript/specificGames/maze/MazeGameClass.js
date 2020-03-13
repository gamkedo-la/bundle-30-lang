function MazeGameClass(){
    GameClass.call(this);

    this.name = "MazeGame";
    this.FRAME_RATE = 1000/30;

    this.titleScreenData = [
        {
            name: "Maze", 
            fontSize: 27, 
            spacing: 15, 
            x: 37, 
            y: 385
        }
    ];

}
MazeGameClass.prototype = new GameClass();
MazeGameClass.prototype.constructor = MazeGameClass;

const MAZE_GAME = new MazeGameClass();
AVAILABLE_GAMES.push(MAZE_GAME);