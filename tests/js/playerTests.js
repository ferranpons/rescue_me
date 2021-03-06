define( ["order!threeCore", "order!conversor", "order!player", "order!pointerLockControls"], function ( THREE, CONVERSOR, Player, PointerLockControls ) {
	var loader = new THREE.ObjectLoader();
	var newPosition = new THREE.Vector3(100, 10, 100);
	var newRotation = new THREE.Euler( 0, 0, 0, "YXZ" );;
	var newSize = { x: 2, y: 1, z: 2 };
	var newSpeed = 2;
	//var WORLD = {scene: new Physijs.Scene({ fixedTimeStep: 1 / 120 })};
	var clock = new THREE.Clock();
	var timeDelta = clock.getDelta();

	testStart(function() {
		Player.initializeWith( newPosition, newSize, newSpeed );
	});

	testDone(function() {
	});


	test( "Player - class Exists", function() {
		ok( Player != NaN, "Player class does not exist." );
	});

	test( "Player - has 100 health points", function() {
		equal( Player.health, 100, "Player hasn't got 100 health points." );
	});

	test( "Player - has a position", function() {
		deepEqual( Player.position, newPosition, "Player's new position not correct." );
	});

	test( "Player - set a new position", function() {
		deepEqual( Player.position, newPosition, "Player new position not set." );
	});

	test( "Player - has size", function() {
		deepEqual( Player.size, newSize, "Player hasn't got a size." );
	});

	test( "Player - has speed", function() {
		equal( Player.speed, newSpeed, "Player hasn't got speed." );
	});

	/*test( "Player - Physijs Mesh Exists", function() {
		notStrictEqual( Player.physijsMesh, undefined, "Physijs Mesh does not exist." );
	});

	test( "Player - Physijs Mesh has a geometry", function() {
		notStrictEqual( Player.physijsMeshGeometry, undefined, "Physijs Mesh does not exist." );
	});

	test( "Player - Physijs Mesh has a material", function() {
		notStrictEqual( Player.physijsMeshMaterial, undefined, "Physijs Mesh does not exist." );
	});*/

	test( "Player - has a Grouped Mesh without Physijs Shape", function() {
		notStrictEqual( Player.groupedMesh, undefined, "Player hasn't got a Grouped Mesh." );
	});

	test( "Player - has a Body Mesh", function() {
		notStrictEqual( Player.bodyMesh, undefined, "Player hasn't got a Body Mesh." );
	});

	test( "Player - has a Weapon Mesh", function() {
		notStrictEqual( Player.weaponMesh, undefined, "Player hasn't got a Body Mesh." );
	});

	test( "Player - can update its objects", function() {
		ok( Player.update( timeDelta ) != NaN, "Player class can't add objects to World" );
	});

	test( "Player - has a Camera", function() {
		notStrictEqual( Player.camera, undefined, "Player hasn't got a Camera Object." );
	});

	test( "Player - set a new rotation to camera", function() {
		Player.createCamera();
		Player.setCameraRotation(newRotation);
		ok( Player.camera.rotation, "Player new camera rotation not set." );
	});

	test( "Player - has controls object", function() {
		notStrictEqual( Player.controls, undefined, "Player hasn't got a Camera Object." );
	});

	test( "Player - can create new controls object", function() {
		ok( Player.createControls() != NaN, "Player class can't add objects to World" );
	});

	test( "Player - has weapon types to choose", function() {
		ok( Player.weaponTypes != undefined, "Player hasn't got wepons to choose" );
	});

	test( "Player - has a knife as a weapon", function() {
		Player.setWeapon(Player.weaponTypes.Knife);
		equal( Player.weapon, Player.weaponTypes.Knife, "Player hasn't got a knife" );
	});

	test( "Player - has ammo for Pistol", function() {
		Player.setWeapon(Player.weaponTypes.Pistol);
		equal( Player.weapon.ammo, 150, "Player hasn't got ammo for Pistol" );
		equal( Player.weapon.ammoInClip, 15, "Player hasn't got 15 rounds in clip");
	});
} );