'use strict';
class rationalizationScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "rationalizationScene";
	}
	show() {
		console.log("rationalizationScene");
		this.showLayer();
	}
	update(point) {
	}

	hide() {
		this.hideLayer();
	}
}