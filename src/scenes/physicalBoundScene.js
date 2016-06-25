'use strict';
class physicalBoundScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "physicalBoundScene";
		this.circles = [];
		this.velocityData = {};
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
		for (var i = 0; i < 15; i++) {
			var path = new paper.Path.Circle({
				center: [0, 0],
				radius: 10,
				fillColor: 'red'
			});
			this.circles.push(path);
		}
		this.counter = 0;
		this.velocity = 0;
	}
	update(data) {

		this.counter++;
		// var l_shoulder = data["l_shoulder"] ;
		// var l_elbow = data["l_elbow"] ;
		// var l_hand = data["l_hand"] ;
		// var l_hip = data["l_hip"] ;
		// var l_knee = data["l_knee"] ;
		// var l_foot = data["l_foot"] ;
		// var head = data["head"];
		// var torso = data["torso"] ;
		// var r_shoulder = data["r_shoulder"] ;
		// var r_elbow = data["r_elbow"] ;
		// var r_hand = data["r_hand"] ;
		// var r_hip = data["r_hip"] ;
		// var r_knee = data["r_knee"] ;
		// var r_foot = data["r_foot"] ;
		// this.circles[0].position = [data["head"]["x"], data["head"]["y"]];
		var i = 0;
		for(var propt in data) {
      		// console.log(propt);//logs name
      		// console.log(data[propt]);//logs "Simon"
			this.circles[i].position = [data[propt].x, data[propt].y];
			i++;
   		}
		// for (var i = 0; i < 14; i++) {
		// }
		var rhand = data["/righthand_pos"];
		var lhand = data["/lefthand_pos"];
		// var head = data["/head_pos"];
		// console.log(rhand.x);
		console.log("rhand.velocity = " + rhand.velocity);
		this.righthand.update([rhand.x, rhand.y], rhand.velocity);
		this.lefthand.update([lhand.x, lhand.y], lhand.velocity);
	}
	show() {
		this.showLayer();
	}

	hide() {
		this.hideLayer();
	}
}