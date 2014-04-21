define( ["order!threeCore", "order!meshes", "order!world", "order!player", "order!enemy", "order!bullet"], function ( THREE, MESHES, World, Player, Enemy, Bullet ) {
    var GAME =
    {
        gameWorld: null,
        clock: null,
        bullets: [],
        enemies: [],
        
        Initialize: function( canvasId )
        {
            this.clock = new THREE.Clock();

            Player.initializeWith(new THREE.Vector3(0,30,0), { x: 2, y: 1, z: 2 }, 2 );
            var light = this.createLight();
            var closeLight = this.createCloseLight();
            var ambientLight = this.createAmbientLight();
            var skyBox = this.createSkyboxMesh();
            var terrain = this.createTerrain();
            var firstEnemy = new Enemy();
            firstEnemy.initializeWith( new THREE.Vector3(100,10,100), { x: 1, y: 1, z: 1 }, 2 );
            this.enemies.push(firstEnemy);

            this.createCrate();

            this.gameWorld = new World();
            this.gameWorld.initializeWith( canvasId );
            this.gameWorld.createNewSceneWithObjects([light, closeLight, ambientLight, skyBox, terrain, Player.physijsMesh, Player.groupedMesh, firstEnemy.groupedMesh]);
            this.gameWorld.setNewCamera( Player.camera );

            document.addEventListener( 'click', this.onClick, false);
        },
        
        update: function()
        {
            var timeDelta = this.clock.getDelta();
            Player.update( timeDelta );   
            this.gameWorld.update( timeDelta );

            for (var i = this.bullets.length-1; i >= 0; i--) {
                this.bullets[i].update(timeDelta);

                for (var j = this.enemies.length-1; j >= 0; j--) {
                    var enemy = this.enemies[j];
                    var box = enemy.bodyMesh.geometry;
                    var ray = new THREE.Raycaster( this.bullets[i].bullet.position, this.bullets[i].vector.clone().normalize() );
                    var collisions = ray.intersectObjects( [enemy.bodyMesh] );

                    if (collisions.length > 0 && collisions[0].distance < this.bullets[i].vector.length()) {
                        enemy.health -= 20;
                        console.log("Hit! Enemy Health:" + enemy.health );
                    }
                }
            }
        },

        onClick: function( event ) {
            event.preventDefault;
            if (event.which === 1 ) { // Left click only
                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                newBullet = new Bullet();
                newBullet.initialize(movementX, movementY, Player);
                GAME.bullets.push(newBullet);    
                GAME.gameWorld.scene.add(newBullet.bullet);
            }
        },

        createCrate: function()
        {
            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {

                console.log( item, loaded, total );

            };

            var texture = new THREE.Texture();

            var imageLoader = new THREE.ImageLoader( manager );
            imageLoader.load( 'assets/models/CrateSmallTextures/Props.png', function ( image ) {

                    texture.image = image;
                    texture.needsUpdate = true;

            } );

            var objectLoader = new THREE.ObjectLoader();
            objectLoader.load('assets/models/CrateSmall.json', function (loadedMesh) {
                loadedMesh.traverse( function ( child ) {

                        if ( child instanceof THREE.Mesh ) {

                            child.material.map = texture;

                        }

                } );
                loadedMesh.position.set(100, 20, 100);
                loadedMesh.scale.set(30,30,30);
                GAME.gameWorld.scene.add(loadedMesh);
            });
        },

        createLight: function()
        {
            var light = new THREE.DirectionalLight( 0xffddaa, 1 );
            light.castShadow = true;
            light.position.set( -1100, 800, -250 );
            light.shadowCameraNear = 1150;
            light.shadowCameraFar = 1370;
            light.shadowCameraLeft = -200;
            light.shadowCameraRight = 200;
            light.shadowCameraTop = 200;
            light.shadowCameraBottom = -200;
            light.shadowMapWidth = 512;
            light.shadowMapHeight = 512;
            light.shadowBias = -0.0018;
            light.shadowDarkness = 0.7;
            return light;
        },

        createCloseLight: function()
        {
            var closeLight = new THREE.DirectionalLight( 0xffffff, 0 );
            closeLight.castShadow = true;
            closeLight.onlyShadow = true;
            closeLight.shadowCameraNear = 1;
            closeLight.shadowCameraFar = 40;
            closeLight.shadowCameraLeft = -20;
            closeLight.shadowCameraRight = 20;
            closeLight.shadowCameraTop = 20;
            closeLight.shadowCameraBottom = -20;
            closeLight.shadowMapWidth = 512;
            closeLight.shadowMapHeight = 512;
            closeLight.shadowDarkness = 0.7;
            closeLight.shadowBias = -0.0004;
            closeLight.position.set( -22, 20, -13 );
            return closeLight;
        },

        createAmbientLight: function()
        {
            return new THREE.AmbientLight( 0x404040 );
        },

        createSkyboxMesh: function()
        {
            var skyBox = new THREE.Mesh(
                new THREE.SphereGeometry( 10000, 15, 15 ),
                new THREE.MeshBasicMaterial( {
                    map: THREE.ImageUtils.loadTexture( "assets/sky/skydome.jpg" ),
                    color: 0xffffff,
                    side: THREE.DoubleSide
                } )
            );
            skyBox.rotation.y = Math.PI;
            return skyBox;
        },

        createWaterMesh: function()
        {
            var waterNormals = new THREE.ImageUtils.loadTexture( 'assets/materials/waternormals.jpg' );
            waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 
            this.light.position.set( -1100, 800, -250 );
            this.water = new THREE.Water( this.renderer, this.camera, this.scene, {
                textureWidth: 256, 
                textureHeight: 256,
                waterNormals: waterNormals,
                alpha:         0.5,
                sunDirection: ( new THREE.Vector3( -1100, 800, 0 ) ).normalize(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 15.0,
            } );
            var aMeshMirror = new THREE.Mesh(
                new THREE.PlaneGeometry( GAME.ms_Parameters.width * 0.85, GAME.ms_Parameters.height, 10, 10 ), 
                this.water.material
            );
            aMeshMirror.add( this.water );
            aMeshMirror.position.y = 15;
            aMeshMirror.rotation.x = - Math.PI * 0.5;
            return aMeshMirror;
        },
        
        createTerrain: function()
        {
            var terrainGeo = new THREE.PlaneGeometry(  750, 750, 150, 150 );
            terrainGeo.computeFaceNormals();
            terrainGeo.computeVertexNormals();
            var terrainMaterial = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, shading: THREE.FlatShading, specular: 0xffffff, side: THREE.DoubleSide } );
            var terrain = new THREE.Mesh(terrainGeo, terrainMaterial);
            terrain.rotation.x = Math.PI / -2;
            terrain.receiveShadow = true;
            terrain.castShadow = false;
            return terrain;
        }
    };
    return GAME;
} );