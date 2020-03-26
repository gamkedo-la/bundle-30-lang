const VOLUME_INCREMENT = 0.05

var musicManager = new MusicManager();
function MusicManager() {
	var currentTrack = null;
	var fadeTrack = null;
	var nextTrack = null;
	var trackList = new Array();
	var musicVolume = 0.7;
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
			currentTrack.volume = Math.pow(musicVolume, 2);
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
			nextTrack.volume = Math.pow(musicVolume, 2);
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
			nextTrack.volume = Math.pow(musicVolume, 2);
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

	this.setVolume = function(value) {
		musicVolume = value;
		if (musicVolume > 1) {musicVolume = 1;}
		if (musicVolume < 0) {musicVolume = 0;}
		currentTrack.volume = Math.pow(musicVolume, 2);
		nextTrack.volume = Math.pow(musicVolume, 2);
	}
}

function MusicTrack(source, duration) {
	this.src = source;
	this.dur = duration;
}

var sfxVolume = 0.7;

function sfxMulti(arrayOfSources) {
	var sfxList = new Array();
	for (var i in arrayOfSources) {
		sfxList[i] = new Audio(arrayOfSources[i]);
	}

	this.play = function() {
		var currentSource = randItem(sfxList);
		currentSource.currentTime = 0;
		currentSource.volume = Math.pow(sfxVolume, 2);
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
		sfxList[index].volume = Math.pow(sfxVolume, 2);
		sfxList[index].play();

		index == 0 ? 1 : 0;
	}
}

function sfxOneShot(source) {
	var sfx = new Audio(source);

	this.play = function() {
		sfx.currentTime = 0;
		sfx.volume = Math.pow(sfxVolume, 2);
		sfx.play();
	}
}

var promptVolume = 1;

function promptSound(source) {
	this.sfx = new Audio(source);
	this.type = 'AUDIO';

	this.play = function() {
		this.sfx.currentTime = 0;
		this.sfx.volume = Math.pow(promptVolume, 2);
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
genAudio.titleMusic = new MusicTrack('audio/backgroundTracks/titleScreenMusic.mp3', 6.15);
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

gameAudio = {};

function randItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}
