"use strict";
require.config({
	baseUrl: 'js/',
    paths: {
        QUnit: '../lib/qunit-1.14.0',
        jquery: '../../js/libs/jquery-1.10.2.min',
        three: '../../js/libs/three',
        threeCore: '../../js/libs/three.min',
        physijs: '../../js/libs/physi',
        stats: '../../js/libs/stats.min',
        objectLoader: '../../js/libs/ObjectLoader',
        pointerLockControls: '../../js/libs/PointerLockControls',
        gamepad: '../../js/libs/gamepad',
        bacon: '../../js/libs/Bacon.min.js',


        conversor: '../../js/game/conversor',
        game: '../../js/game/game',
        world: '../../js/game/world',
        player: '../../js/game/player',
        enemy: '../../js/game/enemy',
        meshes: '../../js/game/meshes',
        bullet: '../../js/game/bullet',

        blocker: '../../js/generic/blocker',
        instructions: '../../js/generic/instructions',
        pointerlockchange: '../../js/generic/pointerlockchange',
        pointerlockerror: '../../js/generic/pointerlockerror'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
           }
        },
        'threeCore': { exports: 'THREE' },
        'stats': { exports: 'Stats' },
        'physijs': { exports: 'Physijs' },
        'pointerLockControls': { exports: 'PointerLockControls' },
        'gamepad': { exports: 'Gamepad' },
        'bacon' : { exports: 'Bacon' },

        'conversor': { exports: 'CONVERSOR' },
        'game': { exports: 'GAME' },
        'world': { exports: 'WORLD' },
        'player': { exports: 'Player' },
        'enemy': { exports: 'Enemy' },
        'meshes': { exports: 'MESHES' },
        'bullet': { exports: 'Bullet' },

        'blocker': { exports: 'blocker' },
        'instructions': { exports: 'instructions' },
        'pointerlockchange': { exports: 'pointerlockchange' },
        'pointerlockerror': { exports: 'pointerlockerror' } 
    }
});

require(["order!QUnit", "order!three", "order!worldTests", "order!playerTests", "order!enemyTests", "order!bulletTests"],
	function(QUnit, THREE, worldTests, playerTests, enemyTests) {

        QUnit.load();
        QUnit.start();
    }
);