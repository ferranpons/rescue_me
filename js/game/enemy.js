function Enemy () {
    var enemy = this;

    this.health = 100;
    this.position = new THREE.Vector3(0,0,0);
    this.size = { x: 1, y: 1, z: 1 };
    this.speed = 1;

    this.physijsMesh = new THREE.Object3D();
    this.physijsMeshGeometry = new THREE.CubeGeometry( 1, 1, 1);
    this.physijsMeshMaterial = Physijs.createMaterial( new THREE.MeshNormalMaterial(), .4, .6);

    this.groupedMesh = new THREE.Object3D();
    this.bodyMesh = null;
    this.weaponMesh = null;

    this.initializeWith = function (newPosition, newSize, newSpeed) {
        this.setPosition(newPosition);
        this.size = newSize;
        this.speed = newSpeed;
        this.groupedMesh.position.copy(this.position);
        this.loadAndCreateMeshes();
        this.addObjectsToWorld();
    };

    this.loadAndCreateMeshes = function() {
        loader = new THREE.ObjectLoader();
        this.createPhysijsMesh();
        this.loadBodyMesh(loader);
        this.loadWeaponMesh(loader);
    };

    this.createPhysijsMesh = function() {
        this.physijsMeshGeometry = new THREE.CubeGeometry( CONVERSOR.SizeTo3D( this.size.x ), CONVERSOR.SizeTo3D( this.size.y ), CONVERSOR.SizeTo3D( this.size.z ) );
        this.physijsMesh = new Physijs.BoxMesh( this.physijsMeshGeometry, this.physijsMeshMaterial, 1 );
        this.physijsMesh.position.copy(this.position);
        this.physijsMesh.setAngularFactor({ x: 0, y: 0, z: 0 });
        this.physijsMesh.rotation.set( 0, 0, 0 );
        this.physijsMesh.__dirtyPosition = true;
    };

    this.loadBodyMesh = function(loader) {
        /*loader.load('assets/animals/fox.js', function (loadedMesh) {
            enemy.bodyMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            enemy.bodyMesh.position.copy(enemy.position);
            enemy.groupedMesh.add(enemy.bodyMesh);
        });*/
    };

    this.loadWeaponMesh = function(loader) {
        loader.load('assets/models/SMGWeapon.json', function (loadedMesh) {
            enemy.weaponMesh = new THREE.Mesh(loadedMesh.geometry, new THREE.MeshNormalMaterial());
            enemy.weaponMesh.position.copy(enemy.position);
            enemy.groupedMesh.add(enemy.weaponMesh);
        });
    };

    this.addObjectsToWorld = function () {
        WORLD.scene.add( this.physijsMesh );
        WORLD.scene.add( this.groupedMesh );
    };

    this.setPosition = function (newPosition) {
        this.position.copy(newPosition);
    };

    this.update = function ( timeDelta ) {
        this.groupedMesh.position.copy(this.physijsMesh);
    };
}