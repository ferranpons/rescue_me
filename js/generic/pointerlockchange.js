define( ["player", "blocker", "instructions"], function ( Player, blocker, instructions ) {
	var pointerlockchange = function ( event ) {
		var element = document.body;
		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

			if (Player.controls != null) {
				Player.controls.enabled = true;
				blocker.style.display = 'none';
			}
		} else {

			if (Player.controls != null) {
				Player.controls.enabled = false;

				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';

				instructions.style.display = '';
			}
		}

	}
	return pointerlockchange;
} );