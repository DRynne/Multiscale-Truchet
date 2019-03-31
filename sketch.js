let qtree;
let bounds;
let mousepos;



function setup() {

  //clunky
  canvasSize = windowHeight/2;
  canvasW = canvasSize/2;
  canvasH = canvasSize/2;

  canvasSize *=5/3;

  canvasX = canvasSize/2;
  canvasY = canvasSize/2;

  createCanvas(canvasSize, canvasSize);
  let bounds = new Rectangle (canvasX, canvasY, canvasW, canvasH);
  qtree = new QuadTree(bounds, 0);

  mousepos = new point(mouseX,mouseY);
}

function draw() {
  background(qtree.color[0])
  mousepos = new point(mouseX,mouseY);
  qtree.highlight(mousepos);

  qtree.drawtiles();
  //qtree.show();
}

function mouseClicked(){
  qtree.split(mousepos);
  redraw();
}
