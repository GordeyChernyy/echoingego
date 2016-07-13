'use strict';
class physicalBoundScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "physicalBoundScene";
		this.circles = [];
		this.velocityData = {};
		this.runOnce = true;
		this.minDistance = 20;
		this.isFade = true;
		this.isFinished = false;
		this.bgGroup = new paper.Group();
		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'darkRed',
		})
		this.parts = {
			rhand: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootHand.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			leg: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootLeg.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			})
		};

		this.title = new paper.PointText({
		 	content: "Your ego is about ",
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
		this.circle = new paper.Path.Circle({
			radius: 20,
			fillColor: 'red',
		});
		this.circle2 = new paper.Path.Circle({
			radius: 20,
			fillColor: 'green',
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
		
		this.bgGroup.addChild(this.bg);
		this.bgGroup.addChild(this.title);
		this.bgGroup.addChild(this.title2);
		this.opacity = 0;

	}
	getKeyPos(key){
		return key.keyObj.localToGlobal().add(key.keyObj.position);
	}
	getLockPos(key){
		return key.lockObj.localToGlobal().add(key.lockObj.position);
	}
	update(point) {
		this.counter++;
		// var rhand = data[window.names["r_hand"]];
		// var lhand = data[window.names["l_hand"]];
		// var head = data[window.names["head"]];
		// var lleg = data[window.names["l_foot"]];

		if(this.isFade){
			for (var prop in this.parts) {
				this.parts[prop].fadeOut(point, 2);
			}
			if(this.parts['rhand'].isSolved){
				this.isFinished = true;
				this.hideLayer();
				this.isFade = false;
			}
			if(this.parts['rhand'].isFinished){
				this.isFinished = true;
			}

			this.bgGroup.opacity = this.opacity;
			this.opacity -= 0.02;
			
			if(this.opacity<0){
				this.opacity = 0;
			}
		}else{
			this.parts['rhand'].update(point, 5);
			this.parts['leg'].update([200, 500], 2);

			this.bgGroup.opacity = this.opacity;
			this.opacity += 0.02;
			
			if(this.opacity>1){
				this.opacity = 1;
			}
		}

		// calculate lock and key pos
		var lockPos = this.getLockPos(this.parts['rhand']);
		var keyPos = this.getKeyPos(this.parts['leg']);
		var distance = keyPos.getDistance(lockPos);

		// lock solved
		if(distance < this.minDistance && this.runOnce){
			this.parts['rhand'].lockObj.opacity = 0.5;
			window.poemContent = "I've got nothing to claim\nnot even the place where I stay\nbecause if you give a fish\na bowl you take its ocean away";
			this.isFade = true;
			this.runOnce = false;
		}



	}
	show() {
		this.showLayer();
		this.isFinished = false;
		this.runOnce = true;
		this.isFade = false;
		this.bgGroup.opacity = 0;
		for (var prop in this.parts) {
			this.parts[prop].reset();
		}
	}

	hide() {
		this.hideLayer();
	}
}