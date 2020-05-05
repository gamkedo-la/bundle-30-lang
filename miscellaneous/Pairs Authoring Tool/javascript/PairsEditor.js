//PairsEditor
function PairsEditor(){

    this.initialize = function(){
        //TODO: For now just show text box
        this.createPairsFrame();
        this.createTextBox();
    };

    this.createPairsFrame = function(){
        frame = new PairsFrame(100, 100, 200, 200);
    }

    this.createTextBox = function(){
        this.textBox = new TextBox(frame, LabelFont.Large);
        this.textBox.inFocus = true;
        this.textBox.cursor.color = 'orange';
        
    };

    this.update = function(){
        //Empty for now
    };

    this.draw = function(){
        this.textBox.draw();
        //console.log(textBox.cursor.string);
        
    };

    this.keyboardEvent = function(newKey, oldKeys){
        this.textBox.keyboardEvent(newKey, oldKeys);
        console.log(this.textBox.cursor.string);
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
