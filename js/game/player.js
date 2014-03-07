var PLAYER = 
{
    group: null,
    physijsShape: null,
    speed: 2,
    jump: 2,
    size: { x: 2, y: 1, z: 2 },
    camera: null,
    controls: null,
    weaponMesh: null,

    initialize: function()
    {
        this.createPhysijsShape();
        this.createCamera();
        this.createControls();
        this.loadMeshes();
        this.setMainObjectsToWorld();
    },

    createPhysijsShape: function() {
        this.physijsShape = new Physijs.BoxMesh( 
            new THREE.CubeGeometry( CONVERSOR.SizeTo3D( PLAYER.size.x ), CONVERSOR.SizeTo3D( PLAYER.size.y ), CONVERSOR.SizeTo3D( PLAYER.size.z ) ), 
            Physijs.createMaterial( new THREE.MeshNormalMaterial(), .4, .6),
            1
        );
        this.physijsShape.position.set( 0, 10, 0 );
        this.physijsShape.setAngularFactor({ x: 0, y: 0, z: 0 });
        this.physijsShape.rotation.set( 0, 0, 0 );
        this.physijsShape.__dirtyPosition = true;
    },

    createCamera: function() {
        this.camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
        this.camera.position.set(this.physijsShape.position.x, this.physijsShape.position.y + 5, this.physijsShape.position.z);
        this.physijsShape.add(this.camera);
    },

    createControls: function() {
        this.controls = new THREE.PointerLockControls();
    },

    loadMeshes: function() {
        loader = new THREE.ObjectLoader();
        this.loadWeaponMesh(loader);
    },

    loadWeaponMesh: function(loader) {
        loader.load('assets/models/SMGWeapon.json', function (loadedMesh) {
            PLAYER.weaponMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            PLAYER.weaponMesh.position.set(PLAYER.physijsShape.position.x - 5, PLAYER.physijsShape.position.y, PLAYER.physijsShape.position.z + 5);
            PLAYER.physijsShape.add(PLAYER.weaponMesh);
        });
    },

    setMainObjectsToWorld: function() {
        WORLD.camera = this.camera;
        WORLD.controls = this.controls;
        WORLD.scene.add( this.physijsShape );
    },

    update: function( timeDelta )
    {     
        if (this.controls != null && this.camera != null && this.controls.enabled == true)
        {
            this.controls.isOnObject( false );
            this.controls.update(timeDelta*1000);
        }
    },
}