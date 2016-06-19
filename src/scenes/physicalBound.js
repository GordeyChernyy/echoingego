'use strict';
class physicalBound extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "physicalBound";

		this.eyeL = new svgPivotColor({
			path: 'assets/svg/BubblesInBoxMask/rootMouth.svg',
			pivot: [0, 0],
			energy: 20,
			speed: 5,
			fadeForce: 19,
		});
		this.eyeR = new svgPivotColor({
			path: 'assets/svg/BubblesInBoxMask/rootHead.svg',
			pivot: [0, 0],
			energy: 20,
			speed: 5,
			fadeForce: 19,
		});

	}
	update(data) {
		var rhand = data["/righthand_pos"];
		var lhand = data["/lefthand_pos"];
		var head = data["/head_pos"];
		this.eyeL.update();
		this.eyeL.group.position = [rhand.x, rhand.y];
		this.eyeL.energy = 12.5;
		this.eyeR.update();
		this.eyeR.group.position = [lhand.x, lhand.y];
		this.eyeR.energy = 12.5;
	}
	show() {
		this.showLayer();
	}

	hide() {
		this.hideLayer();
	}
}