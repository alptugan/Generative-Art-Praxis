class arcShape extends Shapes {
    constructor(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl) {
  
      super(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl);
  
      this.id = floor(random(0, 4));
    }
  
    render() {
      super.render();
  
      push();
      stroke(this.strokeColor);
      strokeWeight(this.strokeW);
  
      arc(this.posX, this.posY, this.gridSize, this.gridSize, this.randRot[this.id], this.randRot[this.id] + 180);
      pop();
    }
  }
  
  class semiArcShape extends Shapes {
    constructor(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl) {
      super(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl);
  
      this.id = floor(random(0, 4));
    }
  
    render() {
      super.render();
  
      push();
      stroke(this.strokeColor);
      strokeWeight(this.strokeW);
      translate(this.posX, this.posY);
  
      var firstPx = 0;
      var firstPy = -this.gridSize * 0.5;
      var lastPx = firstPx;
      var lastPy = firstPy * -1;
  
      var firstCPx = -this.gridSize - this.gridSize * 0.5 - 6;
      var firstCPy = -this.gridSize * 0.5;
      var lastCPx = firstCPx;
      var lastCPy = firstCPy * -1;
  
      rotate(this.randRot[this.id]);
  
      curve(firstCPx, firstCPy, firstPx, firstPy, lastPx, lastPy, lastCPx, lastCPy)
  
      pop();
    }
  }
  
  class lineShape extends Shapes {
    constructor(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl) {
      super(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl);
      this.id = floor(random(0, 4));
    }
  
    render() {
      super.render();
  
      push();
      translate(this.posX, this.posY);
  
      stroke(this.strokeColor);
      strokeWeight(this.strokeW);
  
  
  
      if (this.randRotLn[this.id] == 45 || this.randRotLn[this.id] == -45) {
        //line(-this.gridSize*0.5,0,this.dDist-this.gridSize*0.5,0);
        rotate(this.randRotLn[this.id] - 45);
        line(-this.gridSize * 0.5, -this.gridSize * 0.5, this.gridSize * 0.5, this.gridSize * 0.5);
      } else {
        rotate(this.randRotLn[this.id]);
        line(-this.gridSize * 0.5, 0, this.gridSize * 0.5, 0);
      }
  
      pop();
    }
  }
  
  class noisyLineShape extends Shapes {
    constructor(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl) {
      super(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl);
      noiseSeed(random(this.gridSize));
      this.id = floor(random(0, 4));
      this.rand = random(0.005, 0.03);
      this.yThres = floor(random(7, 16));
    }
  
    render() {
      super.render();
  
      push();
      translate(this.posX, this.posY);
  
      stroke(this.strokeColor);
      strokeWeight(this.strokeW);
  
      var noiseScale = 0.08;
  
      var xRes = 5;
      var px = -this.gridSize * 0.5;
      var py = -this.gridSize * 0.5;
      var xp = 0;
      var yp = 0;
      var diagonalFac = 0;
      var diagonalLen;
  
      if (this.randRotLn[this.id] == 45 || this.randRotLn[this.id] == -45) {
        diagonalLen = floor(dist(-this.gridSize * 0.5, -this.gridSize * 0.5, this.gridSize * 0.5, this.gridSize * 0.5));
  
        diagonalFac = 20;
        rotate(this.randRotLn[this.id]);
      } else {
        diagonalFac = 0;
        diagonalLen = CRYSTAL_SIZE + 1;
        rotate(this.randRotLn[this.id]);
      }
  
      for (var x = 0; x < diagonalLen; x = x + xRes) {
        var noiseVal = noise(x * noiseScale, this.rand * noiseScale);
  
        xp = x - this.gridSize * 0.5 - diagonalFac;
        yp = noiseVal * this.yThres;
        // 1st point of the line
        if (x == xRes) {
          if (this.randRotLn[this.id] == 45 || this.randRotLn[this.id] == -45) {
            line(-this.gridSize * 0.5 - diagonalFac, 0, xp, yp);
          } else {
            line(-this.gridSize * 0.5, 0, xp, yp);
          }
        }
  
        // The last point must be the diagonal corner of the noisy line
        else if (x > diagonalLen - xRes) {
          if (this.randRotLn[this.id] == 45 || this.randRotLn[this.id] == -45) {
            //line(px, py, xp, xRes);
            line(px, py, diagonalLen * 0.5, 0);
            //console.log("j")
          } else {
            line(px, py, diagonalLen * 0.5, 0);
          }
        }
  
        // Other points than 1st and the last one
        else if (x != 0 && x != xRes && x != diagonalLen - xRes) {
          if (this.randRotLn[this.id] == 45 || this.randRotLn[this.id] == -45) {
            line(px, py, xp, yp);
          } else {
            line(px, py, xp, yp);
          }
        }
  
        px = xp;
        py = yp;
      }
      //rotate(millis()*0.03);
  
  
      pop();
    }
  }
  
  
  class dashedLineShape extends Shapes {
    constructor(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl) {
      super(_x, _y, _strokeColor, _strokeW, _fillMode, _fillColor, _frameStrokeCl);
      this.id = floor(random(0, 4));
    }
  
    render() {
      super.render();
  
      push();
      translate(this.posX, this.posY);
  
      stroke(this.strokeColor);
      strokeWeight(this.strokeW);
  
      //ellipse(0, 0, this.gridSize*0.5, this.gridSize*0.5);
  
      let g = 3;
      let l = 4;
  
      if (this.randRotLn[this.id] == 45 || this.randRotLn[this.id] == -45) {
        //line(-this.gridSize*0.5,0,this.dDist-this.gridSize*0.5,0);
        rotate(this.randRotLn[this.id] - 45);
        this.dashedLine(- this.gridSize * 0.5, - this.gridSize * 0.5, this.gridSize * 0.5, this.gridSize * 0.5, l, g);
      } else {
        rotate(this.randRotLn[this.id]);
        this.dashedLine(-this.gridSize * 0.5, 0, this.gridSize * 0.5, 0, l, g);
      }
  
      pop();
    }
  
    dashedLine(x1, y1, x2, y2, l, g) {
      var pc = dist(x1, y1, x2, y2) / 100;
      var pcCount = 1;
      var lPercent = 0;
      var gPercent = 0;
      var currentPos = 0;
      var xx1 = 0;
      var yy1 = 0;
      var xx2 = 0;
      var yy2 = 0;
  
      while (int(pcCount * pc) < l) {
        pcCount++
      }
      lPercent = pcCount;
      pcCount = 1;
      while (int(pcCount * pc) < g) {
        pcCount++
      }
      gPercent = pcCount;
  
      lPercent = lPercent / 100;
      gPercent = gPercent / 100;
      while (currentPos < 1) {
        xx1 = lerp(x1, x2, currentPos);
        yy1 = lerp(y1, y2, currentPos);
        xx2 = lerp(x1, x2, currentPos + lPercent);
        yy2 = lerp(y1, y2, currentPos + lPercent);
        if (x1 > x2) {
          if (xx2 < x2) {
            xx2 = x2;
          }
        }
        if (x1 < x2) {
          if (xx2 > x2) {
            xx2 = x2;
          }
        }
        if (y1 > y2) {
          if (yy2 < y2) {
            yy2 = y2;
          }
        }
        if (y1 < y2) {
          if (yy2 > y2) {
            yy2 = y2;
          }
        }
  
        line(xx1, yy1, xx2, yy2);
        currentPos = currentPos + lPercent + gPercent;
      }
    }
  
    dashedRect(x, y, w, h, l, g) {
      dashedLine(x, y, x + w, y, l, g); //Top
      dashedLine(x, y + h, x + w, y + h, l, g); //Bottom
      dashedLine(x, y, x, y + h, l, g); //Left
      dashedLine(x + w, y, x + w, y + h, l, g); //Right
    }
  }