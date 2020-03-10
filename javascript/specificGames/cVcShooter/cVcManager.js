let CVCcat = new cVc('c','a','t');
let CVCcot = new cVc('c','o','t');

function cVcManager()
{
  this.arrayOfCVCs = [];

  this.initializeArrayOfCVCs = function()
  {
    this.arrayOfCVCs.push(CVCcat);
    this.arrayOfCVCs.push(CVCcot);
  }

  this.chooseARandomCVC = function()
  {
    let randomArrayOfCVCsIndex = getRandomIntInclusive(0,this.arrayOfCVCs.length - 1);
    return this.arrayOfCVCs[randomArrayOfCVCsIndex];
  }

  this.currentCVC = this.chooseARandomCVC();
}
