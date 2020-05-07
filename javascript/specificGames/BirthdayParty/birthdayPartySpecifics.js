birthdayPartyGameClass.prototype = new GameClass();
function birthdayPartyGameClass()
{
  this.name = 'birthday party game';

  this.playerCharacter = new BirthdayPerson();
}

const birthdayPartyGame = new birthdayPartyGameClass();
