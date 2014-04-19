define( ["order!threeCore", "bullet", "player"], function ( THREE, Bullet, Player ) {
	var clock = new THREE.Clock();
	var timeDelta = clock.getDelta();
	var NewBullet;

	testStart(function() {
		NewBullet = new Bullet();
	});

	testDone(function() {
	});


	test( "Bullet - class Exists", function() {
		ok( NewBullet != NaN, "Bullet class does not exist." );
	});

	test( "Bullet - has bullet Material", function() {
		ok( NewBullet.material != undefined, "Bullet hasn't got material." );
	});

	test( "Bullet - has bullet geometry", function() {
		ok( NewBullet.geometry != undefined, "Bullet hasn't got geometry." );
	});

	test( "Bullet - has projector", function() {
		ok( NewBullet.projector != undefined, "Bullet hasn't got projector." );
	});

	test( "Bullet - has speed", function() {
		equal( NewBullet.speed, 500, "Bullet hasn't got speed." );
	});

	test( "Bullet - can a new bullet", function() {
		NewBullet.initialize( 0 , 0, Player )
		ok( NewBullet != undefined, "Bullet class can't create a new bullet" );
	});

	test( "Bullet - can update its objects", function() {
		NewBullet.initialize( 0 , 0, Player );
		ok( NewBullet.update( timeDelta ) != NaN, "Enemy class can't add objects to World" );
	});

} );