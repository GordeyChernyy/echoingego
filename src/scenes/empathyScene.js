'use strict';
class empathyScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "empathyScene";
		this.circles = [];
		this.velocityData = {};
		this.runOnce = true;
		this.minDistance = 20;
		this.isFade = true;
		this.isFinished = false;
		this.bgGroup = new paper.Group();

		this.lockPos = new paper.Point();
		this.keyPos = new paper.Point();
		this.keyPosOffset = [124, -108];
		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: '#1b1464',
		});
		this.titleGroup = new paper.Group();
		var self = this;
	    paper.project.importSVG('assets/svg/title/text.svg', function(item) {
	      self.titleGroup.addChild(item);
	    	self.titleGroup.position = [700, 280];
	    });
		this.parts = {
			l_hand: new svgPivotColor({
				path: 'assets/svg/Empathy/rootHandL.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			}),
			r_knee: new svgPivotColor({
				path: 'assets/svg/Empathy/rootLegR.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			l_knee: new svgPivotColor({
				path: 'assets/svg/Empathy/rootLegL.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			head: new svgPivotColor({
				path: 'assets/svg/Empathy/rootHead.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 1,
				fadeForce: 10,
			}),
			torso: new svgPivotColor({
				path: 'assets/svg/Empathy/rootBody.svg',
				pivot: [0, 0],
				energy: 20,
				speed: 5,
				fadeForce: 19,
			}),
			r_hand: new svgPivotColor({
				path: 'assets/svg/Empathy/rootHandR.svg',
				pivot: [0, 0],
				energy: 0,
				speed: 5,
				fadeForce: 19,
			})
		};

		this.title2 = new paper.PointText({
		 	content: "empathy",
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
		this.lockPos.x = data[window.names['head']].x;
		this.lockPos.y = data[window.names['head']].y; 
		this.keyPos.x = data[window.names['r_hand']].x + this.keyPosOffset[0];
		this.keyPos.y = data[window.names['r_hand']].y + this.keyPosOffset[1];

		var distance = this.keyPos.getDistance(this.lockPos);
		// this.circle.position = this.lockPos;
		// this.circle2.position = this.keyPos;
		// lock solved
		if(distance < this.minDistance && this.runOnce){
			window.poemContent = "If you grow like a red wood,\nyou may scrape the sun for a moment,\nbut you are destined to fall\nBut, if you grow like a banyan tree,\nin every leaf in the forest\nyou feel the light through us all";
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