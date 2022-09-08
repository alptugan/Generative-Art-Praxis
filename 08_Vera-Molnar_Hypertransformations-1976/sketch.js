p5.disableFriendlyErrors = true;

// For Vera Molnar
// ref:  https://digitalartmuseum.org/gallery/image/8836.html
// Hypertransformations - 1975/76

var numP = 80;
var p = [];
var w, h;
var numSq = 20;

var utils = new p5.Utils();

function setup() {
  createCanvas(800, 800);
  init();
}

function init() {
  w = width - 350;
  h = width - 350;
  var gap = 20;
  p = [];
  for (let i = 0; i < numSq; i++) {
    var nFac = i;
    if (i == 0 || i === numSq - 1)
      nFac = 0;

    p.push({ "pos": getRectPoints(numP, nFac, w, h), "w": w, "h": h, "res": numP });
    w -= gap;
    h -= gap;
    numP = 80 - floor(log(i + 1) * (gap - 10));
  }
}
function draw() {
  //strokeWeight(2)
  //smooth();
  background(220);
  for (let i = 0; i < p.length; i++) {
    push();
    translate(width * 0.5 - p[i].w * 0.5, height * 0.5 - p[i].h * 0.5);
    noFill();
    drawShape(p[i]);
    pop();
  }

  noLoop();
}

function drawShape(_p) {
  beginShape();
  //curveTightness(0);
  for (var i = 0; i < _p.pos.length; i++) {
    vertex(_p.pos[i].x, _p.pos[i].y);
  }
  endShape(CLOSE);
}

function getRectPoints(_res, _j, _w, _h) {

  var m = floor(_res / 4) + 1;
  var arr = [];

  var range = random(2, 60);

  // TOP SIDE
  for (let i = 0; i < _res; i++) {

    if (i < m) {
      var x = floor(_w / m) * floor(i % m);
      var y = 0;
      //vertex(x, y);
      //text(i, x, y);
      arr.push({ "x": x, "y": y });
    }
    // RIGHT SIDE
    if (i >= m && i < (2 * m)) {
      var x = _w;
      var y = floor(_h / m) * floor(i % m);
      //vertex(x, y);
      //text(i, x, y);
      arr.push({ "x": x, "y": y });
    }

    // BOTTOM SIDE
    if (i >= (2 * m) && i < (3 * m)) {
      var x = _w - floor(_w / m) * floor(i % m);
      var y = _h;
      //vertex(x, y);
      //text(i, x, y);
      arr.push({ "x": x, "y": y });
    }

    // LEFT SIDE
    if (i >= 3 * m && i < _res) {
      var x = 0;
      var y = _h - floor(_h / m) * floor(i % m);
      //text(i, x, y);
      //vertex(x, y);
      arr.push({ "x": x, "y": y });

    }
  }

  for (let i = 0; i < _res; i++) {
    var adx = 0;
    var ady = 0;

    var f = range * abs(sin(TWO_PI + i * 0.0001)) * 0.2;

    if (_j != 0) {
      var sRange = range;
      var sRange2 = range * 0.6;
      ady = -sRange * 0.5 + noise(_j * 0.1, i * f) * sRange;
      adx = -sRange2 * 0.5 + noise(i * 0.2, _j * f) * sRange2;
    }

    arr[i].y += ady;
    arr[i].x += adx;
  }

  return arr;
}

function keyPressed() {
  if (key == 's') {
    utils.saveCanvas("Vera_Molnar_Hypertransformations");
  }

  if (key == 'd') {
    init();

    draw();
  }
}