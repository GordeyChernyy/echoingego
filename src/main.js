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
function onFrame(event) {
	group.position = [window.skeletonPositionData["/righthand_pos"].x, window.skeletonPositionData["/righthand_pos"].y];
	// console.log(window.data);

}