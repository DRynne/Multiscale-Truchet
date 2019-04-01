let qtree;
let bounds;
let mousepos;
var highlightcheckbox;

function setup() {

  //clunky
  canvasSize = windowHeight / 2;
  canvasW = canvasSize / 2;
  canvasH = canvasSize / 2;

  canvasSize *= 5 / 3;

  canvasX = canvasSize / 2;
  canvasY = canvasSize / 2;

  cnv = createCanvas(canvasSize, canvasSize);
  let bounds = new Rectangle(canvasX, canvasY, canvasW, canvasH);
  qtree = new QuadTree(bounds, 0);

  mousepos = new point(mouseX, mouseY);

  highlightcheckbox = createCheckbox('Highlight Selection', false);
  highlightcheckbox.position(width / 2, height);

  cnv.mouseWheel(changemotif);

}

function draw() {

  background(qtree.color[1])
  mousepos = new point(mouseX, mouseY);
  qtree.drawtiles();

  if (highlightcheckbox.checked()) {
    qtree.highlight(mousepos);
    qtree.show();
  }
}

function changemotif(event) {
  mousepos = new point(mouseX, mouseY);
  qtree.scroll(event.deltaY,mousepos);
}

function mouseClicked() {
  qtree.split(mousepos);
  redraw();
}
