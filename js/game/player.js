define( ["order!threeCore", "order!physijs", "conversor", "pointerLockControls"], function ( THREE, Physijs, CONVERSOR, PointerLockControls ) {
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
            this.controls = new PointerLockControls(Player);
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
    return Player;
} );