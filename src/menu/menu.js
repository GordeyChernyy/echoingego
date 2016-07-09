'use strict';
class Menu {
	setup() {
		console.log("MENU!!")
		this.createMenuItem("Physical Boundaries", {x: 200, y: 200})
	}

	createMenuItem(textContent, position) {
		var layer = new paper.Layer();
		var background = new paper.Path.Rectangle({
			size: [10, 10],
		})
		var text = new paper.PointText();

		text.content = textContent;
		
		text.fillColor = "White";
		// console.log(background)
		
		background.bounds.width = text.bounds.width + 25
		background.bounds.height = text.bounds.height + 25
		background.fillColor = new paper.Color(0,0.5);

		text.position = background.position;
		var group = new paper.Group([background, text]);

		group.position = new paper.Point(position.x, position.y)
		group.onMouseMove = function(e){
			
		}
	}
}


		// mark point at (100,100)
		// var circle = new paper.Path.Circle({
		//     center: new paper.Point(100, 100),
		//     radius: 10,
		//     fillColor: 'red'
		// });