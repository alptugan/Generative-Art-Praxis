var brickSrc = "brick.png";
var grid;
var img;
var gridSz;
var scl = 1;

function preload() {
  grid = loadImage(brickSrc);
  img = loadImage("img.png");
}

function setup() {
  createCanvas(400, 400);

  gridSz = grid.width * scl;

  var numRow = floor(img.height / floor(gridSz * scl));

  resizeCanvas(img.width, numRow * floor(gridSz * scl));
  noLoop();
}

function draw() {
  background(220);

  image(img, 0, 0);
  //image(grid, 0, 0);

  noStroke();

  img.loadPixels();
  for (var y = 0; y < height; y += gridSz * scl) {
    for (var x = 0; x < width; x += gridSz * scl) {
      let index = (x + y * width) * 4;

      let pix = img.get(x, y);

      // pixel color at the x and y position 
      fill(red(pix), green(pix), blue(pix), 255);

      // draw rectangle
      //rect(x, y, gridSz, gridSz);
      tint(red(pix), green(pix), blue(pix), 255);
      image(grid, x, y, gridSz * scl, gridSz * scl);
    }
  }
  img.updatePixels();
}
