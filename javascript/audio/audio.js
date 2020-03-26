const VOLUME_INCREMENT = 0.1

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
			fadeTrack.volume = Math.pow(fadeTrack.volume - VOLUME_INCREMENT, 2);
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

var genAudio = {};
genAudio.transitionMusic1 = new MusicTrack("audio/levelTransitionSound.mp3", 5);
genAudio.playTransitionMusic = function() {
	musicManager.addTrack(randItem([genAudio.transitionMusic1]));
	musicManager.moveToLastTrack();
	musicManager.playNextTrack();
	musicManager.addTrack(gameClassManager.currentGame.backgroundMusic);
	musicManager.onEndFunction = function() {
		// fullGameStateMachine.loadCurrentState(fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame);
		// promptersManager.promptThePlayer();
		// gameCanvasContext.globalAlpha = 1;
	}
}
genAudio.titleMusic = new MusicTrack('audio/backgroundTracks/titleScreenMusic.mp3', 6.15);
genAudio.playTitleMusic = function() {
	musicManager.addTrack(genAudio.titleMusic);
	musicManager.moveToLastTrack();
	musicManager.playNextTrack();
}
genAudio.playClick = function() {
	console.log("Sound: Click")
}
genAudio.playPositive = function() {
	console.log("Sound: Positive")
}
genAudio.playNegative = function() {
	console.log("Sound: Negative")
}

promptAudio = {};

gameAudio = {};

function randItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}