//PairsEditor
function PairsEditor(){

    this.initialize = function(){
        //TODO: For now just show text box
        createPairsFrame();
        createTextBox();
    };

    this.createPairsFrame = function(){
        frame = new PairsFrame(100, 100, 200, 200);
    }

    this.createTextBox = function(){
        textBox = new TextBox(frame, LabelFont.Small);
    }

    this.update = function(){
        //Empty for now
    };

    this.draw = function(){
        textBox.draw();
    };
    
};

//PairsFrame
function PairsFrame(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.getMidX = function(){
        return(this.x + (width/2));
    }
    this.getMidY = function(){
        return(this.y + (height/2));
    }
}
