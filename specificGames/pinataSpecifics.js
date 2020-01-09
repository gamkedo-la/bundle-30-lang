// Pinata minigame
// work in progress - todo: expand variable names and insert into game

// physics code comes from this public domain work by XEM
// https://github.com/xem/mini2Dphysics

var pinataGame = new function() {

// list of all known Circles
var objects = [];

// tiny functions to handle 2d vectors
var Vec2 = (x,y,t) => ({x,y});
var length = (x,y,t)=> dot(x,x)**.5;
var add = (x,y,t) => Vec2(x.x+y.x, x.y+y.y);
var substract = (x,y,t) => add(x, scale(y, -1));
var scale = (x,y,t) => Vec2(x.x*y, x.y*y);
var dot = (x,y,t) => x.x*y.x + x.y*y.y;
var cross = (x,y,t) => x.x*y.y - x.y*y.x;
var normalize = (x,y,t) => scale(x, 1 / (length(x) || 1));
var rnd = (minimum,maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

function pinataClick(e) {
    // console.log("Pinata game click");
    //Circle(Vec2(e.pageX, e.pageY));
    // create many little candies
    for(i = 20; i--; ){
        Circle(Vec2(e.pageX+Math.random()*10-5,e.pageY+Math.random()*10-5));
    }


}

this.init = function() {
    // console.log("Pinata game init!")

    var c = gameCanvasContext;
    var a = gameCanvas;

    // Init scene
    //Circle(Vec2(800, 1000), 600, 0); // floor!
    Circle(Vec2(640, 5500), 5000, 0); // floor!

    // create many little candies
    //for(i = 99; i--; ){
    //    Circle(Vec2(Math.random() * 900 + 300, Math.random() * 900 - 700));
    //}

    // debug only: spawn new candy on mouseclick
    // onclick = e => Circle(Vec2(e.pageX, e.pageY));

    document.addEventListener('click', pinataClick, false);

    // temp animation loop
    setInterval(
    e => {

        if (levelIsTransitioning) return;

        //a.width ^= 0; // clear the screen
        c.fillStyle = "rgba(150,220,255,1)";
        c.fillRect(0,0,a.width,a.height);

        // Compute collisions
        for(i = objects.length; i--;){
        for(j = objects.length; j-->i;){
            //for(k = 15; k--;){
                b = objects[i];
                d = objects[j];
                //if((b.M && b.C.y < 400) || (d.M && d.C.y < 400)){ // perf

                // Test collision
                e = substract(d.C, b.C);
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
                    l = substract(p, b.C);
                    m = substract(p, d.C);
                    //newV = V + D cross R
                    n = substract(add(d.V, Vec2(-1 * d.D * m.y, d.D * m.x)), add(b.V, Vec2(-1 * b.D * l.y, b.D * l.x)));
                    //if objects moving apart ignore
                    //if(dot(n, N) < 0){
                    // Calc t scalar
                    // the formula of s can be found in http://www.myphysicslab.com/collision.html
                    s = (-1.5 * dot(n, N)) / (b.M + d.M + cross(l, N) ** 2 * b.M + cross(m, N) ** 2 * d.M);
                    //t is in direction of normal ( from b to d)
                    t = scale(N, s);
                    // t = F dt = m * ?v
                    // ?v = t / m
                    b.V = substract(b.V, scale(t, b.M));
                    d.V = add(d.V, scale(t, d.M));
                    b.D -= cross(l, N) * s * b.M;
                    d.D += cross(m, N) * s * d.M;
                    u = scale(normalize(substract(n, scale(N, dot(n, N)))), -1);
                    x = -1.5 * dot(n, u) * .5 / (b.M + d.M + cross(l, u) ** 2 * b.M + cross(m, u) ** 2 * d.M);
                    //t is from b to d (in opposite direction of velocity)
                    t = scale(u, x);
                    b.V = substract(b.V, scale(t, b.M));
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

        // Draw
        c.save();
        c.beginPath();
        c.translate(b.C.x, b.C.y);
        c.rotate(b.B);
        c.arc(0, 0, b.R, 0, 7);
        //c.lineWidth = 3;
        c.font = b.R * 1.9 + "px a";
        c.textAlign = "center";

        if(objects[i].M) {
            //c.fillStyle = "rgba(0,0,0,0.25)";
            c.fillStyle = objects[i].color;
            //c.fillText(b.Z, -b.R * 1.24, b.R * .67); // the emoji
            c.fillText(b.Z, 0, b.R * 0.65); // the letter
            c.fill(); // circle
            }
        else {
            c.fillStyle = "rgba(80,60,40,1)";
            c.fill(); // the ground
        }
        c.restore();
        }
    },
    9
    );

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
var Circle = (C, R = Math.random() * 30 + 10, M = 1/R) =>

  objects.push(
    {
    C, // center
    I: 0, // inertia
    V: Vec2(0, 0), // velocity (speed)
    M, // inverseMass (0 if immobile)
    A: Vec2(0, M ? 250 : 0), // acceleration
    B: M ? Math.random() * 7 : 0, // angle
    D: 0, // angle velocity
    E: 0, // angle acceleration,
    R, // radius

    // random emojoi! works on most modern devices but not all
    //Z: String.fromCodePoint(0x1F600 + Math.random() * 69/*56*/ | 0)

    // random letter A-Z
    Z: String.fromCharCode(65+Math.floor(Math.random() * 26)),
    color: "rgba("+rnd(0,255)+","+rnd(0,255)+","+rnd(0,255)+",0.25)"

    //I: M,   // (here it's simplified as M) Inertia = mass * radius ^ 2. 12 is a magic constant that can be changed
  });

}(); // create new pinataGame object immediately
