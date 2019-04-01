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

    //some of this logic sucks like, it shouldnt be repeated in every child
    this.boundary = boundary;
    this.divided = false;
    this.divisions = {};
    this.tier = tier;
    this.overbox = false;
    this.motiflist = ["/","\\", "-", "|","+.","x.",  "+", "fne","fsw","fnw","fse","tn","ts","te","tw"];


    //wingtile logic
    this.phase = this.tier % 2;
    this.motifindex = this.tier;//int(random(0,14));
    this.motif = this.motiflist[this.motifindex];
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
  scroll(deltaY,point){
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (!this.divided) {
      this.motifindex = (((this.motifindex + deltaY/abs(deltaY))  % this.motiflist.length) + this.motiflist.length) % this.motiflist.length;
      this.motif = this.motiflist[this.motifindex];

    } else {
      for (let i = 0; i < 4; i++) {
        if (this.divisions[i].scroll(deltaY,point)) {
          return true;
        }
      }
    }


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
        //this is a getaround, sloppy code
        node.tile.motif = node.motif;
        drawqueue.enqueue(node.tile);
      }
    }

    while (!drawqueue.isEmpty()) {
      let tile = drawqueue.dequeue();
      tile.drawtile();
    }

  }

  show() {


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
        drawqueue.enqueue(node);
      }
    }

    push()

    noFill();
    strokeWeight(1);
    rectMode(RADIUS);

    while (!drawqueue.isEmpty()) {
      let node = drawqueue.dequeue();
      if (node.overbox && !drawqueue.isEmpty()) {
        drawqueue.enqueue(node);
        continue;
      } else if (node.overbox && drawqueue.isEmpty()) {
        stroke(node.edgeHover);
        rect(node.boundary.x, node.boundary.y, node.boundary.w, node.boundary.h);
        node.overbox = false;
      } else {
        stroke(node.edgeNeut)
        rect(node.boundary.x, node.boundary.y, node.boundary.w, node.boundary.h);
      }
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
