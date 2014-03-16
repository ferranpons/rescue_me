var loader = new THREE.ObjectLoader();
var anEnemy = new Enemy();
var newPosition = new THREE.Vector3(100, 10, 100);
var newSize = { x: 2, y: 1, z: 2 };
var newSpeed = 2;
var WORLD = {scene: new Physijs.Scene({ fixedTimeStep: 1 / 120 })};
var clock = new THREE.Clock();
var timeDelta = clock.getDelta();


test( "Enemy class Exists", function() {
	ok( anEnemy != NaN, "Enemy class does not exist." );
});

test( "Enemy has 100 health points", function() {
	equal( anEnemy.health, 100, "Enemy hasn't got 100 health points." );
});

test( "Enemy has a position", function() {
	deepEqual( anEnemy.position, new THREE.Vector3(0,0,0), "Enemy hasn't got a position" );
});

test( "Set a new position to Enemy", function() {
	anEnemy.setPosition(newPosition);
	deepEqual( anEnemy.position, newPosition, "Enemy new position not set." );
});

test( "Enemy has size", function() {
	var size = { x: 1, y: 1, z: 1 };
	deepEqual( anEnemy.size, size, "Enemy hasn't got a size." );
});

test( "Enemy has speed", function() {
	equal( anEnemy.speed, 1, "Enemy hasn't got speed." );
});

test( "Enemy Physijs Mesh Exists", function() {
	notStrictEqual( anEnemy.physijsMesh, undefined, "Physijs Mesh does not exist." );
});

test( "Enemy Physijs Mesh has a geometry", function() {
	notStrictEqual( anEnemy.physijsMeshGeometry, undefined, "Physijs Mesh does not exist." );
});

test( "Enemy Physijs Mesh has a material", function() {
	notStrictEqual( anEnemy.physijsMeshMaterial, undefined, "Physijs Mesh does not exist." );
});

test( "Enemy setup main values", function() {
	anEnemy.initializeWith( newPosition, newSize, newSpeed );
	deepEqual( anEnemy.position, newPosition, "Enemy's new position not correct." );
	deepEqual( anEnemy.size, newSize, "Enemy's new size not correct." );
	equal( anEnemy.speed, newSpeed, "Enemy's new speed not correct." );
	ok( anEnemy.physijsMesh != null, "Enemy's Physijs Mesh not correct." );
});

test( "Enemy has a Grouped Mesh without Physijs Shape", function() {
	notStrictEqual( anEnemy.groupedMesh, undefined, "Enemy hasn't got a Grouped Mesh." );
});

test( "Enemy has a Body Mesh", function() {
	notStrictEqual( anEnemy.bodyMesh, undefined, "Enemy hasn't got a Body Mesh." );
});

test( "Enemy has a Weapon Mesh", function() {
	notStrictEqual( anEnemy.weaponMesh, undefined, "Enemy hasn't got a Body Mesh." );
});

test( "Enemy can add 3D Objects to World", function() {
	ok( anEnemy.addObjectsToWorld() != NaN, "Enemy class can't add objects to World" );
});

test( "Enemy can update its objects", function() {
	ok( anEnemy.update( timeDelta ) != NaN, "Enemy class can't add objects to World" );
});