'use strict';
var oscPort = new osc.WebSocketPort({
    url: "ws://localhost:8000" // URL to your Web Socket server.
});
oscPort.open();
oscPort.on("message", function (oscMsg) {
    console.log("An OSC message just arrived!", oscMsg);
});
var layer = new paper.Layer();
var group = new paper.Group();

group.transformContent = false;

paper.project.importSVG("assets/test.svg", function(item) {
    group.addChild(item);
});