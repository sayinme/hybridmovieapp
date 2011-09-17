var video;

// You are welcome to use my files, but please host them on your own server. Oh, and especially make sure you don't link to the file mint.js - it screws up my stats, and it makes it a lot easier for me to find you >:-(
function setValue() {
	video = document.getElementById('video');
	playVid();
}

function checkStatus() {
	video.addEventListener('canplay',playVid,true);
}

function playVid() {
	var pause =  document.getElementById('pause');
	var play =  document.getElementById('play');
	var timer = document.getElementById('timer');
	var duration = document.getElementById('duration');
	var t; // This is for the timer
// Set some initial values in the page
	
//	duration.firstChild.nodeValue = Math.round(video.duration);
// Function to begin the timer
/*	function startCount() {
		t = window.setInterval(function() {
			if (video.ended != true) {
				timer.firstChild.nodeValue = Math.round(video.currentTime + 1);
			} else {
				play.firstChild.nodeValue = 'Play';
				window.clearInterval(t);
			}
		},1000);		
	}*/
// Function to pause the timer
/*	function pauseCount() {
		window.clearInterval(t);
	}*/
// Play & pause when the control is clicked
	play.addEventListener('click',playControl,false);
	video.addEventListener('click',playControl,false);
	
	function playControl() {
		
		if (video.paused == false) {
			alert('qq');
			video.pause();
			this.firstChild.nodeValue = 'Play';
			//pauseCount();
		} else {
			alert('q2');
			video.play();
			this.firstChild.nodeValue = 'Pause';
			//duration.firstChild.nodeValue = Math.round(video.duration);
			//startCount();
		}
	}
	
}

window.onload = setValue;