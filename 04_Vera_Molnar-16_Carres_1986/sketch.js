// Source 
// http://www.artnet.com/artists/vera-molnar/16-carres-a-H5YBTrlsc_74P6qoQycwPA2
// layout
// CHANGE VALUES TO SEE THE DIFFERENCE
let GRID_SIZE = 100;
let COLUMNS = 4;
let ROWS = 4;
let PADDING = 1;

let ANGLE_DIFF = 5;
let HORIZONTAL_DIFF = 5;
let VERTICAL_DIFF = 7;

// NO NEED TO EDIT FOLLOWING LINES
let GRIDBOX = GRID_SIZE + PADDING;
let STARTX = 0;
let STARTY = 0;
let PALETTE = [];
let w, h;

let utils = new p5.Utils();

function setup() {
    w = 800;
    h = 800;
    createCanvas(w, h);
    noLoop();

    PALETTE = [color(140, 20, 24, 240)];

    // Angle mode to degrees 
    angleMode(DEGREES);

    // ALIGN RECTANGLES FROM CENTER POINT
    rectMode(CENTER);

    // Calculate the final width of complete shape to center in x and y
    STARTX = GRID_SIZE * 0.5 + (w - (GRIDBOX * COLUMNS - PADDING)) * 0.5;
    STARTY = GRID_SIZE * 0.5 + (h - (GRIDBOX * ROWS - PADDING)) * 0.5;

    var location = window.location.pathname;
    var path = location.substring(0, location.lastIndexOf("/"));
    var directoryName = path.substring(path.lastIndexOf("/") + 1);
}

function draw() {
    background(250);

    noStroke();
    push();
    translate(STARTX, STARTY);

    let randX = 0;
    let randY = 0;
    let randAngle = 0;
    for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < ROWS; j++) {

            let x = i * GRIDBOX;
            let y = j * GRIDBOX;
            fill(PALETTE[0]);

            randAngle = random(-ANGLE_DIFF, ANGLE_DIFF);
            randX = random(-HORIZONTAL_DIFF, HORIZONTAL_DIFF);
            randY = random(-VERTICAL_DIFF, VERTICAL_DIFF);

            push();
            translate(x + randX, y + randY);
            rotate(randAngle);
            rect(0, 0, GRID_SIZE, GRID_SIZE);
            pop();
        }
    }
    pop();


}


function mousePressed() {
    draw();
}

function keyPressed() {
    if (key == 's') {
        //saveCanvas("Molnar_" + util.getTimeStamp() + ".png");
        utils.saveCanvas("Molnar");
    }
}