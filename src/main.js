'use strict';
var SM = new sceneManager();
SM.setup();

var menu = new Menu(SM);
menu.setup();
var layer = new paper.Layer();
var pointer = new Path.Circle({
	fillColor: 'red',
	radius: 20,
	visible: false,
});

// launchFullscreen(document.documentElement);
// function launchFullscreen(element) {
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//         element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen();
//     } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//     }
// }

window.echoingEgo.initializeOnFrame = function() {
	// paper.view.onFrame = function(event) { 
	// 	SM.update(window.echoingEgo.data);
	// }
}
function onMouseMove(event) {
	pointer.position = event.point;
	SM.update(event.point);
	menu.update(pointer);
}
