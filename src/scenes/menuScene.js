'use strict';
class menuScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "menuScene";
		this.rect = new paper.Path.Rectangle({
			from: [0, 0],
			to: [200, 200],
			fillColor: 'white'
		})
	}
	show() {
		this.showLayer();
	}
	update(point) {

	}

	hide() {
		this.hideLayer();
	}
}