var ENEMY =
{
	enemies: [],
	group: null,
    physijsShape: null,
    speed: 2,
    jump: 2,
    size: { x: 2, y: 1, z: 2 },
    weaponMesh: null,
    bodyMesh: null,

    initialize: function()
    {
        this.createPhysijsShape();
        this.loadMeshes();
        this.setMainObjectsToWorld();
    },

    createPhysijsShape: function() {
        this.physijsShape = new Physijs.BoxMesh( 
            new THREE.CubeGeometry( CONVERSOR.SizeTo3D( ENEMY.size.x ), CONVERSOR.SizeTo3D( ENEMY.size.y ), CONVERSOR.SizeTo3D( ENEMY.size.z ) ), 
            Physijs.createMaterial( new THREE.MeshNormalMaterial(), .4, .6),
            1
        );
        this.physijsShape.position.set( 100, 10, 100 );
        this.physijsShape.setAngularFactor({ x: 0, y: 0, z: 0 });
        this.physijsShape.rotation.set( 0, 0, 0 );
        this.physijsShape.__dirtyPosition = true;
        //this.physijsShape.visible = false;
    },

    loadMeshes: function() {
        loader = new THREE.ObjectLoader();
        this.loadWeaponMesh(loader);
        //this.loadBodyMesh(loader);
    },

    loadBodyMesh: function(loader) {
    	loader.load('assets/animals/fox.js', function (loadedMesh) {
            ENEMY.bodyMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            ENEMY.bodyMesh.position.set(ENEMY.physijsShape.position.x - 5, ENEMY.physijsShape.position.y, ENEMY.physijsShape.position.z + 5);
            ENEMY.physijsShape.add(ENEMY.bodyMesh);
        });
    },

    loadWeaponMesh: function(loader) {
        loader.load('assets/models/SMGWeapon.json', function (loadedMesh) {
            ENEMY.weaponMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            ENEMY.weaponMesh.position.set(ENEMY.physijsShape.position.x, ENEMY.physijsShape.position.y, ENEMY.physijsShape.position.z);
            ENEMY.physijsShape.add(ENEMY.weaponMesh);
        });
    },

    setMainObjectsToWorld: function() {
        WORLD.scene.add( this.physijsShape );
    },

    update: function( timeDelta )
    {     

    },
}