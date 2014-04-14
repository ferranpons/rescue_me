define( ["order!threeCore", "order!meshes", "order!world", "order!player", "order!enemy"], function ( THREE, MESHES, World, Player, Enemy ) {
    var GAME =
    {
        gameWorld: null,
        clock: null,
        
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

            this.gameWorld = new World();
            this.gameWorld.initializeWith( canvasId );
            this.gameWorld.createNewSceneWithObjects([light, closeLight, ambientLight, skyBox, terrain, Player.physijsMesh, Player.groupedMesh, firstEnemy]);
            this.gameWorld.setNewCamera( Player.camera );
        },
        
        update: function()
        {
            var timeDelta = this.clock.getDelta();
            Player.update( timeDelta );   
            this.gameWorld.update( timeDelta );
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
                    map: THREE.ImageUtils.loadTexture( "assets/sky/Skydome.jpg" ),
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