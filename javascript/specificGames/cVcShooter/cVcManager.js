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
  this.CVCMandarinWhatDoYouLikeToDo = new cVc('你喜欢','做','什么', whatDoYouLikeToDoImage, promptAudio.mandarinWhatDoYouLikeToDo);
  this.CVCMandarinWhatPartOfChina = new cVc('你来自','中国','哪里', whatPartOfChinaImage, promptAudio.mandarinWhatPartOfChina);
  this.CVCMandarinWhereDoYouLive = new cVc('你','住在','哪里', whereDoYouLiveImage, promptAudio.mandarinWhereDoYouLive);
  this.CVCMandarinILiveInVietnam = new cVc('我','住在','越南', iLiveInVietnamImage, promptAudio.mandarinILiveInVietnam);
  this.CVCMandarinMeToo = new cVc('我','也','是', meTooImage, promptAudio.mandarinMeToo);
  this.CVCMandarinILikeProgramming = new cVc('我','喜欢','编程', iLikeProgrammingImage, promptAudio.mandarinILikeProgramming);
  this.CVCMandarinIAlsoLikeFitness = new cVc('我也','喜欢','健身', iAlsoLikeFitnessImage, promptAudio.mandarinIAlsoLikeFitness);
  this.CVCMandarinWhatIsYourJob = new cVc('你的','工作','是什么', whatIsYourJobImage, promptAudio.mandarinWhatIsYourJob);
  this.CVCMandarinIAmATeacher = new cVc('我','是','老师', iAmATeacherImage, promptAudio.mandarinIAmATeacher);
  this.CVCMandarinAnythingElse = new cVc('还','有','吗', anythingElseImage, promptAudio.mandarinAnythingElse);
  this.CVCMandarinILikeWatchingMovies = new cVc('我','喜欢','看电影', iLikeWatchingMoviesImage, promptAudio.mandarinILikeWatchingMovies);
  this.CVCMandarinILikeRockClimbing = new cVc('我','喜欢','攀岩', iLikeRockClimbingImage, promptAudio.mandarinILikeRockClimbing);
  this.CVCMandarinWhatIsYourName = new cVc('你叫','什么','名字', whatIsYourNameImage, promptAudio.mandarinWhatIsYourName);
  this.CVCMandarinMyNameIsSteven = new cVc('我叫','史','蒂文', myNameIsStevenImage, promptAudio.mandarinMyNameIsSteven);
  this.CVCMandarinHowOldAreYou = new cVc('你','几','岁', howOldAreYouImage, promptAudio.mandarinHowOldAreYou);
  this.CVCMandarinIAm37YearsOld = new cVc('我今年','三十七','岁', iAm37YearsOldImage, promptAudio.mandarinIAm37YearsOld);


  this.arrayOfEnglishCVCs = [];
  this.arrayOfMandarinCVCs = [];

  this.initializeArraysOfCVCs = function()
  {
    this.arrayOfEnglishCVCs.push(this.CVCcat);
    this.arrayOfEnglishCVCs.push(this.CVCcot);

    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreYou);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAmI);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreThey);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowAreWe);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsHe);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsShe);
    // this.arrayOfMandarinCVCs.push(this.CVCMandarinHowIsItDoing);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImVeryGood);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinNotBad);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImAlsoVeryGood);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinVeryNiceToMeetYou);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhereAreYouFrom);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinImFromAmerica);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhatDoYouLikeToDo);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhatPartOfChina);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhereDoYouLive);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILiveInVietnam);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinMeToo);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILikeProgramming);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinIAlsoLikeFitness);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinIAmATeacher);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinAnythingElse);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILikeWatchingMovies);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinILikeRockClimbing);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinWhatIsYourName);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinMyNameIsSteven);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinHowOldAreYou);
    this.arrayOfMandarinCVCs.push(this.CVCMandarinIAm37YearsOld);




    console.log('this.arrayOfEnglishCVCs: ' + this.arrayOfEnglishCVCs);
  }

  this.chooseARandomCVC = function(currentLanguageArray)
  {
    let randomArrayOfCVCsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    return currentLanguageArray[randomArrayOfCVCsIndex];
  }

  this.currentCVC = undefined;
}
