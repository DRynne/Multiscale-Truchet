class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  contains(point) {
    return (point.x >= this.x - this.w &&
      point.x < this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y < this.y + this.h);
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h);
  }

}

class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


class QuadTree {
  constructor(boundary, tier) {
    this.boundary = boundary;
    this.divided = false;
    this.divisions = {};
    this.tier = tier;
    this.overbox = false;
    // this.motiflist = ["/","\\", "-", "|","+.","x.",  "+", "fne","fsw","fnw","fse","tn","ts","te","tw"];
    // this.motif = this.motiflist[this.motifindex];

    //wingtile logic
    this.phase = this.tier % 2;
    this.motif = random(["/","\\", "-", "|","+.","x.",  "+", "fne","fsw","fnw","fse","tn","ts","te","tw"]); //["/","\\", "-", "|","+.","x.",  "+", "fne","fsw","fnw","fse","tn","ts","te","tw"]
    this.color = [color(255), color(0)];
    this.tile = new wingtile(this.motif, this.phase, this.boundary, this.color);

    this.edgeHover = color(0, 255, 0);
    this.fillHover = color(0, 64, 0);
    this.edgeSelected = color(255);
    this.fillSelected = color(255);
    this.edgeNeut = color(255);
    this.fillNeut = color(0);
    this.edgecol = this.edgeNeut;
    this.fillcol = this.fillNeut;
    this.discovered = false;

  }

  divide() {
    let subtier = this.tier + 1;
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.divisions[0] = new QuadTree(ne, subtier);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.divisions[1] = new QuadTree(nw, subtier);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.divisions[2] = new QuadTree(se, subtier);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.divisions[3] = new QuadTree(sw, subtier);
    this.divided = true;

  }

  highlight(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (!this.divided) {
      this.overbox = true;
    } else {
      for (let i = 0; i < 4; i++) {
        if (this.divisions[i].highlight(point)) {
          return true;
        }
      }
    }

  }

  drawtiles() { //this needs to be a breadth first search{
    let drawqueue = new Queue();
    let traverse = new Queue();
    traverse.enqueue(this);
    //drawqueue.enqueue(this.tile);

    let node;

    while (!traverse.isEmpty()) {
      node = traverse.dequeue();
      if (node.divided) {
        for (let i = 0; i < 4; i++) {
          traverse.enqueue(node.divisions[i]);
        }
      } else {
        drawqueue.enqueue(node.tile);
      }
    }

    while (!drawqueue.isEmpty()){
    let tile = drawqueue.dequeue();
    tile.drawtile();
    }


    //  console.log(drawqueue);

    // if (!this.divided) {
    //   drawqueue.enqueue(this);
    // } else {
    //   for (let i = 0; i < 4; i++) {
    //     this.divisions[i].drawtiles();
    //   }
    // }
  }

  show() {

    this.edgecol = this.overbox ? this.edgeHover : this.edgeNeut;
    this.fillcol = this.overbox ? this.fillHover : this.fillNeut;

    this.overbox = false;
    push()
    stroke(this.edgecol);
    noFill();
    //fill(this.fillcol);
    strokeWeight(1);
    rectMode(RADIUS);

    if (this.divided) {
      //fuck it just hardcode the 4 divisions
      for (let i = 0; i < 4; i++) {
        this.divisions[i].show();
      }
    } else {
      rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
    }
    pop()
  }


  split(point) {

    if (!this.boundary.contains(point)) {
      return false;
    }

    if (!this.divided) {
      this.divide();
    } else {
      for (let i = 0; i < 4; i++) {
        if (this.divisions[i].split(point)) {
          return true;
        }
      }
    }

  }
}
