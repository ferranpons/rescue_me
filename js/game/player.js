define( ["order!threeCore", "conversor", "pointerLockControls"], function ( THREE, CONVERSOR, PointerLockControls ) {
    var Player = 
    {
        health: 100,
        position: new THREE.Vector3(0,0,0),
        size: { x: 1, y: 1, z: 1 },
        speed: 1,
        weapon: undefined,

        weaponTypes: { "Hands": {}, "Pistol": {"clipLength": 15, "ammo": 150, "ammoInClip": 15}, "Shotgun": {"clipLength" : 5, "ammo": 25, "ammoInClip": 5}, "Rifle": {"clipLength" : 30, "ammo": 60, "ammoInClip": 30}, "Knife": {} },

        physijsMesh: new THREE.Object3D(),
        physijsMeshGeometry: new THREE.CubeGeometry( 1, 1, 1),
        //physijsMeshMaterial: Physijs.createMaterial( new THREE.MeshNormalMaterial(), .4, .6),

        groupedMesh: new THREE.Object3D(),
        bodyMesh: null,
        weaponMesh: null,

        camera: null,
        controls: null,

        initializeWith: function (newPosition, newSize, newSpeed) {
            this.setPosition(newPosition);
            this.size = newSize;
            this.speed = newSpeed;
            this.weapon = this.weaponTypes.Hands;
            this.groupedMesh.position.copy(this.position);
            this.createCamera();
            this.createControls();
            this.loadAndCreateMeshes();
        },

        loadAndCreateMeshes: function() {
            loader = new THREE.ObjectLoader();
            //this.createPhysijsMesh();
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

        setWeapon: function ( weaponType ) {
            this.weapon = weaponType;
        },

        getCurrentClips: function () {
            for (var clip in this.clips) {
                //if (this.weapon)
            }

            return this.clips;
        },

        update: function ( timeDelta ) {
            if (this.controls != null && this.camera != null && this.controls.enabled == true) {
                this.controls.isOnObject( false );
                this.controls.update(timeDelta*1000);

                /*this.physijsMesh.position.copy(this.position);
                this.physijsMesh.setAngularFactor({ x: 0, y: 0, z: 0 });
                this.physijsMesh.__dirtyPosition = true;*/

                //this.camera.position.set(this.position.x, this.position.y + 5, this.position.z);
                this.groupedMesh.position.set(this.position.x, this.position.y + 5, this.position.z);
                this.weaponMesh.rotation.copy(this.camera.rotation);
            }
        },
    }
    return Player;
} );