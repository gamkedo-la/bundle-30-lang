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
    this.parentDateObject = new Date();
  }

  this.todaysDay = undefined;
  this.assignTodaysDate = function()
  {
    this.todaysDay = this.builtInJavascriptDateObject.getDate();
  }

  this.year = undefined;
  this.assignYear = function()
  {
    this.year = this.builtInJavascriptDateObject.getYear();
  }

  this.month = undefined;
  this.assignMonth = function()
  {
    this.month = this.builtInJavascriptDateObject.getMonth();
  }

  this.tomorrowsDay = undefined;
  this.calculateTomorrowsDate = function()
  {
    this.tomorrowsDay = this.todaysDate + 1;

    if (this.month === (JANUARY || MARCH || MAY || JULY || AUGUST || OCTOBER || DECEMBER) &&
        this.tomorrowsDay > 31)
        {
          this.month++;
          this.tomorrowsDay = 1;
          if (this.month > DECEMBER)
          {
            this.month = JANUARY;
          }
        }
    else if (this.month === (SEPTEMBER || APRIL || JUNE || NOVEMBER) && this.tomorrowsDay > 30)
    {
      this.month++;
      this.tomorrowsDay = 1;
    }
    else if (this.month === (FEBRUARY) && this.tomorrowsDay > 28)
    {
      this.month++;
      this.tomorrowsDay = 1;
    }
  }


}
