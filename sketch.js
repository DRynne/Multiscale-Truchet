let qtree;
let bounds;

function setup() {
  createCanvas(400, 400);
  background(255);
  let bounds = new Rectangle (200, 200, 200, 200);
  qtree = new QuadTree(bounds, 1);
  // for (let i = 0; i < 300; i++) {
  //   let x = randomGaussian(width / 2, width / 8);
  //   let y = randomGaussian(height / 2, height / 8);
  //   let p = new Pt(x, y);
  //   qtree.insert(p);
  // }
}

function draw() {
  //bounds = new Rectangle(200, 200, 200, 200);
  //qtree = new QuadTree(bounds, 1);
  background(0);
  qtree.show();
}

function mouseClicked(){
  mousepos = new point(mouseX,mouseY);
  qtree.insert(mousepos);
}
