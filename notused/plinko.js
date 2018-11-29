const Matter = require('matter-js/build/matter.js');

function Plinko(x, y, r, engine) {
    var options = {
        restitution: 1,
        friction: 0,
        isStatic: true
    };
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.r = r;
    Matter.World.add(engine.world, this.body);
}

Plinko.prototype.show = function() {
    fill(127);
    noStroke();
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}

module.exports = Plinko;