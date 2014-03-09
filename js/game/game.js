var GAME =
{
    parameters: null,
    heightMap: null,
    clock: null,
    
    Initialize: function( inIdCanvas )
    {
        this.heightMap = TERRAINGEN.CreateCanvas( 0, 0 );
        this.parameters = {
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
            canvas: this.heightMap
        };
        this.clock = new THREE.Clock();
        
        CONVERSOR.ms_WorldRatio = GAME.parameters.height / GAME.parameters.heightSegments;
        CONVERSOR.ms_WorldOffsetZ = GAME.parameters.height * 0.5;
        CONVERSOR.ms_WorldOffsetY = GAME.parameters.depth * 0.10;
        CONVERSOR.ms_WorldOffsetX = GAME.parameters.width * 0.42;

        MESHES.initialize();
        WORLD.initialize( inIdCanvas );
        PLAYER.initialize();
        ENEMY.initialize();
    },
    
    update: function()
    {
        var timeDelta = this.clock.getDelta();
        PLAYER.update( timeDelta );
        ENEMY.update ( timeDelta );   
        WORLD.update( timeDelta );
    },
};