var WORLD =
{
    ms_Canvas: null,
    ms_Renderer: null,
    ms_Camera: null, 
    ms_Scene: null, 
    ms_Controls: null,
    ms_Terrain: null,
    ms_Ground: null,
    ms_Light: null,
    ms_CloseLight: null,
    ms_Animals: null,
    ms_Water: null,
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
    
    Initialize: function( inIdCanvas )
    {
        this.ms_Clock = new THREE.Clock();
        this.ms_Canvas = $( '#'+ inIdCanvas );
        
        // Initialize Renderer, Camera and Scene
        this.ms_Renderer = this.Enable? new THREE.WebGLRenderer( { antialias: true } ) : new THREE.CanvasRenderer();
        this.ms_Renderer.setSize( window.innerWidth, window.innerHeight );
        this.ms_Renderer.autoClear = false;
        this.ms_Canvas.html( this.ms_Renderer.domElement );

        if (DEBUG) {
            debug_physics_stats = new Stats();
            debug_physics_stats.domElement.style.position = 'absolute';
            debug_physics_stats.domElement.style.left = '150px';
            debug_physics_stats.domElement.style.zIndex = 100;
            document.getElementById( 'content' ).appendChild( debug_physics_stats.domElement );
        }

        // SCENE
        //this.ms_Scene = new THREE.Scene();
        this.ms_Scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
        this.ms_Scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
        this.ms_Scene.addEventListener(
            'update',
            function() {
                WORLD.ms_Scene.simulate( undefined, 2 );
                if (DEBUG) {
                    debug_physics_stats.update();
                }
            }
        );
        
        // CAMERA
        this.ms_Camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
        //this.ms_Camera.position.set( 0, 1.5, 0 );

        // CONTROLS
        this.ms_Controls = PLAYER.ms_Controls;

        // Orbit control                
        /*this.ms_Controls = new THREE.OrbitControls( this.ms_Camera, this.ms_Renderer.domElement );
        this.ms_Controls.userPanSpeed = 2.5;
        this.ms_Controls.maxPolarAngle = Math.PI * 0.51;
        this.ms_Controls.maxDistance = 100.0;*/

        // PointerLockControls

        //this.ms_Controls = new THREE.PointerLockControls( this.ms_Camera );
        //this.ms_Scene.add( this.ms_Controls.getObject() );

        // FirstPersonControls
        /*this.ms_Controls = new THREE.FirstPersonControls( this.ms_Camera );
        this.ms_Controls.movementSpeed = 0.1;
        this.ms_Controls.lookSpeed = 0.001;
        this.ms_Controls.lookVertical = true;*/

        // Add lights with shadows
        this.ms_Renderer.shadowMapEnabled = true;
        this.ms_Renderer.shadowMapType = THREE.PCFSoftShadowMap;
        
        // Directional Light
        this.ms_Light = new THREE.DirectionalLight( 0xffddaa, 1 );
        this.ms_Light.castShadow = true;
        this.ms_Light.position.set( -1100, 800, -250 );
        this.ms_Light.shadowCameraNear = 1150;
        this.ms_Light.shadowCameraFar = 1370;
        this.ms_Light.shadowCameraLeft = -200;
        this.ms_Light.shadowCameraRight = 200;
        this.ms_Light.shadowCameraTop = 200;
        this.ms_Light.shadowCameraBottom = -200;
        this.ms_Light.shadowMapWidth = 512;
        this.ms_Light.shadowMapHeight = 512;
        this.ms_Light.shadowBias = -0.0018;
        this.ms_Light.shadowDarkness = 0.7;
        this.ms_Scene.add(this.ms_Light);
        
        this.ms_CloseLight = new THREE.DirectionalLight( 0xffffff, 0 );
        this.ms_CloseLight.castShadow = true;
        this.ms_CloseLight.onlyShadow = true;
        this.ms_CloseLight.shadowCameraNear = 1;
        this.ms_CloseLight.shadowCameraFar = 40;
        this.ms_CloseLight.shadowCameraLeft = -20;
        this.ms_CloseLight.shadowCameraRight = 20;
        this.ms_CloseLight.shadowCameraTop = 20;
        this.ms_CloseLight.shadowCameraBottom = -20;
        this.ms_CloseLight.shadowMapWidth = 512;
        this.ms_CloseLight.shadowMapHeight = 512;
        this.ms_CloseLight.shadowDarkness = 0.7;
        this.ms_CloseLight.shadowBias = -0.0004;
        this.ms_CloseLight.position.set( -22, 20, -13 );
        this.ms_Scene.add(this.ms_CloseLight);
        
        // Ambient Light
        this.ms_Scene.add( new THREE.AmbientLight( 0x404040 ) );

        this.ms_Scene.add( this.createSkyboxMesh() );
        //this.ms_Scene.add( this.createWaterMesh() );
        
        if (DEBUG)
        {
            //this.ms_CloseLight.shadowCameraVisible = true;
            //this.ms_Light.shadowCameraVisible = true;
        }
        
        this.LoadTerrain();
        
        //this.GenerateAnimals();                
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
        this.ms_Light.position.set( -1100, 800, -250 );
        this.ms_Water = new THREE.Water( this.ms_Renderer, this.ms_Camera, this.ms_Scene, {
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
            this.ms_Water.material
        );
        aMeshMirror.add( this.ms_Water );
        aMeshMirror.position.y = 15;
        aMeshMirror.rotation.x = - Math.PI * 0.5;
        return aMeshMirror;
    },
    
    LoadTerrain: function()
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
        
        //this.ms_Terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
        //this.ms_Ground = new Physijs.HeightfieldMesh( terrainGeo, terrainMaterial, 0, 50, 50 );

        this.ms_Terrain = new Physijs.HeightfieldMesh( terrainGeo, terrainMaterial, 0);
        this.ms_Terrain.rotation.x = Math.PI / -2;
        this.ms_Terrain.receiveShadow = true;
        
        this.ms_Scene.add( this.ms_Terrain );
        this.ms_Terrain.receiveShadow = true;
        this.ms_Terrain.castShadow = false;
    },
    
    /*
    GetDepth: function( inX, inY )
    {
        return this.ms_Terrain.geometry.vertices[ inY * GAME.ms_Parameters.widthSegments + inX ].y;
    },
    
    LoadAnimals: function( inType )
    {
        MESHES.Load( inType, function( inGeometry ) {
            for( var i = 0; i < 400; ++i )
            {
                var x = ( 0.1 + RAND_MT.Random() * 0.9 ) * GAME.ms_Parameters.widthSegments/2 - GAME.ms_Parameters.widthSegments/8;
                var z = ( 0.005 + RAND_MT.Random() * 0.99 ) * GAME.ms_Parameters.heightSegments - GAME.ms_Parameters.heightSegments/2;
                var y = WORLD.GetDepth( Math.round( GAME.ms_Parameters.widthSegments / 2 + x ), Math.round( GAME.ms_Parameters.heightSegments / 2 + z ) );
                
                if( y > 15.0 )
                {
                    var mesh = MESHES.AddMorph( inGeometry );
                    mesh.position.x = x * GAME.ms_Parameters.width / GAME.ms_Parameters.widthSegments;
                    mesh.position.z = z * GAME.ms_Parameters.height / GAME.ms_Parameters.heightSegments;
                    mesh.rotation.set( 0, RAND_MT.Random() * Math.PI * 2, 0 );
                    
                    mesh.position.y = y;
                    mesh.scale.set( 0.03, 0.03, 0.03 );
                    mesh.castShadow = true;
                    mesh.receiveShadow = false;
                    
                    WORLD.ms_Animals.add( mesh );
                }
            }
        } );
    },
    
    GenerateAnimals: function()
    {
        this.ms_Animals = new THREE.Object3D();
        this.ms_Scene.add( this.ms_Animals );
        this.LoadAnimals( MESHES.Type.Cow );
    },
    */
    
    Display: function()
    {
        this.ms_Scene.simulate();
        if (this.ms_Water != null)
            this.ms_Water.render();
        this.ms_Renderer.render( this.ms_Scene, this.ms_Camera );
    },
    
    Update: function( inUpdate )
    {
        if (this.ms_Water != null)
            this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
        
        MESHES.Update( inUpdate );
        
        //PointerLockControls Update
        /*this.ms_Controls.isOnObject( false );
        this.ms_Controls.update(this.ms_Clock.getDelta());
        this.ms_Camera.rotation.copy(this.ms_Controls.getRotation());*/

        //OrbitControls Update
        //this.ms_Controls.update();

        //FirstPersonControls Update
        //this.ms_Controls.update(this.ms_Clock.getDelta());

        this.Display();
    },
    
    Resize: function( inWidth, inHeight )
    {
        this.ms_Camera.aspect =  inWidth / inHeight;
        this.ms_Camera.updateProjectionMatrix();
        this.ms_Renderer.setSize( inWidth, inHeight );
        this.ms_Canvas.html( this.ms_Renderer.domElement );
    }
};