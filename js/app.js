requirejs.config({
    waitSeconds: 200,
    shim: {
        'threeCore': { exports: 'THREE' },
        'stats': { exports: 'Stats' },
        //'physijs': { exports: 'Physijs' },
        'pointerLockControls': { exports: 'PointerLockControls' },

        'utils': { exports: 'utils' },
        'game': { exports: 'GAME' },
        'world': { exports: 'WORLD' },
        'player': { exports: 'Player' },
        'enemy': { exports: 'Enemy' },
        'meshes': { exports: 'MESHES' },
        'bullet': { exports: 'BULLET' },

        'blocker': { exports: 'blocker' },
        'instructions': { exports: 'instructions' },
        'pointerlockchange': { exports: 'pointerlockchange' },
        'pointerlockerror': { exports: 'pointerlockerror' }
    },
    paths: {
        jquery: 'libs/jquery-1.10.2.min',
        three: 'libs/three',
        threeCore: 'libs/three.min',
        //physijs: 'libs/physi',
        stats: 'libs/stats.min',
        objectLoader: 'libs/ObjectLoader',
        pointerLockControls: 'libs/PointerLockControls',

        utils: 'game/utils',
        game: 'game/game',
        world: 'game/world',
        player: 'game/player',
        enemy: 'game/enemy',
        meshes: 'game/meshes',
        bullet: 'game/bullet',
        conversor: 'game/conversor',

        blocker: 'generic/blocker',
        instructions: 'generic/instructions',
        pointerlockchange: 'generic/pointerlockchange',
        pointerlockerror: 'generic/pointerlockerror'
    },
    
});


define( [ "order!stats", "order!game", "order!world", "blocker", "instructions", "pointerlockchange", "pointerlockerror"], function (  Stats,  GAME, World, blocker, instructions, pointerlockchange, pointerlockerror) {
    var app = {
        framesStats: new Stats(),
        init: function() {

            var container = document.createElement( 'div' );
            container.setAttribute("id", "canvas-3d");
            document.body.appendChild( container );

            GAME.Initialize( container.id );

            // STATS
            if (DEBUG)
            {
                this.framesStats.domElement.style.position = 'absolute';
                this.framesStats.domElement.style.top = '0px';
                this.framesStats.domElement.style.left = '60px';
                this.framesStats.domElement.style.zIndex = 100;
                container.appendChild( this.framesStats.domElement );
            }

            window.addEventListener( 'resize', this.onWindowResize, false );

            var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

            if ( havePointerLock ) {
                // Hook pointer lock state change events
                document.addEventListener( 'pointerlockchange', pointerlockchange, false );
                document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
                document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

                document.addEventListener( 'pointerlockerror', pointerlockerror, false );
                document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
                document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            } else {

                instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

            }
        },


        onWindowResize: function() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            GAME.gameWorld.camera.aspect = window.innerWidth / window.innerHeight;
            GAME.gameWorld.camera.updateProjectionMatrix();
            GAME.gameWorld.renderer.setSize( window.innerWidth, window.innerHeight );

        },

        update: function() {

            requestAnimationFrame( app.update );
            GAME.update();

            if (DEBUG)
                app.framesStats.update();

        }
    };
    return app;
});