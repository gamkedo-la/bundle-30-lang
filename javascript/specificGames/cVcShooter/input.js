function keyPush(event)
{
  switch(event.keyCode)
  {
    case 32://spacebar
    if (titleScreen)
    {
      titleScreen = false;
      document.getElementById("blendedCatAudio").play();
    }
    else
    {
      {
        fireBullet();
      }
    }
    break;

    case 37://left

    break;

    case 39://right
    
    break;

    case 82://repeat audio
    document.getElementById("blendedCatAudio").play();
    break;
  }
}

function canvasClick()
{
  if (titleScreen)
  {
    titleScreen = false;
    document.getElementById("blendedCatAudio").play();
  }
  else
  {
    {
      fireBullet();
    }
  }
}
