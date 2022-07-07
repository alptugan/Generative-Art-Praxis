class Shapes {
    constructor(_x,_y,_strokeColor,_strokeW,_fillMode,_fillColor,_frameStrokeCl) {
      this.gridSize    = GRIDBOX;
      this.strokeColor = _strokeColor || color(0, 0, 0) ;
      this.strokeW     = _strokeW;
      this.fillMode    = _fillMode || false;
      this.fillColor   = _fillColor || color(255,255,255);
      this.posX        = _x || 0;
      this.posY        = _y || 0;
  
      this.frameStrokeCl = _frameStrokeCl || color(240,240,240,20);
      this.randRot       = [0,90,180,270];
      this.randRotLn     = [0, 90, 45 ,-45];
      this.dDist         = dist(0,0,this.gridSize,this.gridSize); // Diagonal distance
    }
  
    render() {
      if(this.fillMode)
      {
        fill(this.fillColor);
      }else{
        noFill();
        stroke(this.frameStrokeCl);
        //strokeWeight(this.strokeW);
      }
  
      if(gui.p.displayGrid) {
        rect(this.posX, this.posY, this.gridSize, this.gridSize);
        line(this.posX, this.posY - this.gridSize*0.5,this.posX, this.posY + this.gridSize - this.gridSize*0.5);
        line(this.posX - this.gridSize*0.5, this.posY , this.posX + this.gridSize  - this.gridSize*0.5, this.posY );
      }
    }
  
    setStrokeW(val) {
      this.strokeW = val;
    }
  }