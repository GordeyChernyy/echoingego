'use strict';
var calc = new Calc();
class svgPivotColor {
  constructor(d) {
    this.loaded = false;
    this.group = new paper.Group();
    this.energy = d.energy;
    this.speed = d.speed;
    this.fadeForce = d.fadeForce;
    this.rootPivot;
    this.levelCount = 0;
    this.randomNum = [];
    this.angle = 0;
    var self = this;
    paper.project.importSVG(d.path, function(item) {
      self.setPivot(item.children[0]);
      self.group.addChild(item.children[0]);
      self.group.pivot = self.rootPivot.add(d.pivot);
      self.group.transformContent = false;
      this.loaded = true;
    });
  }
  setPivot(item) {
    // iterate through hierarchy
    for (var i = 0; i < item.children.length; i++) {
      var name = item.children[i].name;
      this.randomNum.push(calc.random(1, 5));
      // add shadow

      if (item.children[i].className == 'Path' || item.children[i].className == 'Shape') {
        var path = item.children[i];
      }
      if (name != undefined && name.substring(0, 5) == 'dummy') {
        var dummy = item.children[i];
        var group = dummy.parent;
        dummy.visible = false;
        group.pivot = dummy.position;
        if (group.name.substring(0, 4) == 'root') {
          this.rootPivot = dummy.position;
        }
        group.transformContent = false;
      }
      if (item.children[i].children != undefined) {
        // continiue search in level tree
        this.setPivot(item.children[i]);
        // how deep this hierarchy?
        this.levelCount++;
      }
    }
    this.counter = 0;
  }
  rotate(item) {
    for (var i = 0; i < item.children.length; i++) {
      if (item.children[i].className == 'Path' || item.children[i].className == 'Shape') {
        var path = item.children[i];
        path.shadowOffset.x = Math.cos(this.counter / this.speed / this.randomNum[i] + this.randomNum[i] * 500) * this.energy * 100;
        path.shadowOffset.y = Math.sin(this.counter / this.speed / this.randomNum[i] + this.randomNum[i] * 500) * this.energy * 100;
      }
      if (item.children[i].className == 'Group') {
        var group = item.children[i];
        var fadeForce = 1;
        if (this.levelCount != 0) {
          fadeForce = this.levelCount / this.fadeForce;
        }
        group.rotation = Math.cos(this.counter / this.speed + this.randomNum[i] * 500) * this.energy * this.randomNum[i];
        group.scaling = calc.map(Math.sin(this.counter / this.speed + this.randomNum[i] * 100) * this.energy, -5, 5, 0.8, 1);
      }
      if (item.children[i].children != undefined) {
        this.rotate(item.children[i]);
      }
    }
  }
   update() {
    this.counter++;
    if (this.group.children[0] != undefined) {
      var root = this.group.children[0];
      root.rotation = this.angle + Math.cos(this.counter / 20 + 100) * this.energy;
      this.rotate(root);
    }
  }
}