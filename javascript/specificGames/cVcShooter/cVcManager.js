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
  this.CVCMandarinImVeryGood = new cVc('我','很','好', imVeryGoodImage, promptAudio.mandarinImVeryGood);
  this.CVCMandarinNotBad = new cVc('还','不','错', notBadImage, promptAudio.mandarinNotBad);
  this.CVCMandarinImAlsoVeryGood = new cVc('我','也','很好', imAlsoVeryGoodImage, promptAudio.mandarinImAlsoVeryGood);
  this.CVCMandarinVeryNiceToMeetYou = new cVc('很','高兴','认识你', veryNiceToMeetYouImage, promptAudio.mandarinVeryNiceToMeetYou);
  this.CVCMandarinWhereAreYouFrom = new cVc('你是','哪里','人', whereAreYouFromImage, promptAudio.mandarinWhereAreYouFrom);
  this.CVCMandarinImFromAmerica = new cVc('我','来自','美国', imFromAmericaImage, promptAudio.mandarinImFromAmerica);


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
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImVeryGood);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinNotBad);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImAlsoVeryGood);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinVeryNiceToMeetYou);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhereAreYouFrom);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImFromAmerica);



    console.log('this.arrayOfEnglishCVCs: ' + this.arrayOfEnglishCVCs);
  }

  this.chooseARandomCVC = function(currentLanguageArray)
  {
    let randomArrayOfCVCsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    return currentLanguageArray[randomArrayOfCVCsIndex];
  }

  this.currentCVC = undefined;
}
