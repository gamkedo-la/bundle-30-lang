// NOTE: THIS IS NOT USED BY THE MAIN GAME!
// THIS SCRIPT IS ONLY USED BY THE MEGA SPRITESHEET PROCESS STEP :)

var picsToLoad = 0;
var img = [];

var canvas, canvasContext;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  /*for(var i=0;i<fileList.length;i++) {
    console.log(fileList[i]);
  }*/
  loadImages();
}

var imgFacts = [];

function loadingDoneSoStartGame() {
  var dimW = img[0].width;
  var dimH = img[0].height;

  canvas.width = 5000;
  canvas.height = 4048;

  var scaleAll = 0.25;

  var drawX = 0,drawY = 0,rowH = 0;
  for(var i=0;i<fileList.length;i++) {

      if (drawX + img[i].width*scaleAll >= canvas.width)
      {
        drawX = 0;
        drawY += rowH;
        rowH = 0;
      }

      var scaledW = Math.floor(img[i].width*scaleAll);
      var scaledH = Math.floor(img[i].height*scaleAll);

      canvasContext.drawImage(img[i],
        0,0,img[i].width,img[i].height,
        drawX+1,drawY+1,scaledW,scaledH);

        imgFacts.push({fileName:fileList[i],fileIdx:i,x:drawX+1,y:drawY+1,w:scaledW,h:scaledH})

        drawX+=scaledW+2;
        if (scaledH > rowH)
        {
          rowH = scaledH+2;
        }


  }
  document.getElementById("jsonOutput").innerHTML = JSON.stringify(imgFacts);
  console.log(drawY + rowH+1);
}

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  console.log(picsToLoad);
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src=fileName;
}

function loadImageForAnimCode(i) {
  img[i] = document.createElement("img");
  beginLoadingImage(img[i],fileList[i]);
}

function loadImages() {

  // for(var i=0;i<fileList.length;i++) {
  //   console.log(fileList[i]);
  // }

  picsToLoad = fileList.length;

  for(var i=0;i<fileList.length;i++) {
    loadImageForAnimCode(i);
  } // end of for imageList
}
