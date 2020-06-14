//TextCursor
function TextCursor(position, font, boxWidth){
    this.font = font;
    this.string = "";
    this.text =  [""];

    this.textSize = sizeOfString(canvasContext, font, "W");
	this.frame = new PairsFrame(position.x, position.y, this.textSize.width, this.textSize.height);

    this.shouldDrawCursor = false;
    let cursorRow = 0;
    let cursorIndex = 0;
    let rowCount = 0;

    const PADDING = 2;

    this.update = function(deltaX, deltaY){
        this.frame += deltaX;
        this.frame += deltaY;
    };

    this.draw = function() {
        let currentYPos = this.frame.y + this.textSize.height - PADDING;
        const substringToCursor = this.text[cursorRow].substring(0, cursorIndex);
        const currentSize = sizeOfString(canvasContext, this.font, substringToCursor);
        for(let i = 0; i < this.text.length; i++){
            colorText(
                canvasContext, 
                this.text[i], 
                this.frame.x, 
                this.frame.y + ((i + 1) * currentSize.height) - (2*PADDING),
                this.color, 
                font, 
                'left'
            );
            currentYPos += this.textSize.height;
        }
        if(this.shouldDrawCursor){
            colorText(
                canvasContext, 
                "|", 
                this.frame.x + currentSize.width,
                this.frame.y + ((cursorRow + 1) * currentSize.height) - (2*PADDING),
                this.color, 
                font, 
                'left'
            );
        }
    };
    this.setString = function(newString){
        this.string = newString;
        this.reallocateText();
    };

    this.reallocateText = function() {
        this.text = [""];
        let tempRow = 0;
        for(let i = 0; i < this.string.length; i++) {
            this.text[tempRow] += this.string.charAt(i);
            const newSize = sizeOfString(canvasContext, this.font, this.text[tempRow]);
            if(newSize.width > boxWidth){
                const lastIndex = this.text[tempRow].lastIndexOf(" ") + 1;
                if(lastIndex > 0) {
                    this.text[tempRow + 1] = this.text[tempRow].substring(lastIndex);
                    this.text[tempRow] = this.text[tempRow].substring(0, lastIndex);    
                } else {
                    let rowWidth = 0;
                    let j = 0;
                    for(; j < this.text[tempRow].length; j++) {
                        rowWidth = sizeOfString(canvasContext, this.font, this.text[tempRow].substring(0, j + 1)).width;
                        if(rowWidth >= boxWidth) {
                            break;
                        }
                    }
                    this.text[tempRow + 1] = this.text[tempRow].substring(j);
                    this.text[tempRow] = this.text[tempRow].substring(0, j); 
                }

                tempRow++;
            }
        }

        if(tempRow != rowCount){
            const oldHeight = this.frame.height;
            this.frame.height = (tempRow +1) * this.textSize.height;
            //original has function based on dialog editor.  Not sure if we need this yet.
            rowCount = tempRow;
        }

        if(cursorRow > rowCount){
            cursorRow = rowCount;
            cursorIndex = this.text[cursorRow].length;
        
        } else if(cursorIndex > this.text[cursorRow].length){
            if(cursorRow < this.text.length - 1) {
                cursorIndex -= this.text[cursorRow].length;
                cursorRow++;
            }
        }
    };

    this.keyboardEvent = function(newKey, oldKeys){
        if(isPrintableKey(newKey)){
            
            if(oldKeys.has(KEY_SHIFT)){
                this.insertCharacter(upperStringForKeyCode(newKey));
            }else{
                this.insertCharacter(lowerStringForKeyCode(newKey));
            }
            cursorIndex++;
        }else{
            if(newKey === KEY_BACKSPACE){
                cursorIndex--;

                this.removeCharacter();

                if(cursorIndex < 0){
                    if(this.text.length > 1){
                        cursorRow--;
                        cursorIndex = this.text[cursorRow].length;
                    }else{
                        cursorIndex = 0;
                    }
                }
            }else if(newKey === KEY_LEFT){
                cursorIndex--;
                if(cursorIndex < 0){
                    if(cursorRow > 0){
                        cursorRow--;
                        cursorIndex = this.text[cursorRow].length;
                    }else{
                        cursorIndex = 0;
                    }
                }
            }else if(newKey === KEY_RIGHT){
                if(cursorIndex === this.text[cursorRow].length){
                    if(cursorRow < rowCount){
                        cursorRow++;
                        cursorIndex = 0;
                    }
                }else{
                    cursorIndex++;
                }
            }else if(newKey === KEY_UP){
                if(cursorRow > 0){
                    cursorRow--;
                }
            }else if(newKey === KEY_DOWN){
                if(cursorRow < rowCount){
                    cursorRow++;
                }
            }
        }

        this.reallocateText();
    };

    this.insertCharacter = function(newChar) {
        const textStartSubstring = this.text[cursorRow].substring(0, cursorIndex);
        const textEndSubstring = this.text[cursorRow].substring(cursorIndex);
        this.text[cursorRow] = textStartSubstring + newChar + textEndSubstring;

        let totalIndex = 0;
        for(let i = 0; i< cursorRow; i++){
            totalIndex += (this.text[i].length);
        }

        totalIndex += cursorIndex;

        const stringStartSubstring = this.string.substring(0, totalIndex);
        const stringEndSubstring = this.string.substring(totalIndex, this.string.length);
        this.string = stringStartSubstring + newChar + stringEndSubstring;
    };

    this.removeCharacter = function(){
        const textStartSubstring = this.text[cursorRow].substring(0, cursorIndex);
        const textEndSubstring = this.text[cursorRow].substring(cursorIndex + 1, this.text[cursorRow].length);
        this.text[cursorRow] = textStartSubstring + textEndSubstring;

        let totalIndex = 0;
        for(let i = 0; i < cursorRow; i++){
            totalIndex += (this.text[i].length);
        }

        totalIndex += cursorIndex;

        const stringStartSubstring = this.string.substring(0, totalIndex);
        const stringEndSubstring = this.string.substring(totalIndex + 1, this.string.length);
        this.string = stringStartSubstring + stringEndSubstring;
    };
}
