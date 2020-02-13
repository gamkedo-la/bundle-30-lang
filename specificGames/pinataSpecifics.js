// Pinata minigame
// work in progress - todo: expand variable names and insert into game

// physics code comes from this public domain work by XEM
// https://github.com/xem/mini2Dphysics

var playerShouldBePlayingPinata = false;

var pinataGame = new function() {

// list of all known candies
var objects = [];

// game state: have we done the initial smash?
var pinataSmashed = false;

// how many poppable letter choices will fall out
const CANDY_COUNT = 16;
const CANDY_MIN_SIZE = 20;
const CANDY_START_RADIUS = 80;
const CANDY_SHRINK = -0.2;
const CANDY_MASS = 1; 

// special case: candies with a "space" as the letter are considered particles of confetti
const CONFETTI_COUNT = 20; // currently it messes up the physics
const CONFETTI_RADIUS = 10; // starting size
const CONFETTI_MASS = 100; // the higher the number, the LESS it weighs! FIXME 
const CONFETTI_SHRINKSPEED = 0.975; // % each frame
const CONFETTI_ID = " ";

// tiny functions to handle 2d vectors
var Vec2 = (x,y) => ({x,y});
var length = (x)=> dot(x,x)**.5;
var add = (x,y) => Vec2(x.x+y.x, x.y+y.y);
var sub = (x,y) => add(x, scale(y, -1));
var scale = (x,y) => Vec2(x.x*y, x.y*y);
var dot = (x,y) => x.x*y.x + x.y*y.y;
var cross = (x,y) => x.x*y.y - x.y*y.x;
var normalize = (x) => scale(x, 1 / (length(x) || 1));
var rndInt = (minimum,maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

// which one we want to click
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var targetLetter = alphabet[rndInt(0,alphabet.length-1)];

function boom(x,y,wasCorrect) {

    if (wasCorrect) {

        /*
        // destroy the world!
        objects = [];
        // Init scene ground floor
        Circle(Vec2(320, 5700), 5000, 0); // floor!
        Circle(Vec2(2840, 5000), 5000, 0); // r wall
        Circle(Vec2(-2200, 5000), 5000, 0); // l wall
        */

        // select a new letter
        targetLetter = alphabet[rndInt(0,alphabet.length-1)];
        // ensure the target one is there at least one matching letter, quite high up
        Circle(Vec2(x+Math.random()*300-250,y+Math.random()*-100-75),40,5/40,targetLetter);

        // create many little candies
        for(i = CANDY_COUNT; i--; ){
            Circle(Vec2(x+Math.random()*100-50,y+Math.random()*-100)); // a bit higher please
        }
    }

        // reuse old confetti
        let found = 0;
        for(let i=objects.length; i--;) {
            if (objects[i].Z==CONFETTI_ID) { // gotcha
                found++;
                objects[i].R = CONFETTI_RADIUS;
                objects[i].M = CONFETTI_MASS;
                objects[i].C.x = x+Math.random()*80-40;
                objects[i].C.y = y+Math.random()*-80-40;
                // add some random velocity
                objects[i].V.x = Math.random()*2000-1000;
                objects[i].V.y = Math.random()*2000-1000;
            }
        }

        // spawn some particles of confetti if we need them
        if (!found) { // first time init
            for(i = CONFETTI_COUNT; i--; ){
                let c = new Circle(
                    Vec2(x+Math.random()*80-40,
                    y+Math.random()*-80-40),
                    CONFETTI_RADIUS,
                    CONFETTI_MASS,
                    CONFETTI_ID);
                // add some random velocity
                c.V.x = Math.random()*2000-1000;
                c.V.y = Math.random()*2000-1000;
            }
        }

}

function pinataClick(e) {
    // console.log("Pinata game click");
    let correct = false;

    // stop the slow fade in early
    levelIsTransitioning = false;
    transitionIsFadingIn = false;
    transitionIsFadingOut = false;
    gameCanvasContext.globalAlpha = 1;

    // detect WHICH circle we clicked!
    var clickXY = Vec2(e.pageX,e.pageY);
    for(let i = objects.length; i--;){
        let checkme = objects[i];
        let dist = sub(clickXY, checkme.C);
        if (length(dist) < checkme.R + 2) { // the +2 is a little extra leeway =)
            console.log("You clicked letter " + checkme.Z + ' at a distance of ' + length(dist) + ' which is less than ' + checkme.R);
            // FIXME - handle >1 positive on same frame etc
            // did we succeed?
            if (checkme.Z == targetLetter) {
                console.log("You clicked the right letter!");
                playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
                correct = true;
            }
            else {
                console.log("You clicked the wrong answer!");
                playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
            }
        }
    }

    if (correct) {
        amountCorrect++;
        boom(e.pageX,e.pageY,true)
    } else {
        amountIncorrect++;
        boom(e.pageX,e.pageY,false)
    }


}

// rainbow generator
var size    = 16;
var rainbow = new Array(size);
for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg
  rainbow[i] = "#"+ red + green + blue;
}
function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);
 return hex.length === 1 ? "0"+hex : hex;
}

this.init = function() {
    // console.log("Pinata game init!")

    var c = gameCanvasContext;
    var a = gameCanvas;

    currentBackgroundMusic.pause();
    currentBackgroundMusic = pinataBackgroundMusic;

    // Init scene ground floor
    Circle(Vec2(320, 5700), 5000, 0); // floor!
    Circle(Vec2(2840, 5000), 5000, 0); // r wall
    Circle(Vec2(-2200, 5000), 5000, 0); // l wall
    boom(a.width/2,a.height/2,true)// middle of screen

    // debug only: spawn new candy on mouseclick
    // onclick = e => Circle(Vec2(e.pageX, e.pageY));

    document.addEventListener('click', pinataClick, false);

    // temp animation loop
    setInterval(
    e => {

        if (levelIsTransitioning || !playerShouldBePlayingPinata) return;

        //a.width ^= 0; // clear the screen hack
        c.fillStyle = "rgba(150,220,255,1)"; // sky blue
        c.fillRect(0,0,a.width,a.height);

        // draw a nice sky
        for (i=0; i<rainbow.length; i++) {
            c.fillStyle = rainbow[i];
            c.beginPath();
            c.arc(320, 900+i*50, 1000, 0, 7);
            c.fill();
        }

        // draw the pinata if it has not been smashed yet
        if (!pinataSmashed) {
            
        }

        // Compute collisions
        for(i = objects.length; i--;){
        for(j = objects.length; j-->i;){
            //for(k = 15; k--;){
                b = objects[i];
                d = objects[j];
                //if((b.M && b.C.y < 400) || (d.M && d.C.y < 400)){ // perf

                // Test collision
                e = sub(d.C, b.C);
                if (length(e) < b.R + d.R){
                D = b.R + d.R - length(e), // depth
                N = normalize(e), // normal
                S = add(d.C, scale(normalize(scale(e, -1)), d.R)), // start
                E = add(S, scale(N, D)) // end

                // Resolve collision
                if (b.M || d.M) {
                    //  correct positions
                    h = scale(N, D / (b.M + d.M) * .8); // .8 = poscorrectionrate = percentage of separation to project objects
                    b.C = add(b.C, scale(h, -b.M));
                    d.C = add(d.C, scale(h, d.M));
                    //the direction of collisionInfo is always from b to d
                    //but the Mass is inversed, so start scale with d and end scale with b
                    p = add(scale(S, d.M / (b.M + d.M)), scale(E, b.M / (b.M + d.M)));
                    //r is vector from center of object to collision point
                    l = sub(p, b.C);
                    m = sub(p, d.C);
                    //newV = V + D cross R
                    n = sub(add(d.V, Vec2(-1 * d.D * m.y, d.D * m.x)), add(b.V, Vec2(-1 * b.D * l.y, b.D * l.x)));
                    //if objects moving apart ignore
                    //if(dot(n, N) < 0){
                    // Calc t scalar
                    // the formula of s can be found in http://www.myphysicslab.com/collision.html
                    s = (-1.5 * dot(n, N)) / (b.M + d.M + cross(l, N) ** 2 * b.M + cross(m, N) ** 2 * d.M);
                    //t is in direction of normal ( from b to d)
                    t = scale(N, s);
                    // t = F dt = m * ?v
                    // ?v = t / m
                    b.V = sub(b.V, scale(t, b.M));
                    d.V = add(d.V, scale(t, d.M));
                    b.D -= cross(l, N) * s * b.M;
                    d.D += cross(m, N) * s * d.M;
                    u = scale(normalize(sub(n, scale(N, dot(n, N)))), -1);
                    x = -1.5 * dot(n, u) * .5 / (b.M + d.M + cross(l, u) ** 2 * b.M + cross(m, u) ** 2 * d.M);
                    //t is from b to d (in opposite direction of velocity)
                    t = scale(u, x);
                    b.V = sub(b.V, scale(t, b.M));
                    d.V = add(d.V, scale(t, d.M));
                    b.D -= cross(l, u) * x * b.M;
                    d.D += cross(m, u) * x * d.M;
                    //}
                //}
            // }
            }
            }
        }

        // Update scene
        b.V = add(b.V, scale(b.A, .01));
        b.C = add(b.C, scale(b.V, .01));
        b.D += b.E * .01;
        b.B += b.M ? b.D * .01 : .001;

        // shrink!
        if (b.M && b.R > CANDY_MIN_SIZE) b.R += CANDY_SHRINK;

        // Draw
        c.save();
        c.beginPath();
        c.translate(b.C.x, b.C.y);
        c.rotate(b.B);
        c.arc(0, 0, b.R, 0, 7);
        //c.lineWidth = 3;
        c.font = b.R * 1.9 + "px a";
        c.textAlign = "center";

        if (b.Z==CONFETTI_ID) {
            b.R *= CONFETTI_SHRINKSPEED;
        }

        if(objects[i].M) { // does it have mass?

            if (b.Z == targetLetter) {
                // debug mode: easy to find flashing balls
                c.fillStyle = "rgba("+rndInt(100,255)+","+rndInt(100,255)+","+rndInt(100,255)+",1)";
            } else {
                c.fillStyle = objects[i].color; // selet ball colour
            }

            c.fill(); // circle

            // draw the letter using html font
            //c.fillStyle = "white"; // txt color
            //c.fillText(b.Z, 0, b.R * 0.65);

            if (b.Z==CONFETTI_ID) {
                // emoji! works on most modern devices but not all
                c.fillText(String.fromCodePoint(0x1F600 + (i % 69/*56*/)), b.R*1.5,0, 0-b.R*0.75,0-b.R*0.75);
            } else {
                // draw the letter using bitmap font
                customFontFillText([b.Z], b.R*1.5,0, 0-b.R*0.75,0-b.R*0.75);
            }


        }
        else { // no mass? must be the ground
            c.fillStyle = "rgba(80,60,40,1)";
            c.fill(); // the ground
        }
        c.restore();

        // draw mission customFontFillText(fontSize, spacing, xCoordinate,yCoordinate)
        customFontFillText(['Click the letter ' + targetLetter],32,24,80,32);
        drawBackButton();
        }

    }, // func
    9 // framerate in ms
    ); // setInterval

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

function Circle(C, R = Math.random() * CANDY_START_RADIUS + CANDY_MIN_SIZE, M = CANDY_MASS, forcedString)
{
    var newCircle = {
        C, // center
        I: 0, // inertia
        V: Vec2(M ? Math.random()*1000-500 : 0, M ?  Math.random()*-500 : 0), // velocity (speed)
        M, // inverseMass (0 if immobile)
        A: Vec2(0, M ? 250 : 0), // acceleration
        B: M ? Math.random() * 7 : 0, // angle
        D: 0, // angle velocity (stays on!)
        E: 0, // angle acceleration,
        R, // radius
        // random emojoi! works on most modern devices but not all
        //Z: String.fromCodePoint(0x1F600 + Math.random() * 69/*56*/ | 0)
        // random letter A-Z
        Z: forcedString || String.fromCharCode(65+Math.floor(Math.random() * 26)),
        //color: "rgba("+rndInt(0,255)+","+rndInt(0,255)+","+rndInt(0,255)+",1)" //0.25)"
        color: "rgba("+rndInt(64,255)+","+rndInt(64,255)+","+rndInt(64,255)+",1)" //0.25)"
        //I: M,   // (here it's simplified as M) Inertia = mass * radius ^ 2. 12 is a magic constant that can be changed
    };
    objects.push(newCircle);
    return newCircle;
    }

    this.drawTransitionText = function()
    {
        customFontFillText(['Piñata Pop', symbolExclamationPointImage],80,42,100,50);
        customFontFillText(['Click the right letter'],32,24,80,250);
        customFontFillText(['as fast as you can',symbolExclamationPointImage],32,24,80,290);
    }

}(); // create new pinataGame object immediately
