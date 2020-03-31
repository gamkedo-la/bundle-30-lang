function DateAndTime()
{
  const JANUARY = 0;
  const FEBRUARY = 1;
  const MARCH = 2;
  const APRIL = 3;
  const MAY = 4;
  const JUNE = 5;
  const JULY = 6;
  const AUGUST = 7;
  const SEPTEMBER = 8;
  const OCTOBER = 9;
  const NOVEMBER = 10;
  const DECEMBER = 11;

  this.builtInJavascriptDateObject = undefined;
  this.setOrResetParentDateObject = function()
  {
    this.builtInJavascriptDateObject = new Date();
  }

  this.todaysDay = undefined;
  this.assignTodaysDay = function()
  {
    this.todaysDay = this.builtInJavascriptDateObject.getDate();
  }

  this.year = undefined;
  this.assignYear = function()
  {
    this.year = this.builtInJavascriptDateObject.getYear();
  }

  this.isALeapYear = undefined;
  this.determineIfLeapYear = function()
  {
    if (this.year % 4 === 0 && this.year % 100 === 0 && this.year % 400 === 0)
    {
      this.isALeapYear = true;
    }
    else {
      this.isALeapYear = false;
    }
  }

  this.currentMonth = undefined;
  this.assignCurrentMonth = function()
  {
    this.currentMonth = this.builtInJavascriptDateObject.getMonth();
  }

  this.tomorrowsDay = undefined;
  this.nextMonth = undefined;
  this.tomorrowShouldDisplayThisMonth = true;
  this.calculateTomorrowsDay = function()
  {
    this.tomorrowsDay = this.todaysDay + 1;

    if (this.currentMonth === (JANUARY || MARCH || MAY || JULY || AUGUST || OCTOBER || DECEMBER) &&
        this.tomorrowsDay > 31)
        {
          this.nextMonth = this.currentMonth + 1;
          this.tomorrowsDay = 1;
          this.tomorrowShouldDisplayThisMonth = false;
          if (this.nextMonth > DECEMBER)
          {
            this.nextMonth = JANUARY;
          }
        }
    else if (this.currentMonth === (SEPTEMBER || APRIL || JUNE || NOVEMBER) && this.tomorrowsDay > 30)
    {
      this.nextMonth = this.currentMonth + 1;
      this.tomorrowsDay = 1;
      this.tomorrowShouldDisplayThisMonth = false;
    }
    else if (this.currentMonth === (FEBRUARY) && !this.isALeapYear && this.tomorrowsDay > 28)
    {
      this.nextMonth = this.currentMonth + 1;
      this.tomorrowsDay = 1;
      this.tomorrowShouldDisplayThisMonth = false;
    }
    else if (this.currentMonth === FEBRUARY && this.isALeapYear && this.tomorrowsDay > 29)
    {
      this.nextMonth = this.currentMonth + 1;
      this.tomorrowsDay = 1;
      this.tomorrowShouldDisplayThisMonth = false;
    } else {
      this.tomorrowShouldDisplayThisMonth = true;
    }
  }

  this.yesterdaysDay = undefined;
  this.lastMonth = undefined;
  this.yesterdayShouldDisplayCurrentMonth = true;
  this.calculateYesterdaysDay = function()
  {
    this.yesterdaysDay = this.todaysDay - 1;

    if (this.yesterdaysDay < 1)
    {
      this.lastMonth = this.currentMonth - 1;
      this.yesterdayShouldDisplayCurrentMonth = false;
      if (this.lastMonth === (JANUARY || MARCH || MAY || JULY || AUGUST || OCTOBER || DECEMBER) )
      {
        this.yesterdaysDay = 31;
      }
      else if (this.lastMonth === (SEPTEMBER || APRIL || JUNE || NOVEMBER) )
      {
        this.yesterdaysDay = 30;
      }
      else if (this.lastMonth === FEBRUARY)
        if (this.isALeapYear)
        {
          this.yesterdaysDay = 29;
        }
        else
        {
          this.yesterdaysDay = 28;
        }
    } else {
      this.yesterdayShouldDisplayCurrentMonth = true;
    }
  }

  this.todaysDate =
  {
    day: undefined,
    month: undefined
  }

  this.determineTodaysDateDay = function()
  {
    this.todaysDate.day = this.todaysDay;
  }

  this.determineTodaysDateMonth = function()
  {
    this.todaysDate.month = this.currentMonth;
  }

  this.tomorrowsDate =
  {
    day: undefined,
    month: undefined
  }

  this.determineTomorrowsDateDay = function()
  {
    this.tomorrowsDate.day = this.tomorrowsDay;
  }

  this.determineTomorrowsMonth = function()
  {
    if (this.tomorrowShouldDisplayThisMonth)
    {
      this.tomorrowsDate.month = this.currentMonth;
    }
    else {
      this.tomorrowsDate.month = this.nextMonth;
    }
  }

  this.yesterdaysDate =
  {
    day: undefined,
    month: undefined,


  }

  this.determineYesterdaysDateDay = function()
  {
    this.yesterdaysDate.day = this.yesterdaysDay;
  }

  this.determineYesterdaysMonth = function()
  {
    if (this.yesterdayShouldDisplayCurrentMonth)
    {
      this.yesterdaysDate.month = this.currentMonth;
    }
    else {
      this.yesterdaysDate.month = this.lastMonth;
    }
  }

  this.initialize = function()
  {
    this.setOrResetParentDateObject();
    this.assignTodaysDay();
    this.assignYear();
    this.assignCurrentMonth();
    this.determineIfLeapYear();
    this.determineTodaysDateDay();
    this.determineTodaysDateMonth();
    this.calculateYesterdaysDay();
    this.calculateTomorrowsDay();
    this.determineYesterdaysDateDay();
    this.determineTomorrowsDateDay();
    this.calculateTomorrowsDay();
    this.calculateYesterdaysDay();
    this.determineYesterdaysMonth();
    this.determineTomorrowsMonth();
  }

  this.dateToDraw = undefined;
  this.shouldDrawADate = false;
  this.checkForNecessityOfUsingDatesForImagePrompter = function()
  {
    console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name: ' + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name);
    if ( promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name !== 'mandarin today' &&
         promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name !== 'mandarin tomorrow' &&
         promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name !== 'mandarin yesterday')
        {
          this.shouldDrawADate = false;
        }
        else
        {
          console.log('inside checkForNecessityOfUsingDates()');
          let dateToDraw = undefined;
          if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin today')
          {
            dateToDraw = this.todaysDate;
          } else if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin tomorrow')
          {
            dateToDraw = this.tomorrowsDate;
          } else if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin yesterday')
          {
            dateToDraw = this.yesterdaysDate;
          }
          console.log('dateToDraw: ' + dateToDraw);
          this.dateToDraw = dateToDraw;
          this.shouldDrawADate = true;;
        }
  }

  this.shouldDrawADateOnAnswers = false;
  this.checkForNecessityOfUsingDatesForDrawAnswersManager = function()
  {
    console.log('inside checkForNecessityOfUsingDatesForDrawAnswersManager');
    if ( (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin today' ||
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin tomorrow' ||
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin yesterday')
        &&
        promptsAndAnswersManager.currentAnswerDataType === "IMG" )
        {
          console.log('necessity for drawing dates should be true');
          this.shouldDrawADateOnAnswers = true;
        }
        else {
          console.log('necessity for drawing dates should be false');

          this.shouldDrawADateOnAnswers = false;
        }
  }
}

let dateAndTime = new DateAndTime();
dateAndTime.initialize();
