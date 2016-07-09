'use strict';
class Menu {
	constructor(sceneManager) {
    	this.sceneManager = sceneManager;
    	this.spaceBetweenMenuItems = 70
  	}

	setup() {
		var menuItems = [this.createMenuItem("physicalBoundScene"), this.createMenuItem("Next Scene")]
		for (var i = 0; i < menuItems.length; i++) {
			menuItems[i].pivot = menuItems[i].bounds.rightCenter;
			menuItems[i].position = {x: 200, y: (100 + (i *this.spaceBetweenMenuItems))}
		}
	}

	createMenuItem(sceneName, position) {
		var layer = new paper.Layer();
		var background = new paper.Path.Rectangle({
			size: [10, 10],
		})
		var text = new paper.PointText();

		text.content = sceneName;
		
		text.fillColor = "White";
		
		background.bounds.width = text.bounds.width + 25
		background.bounds.height = text.bounds.height + 25
		background.fillColor = new paper.Color(0,0.5);
		text.position = background.position;

		var group = new paper.Group([background, text]);

		group.position = new paper.Point(0, 0)

		var self = this;

		group.onMouseMove = function(e){
			self.sceneManager.setSceneByName(sceneName);
		}

		return group;
	}
}


		// mark point at (100,100)
		// var circle = new paper.Path.Circle({
		//     center: new paper.Point(100, 100),
		//     radius: 10,
		//     fillColor: 'red'
		// });