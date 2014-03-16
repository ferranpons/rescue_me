var loader = new THREE.ObjectLoader();
var newPosition = new THREE.Vector3(100, 10, 100);
var newRotation = new THREE.Euler( 0, 0, 0, "YXZ" );;
var newSize = { x: 2, y: 1, z: 2 };
var newSpeed = 2;
var WORLD = {scene: new Physijs.Scene({ fixedTimeStep: 1 / 120 })};
var clock = new THREE.Clock();
var timeDelta = clock.getDelta();


test( "Player class Exists", function() {
	ok( Player != NaN, "Player class does not exist." );
});

test( "Player has 100 health points", function() {
	equal( Player.health, 100, "Player hasn't got 100 health points." );
});

test( "Player has a position", function() {
	deepEqual( Player.position, new THREE.Vector3(0,0,0), "Player hasn't got a position" );
});

test( "Set a new position to Player", function() {
	Player.setPosition(newPosition);
	deepEqual( Player.position, newPosition, "Player new position not set." );
});

test( "Player has size", function() {
	var size = { x: 1, y: 1, z: 1 };
	deepEqual( Player.size, size, "Player hasn't got a size." );
});

test( "Player has speed", function() {
	equal( Player.speed, 1, "Player hasn't got speed." );
});

test( "Player Physijs Mesh Exists", function() {
	notStrictEqual( Player.physijsMesh, undefined, "Physijs Mesh does not exist." );
});

test( "Player Physijs Mesh has a geometry", function() {
	notStrictEqual( Player.physijsMeshGeometry, undefined, "Physijs Mesh does not exist." );
});

test( "Player Physijs Mesh has a material", function() {
	notStrictEqual( Player.physijsMeshMaterial, undefined, "Physijs Mesh does not exist." );
});

test( "Player setup main values", function() {
	Player.initializeWith( newPosition, newSize, newSpeed );
	deepEqual( Player.position, newPosition, "Player's new position not correct." );
	deepEqual( Player.size, newSize, "Player's new size not correct." );
	equal( Player.speed, newSpeed, "Player's new speed not correct." );
	ok( Player.physijsMesh != null, "Player's Physijs Mesh not correct." );
});

test( "Player has a Grouped Mesh without Physijs Shape", function() {
	notStrictEqual( Player.groupedMesh, undefined, "Player hasn't got a Grouped Mesh." );
});

test( "Player has a Body Mesh", function() {
	notStrictEqual( Player.bodyMesh, undefined, "Player hasn't got a Body Mesh." );
});

test( "Player has a Weapon Mesh", function() {
	notStrictEqual( Player.weaponMesh, undefined, "Player hasn't got a Body Mesh." );
});

test( "Player can add 3D Objects to World", function() {
	ok( Player.addObjectsToWorld() != NaN, "Player class can't add objects to World" );
});

test( "Player can update its objects", function() {
	ok( Player.update( timeDelta ) != NaN, "Player class can't add objects to World" );
});

test( "Player has a Camera", function() {
	notStrictEqual( Player.camera, undefined, "Player hasn't got a Camera Object." );
});

test( "Set a new rotation to camera Player", function() {
	Player.createCamera();
	Player.setCameraRotation(newRotation);
	ok( Player.camera.rotation, "Player new camera rotation not set." );
});

test( "Player has controls object", function() {
	notStrictEqual( Player.controls, undefined, "Player hasn't got a Camera Object." );
});

test( "Player can create new controls object", function() {
	ok( Player.createControls() != NaN, "Player class can't add objects to World" );
});