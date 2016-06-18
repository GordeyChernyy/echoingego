'use strict';

//-------------------- OSC 


//-------------------- Paper
var layer = new paper.Layer();
var group = new paper.Group();

group.transformContent = false;

paper.project.importSVG("assets/test.svg", function(item) {
    group.addChild(item);
    group.scaling = [0.3, 0.3];
});
var counter = 0;

window.echoingEgo.initializeOnFrame = function() {
	paper.view.onFrame = function(event) { 

		group.position = [window.echoingEgo.data["/righthand_pos"]["x"], window.echoingEgo.data["/righthand_pos"]["y"]];
	}
}
