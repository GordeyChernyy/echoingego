'use strict';

class OSCMessageParser {
	setup(){
		this.velocity = 0;
		this.prevData = {};
	}
	parse(obj){
    	// var rootObj = rootObj[1]
		var name = obj[0]
		var x = obj[1];
		var y = obj[2];
		// if(window.echoingEgo.data[name] != undefined){

			// console.log("value = " + value);
		// }

		window.echoingEgo.data[name] = {x: x, y: y};
		// console.log("curData = " + window.echoingEgo.data);
		// this.prevData =  window.echoingEgo.data;
    }
}