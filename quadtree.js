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
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}


class QuadTree {
  constructor(boundary, tier) {
    this.boundary = boundary;
    this.divided = false;
    this.tier = tier;
  }

  divide() {
    let subtier = this.tier + 1;
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.ne = new QuadTree(ne, subtier);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.nw = new QuadTree(nw, subtier);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.se = new QuadTree(se, subtier);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.sw = new QuadTree(sw, subtier);

    this.divided = true;
  }

  show() {
    stroke(255);
    noFill();
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

    if (this.divided) {
      this.ne.show();
      this.nw.show();
      this.se.show();
      this.sw.show();
    }
  }

  insert(point) {

    if (!this.boundary.contains(point)) {
      return false;
    }

    if (!this.divided) {
      this.divide();
    } else if (this.ne.insert(point)) {
      return true;
    } else if (this.nw.insert(point)) {
      return true;
    } else if (this.se.insert(point)) {
      return true;
    } else if (this.sw.insert(point)) {
      return true;
    }
  }
}
