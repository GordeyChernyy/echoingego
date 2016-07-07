'use strict';
class physicalBoundScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "physicalBoundScene";
		this.circles = [];
		this.velocityData = {};

		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'LightYellow',
		})
		this.lhand = new svgPivotColor({
			path: 'assets/svg/PhysBounds/rootHand.svg',
			pivot: [0, 0],
			energy: 0,
			speed: 5,
			fadeForce: 19,
		});

		this.head = new svgPivotColor({
			path: 'assets/svg/PhysBounds/rootHead.svg',
			pivot: [0, 0],
			energy: 20,
			speed: 5,
			fadeForce: 19,
		});

		this.leg = new svgPivotColor({
			path: 'assets/svg/PhysBounds/rootLeg.svg',
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
		this.poetry = new paper.PointText();
		this.poetry.content = "I've got nothing to claim\nnot even the place where I stay\nbecause if you give a fish\na bowl you take its ocean away"
		this.poetry.position = [100, 100];
		
		this.title = new paper.PointText({
		 	content: "Your ego without: ",
			fontFamily: "Lucida Console",
			fontSize: 20,
		});
		this.title2 = new paper.PointText({
		 	content: "physical boundaries",
			fontFamily: this.title.fontFamily,
			fontSize: this.title.fontSize,
			fontWeight: 'bold',
			justification: "left",
		});
		var w = this.title.bounds['_width'] +  this.title2.bounds['_width'];
		var posX = (paper.view.size.width - w)/2;
		var posY = 40;

		this.title.point = [posX, posY];
		this.title2.point = [posX+this.title.bounds['_width'], posY];

		console.log(this.title.bounds); 
		console.log(this.title.justification); 
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
		var rhand = data[window.names["r_hand"]];
		var lhand = data[window.names["l_hand"]];
		var head = data[window.names["head"]];
		var lleg = data[window.names["l_foot"]];
		// this.text.position = [rhand.x, rhand.y];
		// var head = data["/head_pos"];
		// console.log(rhand.x);
		this.lhand.update([lhand.x, lhand.y], lhand.velocity);
		this.head.update([head.x, head.y], head.velocity*2.);
		this.leg.update([lleg.x, lleg.y], lleg.velocity*2.);
	}
	show() {
		this.showLayer();
	}

	hide() {
		this.hideLayer();
	}
}