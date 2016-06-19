'use strict';
var SM = new sceneManager();
SM.setup();
console.log("hi")

window.echoingEgo.initializeOnFrame = function() {
	paper.view.onFrame = function(event) { 
		SM.update(window.echoingEgo.data);
	}
}
