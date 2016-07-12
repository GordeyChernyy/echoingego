'use strict';

class OSCMessageParser {
	setup(){
		if(!window.isLocal){
			window.echoingEgo.data["l_shoulder"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["l_elbow"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["l_hand"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["l_hip"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["l_knee"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["l_foot"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["head"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["torso"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["r_shoulder"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["r_elbow"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["r_hand"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["r_hip"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["r_knee"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["r_foot"] = {x: 0, y: 0, velocity: 0};
		}else{
			window.echoingEgo.data["/righthand_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/lefthand_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/rightelbow_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/leftelbow_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/rightfoot_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/leftfoot_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/rightknee_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/leftknee_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/head_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/torso_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/leftshoulder_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/rightshoulder_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/lefthip_pos"] = {x: 0, y: 0, velocity: 0};
			window.echoingEgo.data["/righthip_pos"] = {x: 0, y: 0, velocity: 0};
		}
	}
	parse(obj){

	if(window.isLocal){ // --------------- local data
		var rootObj = obj[2];
		var name = rootObj[0];
		var scale = 1.3;
		var x = rootObj[1]*scale+100;
		var y = rootObj[2]*scale+50;

		if(Object.keys(window.echoingEgo.data).length > 0 && window.echoingEgo.data[name] != null){
			x2 = window.echoingEgo.data[name].x;
			y2 = window.echoingEgo.data[name].y;
			var velocity = Math.sqrt((x2-=x)*x2 + (y2-=y)*y2);
			var smooth = 0.9;
			window.echoingEgo.data[name].velocity = window.echoingEgo.data[name].velocity*(smooth) +  (1-smooth)*velocity; 
		}
		window.echoingEgo.data[name]["x"] = x;	
		window.echoingEgo.data[name]["y"] = y;	
	}else{ // --------------- julia data
		var name = obj[0];
		if(name=="person"){
			console.log(obj[1]);
		}else{
			var x = obj[1]*0.3+500;
			var y = -obj[2]*0.3+300;
			
			var x2;
			var y2;
			if(Object.keys(window.echoingEgo.data).length > 0 && window.echoingEgo.data[name] != null){
				x2 = window.echoingEgo.data[name].x;
				y2 = window.echoingEgo.data[name].y;
				var velocity = Math.sqrt((x2-=x)*x2 + (y2-=y)*y2);
				var smooth = 0.9;
				window.echoingEgo.data[name].velocity = window.echoingEgo.data[name].velocity*(smooth) +  (1-smooth)*velocity; 

			}
			window.echoingEgo.data[name]["x"] = x;	
			window.echoingEgo.data[name]["y"] = y;	
		}
	}


    }
}