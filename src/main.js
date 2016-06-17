'use strict';

//-------------------- OSC 


//-------------------- Paper
var layer = new paper.Layer();
var group = new paper.Group();

group.transformContent = false;

paper.project.importSVG("assets/test.svg", function(item) {
    group.addChild(item);
});

function onFrame(event) {
	
}