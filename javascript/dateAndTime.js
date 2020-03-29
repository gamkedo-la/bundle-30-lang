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
  const SEPTEMPBER = 8;
  const OCTOBER = 9;
  const NOVEMBER = 10;
  const DECEMBEER = 11;

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
  this.assigncurrentMonth = function()
  {
    this.currentMonth = this.builtInJavascriptDateObject.getcurrentMonth();
  }

  this.tomorrowsDay = undefined;
  this.nextMonth = undefined;
  this.tomorrowShouldDisplayThisMonth = undefined;
  this.tomorrowShouldDisplayNextMonth = undefined;
  this.calculateTomorrowsDay = function()
  {
    this.tomorrowsDay = this.todaysDate + 1;

    if (this.currentMonth === (JANUARY || MARCH || MAY || JULY || AUGUST || OCTOBER || DECEMBER) &&
        this.tomorrowsDay > 31)
        {
          this.nextMonth = this.currentMonth + 1;
          this.tomorrowsDay = 1;
          if (this.nextMonth > DECEMBER)
          {
            this.nextMonth = JANUARY;
          }
        }
    else if (this.currentMonth === (SEPTEMBER || APRIL || JUNE || NOVEMBER) && this.tomorrowsDay > 30)
    {
      this.nextMonth = this.currentMonth + 1;
      this.tomorrowsDay = 1;
    }
    else if (this.currentMonth === (FEBRUARY) && !this.isALeapYear && this.tomorrowsDay > 28)
    {
      this.nextMonth = this.currentMonth + 1;
      this.tomorrowsDay = 1;
    }
    else if (this.currentMonth === FEBRUARY && this.isALeapYear && this.tomorrowsDay > 29)
    {
      this.nextMonth = this.currentMonth + 1;
      this.tomorrowsDay = 1;
    }
  }

  this.yesterdaysDay = undefined;
  this.lastMonth = undefined;
  this.yesterdayShouldDisplayCurrentMonth = false;
  this.yesterdayShouldDisplayLastMonth = false;
  this.calculateYesterdaysDay = function()
  {
    this.yesterdaysDay = this.todaysDay - 1;

    if (this.yesterdaysDay < 1)
    {
      this.lastMonth = this.currentMonth - 1;
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
    }
  }

  this.todaysDate =
  {
    day: this.todaysDay,
    month: this.currentMonth
  }

  this.tomorrowsDate =
  {
    day: this.tomorrowsDay,
    determineMonth: function()
    {
      if (this.tomorrowShouldDisplayNextMonth)
      {
        this.tomorrowsDate.month = this.nextMonth;
      }
      else {
        this.tomorrowsDate.month = this.currentMonth;
      }
    },
    month: undefined,

    draw: function(x,y)
    {
      gameCanvasContext.fillStyle = 'blue';
      gameCanvasContext.font = '30px Helvetica';
      gameCanvasContext.fillText(month + ', ' + day, x,y);
    }
  }

  this.yesterdaysDate =
  {
    day: this.yesterdaysDay,
    month: undefined,
    determineDay: function()
    {
      if (this.yesterdayShouldDisplayLastMonth)
      {
        this.yesterdaysDate.month = this.lastMonth;
      }
      else {
        this.yesterdaysDate.month = this.currentMonth;
      }
    }
  }

  this.update = function()
  {
    this.setOrResetParentDateObject();
    this.calculateTomorrowsDay();
    this.calculateYesterdaysDay();
  }
}
