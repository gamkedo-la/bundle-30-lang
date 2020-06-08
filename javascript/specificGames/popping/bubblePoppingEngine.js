// McF's bubblePoppingEngine

// Used by Pinata minigame, Bubble Wrap
// v5 - abstracted for multiple game use!

// physics code adapted from work by XEM
// https://github.com/xem/mini2Dphysics


// an abstract mini engine used by multiple games
function bubblePoppingEngine(myName = 'POP!', usePhysics = false) {
    //////////////////////////////////////////////////////
    // game specifics
    //////////////////////////////////////////////////////
    this.gameIsActive = false;
    this.name = myName;
    this.physicsEnabled = usePhysics;
    this.titleTXT1 = "Piñata Pop";
    this.titleTXT2 = "Click the right letter";
    this.titleTXT3 = "as fast as you can";
    this.spritesheet = null;
    this.gravity = 0.05;
    this.spriteH = 256;
    this.spriteW = 256;
    this.shrinking = true;
    this.skipCustomizationScreens = true;
    this.spawnRadius = 50; // size when randomly spawning
    this.spawnRandomly = false;
    this.spawnChance = 0.05;
    this.smashSound = null;
    this.successSound = null;
    this.failSound = null;
    this.introComplete = false; // if false, show a pinata
    //////////////////////////////////////////////////////
    // private vars used internally
    //////////////////////////////////////////////////////
    var me = this; // because events keep this straight
    // list of all known candies
    var objects = [];
    // list of rgba colours
    var rainbow;
    // how many poppable letter choices will fall out
    const CANDY_COUNT = 16;
    const CANDY_MIN_SIZE = 20;
    const CANDY_START_RADIUS = 40;
    const CANDY_SHRINK = -0.2;
    const CANDY_MASS = 1;
    // special case: candies with a "space" as the letter are considered particles of confetti
    const CONFETTI_COUNT = 20; // currently it messes up the physics
    const CONFETTI_RADIUS = 10; // starting size
    const CONFETTI_MASS = 100; // the higher the number, the LESS it weighs! FIXME
    const CONFETTI_SHRINKSPEED = 0.975; // % each frame
    const CONFETTI_ID = " ";
    // tiny functions to handle 2d vectors
    var Vec2 = (x, y) => ({ x, y });
    var length = (x) => dot(x, x) ** .5;
    var add = (x, y) => Vec2(x.x + y.x, x.y + y.y);
    var sub = (x, y) => add(x, scale(y, -1));
    var scale = (x, y) => Vec2(x.x * y, x.y * y);
    var dot = (x, y) => x.x * y.x + x.y * y.y;
    var cross = (x, y) => x.x * y.y - x.y * y.x;
    var normalize = (x) => scale(x, 1 / (length(x) || 1));
    var rndInt = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    // which one we want to click
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var targetLetter = alphabet[rndInt(0, alphabet.length - 1)];
    // TODO refactor these private vars
    var canv;// canvas
    var nextOne;// c1
    var ctx;// ctx2d
    var otherOne;// c2
    var direction;// vFrom1to2
    var correction;// correctionAmount
    var i, j, k;// loop vars
    var radius1;// r1
    var radius2;// r2
    var relVel;// relativeVelocity
    var velNorm;// rVelocityInNormal
    var scalarVal;// p
    var tScalar;// jN
    var impulseNorm;// impulse
    var tangentVal;// tangent
    var power;// jT

    //////////////////////////////////////////////////////
    // public functions called by the game state machine
    //////////////////////////////////////////////////////
    this.postLoadInit = function () { // NEVER GETS FIRED? FIXME
        console.log(this.name + " postLoadInit...");
        this.gameIsActive = true;
    }
    this.postGameSpecialCode = function () {
        console.log(this.name + " postGameSpecialCode...");
        // remove mousedown event listener
        this.gameIsActive = false;
    }
    // FIXME the "this" is invalid here, its a transitioner, not the game itself LOL
    this.drawTransitionText = function () {
        customFontFillText([me.titleTXT1, symbolExclamationPointImage], 80, 42, 100, 50);
        customFontFillText([me.titleTXT2], 32, 24, 80, 250);
        customFontFillText([me.titleTXT3, symbolExclamationPointImage], 32, 24, 80, 290);
    }

    this.initialize = function () {
        console.log(this.name + " popping game initializing...");
        this.gameIsActive = true; // hmmmmmmmmmmm
        generateRainbowColours();
        ctx = gameCanvasContext;
        canv = gameCanvas;
        //if (window.currentBackgroundMusic) { // exists?
        //    currentBackgroundMusic.pause();
        //    currentBackgroundMusic = pinataBackgroundMusic;
        //}
        if (!this.gameSpecificInits) {
            // Init scene ground floor - defaults
            Circle(Vec2(320, 5700), 5000, 0); // floor!
            Circle(Vec2(2840, 5000), 5000, 0); // r wall
            Circle(Vec2(-2200, 5000), 5000, 0); // l wall
        } else {
            this.gameSpecificInits();
        }
        document.addEventListener('mousedown', pinataClick, false);
    }

    this.maybePromptUser = function() {
        
        if (!this.introComplete) return;
        
        const promptDelay = 2000; // ms
        var now = performance.now();
        // first time?
        if (!this.nextPromptTime) this.nextPromptTime = now + promptDelay;
        // each subsequent time
        if (now>this.nextPromptTime) {
            console.log("playing A-Z voice prompt: " + targetLetter)
            var snd = promptAudio[targetLetter.toLowerCase()];
            if (snd) snd.play();
            this.nextPromptTime = now + promptDelay;
        }
    }
    
    
    // called by the game state machine
    this.update = function () {
        //console.log("popping game update()");
        if (!this.physicsEnabled) return;
        if (window.levelIsTransitioning) return; // update should never be called in this case, but just in case
        if (this.spawnRandomly) {
            if (Math.random() < this.spawnChance) {
                //console.log("Randomly spawning a new popable!");
                this.newcircle(Math.random() * gameCanvas.width, gameCanvas.height + 100, this.spawnRadius, 1);
            }
        }

        this.maybePromptUser(); // voiceovers

        // iterate through all objects twice
        for (i = objects.length; i--;) {
            for (j = objects.length; j-- > i;) {
                //for(k = 15; k--;){
                nextOne = objects[i];
                otherOne = objects[j];
                //if((b.M && b.C.y < 400) || (d.M && d.C.y < 400)){ // perf
                // Test collision
                direction = sub(otherOne.C, nextOne.C);
                if (length(direction) < nextOne.R + otherOne.R) { // close enough?
                    D = nextOne.R + otherOne.R - length(direction), // depth
                        N = normalize(direction), // normal
                        S = add(otherOne.C, scale(normalize(scale(direction, -1)), otherOne.R)), // start
                        E = add(S, scale(N, D)) // end
                    // Resolve collision
                    if (nextOne.M || otherOne.M) {
                        //  correct positions
                        correction = scale(N, D / (nextOne.M + otherOne.M) * .8); // .8 = poscorrectionrate = percentage of separation to project objects
                        nextOne.C = add(nextOne.C, scale(correction, -nextOne.M));
                        otherOne.C = add(otherOne.C, scale(correction, otherOne.M));
                        //the direction of collisionInfo is always from b to d
                        //but the Mass is inversed, so start scale with d and end scale with b
                        scalarVal = add(scale(S, otherOne.M / (nextOne.M + otherOne.M)), scale(E, nextOne.M / (nextOne.M + otherOne.M)));
                        //r is vector from center of object to collision point
                        radius1 = sub(scalarVal, nextOne.C);
                        radius2 = sub(scalarVal, otherOne.C);
                        //newV = V + D cross R
                        relVel = sub(add(otherOne.V, Vec2(-1 * otherOne.D * radius2.y, otherOne.D * radius2.x)), add(nextOne.V, Vec2(-1 * nextOne.D * radius1.y, nextOne.D * radius1.x)));
                        //if objects moving apart ignore
                        //if(dot(n, N) < 0){
                        // Calc t scalar
                        // the formula of s can be found in http://www.myphysicslab.com/collision.html
                        tScalar = (-1.5 * dot(relVel, N)) / (nextOne.M + otherOne.M + cross(radius1, N) ** 2 * nextOne.M + cross(radius2, N) ** 2 * otherOne.M);
                        //t is in direction of normal ( from b to d)
                        impulseNorm = scale(N, tScalar);
                        // t = F dt = m * ?v
                        // ?v = t / m
                        nextOne.V = sub(nextOne.V, scale(impulseNorm, nextOne.M));
                        otherOne.V = add(otherOne.V, scale(impulseNorm, otherOne.M));
                        nextOne.D -= cross(radius1, N) * tScalar * nextOne.M;
                        otherOne.D += cross(radius2, N) * tScalar * otherOne.M;
                        tangentVal = scale(normalize(sub(relVel, scale(N, dot(relVel, N)))), -1);
                        power = -1.5 * dot(relVel, tangentVal) * .5 / (nextOne.M + otherOne.M + cross(radius1, tangentVal) ** 2 * nextOne.M + cross(radius2, tangentVal) ** 2 * otherOne.M);
                        //t is from b to d (in opposite direction of velocity)
                        impulseNorm = scale(tangentVal, power);
                        nextOne.V = sub(nextOne.V, scale(impulseNorm, nextOne.M));
                        otherOne.V = add(otherOne.V, scale(impulseNorm, otherOne.M));
                        nextOne.D -= cross(radius1, tangentVal) * power * nextOne.M;
                        otherOne.D += cross(radius2, tangentVal) * power * otherOne.M;
                    } // collision resolved
                } // close enough
                // }
            } // i

            // animate them falling and bouncing
            if (this.introComplete || this.noIntro) { // not waiting for smash?
                // Update scene
                nextOne.V = add(nextOne.V, scale(nextOne.A, this.gravity)); // A=gravity
                nextOne.C = add(nextOne.C, scale(nextOne.V, .01));
                nextOne.D += nextOne.E * .01;
                nextOne.B += nextOne.M ? nextOne.D * .01 : .001;
                // shrink!
                if (this.shrinking && nextOne.M && nextOne.R > CANDY_MIN_SIZE) nextOne.R += CANDY_SHRINK;
                if (nextOne.Z == CONFETTI_ID) {
                    nextOne.R *= CONFETTI_SHRINKSPEED;
                }
            } else { // if we have not yet Smashed:
                // leave animation on pause for now
            }
        }
    }
    // called by the game state machine
    this.draw = function () {
        //console.log("popping game draw()");
        // clear the screen
        ctx.fillStyle = "rgba(150,220,255,1)";
        ctx.fillRect(0, 0, canv.width, canv.height);
        // do we have a custom background?
        if (this.drawBG) {
            this.drawBG();
        } else { // draw a nice sky
            for (i = 0; i < rainbow.length; i++) {
                ctx.fillStyle = rainbow[i];
                ctx.beginPath();
                ctx.arc(320, 900 + i * 50, 1000, 0, 7);
                ctx.fill();
            }
        }
        // draw all bubbles
        for (i = objects.length; i--;) {
            nextOne = objects[i];
            // Draw
            ctx.save();
            ctx.beginPath();
            ctx.translate(nextOne.C.x, nextOne.C.y);
            ctx.rotate(nextOne.B);
            if (!this.spritesheet) {
                ctx.arc(0, 0, nextOne.R, 0, 7);
            } else {
                // really big: balloons assumed: FIXME
                ctx.drawImage(this.spritesheet, 0, 0, this.spriteW, this.spriteH, -nextOne.R, -nextOne.R, nextOne.R * 2, nextOne.R * 2);
            }
            //c.lineWidth = 3;
            ctx.font = nextOne.R * 1.9 + "px a";
            ctx.textAlign = "center";
            if (objects[i].M) { // does it have mass? then draw a candy
                if (nextOne.Z == targetLetter) {
                    // debug mode: easy to find flashing balls
                    ctx.fillStyle = "rgba(" + rndInt(100, 255) + "," + rndInt(100, 255) + "," + rndInt(100, 255) + ",1)";
                } else {
                    ctx.fillStyle = objects[i].color; // selet ball colour
                }
                if (!this.spritesheet) ctx.fill(); // the circle
                if (nextOne.Z == CONFETTI_ID) {
                    // draw the letter using html
                    // emoji! works on most modern devices but not all
                    //c.fillStyle = "white"; // txt color
                    ctx.fillText(String.fromCodePoint(0x1F600 + (i % 69/*56*/)), nextOne.R * 1.5, 0, 0 - nextOne.R * 0.75, 0 - nextOne.R * 0.75);
                } else {
                    // draw the letter using bitmap font
                    if (window.customFontFillText) {
                        customFontFillText([nextOne.Z], nextOne.R * 1.5, 0, 0 - nextOne.R * 0.75, 0 - nextOne.R * 0.75);
                    } else { // debug only
                        ctx.fillStyle = 'black';
                        ctx.fillText(nextOne.Z, 0, nextOne.R * 0.666);
                    }
                }
            }
            else { // no mass? must be the ground
                ctx.fillStyle = "rgba(80,60,40,1)";
                ctx.fill(); // the ground
            }
            ctx.restore();
            // ^---- end draw

            if (this.introComplete) {
                if (window.customFontFillText) {
                    customFontFillText(['Click the letter ' + targetLetter], 32, 24, 80, 32);
                } else { // debug only
                    ctx.fillStyle = 'white';
                    ctx.font = "32px Arial";
                    ctx.fillText('Click the letter ' + targetLetter, 200, 32);
                }
            } else {
                if (window.pinataImage) {
                    // let's draw an actual pinata here
                    var wobblex = 180 + Math.cos(performance.now() / 1000) * 60;
                    var wobbley = 100 - Math.cos(performance.now() / 500) * 15;
                    // first the string
                    ctx.beginPath();
                    ctx.moveTo(320, 0);
                    ctx.lineTo(wobblex + 120, wobbley + 108);
                    ctx.strokeStyle = "rgba(80,80,80,1)";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    // now the pinata itself
                    ctx.drawImage(pinataImage, wobblex, wobbley);
                    // and the instructions
                }
                if (window.customFontFillText) customFontFillText(['Smash the Piñata', symbolExclamationPointImage], 32, 24, 120, 32);
            }
        } // loop thru all
        //drawBackButton(); // FIXME
    }

    //////////////////////////////////////////////////////
    // private functions used internally
    //////////////////////////////////////////////////////
    function boom(x, y, wasCorrect) {
        if (wasCorrect && !me.alwaysPopLetters) {
            //pinataSmashed = false; // reset!!!!!!!! fixme: or do we like spam
            /*
            // destroy the world!
            objects = [];
            // Init scene ground floor
            Circle(Vec2(320, 5700), 5000, 0); // floor!
            Circle(Vec2(2840, 5000), 5000, 0); // r wall
            Circle(Vec2(-2200, 5000), 5000, 0); // l wall
            */
            // select a new letter
            targetLetter = alphabet[rndInt(0, alphabet.length - 1)];
            // ensure the target one is there at least one matching letter, quite high up
            Circle(Vec2(x + Math.random() * 300 - 250, y + Math.random() * -100 - 75), 40, 5 / 40, targetLetter);
            // create many little candies
            for (i = CANDY_COUNT; i--;) {
                Circle(Vec2(x + Math.random() * 100 - 50, y + Math.random() * -100)); // a bit higher please
            }
        }
        if (!me.noConfetti) {
            // reuse old confetti
            let found = 0;
            for (let i = objects.length; i--;) {
                if (objects[i].Z == CONFETTI_ID) { // gotcha
                    found++;
                    objects[i].R = CONFETTI_RADIUS;
                    objects[i].M = CONFETTI_MASS;
                    objects[i].C.x = x + Math.random() * 80 - 40;
                    objects[i].C.y = y + Math.random() * -80 - 40;
                    // add some random velocity
                    objects[i].V.x = Math.random() * 2000 - 1000;
                    objects[i].V.y = Math.random() * 2000 - 1000;
                }
            }
            // spawn some particles of confetti if we need them
            if (!found) { // first time init
                for (i = CONFETTI_COUNT; i--;) {
                    let c = new Circle(
                        Vec2(x + Math.random() * 80 - 40,
                            y + Math.random() * -80 - 40),
                        CONFETTI_RADIUS,
                        CONFETTI_MASS,
                        CONFETTI_ID);
                    // add some random velocity
                    c.V.x = Math.random() * 2000 - 1000;
                    c.V.y = Math.random() * 2000 - 1000;
                }
            }
        }
    }

    // NOTE: DO NOT USE "THIS." HERE!
    // IT DOES *NOT* REFER TO THE GAME HERE
    // "me" is the game's "this"
    function pinataClick(e) {
        if (!me.gameIsActive) return;
        console.log("pinataClick");
        //if (!window.playerShouldBePlayingPinata) return; // dont do anything if another game is running
        let correct = false;
        if (levelIsTransitioning) {
            // stop the slow fade in early
            levelIsTransitioning = false;
            transitionIsFadingIn = false;
            transitionIsFadingOut = false;
            gameCanvasContext.globalAlpha = 1;
            return; // dont register this click in game yet
        }
        // first click open the pinata!
        if (!me.introComplete && !me.noIntro) {
            console.log("Pinata just got smashed!")
            me.introComplete = true;
            boom(e.pageX, e.pageY, true);
            if (window.audioManager) {
                audioManager.pinataHitSound.play();
            } else {
                if (me.smashSound) me.smashSound.play();
            }
            return;
        }
        // detect WHICH circle we clicked!
        var clickXY = Vec2(e.pageX, e.pageY);
        var clickedABubble = false;
        for (let i = objects.length; i--;) {
            let checkme = objects[i];
            let dist = sub(clickXY, checkme.C);
            // ignores GIANT bubbles (like the floors)
            if ((length(dist) < checkme.R + 2) && (checkme.R < 200)) { // the +2 is a little extra leeway =)
                //console.log("You clicked letter " + checkme.Z + ' at a distance of ' + length(dist) + ' which is less than ' + checkme.R);
                // FIXME - handle >1 positive on same frame etc
                // did we succeed?
                clickedABubble = true;
                if (checkme.Z == targetLetter) {
                    console.log("You clicked the right letter: " + checkme.Z);
                    //depreciated playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
                    correct = true;
                }
                else { 
                    console.log("You clicked the wrong answer: " + checkme.Z + " not " + targetLetter);
                    correct = false;
                    //depreciated playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
                }

                if (me.alwaysPopLetters) {
                    // destroy the clicked bubble (only)
                    objects.splice(i, 1);
                    //correct = true; // always!?
                }
            }
        }
        if (correct) {
            amountCorrect++;
            if (window.audioManager) {
                audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray
                    (audioManager.multisoundPlayer.arrayOfGeneralPositiveFeedbackSounds);
                audioManager.pinataEatSound.play();
            } else {
                if (me.successSound) me.successSound.play();
            }
            boom(e.pageX, e.pageY, true)
        } else if (clickedABubble) { // don't count clicks on empty space as incorrect, since it might be a gui button etc
            amountIncorrect++;
            if (window.audioManager) {
                audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray
                    (audioManager.multisoundPlayer.arrayOfGeneralNegativeFeedbackSounds);
            } else {
                if (me.failSound) me.failSound.play();
            }
            boom(e.pageX, e.pageY, false)
        }
    }

    // rainbow generator
    // does not draw it! fills an array with colours
    function generateRainbowColours() {
        var size = 16;
        rainbow = new Array(size);
        for (var i = 0; i < size; i++) {
            var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
            var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
            var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg
            rainbow[i] = "#" + red + green + blue;
        }
        function sin_to_hex(i, phase) {
            var sin = Math.sin(Math.PI / size * 2 * i + phase);
            var int = Math.floor(sin * 127) + 128;
            var hex = int.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
    }

    // vars:
    // a: canvas
    // b: c1
    // c: ctx2d
    // d: c2
    // e: vFrom1to2
    // h: correctionAmount
    // i, j, k: loop vars
    // l: r1
    // m: r2
    // n: relativeVelocity
    // o: rVelocityInNormal
    // p: p
    // s: jN
    // t: impulse
    // u: tangent
    // x: jT
    // b.bgColor="#333";
    // a class constructor:
    function Circle(C, R = Math.random() * CANDY_START_RADIUS + CANDY_MIN_SIZE, M = CANDY_MASS, forcedString) {
        var newCircle = {
            C, // center
            I: 0, // inertia
            V: Vec2(M ? Math.random() * 1000 - 500 : 0, M ? Math.random() * -500 : 0), // velocity (speed)
            M, // inverseMass (0 if immobile)
            A: Vec2(0, M ? 250 : 0), // acceleration
            B: 0, //M ? Math.random() * 7 : 0, // angle? could start at random rotation
            D: 0, // angle velocity (stays on!)
            E: 0, // angle acceleration,
            R, // radius
            // random emojoi! works on most modern devices but not all
            //Z: String.fromCodePoint(0x1F600 + Math.random() * 69/*56*/ | 0)
            // random letter A-Z
            Z: forcedString || String.fromCharCode(65 + Math.floor(Math.random() * 26)),
            //color: "rgba("+rndInt(0,255)+","+rndInt(0,255)+","+rndInt(0,255)+",1)" //0.25)"
            color: "rgba(" + rndInt(64, 255) + "," + rndInt(64, 255) + "," + rndInt(64, 255) + ",1)" //0.25)"
            //I: M,   // (here it's simplified as M) Inertia = mass * radius ^ 2. 12 is a magic constant that can be changed
        };
        objects.push(newCircle);
        return newCircle;
    }
    this.newcircle = function (x, y, r, m) { // so other games can call this
        return new Circle(Vec2(x, y), r, m);
    }
}

