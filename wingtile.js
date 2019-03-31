class wingtile {
  constructor(motif, phase, boundary, color) {
    //motif is the pattern, phase is white on black or black on white

    this.motif = motif;
    this.phase = phase;
    this.boundary = boundary;
    this.color = color;

    if (this.phase) {
      let tempcol;
      tempcol = this.color[1];
      this.color[1] = this.color[0];
      this.color[0] = tempcol;
    }
  }


  drawtile(motif) {
    this.motif = motif;

    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;
    let smallr = 2 * w / 6;
    let bigr = 2 * w / 3;
    let arcd = 2 * 2 * 2 * w / 3;

    noStroke();
    rectMode(RADIUS);
    fill(this.color[1]);
    rect(x, y, w, h);
    fill(this.color[0]);

    switch (this.motif) {

      case 0:
        arc(x + w, y - h, arcd, arcd, PI / 2, PI);
        arc(x - w, y + h, arcd, arcd, 3 * PI / 2, 2 * PI);

        break;
      case 1: //"//"
        arc(x - w, y - h, arcd, arcd, 0, PI / 2);
        arc(x + w, y + h, arcd, arcd, PI, 3 * PI / 2, );

        break;
      case 2: //"-":
        rect(x, y, w, smallr);
        break;
      case 3: //"|":
        rect(x, y, smallr, h);
        break;
      case 4: //"+.":

        break;
      case 5: //"x.":

        fill(this.color[0]);
        rect(x, y, w, h);
        break;
      case 6: //"+":
        rect(x, y, w, smallr);
        rect(x, y, smallr, h);
        break;
      case 7: //"fne":
        arc(x + w, y - h, arcd, arcd, PI / 2, PI);

        break;
      case 8: //"fsw":
        arc(x - w, y + h, arcd, arcd, 3 * PI / 2, 2 * PI);

        break;
      case 9: //"fnw":
        arc(x - w, y - h, arcd, arcd, 0, PI / 2);

        break;
      case 10: // "fse":
        arc(x + w, y + h, arcd, arcd, PI, 3 * PI / 2, );

        break;
      case 11: //"tn":

        fill(this.color[0]);
        rect(x, y - smallr, w, bigr);
        break;
      case 12: //"ts":

        fill(this.color[0]);
        rect(x, y + smallr, w, bigr);

        break;
      case 13: //"te":

        fill(this.color[0]);
        rect(x + smallr, y, bigr, h);
        break;
      case 14: //"tw":

        fill(this.color[0]);
        rect(x - smallr, y, bigr, h);
        break;
      default:

    }

    fill(this.color[1]);
    circle(x - w, y - h, bigr);
    circle(x + w, y - h, bigr);
    circle(x - w, y + h, bigr);
    circle(x + w, y + h, bigr);

    fill(this.color[0]);
    circle(x, y - h, smallr);
    circle(x + w, y, smallr);
    circle(x, y + h, smallr);
    circle(x - w, y, smallr);



  }

}
