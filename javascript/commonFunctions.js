var MEGASHEET_SCALE = 1/0.25;
// this function avoids any save/restore, doesn't support flipping, rotation, bypassing stats canvas
function drawFromSheetSimple(imgName, atX,atY,
                        desiredWidth,desiredHeight) // has to get stretched regardless, so keeping these optional ones
{
  var imgNum = sheetLookup[imgName];
  var imgData = spritesheetData[imgNum];

  var widthToDraw, heightToDraw;
  if(typeof desiredWidth !== 'undefined') { // custom size specified?
    widthToDraw = desiredWidth;
    heightToDraw = desiredHeight;
  } else {
    widthToDraw = imgData.w*MEGASHEET_SCALE;
    heightToDraw = imgData.h*MEGASHEET_SCALE;
  }

  gameCanvasContext.drawImage(megaSheet,imgData.x,imgData.y,
                              imgData.w,imgData.h,
                              atX,atY,
                              widthToDraw,heightToDraw);
}

function drawFromSheet(imgName, atX,atY,
                        desiredWidth,desiredHeight, // optional arguments (note: if either, expects both)
                        flipGraphic, // flip horizontal, note: desired w/h above needed to give this option
                        rotationAngle,pivotX,pivotY,//if defined, rotate from a pivot point
                        useStatsCanvas = false)
{
  var imgNum = sheetLookup[imgName];

  if (imgNum==undefined) {
      return;
  }

  if(typeof flipGraphic === 'undefined') { // no optional params? then use simpler version
    drawFromSheetSimple(imgName, atX,atY,
                        desiredWidth,desiredHeight);
    return;
  }

  var imgData = spritesheetData[imgNum];

  var widthToDraw, heightToDraw;
  if(typeof desiredWidth !== 'undefined') { // custom size specified?
    widthToDraw = desiredWidth;
    heightToDraw = desiredHeight;
  } else {
    widthToDraw = spritesheetData[imgNum].w*MEGASHEET_SCALE;
    heightToDraw = spritesheetData[imgNum].h*MEGASHEET_SCALE;
  }

  //console.log('angle: ' + rotationAngle + " pivotX: " + pivotX + ' pivotY: ' + pivotY);
  // if (imgName === "images\\sprites\\air grab\\leftArmm.png")
  // {
  //   console.log('leftArm image check verified');
  //   if (rotationAngle === undefined)
  //   {
  //     console.log('rotationAngle undefined');
  //   }
  //   if (pivotX === undefined)
  //   {
  //     console.log('pivotX undefined');
  //   }
  //   if (pivotY === undefined)
  //   {
  //     console.log('pivotY undefined');
  //   }
  // }


  if(typeof rotationAngle !== 'undefined' && typeof pivotX !== 'undefined' && typeof pivotY !== 'undefined')
  {

    if (gameClassManager.currentGame === 'feedGame')
    {
      if (imgName === "images\\sprites\\air grab\\leftArmm.png")
      {
        if(inputManager.mouseCoordinates.y > gameCanvas.height/2)
        {
          rotationAngle = rotationAngle;
        }
        else if (inputManager.mouseCoordinates.x > 530)
        {

          rotationAngle = -0.82
        }
        else if (inputManager.mouseCoordinates.x < 190)
        {
          rotationAngle = -1.8;
        }

      }
      if (imgName === "images\\sprites\\air grab\\rightArmm.png")
      {
        if(inputManager.mouseCoordinates.y > gameCanvas.height/2)
        {
          rotationAngle = rotationAngle;
        }
        else if (inputManager.mouseCoordinates.x > 530)
        {
          rotationAngle = -1.09;
        }
        else if (inputManager.mouseCoordinates.x < 190)
        {
          rotationAngle = -2.05;
        }

      }
    }
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
    if (useStatsCanvas === true)
    {
      statsCanvasContext.save();
      statsCanvasContext.translate(atX,atY);
      if(typeof flipGraphic !== 'undefined' && flipGraphic) {
        statsCanvasContext.scale(-1,1);
        statsCanvasContext.translate(-widthToDraw,0); // scoot to keep same coordinate
      }

      statsCanvasContext.drawImage(megaSheet,spritesheetData[imgNum].x,spritesheetData[imgNum].y,
                                  spritesheetData[imgNum].w,spritesheetData[imgNum].h,
                                  0,0,
                                  widthToDraw,heightToDraw);
      statsCanvasContext.restore();
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
