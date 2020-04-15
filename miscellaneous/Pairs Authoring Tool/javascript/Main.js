//Main

window.onload = function(){
    window.addEventListener("focus", this.windowOnFocus);
    window.addEventListener("blur", this.windowOnBlur);

    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");

    initializeInput();
    window.focus();
    pairsEditor = new PairsEditor();
    pairsEditor.initialize();

    loadGame();
    
};

function loadGame(){
    var framesPerSecond = 60;
	setInterval(function() {
	
    update();
		
	}, 1000/framesPerSecond)
}

function update(){
    drawEverything();
};

function drawEverything(){
    drawBackground();
    pairsEditor.update();
    pairsEditor.draw();
};

function drawBackground(){
	fillRectangle(canvasContext, 0,0, canvas.width, 600, 4, 'red');
}