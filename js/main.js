'use strict';

var DEBUG = true;
	
require( ["app", "generic/blocker", "generic/instructions" ,"generic/pointerlockchange","generic/pointerlockerror"], function ( app, blocker, instructions, pointerlockchange, pointerlockerror ) {

	/*if ( ! Detector.webgl ) {
	    Detector.addGetWebGLMessage();
	    container.innerHTML = "";
	}*/

	// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

	var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

	if ( havePointerLock ) {
		// Hook pointer lock state change events
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

	} else {

		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

	}

	app.init();
	app.update();
} );