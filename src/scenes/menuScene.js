'use strict';
class menuScene extends sceneBase {
	setup() {
		super.addLayer();
		this.name = "menuScene";
		this.group = new paper.Group();
		this.bg = new paper.Path.Rectangle({
			from: [0, 0],
			to: paper.view.size,
			fillColor: 'black',
		})
		this.poetry = new paper.PointText({
			fontFamily: "Helvetica",
			fontSize: 20,
			fontWeight: 'regular',
			justification: "left",
			content: window.poemContent,
			position: [paper.view.size.width/2, paper.view.size.height/2],
			fillColor: 'white'
		});
		this.l_hand = this.createLine(5, 'red');
		this.r_hand = this.createLine(5, 'white');
		this.l_foot = this.createLine(10, 'white');
		this.r_foot = this.createLine(10, 'white');
		this.head = new paper.Path.Circle({
			radius: 20,
			strokeColor: 'white',
			fillColor: (0, 0, 0, 0),
			strokeWidth: 5,
		});		
		this.torso = new paper.Path.RegularPolygon({
			sides: 5,
			radius: 20,
			strokeColor: 'white',
			fillColor: (0, 0, 0, 0),
			strokeWidth: 1,
		});
		this.group.addChild(this.bg);
		this.group.addChild(this.l_hand);
		this.group.addChild(this.r_hand);
		this.group.addChild(this.head);
		this.group.addChild(this.torso);
		this.group.addChild(this.poetry);
		this.opacity = 0;
	}
	createLine(width, color){
		return new paper.Path.Line ({
			from: [0, 0],
			to: [10, 10],
			strokeColor: color,
			strokeWidth: width,
		});
	}
	show() {
		this.poetry.content = window.poemContent;
		this.opacity = 0;
		this.showLayer();
	}
	update(data) {
		var r_hand = data[window.names['r_hand']];
		var l_hand = data[window.names['l_hand']];
		var r_elbow = data[window.names['r_elbow']];
		var l_elbow = data[window.names['l_elbow']];
		var r_foot = data[window.names['r_foot']];
		var l_foot = data[window.names['l_foot']];
		var r_knee = data[window.names['r_knee']];
		var head = data[window.names['head']];
		var torso = data[window.names['torso']];
		var l_shoulder = data[window.names['l_shoulder']];
		var r_shoulder = data[window.names['r_shoulder']];
		var l_knee = data[window.names['l_knee']];
		var l_hip = data[window.names['l_hip']];
		var r_hip = data[window.names['r_hip']];

		this.l_hand.segments[0].point = [l_hand.x, l_hand.y]; 
		this.l_hand.segments[1].point = [l_elbow.x, l_elbow.y]; 

		this.r_hand.segments[0].point = [r_hand.x, r_hand.y]; 
		this.r_hand.segments[1].point = [r_elbow.x, r_elbow.y]; 

		this.r_foot.segments[0].point = [r_foot.x, r_foot.y]; 
		this.r_foot.segments[1].point = [r_knee.x, r_knee.y]; 
		
		this.l_foot.segments[0].point = [l_foot.x, l_foot.y]; 
		this.l_foot.segments[1].point = [l_knee.x, l_knee.y]; 
		
		this.torso.segments[0].point = [l_elbow.x, l_elbow.y]; 
		this.torso.segments[1].point = [head.x, head.y]; 
		this.torso.segments[2].point = [r_elbow.x, r_elbow.y]; 
		this.torso.segments[3].point = [r_knee.x, r_knee.y]; 
		this.torso.segments[4].point = [l_knee.x, l_knee.y]; 

		this.head.position = [head.x, head.y];

		this.group.opacity = this.opacity;
		this.opacity += 0.02;
		if(this.opacity>1){
			this.opacity = 1;
		}
	}

	hide() {
		this.group.opacity = 0;
		this.opacity = 0;
		this.hideLayer();
	}
}