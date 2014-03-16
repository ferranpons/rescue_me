var WORLD =
{
    canvas: null,
    renderer: null,
    camera: null, 
    scene: null, 
    controls: null,
    terrain: null,
    ground: null,
    light: null,
    closeLight: null,
    water: null,
    ms_Player: null,
    debug_physics_stats: null,
    
    Enable: ( function() 
    {
        try 
        {
            var aCanvas = document.createElement( 'canvas' ); 
            return !! window.WebGLRenderingContext && ( aCanvas.getContext( 'webgl' ) || aCanvas.getContext( 'experimental-webgl' ) ); 
        } 
        catch( e ) { return false; } 
    } )(),
    
    initialize: function( inIdCanvas )
    {
        this.ms_Clock = new THREE.Clock();
        this.canvas = $( '#'+ inIdCanvas );
        
        // Initialize Renderer, Camera and Scene
        this.renderer = this.Enable? new THREE.WebGLRenderer( { antialias: true } ) : new THREE.CanvasRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.autoClear = false;
        this.canvas.html( this.renderer.domElement );

        if (DEBUG) {
            debug_physics_stats = new Stats();
            debug_physics_stats.domElement.style.position = 'absolute';
            debug_physics_stats.domElement.style.left = '150px';
            debug_physics_stats.domElement.style.zIndex = 100;
            document.getElementById( 'content' ).appendChild( debug_physics_stats.domElement );
        }

        // SCENE
        //this.scene = new THREE.Scene();
        this.scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
        this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
        this.scene.addEventListener(
            'update',
            function() {
                WORLD.scene.simulate( undefined, 2 );
                if (DEBUG) {
                    debug_physics_stats.update();
                }
            }
        );
        
        // CAMERA
        this.camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
        //this.camera.position.set( 0, 1.5, 0 );

        // CONTROLS
        this.controls = Player.controls;

        // Orbit control                
        /*this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.userPanSpeed = 2.5;
        this.controls.maxPolarAngle = Math.PI * 0.51;
        this.controls.maxDistance = 100.0;*/

        // PointerLockControls

        //this.controls = new THREE.PointerLockControls( this.camera );
        //this.scene.add( this.controls.getObject() );

        // FirstPersonControls
        /*this.controls = new THREE.FirstPersonControls( this.camera );
        this.controls.movementSpeed = 0.1;
        this.controls.lookSpeed = 0.001;
        this.controls.lookVertical = true;*/

        // Add lights with shadows
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        
        // Directional Light
        this.light = new THREE.DirectionalLight( 0xffddaa, 1 );
        this.light.castShadow = true;
        this.light.position.set( -1100, 800, -250 );
        this.light.shadowCameraNear = 1150;
        this.light.shadowCameraFar = 1370;
        this.light.shadowCameraLeft = -200;
        this.light.shadowCameraRight = 200;
        this.light.shadowCameraTop = 200;
        this.light.shadowCameraBottom = -200;
        this.light.shadowMapWidth = 512;
        this.light.shadowMapHeight = 512;
        this.light.shadowBias = -0.0018;
        this.light.shadowDarkness = 0.7;
        this.scene.add(this.light);
        
        this.closeLight = new THREE.DirectionalLight( 0xffffff, 0 );
        this.closeLight.castShadow = true;
        this.closeLight.onlyShadow = true;
        this.closeLight.shadowCameraNear = 1;
        this.closeLight.shadowCameraFar = 40;
        this.closeLight.shadowCameraLeft = -20;
        this.closeLight.shadowCameraRight = 20;
        this.closeLight.shadowCameraTop = 20;
        this.closeLight.shadowCameraBottom = -20;
        this.closeLight.shadowMapWidth = 512;
        this.closeLight.shadowMapHeight = 512;
        this.closeLight.shadowDarkness = 0.7;
        this.closeLight.shadowBias = -0.0004;
        this.closeLight.position.set( -22, 20, -13 );
        this.scene.add(this.closeLight);
        
        // Ambient Light
        this.scene.add( new THREE.AmbientLight( 0x404040 ) );

        this.scene.add( this.createSkyboxMesh() );
        //this.scene.add( this.createWaterMesh() );
        
        if (DEBUG)
        {
            //this.closeLight.shadowCameraVisible = true;
            //this.light.shadowCameraVisible = true;
        }
        
        this.loadTerrain();              
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
    
    loadTerrain: function()
    {
        /*var terrainGeo = TERRAINGEN.Get( GAME.ms_Parameters );
        terrainGeo.computeFaceNormals();
        terrainGeo.computeVertexNormals();*/

        var terrainGeo = new THREE.PlaneGeometry(  750, 750, 150, 150 );
        terrainGeo.computeFaceNormals();
        terrainGeo.computeVertexNormals();

        var terrainMaterial = Physijs.createMaterial(
            new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, shading: THREE.FlatShading, specular: 0xffffff, side: THREE.DoubleSide } ),
            .8, // high friction
            .4  // low restitution
        );
        
        //this.terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
        //this.ground = new Physijs.HeightfieldMesh( terrainGeo, terrainMaterial, 0, 50, 50 );

        this.terrain = new Physijs.HeightfieldMesh( terrainGeo, terrainMaterial, 0);
        this.terrain.rotation.x = Math.PI / -2;
        this.terrain.receiveShadow = true;
        
        this.scene.add( this.terrain );
        this.terrain.receiveShadow = true;
        this.terrain.castShadow = false;
    },
    
    display: function()
    {
        this.scene.simulate();
        if (this.water != null)
            this.water.render();
        this.renderer.render( this.scene, this.camera );
    },
    
    update: function( inUpdate )
    {
        if (this.water != null)
            this.water.material.uniforms.time.value += 1.0 / 60.0;
        
        MESHES.update( inUpdate );
        BULLET.update( inUpdate );
        this.display();
    },
    
    resize: function( inWidth, inHeight )
    {
        this.camera.aspect =  inWidth / inHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( inWidth, inHeight );
        this.canvas.html( this.renderer.domElement );
    }
};