var brickSrc = "brick.png";
var grid;
var img;
var gridSz;
var scl = 0.75;

function preload() {
  grid = loadImage(brickSrc);
  img = loadImage("img2.jpg");
}

function setup() {
  createCanvas(400, 400);

  gridSz = grid.width * scl;

  var numRow = (img.height / (gridSz));
  var numCol = (img.width / (gridSz));

  resizeCanvas(
    numCol * (gridSz),
    numRow * (gridSz));
  noLoop();
}

function draw() {
  background(220);

  image(img, 0, 0);
  //image(grid, 0, 0);

  noStroke();

  img.loadPixels();
  for (var y = 0; y < height; y += gridSz) {
    for (var x = 0; x < width; x += gridSz) {
      let index = (x + y * width) * 4;

      let pix = img.get(x, y);

      // pixel color at the x and y position 
      fill(red(pix), green(pix), blue(pix), 255);

      // draw rectangle
      //rect(x, y, gridSz, gridSz);
      tint(red(pix), green(pix), blue(pix), 255);
      image(grid, x, y, gridSz, gridSz);
    }
  }
  img.updatePixels();
}
