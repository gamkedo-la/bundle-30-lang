//Main

window.onload = function(){
    window.addEventListener("focus", this.windowOnFocus);
    window.addEventListener("blur", this.windowOnBlur);

    canvas = document.createElement("canvas");
    canvasContext = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = window.indderWidth;
    canvas.height = window.innerHeight;

    initializeInput();
  
};

function windowOnBlur() {
	//if(!loadingComplete) return;
}

function windowOnFocus() {
	//if(!loadingComplete) return;
}

function loadingDoneSoStartGame(){
    //TODO Loading Checks
   // loadingComplete = true;
   
    editorUpdate = setInterval(update, 1000/30); //TODO Set Frames per Second in a Global list elsewhere

    window.focus();
    pairsEditor = new PairsEditor();
    pairsEditor.initialize();
};

function update(){
    //if(!loadingComplete) return;
    console.log("I am updating");

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    pairsEditor.update();

    pairsEditor.draw();
};

