'use strict';
class deathScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "deathScene";
		this.circles = [];
		this.velocityData = {};
		this.runOnce = true;
		this.minDistance = 20;
		this.isFade = true;
		this.isFinished = false;
		
		this.bgGroup = new paper.Group();

		this.lockPos = new paper.Point();
		this.keyPos = new paper.Point();

		this.keyPosOffset = [-45, -13];
		this.lockPosOffset = [0, 0];

		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'white',
		});
		this.titleGroup = new paper.Group();
		var self = this;
	    paper.project.importSVG('assets/svg/title/text.svg', function(item) {
	      	self.titleGroup.addChild(item);
	    	self.titleGroup.position = [700, 280];
	    	self.titleGroup.fillColor = 'Gainsboro';
	    });
		this.parts = {
			l_hand: new svgPivotColor({
				path: 'assets/svg/Death/rootHandL.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			r_hand: new svgPivotColor({
				path: 'assets/svg/Death/rootHandR.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			// r_elbow: new svgPivotColor({
				// path: 'assets/svg/Death/rootElbowR.svg',
				// pivot: [0, 0],
				// energy: 0,
				// speed: 5,
				// fadeForce: 19,
			// }),
			// l_elbow: new svgPivotColor({
				// path: 'assets/svg/Death/rootElbowL.svg',
				// pivot: [0, 0],
				// energy: 0,
				// speed: 5,
				// fadeForce: 19,
			// }),
			r_foot: new svgPivotColor({
				path: 'assets/svg/Death/rootLegR.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			l_foot: new svgPivotColor({
				path: 'assets/svg/Death/rootLegL.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			head: new svgPivotColor({
				path: 'assets/svg/Death/rootHead.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			torso: new svgPivotColor({
				path: 'assets/svg/Death/rootBody.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			})
		};

		this.title2 = new paper.PointText({
		 	content: "anticipation of death",
			fontFamily: "Helvetica",
			fontSize: 40,
			fontWeight: 'bold',
			justification: "left",
			fillColor: 'Gainsboro'
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
		this.lockPos.x = data[window.names['l_hand']].x + this.lockPosOffset[0];
		this.lockPos.y = data[window.names['l_hand']].y + this.lockPosOffset[1]; 
		this.keyPos.x = data[window.names['head']].x + this.keyPosOffset[0];
		this.keyPos.y = data[window.names['head']].y + this.keyPosOffset[1];

		var distance = this.keyPos.getDistance(this.lockPos);
		// this.circle.position = this.lockPos;
		// this.circle2.position = this.keyPos;
		// lock solved
		if(distance < this.minDistance && this.runOnce){
			window.poemContent = "Dear monk,\nYou can't protest entropy?\nI'm a fucking law of physics.\nI am become death, the destroyer worlds\nI am closer to you humans than your fingers.";

 

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