const Matter = require('matter-js/build/matter.js');

function Boundary(x, y, w, h, engine) {
    var options = {
        isStatic: true
    }
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    Matter.World.add(engine.world, this.body);
}

Boundary.prototype.show = function() {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
}

module.exports = Boundary;