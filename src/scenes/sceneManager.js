'use strict';
class sceneManager {
	setup() {
		console.log("sceneManager setup" );
		this.scenes = [
			new physicalBoundScene(),
			new rationalizationScene(),
			new menuScene()
		]
		this.curScNum = 0;
		for (var i = 0; i < this.scenes.length; i++) {
			this.scenes[i].setup();
		}
		this.names = [];
		for (var i = 0; i < this.scenes.length; i++) {
			this.names.push(this.scenes[i].name);
		}
		this.scenes[0].show();
	}
	
	update(data) {
		this.scenes[this.curScNum].update(data);
		if(this.scenes[this.curScNum].isFinished != undefined){
			if(this.scenes[this.curScNum].isFinished){
				console.log(this.scenes[this.curScNum].isFinished);
				this.setSceneByName('menuScene');
			} 
		}
	}

	setSceneByName(name) {
		this.hideScene();
		var index = this.names.indexOf(name);

		if (index >= 0) {
			this.curScNum = index;
		}
		this.showScene();
	};

	hideScene() {
		this.scenes[this.curScNum].hide();
	}

	showScene() {
		this.scenes[this.curScNum].show();
	}

}