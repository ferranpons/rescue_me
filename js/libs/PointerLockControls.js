/**
 * @author mrdoob / http://mrdoob.com/
 * @author ponsaffair / http://www.ferranpons.com/
 */

define( ["threeCore", "player", "bullet"], function ( THREE, Player, BULLET ) {
	var PointerLockControls = function (player) {

		var scope = this;
		var height = player.camera.position.y;

		player.camera.rotation.set( 0, 0, 0 );

		var pitchObject = new THREE.Object3D();
		pitchObject.add( player.physijsMesh );

		var yawObject = new THREE.Object3D();
		//yawObject.position.y = height;
		yawObject.add( pitchObject );

		var moveForward = false;
		var moveBackward = false;
		var moveLeft = false;
		var moveRight = false;
		var run = false;

		var isOnObject = false;
		var canJump = false;

		var runFactor = 0.5;
		var velocityFactor = 12;
		var walkFactor = 0.1;

		var velocity = new THREE.Vector3();

		var PI_2 = Math.PI / 2;

		var onMouseMove = function ( event ) {

			if ( scope.enabled === false ) return;

			var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			yawObject.rotation.y -= movementX * 0.002;
			pitchObject.rotation.x -= movementY * 0.002;


			pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
		};

		var onKeyDown = function ( event ) {

			switch ( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = true;
					break;

				case 37: // left
				case 65: // a
					moveLeft = true; break;

				case 40: // down
				case 83: // s
					moveBackward = true;
					break;

				case 39: // right
				case 68: // d
					moveRight = true;
					break;

				case 32: // space
					if ( canJump === true ) velocity.y += 10;
					canJump = false;
					break;

				case 16: // shift
					run = true;
					break;

			}

		};

		var onKeyUp = function ( event ) {

			switch( event.keyCode ) {

				case 38: // up
				case 87: // w
					moveForward = false;
					break;

				case 37: // left
				case 65: // a
					moveLeft = false;
					break;

				case 40: // down
				case 83: // s
					moveBackward = false;
					break;

				case 39: // right
				case 68: // d
					moveRight = false;
					break;

				case 16: // shift
					run = false;
					break;

			}

		};

		var onClick = function( event ) {
			event.preventDefault;
			if (event.which === 1 && scope.enabled === true) { // Left click only
				var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
				var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
				BULLET.createBullet( movementX, movementY, player);
			}
		};

		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );
		document.addEventListener( 'click', onClick, false);

		this.enabled = false;

		this.getObject = function () {

			return yawObject;

		};

		this.isOnObject = function ( boolean ) {

			isOnObject = boolean;
			canJump = boolean;

		};

		this.getDirection = function() {
			// assumes the camera itself is not rotated
			var v,direction = new THREE.Vector3( 0, 0, -1 );
			var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

			return function( ) {
				rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
				v.copy( direction ).applyEuler( rotation );
				return v;
			}

		}();

		this.getRotation = function() {
			var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

			return function() {
				rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
				return rotation;
			}
		}();

		this.update = function ( delta ) {

			if ( scope.enabled === false ) return;

			delta *= 0.1;

			velocityFactor = 0.08;
			velocity.x += ( - velocity.x ) * velocityFactor * delta;
			velocity.z += ( - velocity.z ) * velocityFactor * delta;

			velocity.y -= 0.25 * delta;

			if (run)
				velocityFactor = runFactor;
			else
				velocityFactor = walkFactor;

			if ( moveForward ) velocity.z -= velocityFactor * delta;
			if ( moveBackward ) velocity.z += velocityFactor * delta;

			if ( moveLeft ) velocity.x -= velocityFactor * delta;
			if ( moveRight ) velocity.x += velocityFactor * delta;

			if ( isOnObject === true ) {

				velocity.y = Math.max( 0, velocity.y );

			}

			yawObject.translateX( velocity.x );
			//yawObject.translateY( velocity.y ); 
			yawObject.translateZ( velocity.z );


			if ( yawObject.position.y < height ) {

				velocity.y = 0;
				yawObject.position.y = height;

				canJump = true;

			}


			//Player.camera.rotation.copy(this.getRotation());
			//Player.weaponMesh.rotation.copy(this.getRotation());
			//physijsMesh.position.copy(yawObject.position);

			/*Player.physijsMesh.position.set(yawObject.position.x, Player.physijsMesh.position.y, yawObject.position.z);
			//physijsMesh.position.x = yawObject.position.x;
			//physijsMesh.position.z = yawObject.position.z;
			Player.physijsMesh.setAngularFactor({ x: 0, y: 0, z: 0 });
			Player.physijsMesh.__dirtyPosition = true;*/

			var newPosition = new THREE.Vector3(yawObject.position.x, player.physijsMesh.position.y, yawObject.position.z);
			player.setPosition(newPosition);
			player.setCameraRotation(this.getRotation());
		};

	};
	return PointerLockControls;
} );