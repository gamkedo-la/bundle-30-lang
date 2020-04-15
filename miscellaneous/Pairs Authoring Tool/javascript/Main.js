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
    
};

function loadGame(){
    editorUpdate = setInterval(update, 1000/30);
}

function update(){
    drawEverything();
};

function drawEverything(){
    console.log("drawing everything");
    pairsEditor.update();
    pairsEditor.draw();
};