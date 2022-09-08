// Anni Albers
// Intaglio IV - 1976
// https://www.phillips.com/detail/anni-albers/NY000419/3
var paperColor;
var inkColor;

// p5.utils library declare
var utils = new p5.Utils();

var diceId = 1;
var dices = [];
var shapes = [];

var colNum;
var rowNum;
var total;
var gridW;
var gridH;
var grid;

var counter = 0;
var debug = true;

function setup() {
  createCanvas(800, 1000);

  // Background color
  paperColor = color(245, 228, 205);

  // Ink Color
  inkColor = color(194, 53, 40);

  // Set Background color
  background(paperColor);

  // Do not repeat draw() function
  // noLoop();

  colNum = 22;
  rowNum = 26;
  total = colNum * rowNum;
  gridW = width - 150;
  gridH = height - 300;
  debug = false;

  grid = utils.createGrid(
    rowNum,
    colNum,
    gridW,
    gridH,
    0,
    GRID.SQUARE,
    true,
    true);
  //randomSeed(534)
  for (var i = 0; i < total; i++) {
    var x = grid[i].x;
    var y = grid[i].y;
    var sz = grid[i].w;

    var rMult = random(0.5, 0.52);
    var typeId = 1 + floor(abs(sin(x * 0.1524 + y * rMult)) * 6);
    // print(typeId);
    var s = new GridItem(typeId, i, x, y, sz);
    //var s = new GridItem(floor(random(1, 6)), i, x, y, sz);
    shapes.push(s);

    // CORNERS are fixed
    var id = i;
    if (id == 0) {
      shapes[i].type = 3;
    } else if (id == (total - colNum)) {
      shapes[i].type = 1;
    } else if (id == (total - 1)) {
      shapes[i].type = 4;
    } else if (id == (colNum - 1)) {
      shapes[i].type = 2;
    }

  }

  for (var i = 0; i < total; i++) {

    while (decideShape(checkNeighbours(i), i)) {
      //decideShape(checkNeighbours(i), i);
      print("trying...")
    }
  }
  print("done iteration")

  /*
    // Returns number of neighbors
    var arr = checkNeighbours(0);
    for (var j = 0; j < arr.length; j++) {
      print(arr[j].r, arr[j].br, arr[j].b)
    }*/

  noLoop();

}


function draw() {
  background(paperColor);



  noStroke();



  // Background shadow for paper look
  fill(paperColor);
  utils.beginShadow(color(0, 0, 0, 30), 10, 0, 0);
  var margin = 50;
  rect(grid[0].x - margin * 0.5, grid[0].y - margin * 0.5, grid[0].w * colNum + margin, grid[0].h * rowNum + margin)
  utils.endShadow();






  // DRAW SHAPES
  for (let i = 0; i < shapes.length; i++) {
    const element = shapes[i];
    element.display();

    if (debug) {
      fill(9);
      text(element.type, grid[i].x + grid[i].w * 0.5, grid[i].y + grid[i].h * 0.55);
    }

  }


  fill(44, 0, 200, 100)
  // DRAW SCANNING RECT
  if (counter > 1 && debug)
    rect(grid[counter - 1].x, grid[counter - 1].y, grid[counter - 1].w, grid[counter - 1].w);

  if (utils.notify(0.01)) {

    var nArr;
    //nArr = checkNeighbours(counter, debug);
    noStroke();
    //decideShape(nArr, counter);

    counter++;

    if (counter == total) {
      counter = 0;

      // shapes = [];
    }
  }

  // DRAW GRID ID
  if (debug) {
    utils.debugGrid();
  }


}

function decideShape(nArr, id) {


  //print(id, nArr.length)
  // check left - right - up - down
  var changed = false;
  for (let i = 0; i < nArr.length; i++) {
    // Neighbors of ${id}
    // id is the self
    // nArr are the neighbor ids
    var nl = nArr[i].l;
    var nt = nArr[i].t;

    if (shapes[nt] != undefined) {

      //print("Neighbor types of ", n, " are ", shapes[n].type);
      if (nArr[i].t != undefined) {
        //print("top exist : ", id, " : ", nArr[i].t)
        if ((shapes[nArr[i].t].type == 4) && (shapes[id].type == 3 || shapes[id].type == 2)) {
          var availableArr = [1, 5];
          var newDiceId = floor(random(0, availableArr.length));
          diceId = availableArr[newDiceId];
          shapes[id].type = diceId;
          changed = true;
        }

        if (shapes[nArr[i].t].type == 1 && (shapes[id].type == 3 || shapes[id].type == 2)) {
          //print("search new shape");
          var availableArr = [4, 5];
          var newDiceId = floor(random(0, availableArr.length));
          diceId = availableArr[newDiceId];
          shapes[id].type = diceId;
          changed = true;
        }
      }
    }

    if (shapes[nl] != undefined) {
      if (nArr[i].l != undefined) {
        //print("left exist : ", id, " : ", nArr[i].l)
        if (shapes[nArr[i].l].type == 4) {

          if (shapes[id].type == 1 || shapes[id].type == 3) {
            var availableArr = [2, 5];
            var newDiceId = floor(random(0, availableArr.length));
            diceId = availableArr[newDiceId];
            shapes[id].type = diceId;
            changed = true;
          }
        }

        if (shapes[nArr[i].l].type == 2) {

          if (shapes[id].type == 1 || shapes[id].type == 3) {
            var availableArr = [4, 5];
            var newDiceId = floor(random(0, availableArr.length));
            diceId = availableArr[newDiceId];
            shapes[id].type = diceId;
            changed = true;
          }
        }
      }

    }
  }
  return changed;
}



function checkNeighbours(id, _debug = false) {

  var x = grid[id].x;
  var y = grid[id].y;
  var sz = grid[id].w;


  // Current Grid
  if (_debug) {
    fill(0, 200, 0, 200);
    rect(x, y, sz, sz);
  }
  var numNeigbours = 8;

  // Corners
  if (id == 0 || id == (total - colNum) || id == (colNum - 1) || id == (total - 1)) {
    numNeigbours = 3;
  } else {
    if (
      (id % colNum == 0) ||                 // first col except 0 and total - colNum
      (id % colNum == (colNum - 1)) ||      // last col except 0 and total - 1
      (id > 0 && id < colNum) ||            // first row
      (id > (total - colNum) && id < total) // last row
    ) {
      numNeigbours = 5;
    }
  }



  //print("neighbours: " + numNeigbours)


  var nId = -1; // neighbout id

  //print();


  var neighborArr = [];
  var nArr = [];

  // First Neighbor
  fill(0, 200, 0, 100);
  nId = id - 1;
  var l = -1;
  if (nId >= 0 && !isFirstCol(id)) {
    x = grid[nId].x;
    y = grid[nId].y;
    if (_debug)
      rect(x, y, sz, sz);
    l = nId;
    neighborArr.push({ "nId": nId, "l": nId });
  }

  // Second Neighbor
  nId = id + 1;
  var r = -1;
  if (nId < total) {
    if (!isLastCol(id)) {
      x = grid[nId].x;
      y = grid[nId].y;
      if (_debug)
        rect(x, y, sz, sz);
      neighborArr.push({ "nId": nId, "r": nId });
      r = nId;
    }
  }

  // Third Neighbor
  nId = id - (colNum + 1);
  var tl = -1;
  if (nId >= 0 && !isFirstCol(id)) {
    x = grid[nId].x;
    y = grid[nId].y;
    if (_debug)
      rect(x, y, sz, sz);
    neighborArr.push({ "nId": nId, "tl": nId });
    tl = nId;
  }

  // Fourth Neighbor
  nId = id - (colNum);
  var t = -1;
  if (nId >= 0) {
    x = grid[nId].x;
    y = grid[nId].y;
    if (_debug)
      rect(x, y, sz, sz);
    neighborArr.push({ "nId": nId, "t": nId });
    t = nId;
  }

  // Fifth Neighbor
  nId = id - (colNum - 1);
  var tr = -1;
  if (nId >= 0) {
    if (
      (isFirstCol(id) && isCornerBlock(id)) ||
      (isFirstCol(id) && !isCornerBlock(id)) ||
      (isLastRow(id) && !isCornerBlock(id)) ||
      (!isLastRow(id) && !isCornerBlock(id) && !isLastCol(id))
    ) {
      x = grid[nId].x;
      y = grid[nId].y;
      if (_debug)
        rect(x, y, sz, sz);
      neighborArr.push({ "nId": nId, "tr": nId });
      tr = nId;
    }
  }

  // Sixth Neighbor
  nId = id + (colNum - 1);
  var bl = -1;
  if (nId < total) {
    if (!isFirstCol(id)) {
      x = grid[nId].x;
      y = grid[nId].y;
      if (_debug)
        rect(x, y, sz, sz);
      neighborArr.push({ "nId": nId, "bl": nId });
      bl = nId;
    }
  }

  // Seventh Neighbor
  nId = id + (colNum);
  var b = -1;
  if (nId < total) {
    if (!isFirstCol(id) || !isCornerBlock(id) || !isFirstRow(id)) {
      x = grid[nId].x;
      y = grid[nId].y;
      if (_debug)
        rect(x, y, sz, sz);
      neighborArr.push({ "nId": nId, "b": nId });
      b = nId;
    }
  }

  // Eigth Neighbor
  nId = id + (colNum + 1);
  var br = -1;
  if (nId < total) {
    if ((!isFirstCol(id) || !isCornerBlock(id) || !isFirstRow()) && !isLastCol(id)) {
      x = grid[nId].x;
      y = grid[nId].y;
      if (_debug)
        rect(x, y, sz, sz);
      neighborArr.push({ "nId": nId, "br": nId });
      br = nId;
    }
  }

  nArr.push({ "r": r, "l": l, "b": b, "t": t, "tr": tr, "tl": tl, "br": br, "bl": bl });
  return nArr;
  //return neighborArr;

}

function isFirstRow(id) {
  return (id > 0 && id < colNum);
}

function isCornerBlock(id) {
  return (id == 0 || id == (total - colNum) || id == (colNum - 1) || id == (total - 1))
}

function isFirstCol(id) {
  return (id % colNum == 0);
}

function isLastCol(id) {
  return (id % colNum == (colNum - 1));
}

function isLastRow(id) {
  return (id > (total - colNum) && id < total);
}



function keyPressed() {
  if (key == 's') {
    utils.saveCanvas("anni_albers_intaglio_III");
  }

  if (key == 'r') {
    draw();
  }
}


class GridItem {
  constructor(type, id, x, y, sz) {
    this.type = type;
    this.id = id;
    this.x = x;
    this.y = y;
    this.sz = sz;
    this.active = false;
  }

  display() {
    fill(inkColor);

    if (this.type == 1)
      this.triangle1(this.x, this.y, this.sz);
    else if (this.type == 2)
      this.triangle2(this.x, this.y, this.sz);
    else if (this.type == 3)
      this.triangle3(this.x, this.y, this.sz);
    else if (this.type == 4)
      this.triangle4(this.x, this.y, this.sz);
    else
      noFill();
  }

  triangle1(x, y, sz) {
    beginShape();
    push();

    translate(x, y);
    vertex(x, y);
    vertex(x + sz, y + sz);
    vertex(x, y + sz);
    pop();
    endShape(CLOSE);

  }
  triangle2(x, y, sz) {
    beginShape();
    push();
    translate(x, y);
    vertex(x, y);
    vertex(x + sz, y);
    vertex(x + sz, y + sz);
    pop();
    endShape(CLOSE);
  }

  triangle3(x, y, sz) {
    beginShape();
    push();
    translate(x, y);
    vertex(x, y);
    vertex(x + sz, y);
    vertex(x, y + sz);
    pop();
    endShape(CLOSE);
  }

  triangle4(x, y, sz) {
    beginShape();
    push();
    translate(x, y);
    vertex(x + sz, y);
    vertex(x + sz, y + sz);
    vertex(x, y + sz);
    pop();
    endShape(CLOSE);
  }
}
