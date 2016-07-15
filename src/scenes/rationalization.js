'use strict';
class rationalization extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "rationalization";
		this.circles = [];
		this.velocityData = {};
		this.runOnce = true;
		this.minDistance = 20;
		this.isFade = true;
		this.isFinished = false;
		
		this.bgGroup = new paper.Group();

		this.lockPos = new paper.Point();
		this.keyPos = new paper.Point();
		this.keyPosOffset = [-80, -3];
		this.lockPosOffset = [55, 4];
		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'black',
		})
		this.titleGroup = new paper.Group();
		var self = this;
	    paper.project.importSVG('assets/svg/title/text.svg', function(item) {
	      self.titleGroup.addChild(item);
	    	self.titleGroup.position = [700, 280];
	    	self.titleGroup.fillColor = 'DarkGrey';
	    });
		this.parts = {
			l_hand: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootHandL.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			r_knee: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootLegR.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			l_knee: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootLegL.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			head: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootHead.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			torso: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootBody.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			r_hand: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootHandR.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			r_elbow: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootElbowR.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			l_elbow: new svgPivotColor({
				path: 'assets/svg/Rationalization/rootElbowL.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			})
		};

		this.title2 = new paper.PointText({
		 	content: "rationalization",
			fontFamily: "Helvetica",
			fontSize: 40,
			fontWeight: 'bold',
			justification: "left",
			fillColor: 'DarkGrey'
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
		this.keyPos.x = data[window.names['r_hand']].x + this.keyPosOffset[0];
		this.keyPos.y = data[window.names['r_hand']].y + this.keyPosOffset[1];

		var distance = this.keyPos.getDistance(this.lockPos);
		// this.circle.position = this.lockPos;
		// this.circle2.position = this.keyPos;
		// lock solved
		if(distance < this.minDistance && this.runOnce){
			window.poemContent = "Would I'd have been here\nHere, If I'd had been, hear I\nWould id have been here";
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