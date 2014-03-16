var Player = 
{
    health: 100,
    position: new THREE.Vector3(0,0,0),
    size: { x: 1, y: 1, z: 1 },
    speed: 1,

    physijsMesh: new THREE.Object3D(),
    physijsMeshGeometry: new THREE.CubeGeometry( 1, 1, 1),
    physijsMeshMaterial: Physijs.createMaterial( new THREE.MeshNormalMaterial(), .4, .6),

    groupedMesh: new THREE.Object3D(),
    bodyMesh: null,
    weaponMesh: null,

    camera: null,
    controls: null,

    initializeWith: function (newPosition, newSize, newSpeed) {
        this.setPosition(newPosition);
        this.size = newSize;
        this.speed = newSpeed;
        this.groupedMesh.position.copy(this.position);
        this.createCamera();
        this.createControls();
        this.loadAndCreateMeshes();
        this.addObjectsToWorld();
    },

    loadAndCreateMeshes: function() {
        loader = new THREE.ObjectLoader();
        this.createPhysijsMesh();
        this.loadBodyMesh(loader);
        this.loadWeaponMesh(loader);
    },

    createPhysijsMesh: function() {
        this.physijsMeshGeometry = new THREE.CubeGeometry( CONVERSOR.SizeTo3D( this.size.x ), CONVERSOR.SizeTo3D( this.size.y ), CONVERSOR.SizeTo3D( this.size.z ) );
        this.physijsMesh = new Physijs.BoxMesh( this.physijsMeshGeometry, this.physijsMeshMaterial, 1 );
        this.physijsMesh.position.copy(this.position);
        this.physijsMesh.setAngularFactor({ x: 0, y: 0, z: 0 });
        this.physijsMesh.rotation.set( 0, 0, 0 );
        this.physijsMesh.__dirtyPosition = true;
    },

    loadBodyMesh: function(loader) {
        /*loader.load('assets/animals/fox.js', function (loadedMesh) {
            Player.bodyMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            Player.bodyMesh.position.copy(Player.position);
            Player.groupedMesh.add(Player.bodyMesh);
        });*/
    },

    loadWeaponMesh: function(loader) {
        loader.load('assets/models/SMGWeapon.json', function (loadedMesh) {
            Player.weaponMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            Player.weaponMesh.position.copy(Player.position);
            Player.groupedMesh.add(Player.weaponMesh);
        });
    },

    createCamera: function() {
        this.camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
        this.camera.position.set(this.position.x, this.position.y + 5, this.position.z);
        this.groupedMesh.add(this.camera);
    },

    createControls: function() {
        this.controls = new THREE.PointerLockControls();
    },

    addObjectsToWorld: function () {
        WORLD.camera = this.camera;
        WORLD.controls = this.controls;
        WORLD.scene.add( this.physijsMesh );
        WORLD.scene.add( this.groupedMesh );
    },

    setPosition: function (newPosition) {
        this.position.copy(newPosition);
    },

    setCameraRotation: function ( newRotation ) {
        this.camera.rotation.copy( newRotation );
    },

    update: function ( timeDelta ) {
        if (this.controls != null && this.camera != null && this.controls.enabled == true) {
            this.controls.isOnObject( false );
            this.controls.update(timeDelta*1000);

            this.physijsMesh.position.copy(this.position);
            this.physijsMesh.setAngularFactor({ x: 0, y: 0, z: 0 });
            this.physijsMesh.__dirtyPosition = true;

            //this.camera.position.set(this.position.x, this.position.y + 5, this.position.z);
            this.groupedMesh.position.set(this.position.x, this.position.y + 5, this.position.z);
            this.weaponMesh.rotation.copy(this.camera.rotation);
        }
    },
}



/*var Player = 
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
            new THREE.CubeGeometry( CONVERSOR.SizeTo3D( Player.size.x ), CONVERSOR.SizeTo3D( Player.size.y ), CONVERSOR.SizeTo3D( Player.size.z ) ), 
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
            Player.weaponMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            Player.weaponMesh.position.set(Player.physijsShape.position.x - 5, Player.physijsShape.position.y, Player.physijsShape.position.z + 5);
            Player.physijsShape.add(Player.weaponMesh);
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
}*/