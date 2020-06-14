//TextBox

function TextBox(frame, font){
   // this.type = ChildType.TextBox;
    this.frame = frame;
    this.inFocus = false;
   // let state = ChildState.normal;
    let currentIndex = 0;
    const BORDER_THICKNESS = 2;
    const PADDING = 2;
    let titleSize = sizeOfString(canvasContext, font, "W");
    this.frame.height = titleSize.height;
    let counts = 0;
    this.wordToLearn = null;
    this.cursor = new TextCursor({x: this.frame.x, y: this.frame.y}, font, this.frame.width);

    this.colors = {
        normal: 'white',
        hover: 'gray',
        active: 'blue'
    };

    this.titleColor = {
        normal: 'black',
        hover: 'white',
        active: 'white'
    };

    this.background = this.colors.normal;
    this.color = this.titleColor.normal;

    this.setState = function(newState){
        state = newState;

        switch(newState){
            case ChildState.Nomal:
                this.background = this.colors.normal;
                this.color = this.titleColor.normal;
            break;
            case ChildState.Hover:
                this.background = this.colors.hover;
                this.color = this.titleColor.hover;
            break;
            case ChildState.Active:
                this.background = this.colors.active;
                this.color = this.titleColor.active;
            break;
        }

        this.cursor.color = this.color;
    };

    this.getState = function(){
        return state;
    };

    this.update = function(deltaX, deltaY){
        this.frame.x += deltaX;
        this.frame.y += deltaY;

        this.cursor.update(deltaX, deltaY);
    };

    this.getText = function() {
        return this.cursor.text;
    };

    this.setText = function(newText){
        this.cursor.setString(newText);
    };

    this.getBaseHeight = function(){
        return titleSize.height;
    };

    this.draw = function(){
        if((this.wordToLearn != null) && (this.wordToLearn.shouldBeRemoved)){
            if(!this.wordToLearn.isOnRight){
                this.frame.x -= (this.wordToLearn.frame.width);
            }
            this.wordToLearn = null;
        }

        let totalThickness = BORDER_THICKNESS;
        if(this.inFocus){
            counts++;
            if((counts % 20) === 0) {
                this.cursor.shouldDrawCursor = !this.cursor.shouldDrawCursor;
            }
        }

        this.frame.height = this.cursor.frame.height;
        //TODO: Add to Main or some Drawing file
        fillRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, this.background);
        strokeRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, this.color, totalThickness);

        this.cursor.frame.x = this.frame.x;
        this.cursor.frame.y = this.frame.y;
        this.cursor.draw();
    };

    this.drawAt = function(x, y){
        fillRectangle(canvasContext, x, y, this.frame.width, this.frame.height, this.background);
        strokeRectangle(canvasContext, x, y, this.frame.width, this.frame.height, this.color, BORDER_THICKNESS);
        
        colorText(canvasContext, this.titleColor, x, y, this.color, font, 'left');
    };

    this.setFocus = function(x, y){
        this.inFocus = true;
        this.cursor.shouldDrawCursor = true;
    };

    this.lostFocus = function(){
        this.inFocus = false;
        this.cursor.shouldDrawCursor = false;
    };

    this.deleteTransition = function(){ //Not sure if this is needed
        if((this.wordToLearn != null) && (this.wordToLearn.mate === null)){ //what is 'mate'?
            this.wordToLearn.remove();
        }
    };

    this.setColors = function(background, line){
        this.colors.normal = background;
        this.colors.hover = line;
        
        this.titleColor.normal = line;
        this.titleColor.hover = background;

        this.background = this.colors.normal;
        this.color = this.titleColor.normal;
    };

    this.updateHover = function(x, y){
        if(mouseInside(this.frame)){
            this.setState(ChildState.Hover);
        }else{
            this.setState(ChildState.Normal);
        }
    };

    this.keyboardEvent = function(newKey, oldKeys){
        if(this.inFocus){
            this.cursor.keyboardEvent(newKey, oldKeys);
        }
    };

    this.textBoxGrew = function(deltaY){
        this.frame.y += deltaY;
    };

}