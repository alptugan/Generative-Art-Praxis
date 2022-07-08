var marginH, marginV;
var gsize;
var tLen;
var cLen;
var rowLen, rowLenCurrent;
var w;
var rWPre;
var rW;
var colNum;
var cW, cH, realW, realH;
var gap;
var colorMin, colorMax;
var wMin, wMax;
var seed;
//var colors = { blue: [60, 105, 226], yellow: [234, 184, 53], red: [205, 48, 40], black: [20, 20, 20], white: [232, 227, 220] };
var colors = [
    [60, 105, 226], // blue
    [234, 184, 53], // yellow
    [205, 48, 40], // red
    [20, 20, 20], // black
    [232, 227, 220] // white
];



function setup() {
    createCanvas(720, 1080);
    //noLoop();

    marginH = 150;
    marginV = 150;

    gap = 0; // gap between each rectangle

    gsize = 120 + gap; // gridsize

    wMin = 1; // minimum block width
    wMax = 30; // max block width

    colorMin = 0; // color range start
    colorMax = 5; /// color range end


    // NO NEED TO MODIFY THE BELOW LINES
    cW = width - marginH * 2.4;
    cH = height - marginV * 2;

    tLen = floor((cW / gsize)) * floor((cH / gsize)); // calculate total number of grids

    rowLen = floor(cW / gsize); // length of each row
    var colLen = floor(cH / gsize); // length of each column 


    realW = rowLen * gsize;
    realH = colLen * gsize;

    marginH = (width - realW) * 0.5;
    marginV = (height - realH) * 0.5;

    cLen = 0; // current n'th  rectangle number
    rowLenCurrent = 0;
    colNum = 0;
    rWPre = 0;
    rW = 0;

    seed = random(99999);
}

function draw() {
    background(colors[4]);

    rectMode(CORNER);
    noStroke();

    //randomizeDefault();

    // weighted randomization
    //randomizeWeighted();

    // Horizontal distrubution



    shadow(0, 0, 0, 0.8);
    horizontalDist();

    rectMode(CENTER);
    stroke(colors[3])
    noFill();
    strokeWeight(0);
    rect(width * 0.5, height * 0.5, realW, realH);

    noLoop();
}

function horizontalDist() {

    var x = 0;
    var y = 0;

    push();

    cLen = 0; // current n'th  rectangle number
    rowLenCurrent = 0;
    colNum = 0;
    rWPre = 0;
    rW = 0;

    translate(marginH, marginV);
    randomSeed(seed);
    while (cLen < tLen) {

        rWPre = rowLenCurrent;
        rW = floor(random(wMin, wMax));
        rowLenCurrent += rW;

        if (rowLenCurrent > rowLen) {

            rW = rowLen - rWPre;
            w = rW * gsize;
            rowLenCurrent = 0;
            colNum += (gsize + gap);

        } else {
            w = rW * gsize;
        }


        fill(colors[floor(random(colorMin, colorMax))]);

        rect(x, y, w, gsize);


        if (colNum > realH)
            break;

        x = (rowLenCurrent * (gsize));
        y = colNum;

        cLen += rW;

    }
    pop();
}

function randomizeWeighted() {
    for (let i = marginH * 0.5; i < width - marginH * 0.5; i += gsize) {
        for (let j = marginV * 0.5; j < height - marginV * 0.5; j += gsize) {

            // randomize
            var rnd = Math.random();
            //print(rnd);

            if (rnd > 0 && rnd < 0.01) {
                fill(colors[0]); // blue
            } else if (rnd < 0.1) {
                fill(colors[1]); // yellow
            } else if (rnd < 0.3) {
                fill(colors[2]); // red
            } else if (rnd < 0.4) {
                fill(colors[3]); // black
            } else {
                fill(colors[4]); // white
            }
            rect(j, i, gsize, gsize);
        }
    }
}

function randomizeDefault() {
    for (let i = marginH * 0.5; i < width - marginH * 0.5; i += gsize) {
        for (let j = marginV * 0.5; j < height - marginV * 0.5; j += gsize) {

            // randomize
            var rnd = floor(random(0, 5));
            //print(rnd);
            fill(colors[rnd])
            rect(i, j, gsize, gsize);
        }
    }
}

function shadow(r, g, b, a) {
    drawingContext.shadowOffsetX = 10;
    drawingContext.shadowOffsetY = 20;
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function keyPressed() {
    if (keyCode === 83) { // if "s" is pressed
        saveForPrint("sketch.jpg", "A3", 300);
    }
}