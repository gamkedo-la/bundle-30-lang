function CVCManager()
{
  this.CVCcat = new cVc('c','a','t', catImage, promptAudio.blendedCat);
  this.CVCcot = new cVc('c','o','t', cotImage, promptAudio.blendedCot);

  this.CVCMandarinHowAreYou = new cVc('你','好','吗', howAreYouImage, promptAudio.mandarinHowAreYou);
  this.CVCMandarinHowAmI = new cVc('我','怎么','样', howAmIImage, promptAudio.mandarinHowAmI);
  this.CVCMandarinHowAreThey = new cVc('他们','怎么','样', howAreTheyImage, promptAudio.mandarinHowAreThey);
  this.CVCMandarinHowAreWe = new cVc('我们','怎么','样', howAreWeImage, promptAudio.mandarinHowAreWe);
  this.CVCMandarinHowIsHe = new cVc('他','怎么','样', howIsHeImage, promptAudio.mandarinHowIsHe);
  this.CVCMandarinHowIsShe = new cVc('她','怎么','样', howIsHeImage, promptAudio.mandarinHowIsShe);
  this.CVCMandarinHowIsItDoing = new cVc('它','怎么','样', howIsItDoingImage, promptAudio.mandarinHowIsHe);

  this.arrayOfEnglishCVCs = [];
  this.arrayOfMandarinCVCs = [];

  this.initializeArraysOfCVCs = function()
  {
    this.arrayOfEnglishCVCs.push(this.CVCcat);
    this.arrayOfEnglishCVCs.push(this.CVCcot);

    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreYou);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAmI);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreThey);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreWe);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsHe);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsShe);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsItDoing);

    console.log('this.arrayOfEnglishCVCs: ' + this.arrayOfEnglishCVCs);
  }

  this.chooseARandomCVC = function(currentLanguageArray)
  {
    let randomArrayOfCVCsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    return currentLanguageArray[randomArrayOfCVCsIndex];
  }

  this.currentCVC = undefined;
}
