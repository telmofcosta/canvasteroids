var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    windowWidth = window.innerWidth,
    windowHeight = window.innerHeight,
    PIH = Math.PI/2, PI = Math.PI, PI2 = Math.PI * 2, PI3 = Math.PI * 3;
var foos = [];

canvas.width = windowWidth;
canvas.height = windowHeight;

var Foo = function(options) {
  options = options || {};
  var maxSpeed = 3;
  var self = this;
  this.x = Math.floor((Math.random()*windowWidth));
  this.y = Math.floor((Math.random()*windowHeight));
  this.d = {
    w: 10,
    h: 10,
    hw: 10/2, 
    hh: 10/2,
  };
  this.d.p1 = { x: 0, y: 10 };
  this.d.p2 = { x: Math.cos(PI/4.0*5.0) * 10, y: Math.sin(PI/4.0*5.0) * 10 }; 
  this.d.p3 = { x: -this.d.p2.x, y: this.d.p2.y }; 

  this.hw = this.w/2;
  this.hh = this.h/2;
  this.color = options.color || "rgb(200,0,0)";

  this.direction = Math.random() * PI2;
  this.speed = Math.random() * maxSpeed + 1;

  invertAngle = function(angle, o) {
    var a = angle;
    switch (o.axis.toLowerCase()) {
      case "y":
        angle = PI2 - angle;
        break;
      case "x":
        angle = angle > Math.PI ? PI3 - angle : PI - angle;
        break;
    }
    return angle;
  }

  this.update = function() {
    //self.x += self.speedX;
    //self.y += self.speedY;
    //if (self.x >= windowWidth || self.x < 0) { self.speedX *= -1; }
    //if (self.y >= windowHeight || self.y < 0) { self.speedY *= -1; }

    self.x += (Math.cos(self.direction) * self.speed);
    self.y -= (Math.sin(self.direction) * self.speed);
    if (self.x >= windowWidth || self.x < 0) {
      self.direction = invertAngle(self.direction, { axis: "X" });
    }
    if (self.y >= windowHeight || self.y < 0) {
      self.direction = invertAngle(self.direction, { axis: "Y" })
    }
  }
  this.draw = function() {
    ctx.save();
    ctx.translate(self.x, self.y);
    ctx.rotate(-(PIH+self.direction));
    ctx.fillStyle = self.color;
    ctx.strokeStyle = self.color;
    ctx.beginPath();
    ctx.moveTo(self.d.p1.x, self.d.p1.y);
    ctx.lineTo(self.d.p2.x, self.d.p2.y);
    ctx.lineTo(self.d.p3.x, self.d.p3.y);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}

for(var i=0; i<20; i++) {
  foos.push(new Foo());
}
var myFoo = new Foo({color: "rgb(0,0,200)"})

function draw() {
  //ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  //ctx.fillRect (0, 0, windowWidth, windowHeight);
  ctx.clearRect (0, 0, windowWidth, windowHeight);
  for(var i=0; i<foos.length; i++) {
    foos[i].draw();
  }
  myFoo.draw();
}

function update() {
  for(var i=0; i<foos.length; i++) {
    var foo = foos[i];
    foo.update();
  }
  myFoo.update();
}

function keyDown(evt) {
  switch (evt.keyCode) {
  case 38:  /* Up arrow was pressed */
    break;
  case 40:  /* Down arrow was pressed */
    break;
  case 37:  /* Left arrow was pressed */
    myFoo.direction += 0.1;
    break;
  case 39:  /* Right arrow was pressed */
    myFoo.direction -= 0.1;
    break;
  }
  while (myFoo.direction < 0) { myFoo.direction += PI2 };
  while (myFoo.direction > PI2) { myFoo.direction -= PI2 };

}

window.addEventListener('keydown', keyDown, true);
setInterval(function() {
  draw();
  update();
}, 1000/60);



