function CVCManager()
{
  this.CVCcat = new cVc('c','a','t', catImage, audioManager.blendedCat);
  this.CVCcot = new cVc('c','o','t', cotImage, audioManager.blendedCot);

  this.arrayOfCVCs = [];

  this.initializeArrayOfCVCs = function()
  {
    this.arrayOfCVCs.push(this.CVCcat);
    this.arrayOfCVCs.push(this.CVCcot);
  }

  this.chooseARandomCVC = function()
  {
    let randomArrayOfCVCsIndex = getRandomIntInclusive(0,this.arrayOfCVCs.length - 1);
    return this.arrayOfCVCs[randomArrayOfCVCsIndex];
  }

  this.currentCVC = undefined;
}
