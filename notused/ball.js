const Matter = require('matter-js/build/matter.js');

function Ball(x, y, r, engine) {
    var options = {
        restitution: 0.5,
        friction: 0,
        density: 0.1
    }
    x += Math.round(Math.random() * (1 + 1) - 1);
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    Matter.World.add(engine.world, this.body);
}

Ball.prototype.isOffScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height);
}

Ball.prototype.show = function() {
    noStroke();
    fill(this.hue, 255, 255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}

module.exports = Ball;