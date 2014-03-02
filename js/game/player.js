var PLAYER = 
{
    ms_Mesh: null,
    ms_Physijs_Shape: null,
    ms_Group: null,
    ms_GroupHeight: null,
    ms_Speed: 2,
    ms_Jump: 2,
    ms_Size: {
        x: 2,
        y: 1,
        z: 2
    },
    ms_Camera: null,
    ms_Controls: null,

    Initialize: function()
    {
        this.ms_Physijs_Shape = new Physijs.BoxMesh( 
            new THREE.CubeGeometry( CONVERSOR.SizeTo3D( PLAYER.ms_Size.x ), CONVERSOR.SizeTo3D( PLAYER.ms_Size.y ), CONVERSOR.SizeTo3D( PLAYER.ms_Size.z ) ), 
            Physijs.createMaterial( new THREE.MeshNormalMaterial(), .4, .6),
            1
        );
        this.ms_Physijs_Shape.position.set( 0, 10, 0 );
        this.ms_Physijs_Shape.setAngularFactor({ x: 0, y: 0, z: 0 });
        this.ms_Physijs_Shape.rotation.set( 0, 0, 0 );
        this.ms_Physijs_Shape.__dirtyPosition = true;

        this.ms_Camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
        this.ms_Camera.position.set(this.ms_Physijs_Shape.position.x, this.ms_Physijs_Shape.position.y + 5, this.ms_Physijs_Shape.position.z);
        
        this.ms_Physijs_Shape.add(this.ms_Camera);
        
        this.ms_Controls = new THREE.PointerLockControls(this.ms_Physijs_Shape, this.ms_Camera);
        

        //this.ms_Camera.rotation.copy(this.ms_Controls.getRotation());
        //this.ms_Physijs_Shape.position.copy(this.ms_Controls.getObject().position);

        /*this.ms_Group = new THREE.Object3D();
        this.ms_Group.position.set( 0, 10, 0 );
        this.ms_Group.add(this.ms_Camera);
        this.ms_Group.add(this.this.ms_Physijs_Shape);*/



/*
        // Group that define all elements following the player
        this.ms_Group = new THREE.Object3D();
        this.ms_GroupHeight = new THREE.Object3D();

        // The player is itself a group (can contains some elements)
        this.ms_Mesh = new THREE.Object3D();

        

        this.ms_Group.position.x = CONVERSOR.GetX();
        this.ms_Group.position.y = CONVERSOR.YTo3D( 0 );
*/
        
        

        WORLD.ms_Camera = this.ms_Camera;
        WORLD.ms_Controls = this.ms_Controls;
        WORLD.ms_Scene.add( this.ms_Physijs_Shape );
        //WORLD.ms_Scene.add( this.ms_Controls.getObject() );

        
/*        // Load the player model (fox)
        MESHES.Load( MESHES.Type.Fox, function( inGeometry ) {
            var aMesh = MESHES.AddMorph( inGeometry );
            aMesh.rotation.set( 0, Math.PI, 0);
            aMesh.scale.set( 0.03, 0.03, 0.03 );
            aMesh.castShadow = true;
            aMesh.receiveShadow = false;
            PLAYER.ms_Mesh.add( aMesh );
            aMesh.position.y = -0.7;
            //aMesh.position = this.ms_Camera.position;

            
            // Add all elements to the scene
            PLAYER.ms_GroupHeight.add( PLAYER.ms_Mesh );
            //PLAYER.ms_GroupHeight.add( PLAYER.ms_Mesh_Physijs );
            //PLAYER.ms_GroupHeight.add( PLAYER.ms_Camera ) ;
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
*/

    },

    Update: function( aDelta )
    {     
        if (this.ms_Controls != null && this.ms_Camera != null && this.ms_Controls.enabled == true)
        {
            this.ms_Controls.isOnObject( false );
            this.ms_Controls.update(aDelta*1000);

            //this.ms_Camera.rotation.copy(this.ms_Controls.getRotation());
            //this.ms_Camera.position = this.ms_Controls.getObject().position;

            //this.ms_Physijs_Shape.setAngularFactor({ x: 0, y: 0, z: 0 });
            //this.ms_Physijs_Shape.rotation.set( 0, 0, 0 );
            //this.ms_Physijs_Shape.__dirtyPosition = true;

            //this.ms_Mesh.rotation.copy(this.ms_Controls.getRotation());
            //this.ms_Mesh.position = this.ms_Controls.getObject().position;
        }
    },
}