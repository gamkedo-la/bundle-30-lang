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

function loadingDoneSoStartGame() {
  var dimW = img[0].width;
  var dimH = img[0].height;

  canvas.width = 10000;
  canvas.height = 2772;

  var scaleAll = 0.3;

  var drawX = 0,drawY = 0,rowH = 0;
  for(var i=0;i<fileList.length;i++) {

      if (drawX + img[i].width*scaleAll >= canvas.width)
      {
        drawX = 0;
        drawY += rowH;
        rowH = 0;
      }
      canvasContext.drawImage(img[i],
        0,0,img[i].width,img[i].height,
        drawX,drawY,img[i].width*scaleAll,img[i].height*scaleAll);
        drawX+=img[i].width*scaleAll;

        if (img[i].height*scaleAll > rowH)
        {
          rowH = img[i].height*scaleAll;
        }


  }
  console.log(drawY + rowH);
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
