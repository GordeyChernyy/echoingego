'use strict';
class physicalBoundScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "physicalBoundScene";

		this.righthand = new svgPivotColor({
			path: 'assets/svg/BubblesInBoxMask/rootMouth.svg',
			pivot: [0, 0],
			energy: 0,
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
		var rhand = data["r_hand"];
		var lhand = data["l_hand"];
		var head = data["/head"];
		// console.log(rhand.x);
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