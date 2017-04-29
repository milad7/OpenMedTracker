var config = require('./config');
var Sound = require('node-aplay');
var medReminder = require('./pill-reminder');
var medDetector = require('./pill-detector');
var dashButton = require('node-dash-button');

var dash = dashButton(config.dash.MAC_address);
var alarmSound = new Sound('/alarm.wav');
var successSound = new Sound('/success.wav');


medDetector.start();
while(1){
	var isMedTime= medReminder.isTime();
	  while(isMedTime == true){
		alarmSound.play();
		 
		setTimeout(function () {
			alarmSound.pause();  
		}, 5000);


		alarmSound.on('complete' function () {
			dash.on('detected', function (){
				console.log('Dash button was clicked');
				medDetector.onMove(function(result) {
					successSound.play();
					isMedTime = false;
				});
			});
		});
		setTimeout(function() {
			}, 3000);
	  }
}


