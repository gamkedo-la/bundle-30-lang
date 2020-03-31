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
	this.playing = false;
	this.onEndFunction = function() {return};
	var currentTrackDuration = null;
	var nextTrackDuration = null;

	this.update = function() {
		if (this.playing) {
			if (currentTrack.currentTime >= currentTrackDuration) {
				this.playNextTrack(false);
			}
		}

		if (fadeTrack != null) {
			fadeTrack.volume -= 0.05;
			if (fadeTrack.volume <= 0.2) {
				fadeTrack.pause();
				fadeTrack = null;
			}
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
		currentTrack.volume = Math.pow(volume.music, 2);
		nextTrack.volume = Math.pow(volume.music, 2);
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

function sfxMulti(arrayOfSources) {
	var sfxList = new Array();
	for (var i in arrayOfSources) {
		sfxList[i] = new Audio(arrayOfSources[i]);
	}

	this.play = function() {
		var currentSource = randItem(sfxList);
		currentSource.currentTime = 0;
		currentSource.volume = Math.pow(volume.sfx, 2);
		currentSource.play();
	}
}

function sfxOverlap(source) {
	var sfxList = new Array();
	var index = 0;
	sfxList[0] = new Audio(source);
	sfxList[1] = new Audio(source);

	this.play = function() {
		sfxList[index].currentTime = 0;
		sfxList[index].volume = Math.pow(volume.sfx, 2);
		sfxList[index].play();

		index = index == 0 ? 1 : 0;
	}
}

function sfxOneShot(source) {
	var sfx = new Audio(source);

	this.play = function() {
		sfx.currentTime = 0;
		sfx.volume = Math.pow(volume.sfx, 2);
		sfx.play();
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
	this.sfx = new Audio(source);
	this.type = 'AUDIO';

	this.play = function() {
		this.sfx.currentTime = 0;
		this.sfx.volume = Math.pow(volume.prompt, 2);
		this.sfx.play();
	}
}

var genAudio = {};
genAudio.transitionMusic1 = new MusicTrack("audio/levelTransitionSound.mp3", 5);
genAudio.playTransitionMusic = function() {
	musicManager.addTrack(randItem([genAudio.transitionMusic1]));
	musicManager.moveToLastTrack();
	musicManager.playNextTrack();
	musicManager.addTrack(gameClassManager.currentGame.backgroundMusic);
	musicManager.onEndFunction = function() {
		fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame);
		promptersManager.promptThePlayer();
		gameCanvasContext.globalAlpha = 1;
	}
}
genAudio.titleMusic = new MusicTrack('audio/backgroundTracks/titleScreenMusic.mp3', 6.1);
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
genAudio.negative = new sfxMulti(["audio/Negative_01.mp3", "audio/Negative_02.mp3", "audio/Negative_03.mp3", "audio/UINegative_04.mp3"]);
genAudio.playNegative = function() {
	genAudio.negative.play();
}

promptAudio = {};
promptAudio.woman = new promptSound('audio/PromptsAndAnswers/woman.mp3');
promptAudio.women = new promptSound('audio/PromptsAndAnswers/women.mp3');
promptAudio.man = new promptSound('audio/PromptsAndAnswers/man.mp3');
promptAudio.men = new promptSound('audio/PromptsAndAnswers/men.mp3');
promptAudio.he = new promptSound('audio/PromptsAndAnswers/he.mp3');
promptAudio.she = new promptSound('audio/PromptsAndAnswers/she.mp3');

promptAudio.blendedCat = new promptSound('audio/PromptsAndAnswers/blendedCat.mp3');
promptAudio.blendedCot = new promptSound('audio/PromptsAndAnswers/blendedCot.mp3');


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




gameAudio = {};

function randItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}