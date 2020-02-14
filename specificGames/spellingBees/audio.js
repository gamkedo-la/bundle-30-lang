function AudioTagsManager()
{
  this.manAudioTag = document.createElement("AUDIO");
  this.manAudioTag.src = 'man.mp3';
  this.womanAudioTag = document.createElement("AUDIO");
  this.womanAudioTag.src = 'woman.mp3';

  this.arrayOfAudioTags = [];

  this.arrayOfAudioTags.push(this.manAudioTag);
  this.arrayOfAudioTags.push(this.womanAudioTag);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
