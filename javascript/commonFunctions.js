function drawFromSheet(imgName, atX,atY, desiredWidth,desiredHeight)
{
  var scale = 1/0.3;
  var imgNum = sheetLookup[imgName];
  var unScaledWidth = spritesheetData[imgNum].w*scale;
  var unScaledHeight = spritesheetData[imgNum].h*scale;
  var widthToDraw = desiredWidth/unScaledWidth;
  var heightToDraw = desiredHeight/unScaledHeight;

  gameCanvasContext.drawImage(megaSheet,spritesheetData[imgNum].x,spritesheetData[imgNum].y,
                              spritesheetData[imgNum].w,spritesheetData[imgNum].h,
                              atX,atY,
                              widthToDraw,heightToDraw);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return (randomNumber >= excludedMin && randomNumber <= excludedMax) ?
    getRandomIntWithExclusionaryRange(min,max, excludedMin,excludedMax) : randomNumber;
}

function getRandomElementFromArray(myArray){
  var randomIdx = getRandomIntInclusive(0, myArray.length - 1);
  return myArray[randomIdx];
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
