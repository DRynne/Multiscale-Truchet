let qtree;
let bounds;
let mousepos;



function setup() {

  canvasSize = windowHeight;
  canvasW = canvasSize/2;
  canvasH = canvasSize/2;

  canvasSize *=4/3;

  canvasX = canvasSize/2;
  canvasY = canvasSize/2;

  createCanvas(canvasSize, canvasSize);
  background(255);
  let bounds = new Rectangle (canvasX, canvasY, canvasW, canvasH);
  qtree = new QuadTree(bounds, 0);

  mousepos = new point(mouseX,mouseY);
}

function draw() {
  mousepos = new point(mouseX,mouseY);
  qtree.highlight(mousepos);
  background(0);

  qtree.drawtiles();
  //qtree.show();
  // noLoop()
  // wt = new wingtile(14,0,qtree.boundary,qtree.color);
  // wt.drawtile(wt.motif);

}

function mouseClicked(){
  qtree.split(mousepos);
  redraw();
}
