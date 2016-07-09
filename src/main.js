'use strict';
var SM = new sceneManager();
var menu = new Menu();
SM.setup();
menu.setup();
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
	paper.view.onFrame = function(event) { 
		SM.update(window.echoingEgo.data);
	}
}
