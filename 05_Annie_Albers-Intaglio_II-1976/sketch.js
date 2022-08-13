// Anni Albers
// Intaglio II - 1976
// https://www.phillips.com/detail/anni-albers/NY000419/3
var paperColor;
var inkColor;

// p5.utils library declare
var utils = new p5.Utils();

function setup() {
  createCanvas(800, 1000);

  // Background color
  paperColor = color(245, 228, 205);

  // Ink Color
  inkColor = color(50, 50, 50);

  // Set Background color
  background(paperColor);

  // Do not repeat draw() function
  noLoop();
}

function draw() {
  background(paperColor);

  var colNum = 22;
  var rowNum = 26;
  var total = colNum * rowNum;
  var gridW = width - 150;
  var gridH = height - 300;

  // there are 5 different shapes
  // 4 triangles
  // 1 square
  var choices = 5;


  var grid = utils.createGrid(
    rowNum,
    colNum,
    gridW,
    gridH,
    0,
    GRID.SQUARE,
    true,
    true);

  noStroke();



  // Background shadow for paper look
  fill(paperColor);
  utils.beginShadow(color(0, 0, 0, 30), 10, 0, 0);
  var margin = 50;
  rect(grid[0].x - margin * 0.5, grid[0].y - margin * 0.5, grid[0].w * colNum + margin, grid[0].h * rowNum + margin)
  utils.endShadow();



  noFill();




  for (var i = 0; i < total; i++) {
    // Debug
    //rect(grid[i].x, grid[i].y, grid[i].w, grid[i].h);
    fill(inkColor);
    //var dice = random(0, choices);
    var dicePercentage = random(0, 1);

    // Probability of each shape's chance to be drawn = 0.2 ~ 20%
    var chance = 1. / choices;

    var tri1Chance = 0.2;
    var tri2Chance = 0.30;
    var tri3Chance = 0.45;
    var tri4Chance = 0.68;
    var sqChance = 1.;


    if (i != 0 && i != colNum - 1 && i != total - colNum && i != total - 1) {

      if (dicePercentage < tri1Chance) {
        //fill(244, 0, 0);
        triangle1(grid[i].x, grid[i].y, grid[i].w);
      } else if (dicePercentage < tri2Chance) {
        //fill(0, 200, 0);
        triangle2(grid[i].x, grid[i].y, grid[i].w);
      } else if (dicePercentage < tri3Chance) {
        //fill(0, 0, 200);
        triangle3(grid[i].x, grid[i].y, grid[i].w);
      } else if (dicePercentage < tri4Chance) {
        //fill(0, 200, 200);
        triangle4(grid[i].x, grid[i].y, grid[i].w);
      } else if (dicePercentage < sqChance) {
        rect(grid[i].x, grid[i].y, grid[i].w, grid[i].h);
      }

      /*if (dice < 1) {
        triangle1(grid[i].x, grid[i].y, grid[i].w);
      }

      if (dice > 1 && dice < 2) {
        triangle2(grid[i].x, grid[i].y, grid[i].w);
      }


      if (dice > 2 && dice < 3) {
        triangle3(grid[i].x, grid[i].y, grid[i].w);
      }

      if (dice > 3 && dice < 4) {
        triangle2(grid[i].x, grid[i].y, grid[i].w);
      }

      if (dice > 4) {
        rect(grid[i].x, grid[i].y, grid[i].w, grid[i].h);
      }*/
    }
    if (i == 0) {
      triangle4(grid[i].x, grid[i].y, grid[i].w);
    }

    if (i == colNum - 1) {
      triangle1(grid[i].x, grid[i].y, grid[i].w);
    }

    if (i == total - colNum) {
      triangle2(grid[i].x, grid[i].y, grid[i].w);
    }


    if (i == total - 1) {
      triangle3(grid[i].x, grid[i].y, grid[i].w);
    }
  }

}

function triangle1(x, y, sz) {
  beginShape();
  push();
  translate(x, y);
  vertex(x, y);
  vertex(x + sz, y + sz);
  vertex(x, y + sz);
  pop();
  endShape(CLOSE);
}

function triangle2(x, y, sz) {
  beginShape();
  push();
  translate(x, y);
  vertex(x, y);
  vertex(x + sz, y);
  vertex(x + sz, y + sz);
  pop();
  endShape(CLOSE);
}

function triangle3(x, y, sz) {
  beginShape();
  push();
  translate(x, y);
  vertex(x, y);
  vertex(x + sz, y);
  vertex(x, y + sz);
  pop();
  endShape(CLOSE);
}

function triangle4(x, y, sz) {
  beginShape();
  push();
  translate(x, y);
  vertex(x + sz, y);
  vertex(x + sz, y + sz);
  vertex(x, y + sz);
  pop();
  endShape(CLOSE);
}

function keyPressed() {
  if (key == 's') {
    utils.saveCanvas("anni_albers");
  }

  if (key == 'r') {
    draw();
  }
}