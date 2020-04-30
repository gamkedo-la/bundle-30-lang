const VOLUME_INCREMENT = 0.05


var volume = {}
volume.music = {};
volume._musicValue = 0.75; //muted so I can listen to other music while playing and debugging, lol
Object.defineProperty(volume, 'music', {
	get() {	return volume._musicValue; },
	set(value) {
		volume._musicValue = value;
		if (volume._musicValue > 1) {volume._musicValue = 1;}
		if (volume._musicValue < 0) {volume._musicValue = 0;}
		musicManager.setVolume();
	}
});

var musicManager = new MusicManager();
function MusicManager() {
	var currentTrack = null;
	var fadeTrack = null;
	var nextTrack = null;
	var trackList = new Array();
	var currentTrackDuration = null;
	var nextTrackDuration = null;
	this.playing = false;
	this.onEndFunction = function() {return};

	this.update = function() {
		if (this.playing) {
			if (currentTrack.currentTime >= currentTrackDuration) {
				this.playNextTrack(false);
			}
		}

		if (fadeTrack != null && fadeTrack.volume >= 0.05) {
			fadeTrack.volume -= 0.05;

		}
		if (fadeTrack != null && fadeTrack.volume <= 0.1) {
			fadeTrack.pause();
			fadeTrack = null;
		}
	}

	this.play = function() {
		if(trackList == null) {
			return;
		}

		if (currentTrack == null) {
			currentTrack = new Audio(trackList[0].src);
			currentTrackDuration = trackList[0].dur;
			currentTrack.volume = Math.pow(volume.music, 2);
		}
		currentTrack.play();

		if (nextTrack == null) {
			if (trackList[1] != undefined) {
				nextTrack = new Audio(trackList[1].src);
				nextTrackDuration = trackList[1].dur;
			} else {
                if (!trackList || !trackList[0]) {
                    console.log("Warning: music trackList is empty. Ignoring.");
                    this.playing = false;
                    nextTrack = null;
                    return;
                }
                nextTrack = new Audio(trackList[0].src);
				nextTrackDuration = trackList[0].dur;
			}
			nextTrack.volume = Math.pow(volume.music, 2);
		}

		this.playing = true;
	}

	this.pause = function() {
		currentTrack.pause();

		if (fadeTrack != null) {
			fadeTrack.pause();
			fadeTrack = null;
		}

		this.playing = false;
	}

	this.stop = function() {
		currentTrack.pause();
		currentTrack.currentTime = 0;

		if (fadeTrack != null) {
			fadeTrack.pause();
			fadeTrack = null;
		}

		this.playing = false;
	}

	this.addTrack = function(musicTrackObject) {
		trackList.push(musicTrackObject);

		if (trackList.length <= 2) {
			if (trackList[1] != undefined) {
				nextTrack = new Audio(trackList[1].src);
				nextTrackDuration = trackList[1].dur;
			} else {
				nextTrack = new Audio(trackList[0].src);
				nextTrackDuration = trackList[0].dur;
			}
			nextTrack.volume = Math.pow(volume.music, 2);
		}
	}

	this.playNextTrack = function(fading = true) {
		this.onEndFunction();

		this.onEndFunction = function() {return};

		if (fadeTrack != null) {
			fadeTrack.pause();
		}
		if (fading) {
			fadeTrack = currentTrack;
		}
		currentTrack = nextTrack;
		currentTrackDuration = nextTrackDuration;
		nextTrack = null;
		if (trackList.length >= 2) {
			trackList.shift();
		}
		this.play();
	}

	this.moveToLastTrack = function() {
		while (trackList.length > 1) {
			trackList.shift();
		}
	}

	this.setVolume = function() {
		if (currentTrack) currentTrack.volume = Math.pow(volume.music, 2);
		if (nextTrack) nextTrack.volume = Math.pow(volume.music, 2);
	}

	this.startDuck = function() {
		if (currentTrack) currentTrack.volume = Math.pow(volume.music*0.7, 2);
		if (nextTrack) nextTrack.volume = Math.pow(volume.music*0.7, 2);
	}

	this.endDuck = function() {
		if (currentTrack) currentTrack.volume = Math.pow(volume.music, 2);
		if (nextTrack) nextTrack.volume = Math.pow(volume.music, 2);
	}
}

function MusicTrack(source, duration) {
	this.src = source;
	this.dur = duration;
}


volume.sfx = {};
volume._sfxValue = 0.7;
Object.defineProperty(volume, 'sfx', {
	get() {	return volume._sfxValue; },
	set(value) {
		volume._sfxValue = value;
		if (volume._sfxValue > 1) {volume._sfxValue = 1;}
		if (volume._sfxValue < 0) {volume._sfxValue = 0;}
	}
});

function sfxMulti(arrayOfSources, mixVolume = 1) {
	var sfxList = new Array();
	var vol = mixVolume;
	for (var i in arrayOfSources) {
		sfxList[i] = new Audio(arrayOfSources[i]);
	}

	this.play = function() {
		var currentSource = randItem(sfxList);
		currentSource.currentTime = 0;
		currentSource.volume = Math.pow(volume.sfx * vol, 2);
		currentSource.play();
	}
}

function sfxOverlap(source, mixVolume = 1) {
	var sfxList = new Array();
	var index = 0;
	sfxList[0] = new Audio(source);
	sfxList[1] = new Audio(source);
	var vol = mixVolume;

	this.play = function() {
		sfxList[index].currentTime = 0;
		sfxList[index].volume = Math.pow(volume.sfx * vol, 2);
		sfxList[index].play();

		index = index == 0 ? 1 : 0;
	}
}

function sfxOneShot(source, mixVolume = 1) {
	var sfx = new Audio(source);
	var vol = mixVolume;

	this.play = function() {
		sfx.currentTime = 0;
		sfx.volume = Math.pow(volume.sfx * vol, 2);
		sfx.play();
	}
}

function sfxLooping(source, mixVolume = 1) {
	var sfx = new Audio(source);
	var vol = mixVolume;
	sfx.loop = true;

	this.play = function() {
		sfx.volume = Math.pow(volume.sfx * vol, 2);
		if (sfx.paused) {
			sfx.currentTime = 0;
			sfx.play();
		}
	}

	this.stop = function() {
		sfx.pause();
	}
}


volume.prompt = {};
volume._promptValue = 0.7;
Object.defineProperty(volume, 'prompt', {
	get() {	return volume._promptValue; },
	set(value) {
		volume._promptValue = value;
		if (volume._promptValue > 1) {volume._promptValue = 1;}
		if (volume._promptValue < 0) {volume._promptValue = 0;}
	}
});

function promptSound(source) {
	promptAudio.loading++;
	this.sfx = new Audio(source);
	this.sfx.oncanplaythrough = function() {promptAudio.loading--; }
	this.type = 'AUDIO';

	this.play = function() {
		this.sfx.currentTime = 0;
		this.sfx.volume = Math.pow(volume.prompt, 2);
		this.sfx.play();
		musicManager.startDuck();
		this.sfx.onended = function() {
			musicManager.endDuck();
		}
	}
}


promptAudio = {};
promptAudio.loading = 0;

promptAudio.woman = new promptSound('audio/PromptsAndAnswers/woman.mp3');
promptAudio.women = new promptSound('audio/PromptsAndAnswers/women.mp3');
promptAudio.man = new promptSound('audio/PromptsAndAnswers/man.mp3');
promptAudio.men = new promptSound('audio/PromptsAndAnswers/men.mp3');
promptAudio.he = new promptSound('audio/PromptsAndAnswers/he.mp3');
promptAudio.she = new promptSound('audio/PromptsAndAnswers/she.mp3');


//cVc Section
//English cVcs
promptAudio.blendedCat = new promptSound('audio/PromptsAndAnswers/blendedCat.mp3');
promptAudio.blendedCot = new promptSound('audio/PromptsAndAnswers/blendedCot.mp3');

//mandarin cVcs
promptAudio.mandarinHowAreYou = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowAreYou.mp3');
promptAudio.mandarinHowAmI = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowAmI.mp3');
promptAudio.mandarinHowAreThey = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowAreThey.mp3');
promptAudio.mandarinHowAreWe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowAreWe.mp3');
promptAudio.mandarinHowIsHe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowIsHe.mp3');
promptAudio.mandarinHowIsShe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowIsHe.mp3');
promptAudio.mandarinHowIsItDoing = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHowIsItDoing.mp3');

//polite mandarin phrases group 1
promptAudio.mandarinPlease = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinPlease.mp3');
promptAudio.mandarinSorry = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinSorry.mp3');
promptAudio.mandarinExcuseMeQuestionAskingContext = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinExcuseMeQuestionContext.mp3');
promptAudio.mandarinWaitAMoment = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinWaitAMoment.mp3');
promptAudio.mandarinThankYou = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinThankYou.mp3');
promptAudio.mandarinAnyTime = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinAnyTime.mp3');
promptAudio.mandarinYoureWelcome = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinYoureWelcome.mp3');
promptAudio.mandarinExcuseMePassingThroughContext = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinExcuseMePassingThroughContext.mp3');
promptAudio.mandarinIAppreciateThat = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinIAppreciateThat.mp3');
promptAudio.mandarinYouHaveWorkedHard = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinYouWorkedHard.mp3');

//polite mandarin phrases group 2
promptAudio.mandarinLongTimeNoSee = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinLongTimeNoSee.mp3');
promptAudio.mandarinIllLetYouGo = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinIllLetYouGo.mp3');
promptAudio.mandarinPleaseAdviseMe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinPleaseAdvise.mp3');
promptAudio.mandarinIRespectfullyWait = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinIRespectfullyWait.mp3');
promptAudio.mandarinMyHumbleOpinion = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinInMyHumbleOpinion.mp3');
promptAudio.mandarinExcuseMeForSayingThis = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinExcuseMeForSayingThis.mp3');
promptAudio.mandarinItsOK = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinItsOK.mp3');
promptAudio.mandarinItsMyDuty = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinItsMyDuty.mp3');
promptAudio.mandarinSorryForMyLowSkill = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinSorryForMyLowSkill.mp3');

//common words
promptAudio.mandarinToBe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinToBe.mp3');
promptAudio.mandarinOf = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinOf.mp3');
promptAudio.mandarinNot = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinNot.mp3');
promptAudio.mandarinLe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinLe.mp3');
promptAudio.mandarinPerson = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinPerson.mp3');
promptAudio.mandarinI = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinI.mp3');
promptAudio.mandarinYou = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinYou.mp3');
promptAudio.mandarinAt = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinAt.mp3');
promptAudio.mandarinHave = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHave.mp3');
promptAudio.mandarinIn = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinIn.mp3');

promptAudio.mandarinBuy = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinBuy.mp3');
promptAudio.mandarinSell = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinSell.mp3');

promptAudio.mandarinMom = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinMom.mp3');
promptAudio.mandarinHorse = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHorse.mp3');

promptAudio.mandarinThisOne = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinThisOne.mp3');
promptAudio.mandarinThatOne = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinThatOne.mp3');
promptAudio.mandarinTheseOnes = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinTheseOnes.mp3');
promptAudio.mandarinThoseOnes = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinThoseOnes.mp3');

promptAudio.mandarinHe = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinHe.mp3');
promptAudio.mandarinCouch = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinCouch.mp3')
promptAudio.mandarinTower = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinTower.mp3');

promptAudio.mandarinThisArea = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinThisArea.mp3');
promptAudio.mandarinThatArea = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinThatArea.mp3');

promptAudio.mandarinSleep = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinSleep.mp3');
promptAudio.mandarinDumplings = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinDumplings.mp3');

promptAudio.mandarinToday = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinToday.mp3');
promptAudio.mandarinTomorrow = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinTomorrow.mp3');
promptAudio.mandarinYesterday = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinYesterday.mp3');

promptAudio.mandarinBlack = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinBlack.mp3');//黑色
promptAudio.mandarinWhite = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinWhite.mp3');//白色
promptAudio.mandarinGray = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinGray.mp3');//灰色
promptAudio.mandarinRed = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinRed.mp3');//红色
promptAudio.mandarinBrown = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinBrown.mp3');//棕色
promptAudio.mandarinYellow = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinYellow.mp3');//黄色
promptAudio.mandarinGreen = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinGreen.mp3');//绿色
promptAudio.mandarinBlue = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinBlue.mp3');//蓝色
promptAudio.mandarinPurple = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinPurple.mp3');//紫色
promptAudio.mandarinPink = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarinPink.mp3');//粉

promptAudio.mandarin0 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin0.mp3');
promptAudio.mandarin1 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin1.mp3');
promptAudio.mandarin2 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin2.mp3');
promptAudio.mandarin3 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin3.mp3');
promptAudio.mandarin4 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin4.mp3');
promptAudio.mandarin5 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin5.mp3');
promptAudio.mandarin6 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin6.mp3');
promptAudio.mandarin7 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin7.mp3');
promptAudio.mandarin8 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin8.mp3');
promptAudio.mandarin9 = new promptSound('audio/PromptsAndAnswers/Mandarin/mandarin9.mp3');

promptAudio.englishBee = new promptSound('audio/PromptsAndAnswers/bee.mp3');
promptAudio.englishFlower = new promptSound('audio/PromptsAndAnswers/flower.mp3');


gameAudio = {};

var genAudio = {};
genAudio.transitionMusic1 = new MusicTrack("audio/levelTransitionSound.mp3", 5);
genAudio.transitionMusic2 = new MusicTrack("audio/Transition2.mp3", 5.5);
genAudio.transitionMusic3 = new MusicTrack("audio/Transition3.mp3", 4);
genAudio.playTransitionMusic = function() {
	musicManager.addTrack(randItem([genAudio.transitionMusic1,genAudio.transitionMusic2,genAudio.transitionMusic3]));
	musicManager.moveToLastTrack();
	musicManager.playNextTrack();
	musicManager.addTrack(gameClassManager.currentGame.backgroundMusic);
	musicManager.onEndFunction = function() {
		fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame);
		promptersManager.promptThePlayer();
		gameCanvasContext.globalAlpha = 1;
	}
}
genAudio.titleMusic = new MusicTrack('audio/backgroundTracks/titleScreenMusic.mp3', 6.21);
genAudio.playTitleMusic = function() {
	musicManager.addTrack(genAudio.titleMusic);
	musicManager.moveToLastTrack();
	musicManager.playNextTrack();
}

genAudio.click = new sfxMulti(["audio/UI_01.mp3", "audio/UI_02.mp3", "audio/UI_03.mp3", "audio/UI_04.mp3"]);
genAudio.playClick = function() {
	genAudio.click.play();
}
genAudio.positive = new sfxMulti(["audio/Positive_01.mp3", "audio/Positive_02.mp3", "audio/Positive_03.mp3", "audio/Positive_04.mp3"]);
genAudio.playPositive = function() {
	genAudio.positive.play();
}
genAudio.negative = new sfxMulti(["audio/Negative_01.mp3", "audio/Negative_02.mp3", "audio/Negative_03.mp3", "audio/Negative_04.mp3"]);
genAudio.playNegative = function() {
	genAudio.negative.play();
}

function randItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}
