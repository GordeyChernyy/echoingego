'use strict';
class Menu {
	constructor(sceneManager) {
    	this.sceneManager = sceneManager;
    	this.spaceBetweenMenuItems = 70;
  	}
	setup() {
		var layer = new paper.Layer();
		this.isOver = false;
		this.isOverP = false;
		this.clickCounter = 0;
		this.menuItems = [
			this.createMenuItem("physicalBoundScene"), 
			this.createMenuItem("empathyScene")
		];
		for (var i = 0; i < this.menuItems.length; i++) {
			this.menuItems[i].group.pivot = this.menuItems[i].group.bounds.rightCenter;
			this.menuItems[i].group.position = {x: 200, y: (100 + (i *this.spaceBetweenMenuItems))}
		}
	}
	update(path){
		if(this.sceneManager.getCurSceneName() == 'menuScene'){
			for (var i = 0; i < this.menuItems.length; i++) {
				if(path.bounds.intersects(this.menuItems[i].group.bounds)){
					this.menuItems[i].isOver = true;
					this.menuItems[i].group.children[0].fillColor = 'red';
				}else{
					this.menuItems[i].isOver = false;
					this.menuItems[i].group.children[0].fillColor = [0, 0.5];
				}
				if(this.menuItems[i].isOverP != this.menuItems[i].isOver){
					if(this.clickCounter%2==0){
						this.sceneManager.setSceneByName(this.menuItems[i].name);
						console.log(this.menuItems[i].name);
					} 
						
					this.clickCounter++;
				}
				this.menuItems[i].isOverP  = this.menuItems[i].isOver ;
			}
		}
	}
	createMenuItem(sceneName, position) {
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

		return { 
			group: group,
			name: sceneName,
			isOver: false,
			isOverP: false,
		};
	}
}


		// mark point at (100,100)
		// var circle = new paper.Path.Circle({
		//     center: new paper.Point(100, 100),
		//     radius: 10,
		//     fillColor: 'red'
		// });