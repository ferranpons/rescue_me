requirejs.config({
    baseUrl: 'js/game',
    shim: {
        'threeCore': { exports: 'THREE' },
        'stats': { exports: 'Stats' },
        'physijs': { exports: 'Physijs' },
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
        jquery: '../libs/jquery-1.10.2.min',
        three: '../libs/three',
        threeCore: '../libs/three.min',
        physijs: '../libs/physi',
        stats: '../libs/stats.min',
        objectLoader: '../libs/ObjectLoader',
        pointerLockControls: '../libs/PointerLockControls',

        utils: 'utils',
        game: 'game',
        world: 'world',
        player: 'player',
        enemy: 'enemy',
        meshes: 'meshes',
        bullet: 'bullet',

        blocker: '../generic/blocker',
        instructions: '../generic/instructions',
        pointerlockchange: '../generic/pointerlockchange',
        pointerlockerror: '../generic/pointerlockerror'
    },
    
});


define( ["order!three", "order!stats", "order!game", "order!world"], function ( THREE, Stats,  GAME, WORLD) {
    var app = {
        stats: new Stats(),
        init: function() {

            var container = document.createElement( 'div' );
            container.setAttribute("id", "canvas-3d");
            document.body.appendChild( container );

            GAME.Initialize( container.id );

            // STATS
            if (DEBUG)
            {
                this.stats.domElement.style.position = 'absolute';
                this.stats.domElement.style.top = '0px';
                this.stats.domElement.style.left = '60px';
                this.stats.domElement.style.zIndex = 100;
                container.appendChild( this.stats.domElement );
            }

            window.addEventListener( 'resize', this.onWindowResize, false );
        },


        onWindowResize: function() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            WORLD.camera.aspect = window.innerWidth / window.innerHeight;
            WORLD.camera.updateProjectionMatrix();

            //cameraCube.aspect = window.innerWidth / window.innerHeight;
            //cameraCube.updateProjectionMatrix();

            WORLD.renderer.setSize( window.innerWidth, window.innerHeight );

        },

        update: function() {

            requestAnimationFrame( app.update );
            GAME.update();

            if (DEBUG)
                app.stats.update();

        }
    };
    return app;
});