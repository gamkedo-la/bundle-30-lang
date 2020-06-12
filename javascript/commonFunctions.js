function drawFromSheet(imgName, atX,atY,
                        desiredWidth,desiredHeight, // optional arguments (note: if either, expects both)
                        flipGraphic, // flip horizontal, note: desired w/h above needed to give this option
                        rotationAngle,pivotX,pivotY)//if defined, rotate from a pivot point
{
  var scale = 1/0.3;
  var imgNum = sheetLookup[imgName];
  var widthToDraw, heightToDraw;
  if(typeof desiredWidth !== 'undefined') { // custom size specified?
    widthToDraw = desiredWidth;
    heightToDraw = desiredHeight;
  } else {
    widthToDraw = spritesheetData[imgNum].w*scale;
    heightToDraw = spritesheetData[imgNum].h*scale;
  }

  console.log('angle: ' + rotationAngle + " pivotX: " + pivotX + ' pivotY: ' + pivotY);
  if(typeof rotationAngle !== 'undefined' && typeof pivotX !== 'undefined' && typeof pivotY !== 'undefined')
  {
    console.log('inside angle and pivot checks');
    gameCanvasContext.save();
    gameCanvasContext.translate(pivotX,pivotY);//place imaginary hand at pivot point
    gameCanvasContext.rotate(rotationAngle + Math.PI/2);//rotate with hand at pivot based in radians
    gameCanvasContext.translate(-pivotX,-pivotY);//move imaginary hand back to original spot
    gameCanvasContext.translate(atX,atY);
    gameCanvasContext.drawImage(megaSheet,spritesheetData[imgNum].x,spritesheetData[imgNum].y,
                                spritesheetData[imgNum].w,spritesheetData[imgNum].h,
                                0,0,
                                widthToDraw,heightToDraw);
    gameCanvasContext.restore();
  }
  else
  {
    gameCanvasContext.save();
    gameCanvasContext.translate(atX,atY);
    if(typeof flipGraphic !== 'undefined' && flipGraphic) {
      gameCanvasContext.scale(-1,1);
      gameCanvasContext.translate(-widthToDraw,0); // scoot to keep same coordinate
    }

    gameCanvasContext.drawImage(megaSheet,spritesheetData[imgNum].x,spritesheetData[imgNum].y,
                                spritesheetData[imgNum].w,spritesheetData[imgNum].h,
                                0,0,
                                widthToDraw,heightToDraw);
    gameCanvasContext.restore();
  }

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
