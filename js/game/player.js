var PLAYER = 
{
    ms_Mesh: null,
    ms_Group: null,
    ms_GroupHeight: null,
    ms_Speed: 2,
    ms_Jump: 2,
    ms_Size: {
        x: 0.25,
        y: 0.12
    },
    ms_Camera: null,
    ms_Controls: null,

    Initialize: function()
    {
        this.ms_Camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
        this.ms_Camera.position.set( 0, 1.5, 0 );
        this.ms_Controls = new THREE.PointerLockControls( this.ms_Camera );

        WORLD.ms_Camera = this.ms_Camera;
        WORLD.ms_Controls = this.ms_Controls;
        WORLD.ms_Scene.add( this.ms_Controls.getObject() );

        // Group that define all elements following the player
        this.ms_Group = new THREE.Object3D();
        this.ms_GroupHeight = new THREE.Object3D();

        // The player is itself a group (can contains some elements)
        this.ms_Mesh = new THREE.Object3D();
        this.ms_Group.position.x = CONVERSOR.GetX();
        this.ms_Group.position.y = CONVERSOR.YTo3D( 0 );

        // Load the player model (fox)
        MESHES.Load( MESHES.Type.Fox, function( inGeometry ) {
            var aMesh = MESHES.AddMorph( inGeometry );
            aMesh.rotation.set( 0, Math.PI, 0);
            aMesh.scale.set( 0.03, 0.03, 0.03 );
            aMesh.castShadow = true;
            aMesh.receiveShadow = false;
            PLAYER.ms_Mesh.add( aMesh );
            aMesh.position.y = -0.7;
            //aMesh.position = this.ms_Camera.position;

            // Add a cube in the player in order to see the physical box
            PLAYER.ms_Mesh.add( new Physijs.BoxMesh( 
                new THREE.CubeGeometry( 0.05, CONVERSOR.SizeTo3D( PLAYER.ms_Size.y+0.02 ), CONVERSOR.SizeTo3D( PLAYER.ms_Size.x ) ), 
                new THREE.MeshNormalMaterial() ) 
            );
            
            PLAYER.ms_Mesh.add( this.ms_Camera );
            
            // Add all elements to the scene
            PLAYER.ms_GroupHeight.add( PLAYER.ms_Mesh );
            PLAYER.ms_GroupHeight.add( WORLD.ms_Camera ) ;
            PLAYER.ms_Group.add( PLAYER.ms_GroupHeight ) ;
            WORLD.ms_Scene.add( PLAYER.ms_Group );
            
            // Shadows follow the player in order to optimize their computing
            PLAYER.ms_Group.add( WORLD.ms_Light ) ;
            PLAYER.ms_Group.add( WORLD.ms_Light.target );
            WORLD.ms_Light.target.position.set( - 0.8 * GAME.ms_Parameters.heightSegments, 0, - 0.3 * GAME.ms_Parameters.heightSegments );

            // Idem for close light        
            PLAYER.ms_Group.add( WORLD.ms_CloseLight ) ;
            PLAYER.ms_Group.add( WORLD.ms_CloseLight.target );
            WORLD.ms_CloseLight.target.position.set( 0, 0, -8 );
            //DISPLAY.ms_Light.target.position.set( - 0.8 * GAME.ms_Parameters.heightSegments, 0, - 0.3 * GAME.ms_Parameters.heightSegments );
        } );
    
        /*   	
	    var aShape = new Box2D.b2PolygonShape();
	    aShape.SetAsBox( this.ms_Size.x * 0.5, this.ms_Size.y * 0.5 );
        var aBd = new Box2D.b2BodyDef();
        aBd.set_type( Box2D.b2_dynamicBody );
        aBd.set_position( new Box2D.b2Vec2( 2, this.ms_Size.y ) );
        this.ms_B2DBody = GAME.ms_B2DWorld.CreateBody( aBd );
        this.ms_B2DBody.CreateFixture( aShape, 0.5 );
        this.ms_B2DBody.SetAwake( 1 );
        this.ms_B2DBody.SetActive( 1 );
        */
        
        
    },

    Update: function( aDelta )
    {     
    	/*           
        // Apply constant velocity
        var aVelocity = this.ms_B2DBody.GetLinearVelocity();
        aVelocity.set_x( this.ms_Speed );
        this.ms_B2DBody.SetLinearVelocity( aVelocity );
        
        // Disable the player rotation effect
        this.ms_B2DBody.SetAngularVelocity( this.ms_B2DBody.GetAngularVelocity() * 0.7 );
        
        // Put slowly the up vector of the player to the top
        var aAngle = this.ms_B2DBody.GetAngle();
        this.ms_B2DBody.SetTransform( this.ms_B2DBody.GetPosition(), aAngle * 0.96 );
        
        var aData = {};
        GAME.B2DReadObject( aData, this.ms_B2DBody );
        CONV.To3DS( aData );
        this.ms_Group.position.z = aData.z;
        this.ms_GroupHeight.position.y = aData.y;
        if( this.ms_Mesh != null )
                this.ms_Mesh.rotation.x = aData.angle;
            */

        if (this.ms_Controls != null && this.ms_Camera != null)
        {
            this.ms_Controls.isOnObject( false );
            this.ms_Controls.update(aDelta*1000);

            this.ms_Camera.rotation.copy(this.ms_Controls.getRotation());
            this.ms_Camera.position = this.ms_Controls.getObject().position;

            this.ms_Mesh.rotation.copy(this.ms_Controls.getRotation());
            this.ms_Mesh.position = this.ms_Controls.getObject().position;
        }
    },
}