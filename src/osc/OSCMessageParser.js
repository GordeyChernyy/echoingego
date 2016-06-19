'use strict';

class OSCMessageParser {
	parse(obj){
    	var rootObj = obj[2]
    	
		var name = rootObj[0]
		var x = rootObj[1];
		var y = rootObj[2];
		window.echoingEgo.data[name] = {x: x, y: y};	
    }
}