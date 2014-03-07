//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
'use strict';
	
Physijs.scripts.worker = 'js/libs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var DEBUG = true;

var container, stats;

var cameraMain, scene, renderer;
var cameraCube, sceneCube;

var mesh, lightMesh, geometry;

var loader;

var directionalLight, pointLight;

var ray;
var pointerLockControls = Date.now();

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

	var element = document.body;

	var pointerlockchange = function ( event ) {

		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

			if (WORLD.controls != null) {
				WORLD.controls.enabled = true;
				blocker.style.display = 'none';
			}
		} else {

			if (WORLD.controls != null) {
				WORLD.controls.enabled = false;

				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';

				instructions.style.display = '';
			}
		}

	}

	var pointerlockerror = function ( event ) {

		instructions.style.display = '';

	}

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

	instructions.addEventListener( 'click', function ( event ) {

		if (menuLeft.className.indexOf('cbp-spmenu-open') > -1)
		{
			classie.toggle( this, 'active' );
			classie.toggle( menuLeft, 'cbp-spmenu-open' );
			classie.toggle( showLeft, 'info-opened' );
		}
		else
		{
			instructions.style.display = 'none';

			// Ask the browser to lock the pointer
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

			if ( /Firefox/i.test( navigator.userAgent ) ) {

				var fullscreenchange = function ( event ) {

					if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

						document.removeEventListener( 'fullscreenchange', fullscreenchange );
						document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

						element.requestPointerLock();
					}

				}

				document.addEventListener( 'fullscreenchange', fullscreenchange, false );
				document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

				element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

				element.requestFullscreen();

			} else {

				element.requestPointerLock();

			}
		}
	}, false );

} else {

	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

function init() {

	container = document.createElement( 'div' );
	container.setAttribute("id", "canvas-3d");
	document.body.appendChild( container );

	GAME.Initialize( container.id );

	// STATS
	if (DEBUG)
	{
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		stats.domElement.style.left = '60px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );
	}


	//window.addEventListener( 'resize', onWindowResize, false );

}

/*
function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	cameraMain.aspect = window.innerWidth / window.innerHeight;
	cameraMain.updateProjectionMatrix();

	cameraCube.aspect = window.innerWidth / window.innerHeight;
	cameraCube.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
*/

function update() {

	requestAnimationFrame( update );
	GAME.update();

	if (DEBUG)
		stats.update();

}


init();
update();