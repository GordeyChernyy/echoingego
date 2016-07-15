'use strict';
var SM = new sceneManager();
SM.setup();
SM.setSceneByName('menuScene');

// audio
// var audio = new Audio('assets/audio/master.wav');
// audio.play();
var menu = new Menu(SM);

// menu
menu.setup();

// invisible pointer for menu
var layer = new paper.Layer();
var pointer = new Path.Circle({
	fillColor: 'white',
	radius: 10,
	visible: false,
});

window.echoingEgo.initializeOnFrame = function() {
	paper.view.onFrame = function(event) { 
		SM.update(window.echoingEgo.data);
		
		// set kinect pointer
		// var hand = window.echoingEgo.data[window.names['l_hand']];
		// pointer.position = [hand["x"], hand["y"]];
		// menu.update(pointer);
	}
}

// set mouse pointer
function onMouseMove(event) {
	pointer.position = event.point;
	var scene = SM.getScene('death')

	// scene.keyPosOffset[0] =  paper.view.size.width/2 - event.point.x;
	// scene.keyPosOffset[1] =  paper.view.size.height/2 - event.point.y;
	// console.log(scene.keyPosOffset);

	// scene.lockPosOffset[0] = paper.view.size.width/2 - event.point.x;
	// scene.lockPosOffset[1] = paper.view.size.height/2 - event.point.y;
	// console.log(scene.lockPosOffset);

	menu.update(pointer);
}
