'use strict';
class physicalBound extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "physicalBound";

		this.righthand = new svgPivotColor({
			path: 'assets/svg/BubblesInBoxMask/rootMouth.svg',
			pivot: [0, 0],
			energy: 20,
			speed: 5,
			fadeForce: 19,
		});
		this.lefthand = new svgPivotColor({
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
		this.righthand.update([rhand.x, rhand.y], 12.5);
		this.lefthand.update([lhand.x, lhand.y], 12.5);
	}
	show() {
		this.showLayer();
	}

	hide() {
		this.hideLayer();
	}
}