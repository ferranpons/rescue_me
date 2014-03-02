var GAME =
{
    //ms_B2DWorld: null,
    //ms_B2DShape: null,
    ms_Parameters: null,
    ms_HeightMap: null,
    ms_Clock: null,
    
    Initialize: function( inIdCanvas )
    {
        this.ms_HeightMap = TERRAINGEN.CreateCanvas( 0, 0 );
        this.ms_Parameters = {
            alea: RAND_MT,
            generator: PN_GENERATOR,
            width: 500,
            height: 2000,
            widthSegments: 50,
            heightSegments: 200,
            depth: 220,
            param: 3,
            filterparam: 1,
            filter: [ GAMETERRAIN_FILTER ],
            postgen: [ MOUNTAINS2_COLORS ],
            effect: [ DESTRUCTURE_EFFECT ],
            canvas: this.ms_HeightMap
        };
        this.ms_Clock = new THREE.Clock();
        
        CONVERSOR.ms_WorldRatio = GAME.ms_Parameters.height / GAME.ms_Parameters.heightSegments;
        CONVERSOR.ms_WorldOffsetZ = GAME.ms_Parameters.height * 0.5;
        CONVERSOR.ms_WorldOffsetY = GAME.ms_Parameters.depth * 0.10;
        CONVERSOR.ms_WorldOffsetX = GAME.ms_Parameters.width * 0.42;

        MESHES.Initialize();
        WORLD.Initialize( inIdCanvas );
        //this.B2DInitialize( this.ms_Parameters );
        PLAYER.Initialize();
        //GROUND.Initialize( this.ms_Parameters );
        //TREES.Initialize();
    },
    
    /*B2DInitialize: function( inParameters )
    {        
        var aGravity = new Box2D.b2Vec2( 0.0, -3.0 );
        this.ms_B2DWorld = new Box2D.b2World( aGravity, true );
            
        var aEdgeShape = new Box2D.b2EdgeShape();
        aEdgeShape.Set( new Box2D.b2Vec2( 0, 0 ), new Box2D.b2Vec2( inParameters.heightSegments, 0 ) );
        this.ms_B2DWorld.CreateBody( new Box2D.b2BodyDef() ).CreateFixture( aEdgeShape, 0.0 );
    },*/
    
    /*B2DReadObject: function( inData, inBody )
    {
        var aPos = inBody.GetPosition();
        inData.x = aPos.get_x();
        inData.y = aPos.get_y();
        inData.angle = inBody.GetAngle();
    },*/
    
    Update: function()
    {
        var aDelta = this.ms_Clock.getDelta();
        
        /*this.ms_B2DWorld.Step(
            aDelta,
            20,                        // velocity iterations
            20                        // position iterations
        );*/
        
        PLAYER.Update( aDelta );
        
        //var aSize = WORLD.ms_Animals.children.length * 0.8;
        //for( var i = 0; i < aSize; ++i )
        //    WORLD.ms_Animals.children[i].lookAt( PLAYER.ms_Group.position );
                
        WORLD.Update( aDelta );
    },
};