function PhonicClass(name, promptAudio,textAssociation)
{
  this.name = name;

  this.x = undefined;
  this.y = undefined;

  this.promptAudio = promptAudio;
  this.textAssociation = textAssociation;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillText(this.textAssociation, this.x,this.y);
  }
}

function PhonicClassManager()
{
  this.centralVietnamese_a = new PhonicClass('a', )
}
