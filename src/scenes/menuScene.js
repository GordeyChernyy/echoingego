'use strict';
class menuScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "menuScene";
		this.group = new paper.Group();
		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'black',
		})
		this.poetry = new paper.PointText({
			content: window.poemContent,
			position: [paper.view.size.width/2, paper.view.size.height/2],
			fillColor: 'white'
		});
		this.group.addChild(this.bg);
		this.group.addChild(this.poetry);
		this.opacity = 0;
	}
	show() {
		this.poetry.content = window.poemContent;
		this.opacity = 0;
		this.showLayer();
	}
	update(point) {
		this.group.opacity = this.opacity;
		this.opacity += 0.02;
		if(this.opacity>1){
			this.opacity = 1;
		}
	}

	hide() {
		this.group.opacity = 0;
		this.opacity = 0;
		this.hideLayer();
	}
}