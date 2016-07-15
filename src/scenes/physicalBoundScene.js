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

		this.titleGroup = new paper.Group();
		var self = this;
	    paper.project.importSVG('assets/svg/title/text.svg', function(item) {
	      self.titleGroup.addChild(item);
	    	self.titleGroup.position = [700, 280];
	    });

		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'darkRed',
		})
		this.parts = {
			l_hand: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootHand.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			r_hand: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootHandR.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			r_foot: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootLegR.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			l_foot: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootLegL.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			head: new svgPivotColor({
				path: 'assets/svg/PhysBounds/rootHead.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			})
		};

		this.title2 = new paper.PointText({
		 	content: "physical boundaries",
			fontFamily: "Helvetica",
			fontSize: 40,
			fontWeight: 'bold',
			justification: "left",
			fillColor: 'white'
		});
		this.circle = new paper.Path.Circle({
			radius: 20,
			fillColor: 'red',
		});
		this.circle2 = new paper.Path.Circle({
			radius: 20,
			fillColor: 'green',
		});

		this.title2.point = [330, 600];

		this.counter = 0;
		this.velocity = 0;
		
		this.bgGroup.addChild(this.bg);
		this.opacity = 0;

	}
	getKeyPos(key){
		return key.keyObj.localToGlobal().add(key.keyObj.position);
	}
	getLockPos(key){
		return key.lockObj.localToGlobal().add(key.lockObj.position);
	}
	update(data) {
		if(this.isFade){
			for (var prop in this.parts) {
				var bodyPart = data[window.names[prop]];
				this.parts[prop].fadeOut([bodyPart.x, bodyPart.y], 2);
			}
			if(this.parts['l_hand'].isSolved){
				this.isFinished = true;
				this.hideLayer();
				this.isFade = false;
			}
			if(this.parts['l_hand'].isFinished){
				this.isFinished = true;
			}

			this.bgGroup.opacity = this.opacity;
			this.opacity -= 0.02;
			
			if(this.opacity<0){
				this.opacity = 0;
			}
		}else{
			for (var prop in this.parts) {
				var bodyPart = data[window.names[prop]];
				this.parts[prop].update([bodyPart["x"], bodyPart["y"]], bodyPart["velocity"]);
			}
			this.bgGroup.opacity = this.opacity;
			this.opacity += 0.02;
			
			if(this.opacity>1){
				this.opacity = 1;
			}
		}

		// calculate lock and key pos
		var lockPos = this.getLockPos(this.parts['l_hand']);
		var keyPos = this.getKeyPos(this.parts['l_foot']);
		var distance = keyPos.getDistance(lockPos);

		// lock solved
		if(distance < this.minDistance && this.runOnce){
			window.poemContent = "I've got nothing to claim fmf;fdk\nnot even the place where I stay\nbecause if you give a fish\na bowl you take its ocean away";
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