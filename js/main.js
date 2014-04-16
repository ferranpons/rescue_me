'use strict';

var DEBUG = true;
	
require( ["app"], function ( app ) {

	/*if ( ! Detector.webgl ) {
	    Detector.addGetWebGLMessage();
	    container.innerHTML = "";
	}*/

	// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

	app.init();
	app.update();
} );