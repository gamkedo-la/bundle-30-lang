//PairsEditor
function PairsEditor(){

    this.initialize = function(){

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