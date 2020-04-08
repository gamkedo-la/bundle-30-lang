//TextBox
//Class unfinished
function TextBox(frame, font){
    this.type = ChildType.TextBox;
    this.frame = frame;
    this.inFocus = false;
    let state = ChildState.normal;
    let currentIndex = 0;
    const BORDER_THICKNESS = 2;
    const PADDING = 2;
    let titleSize = sizeOfString(canvasContext, font, "W");
    this.frame.height = titleSize.height;
    let counts = 0;
    this.cursor = new TextCursor();//TODO: Make class

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
    }

}