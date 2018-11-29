// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var balls = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 10;

const BALL_SIZE = 20;
const PLINKO_SIZE = 4;
const BOUNDARY_HEIGHT = 100;

function setup() {
    createCanvas(600, 700);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 2;
    newBall();
    var spacing = width / cols;
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols+1; i++) {
            var x = i * spacing;
            if (j % 2 == 0) {
                x += spacing / 2;
            }
            var y = spacing + j * spacing;
            var p = new Plinko(x, y, PLINKO_SIZE);
            plinkos.push(p);
        }
    }

    var bound = new Boundary(width/2, height + 50, width, BOUNDARY_HEIGHT);
    bounds.push(bound);

    cols = 5;
    spacing = width / cols;
    for (var i = 0; i < cols + 1; i++) {
        var x = i * spacing;
        var h = 100;
        var w = 10;
        var y = height - h/2;
        var bound = new Boundary(x, y, w, h);
        bounds.push(bound)
    }
}

function newBall() {
    var b = new Ball(300, 0, BALL_SIZE);
    balls.push(b);
}

function draw() {
    if (frameCount % 20 == 0 && balls.length < 10) {
        newBall();
    }
    background(0, 0, 0);
    Engine.update(engine, 16.666);
    for (var i = 0; i < balls.length; i++) {
        balls[i].show();
        if (balls[i].isOffScreen()) {
            World.remove(world, balls[i].body);
            balls.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].show();
    }
    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }
}