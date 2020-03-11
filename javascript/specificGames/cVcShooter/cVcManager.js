let CVCcat = new cVc('c','a','t');
let CVCcot = new cVc('c','o','t');

function CVCManager()
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
    console.log('this.arrayOfCVCs.length: ' + this.arrayOfCVCs.length);
    console.log('randomArrayOfCVCsIndex: ' + randomArrayOfCVCsIndex);
    console.log('this.arrayOfCVCs[randomArrayOfCVCsIndex]: ' + this.arrayOfCVCs[randomArrayOfCVCsIndex]);
    return this.arrayOfCVCs[randomArrayOfCVCsIndex];
  }

  this.currentCVC = undefined;
}
