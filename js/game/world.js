define( ["order!jquery", "order!threeCore"], function ( $, THREE ) {

    return function World () {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.canvas = document.createElement( 'canvas' );
        this.camera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );

        this.initializeWith = function ( canvasId ) {
            this.initializeRenderer();
            this.setCanvas( canvasId );
            this.setCanvasRenderer( this.renderer );
        };

        this.initializeRenderer = function () {
            this.renderer = this.isWebGLSupported? new THREE.WebGLRenderer( { antialias: true } ) : new THREE.CanvasRenderer();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.autoClear = false;
            this.renderer.shadowMapEnabled = true;
            this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        };

        this.createNewSceneWithObjects = function ( arrayOfObjects ) {
            this.scene = new THREE.Scene();
            for ( var i=0; i < arrayOfObjects.length; i++ ) {
                this.scene.add(arrayOfObjects[i]);
            }
        };

        this.setNewCamera = function ( newCamera ) {
            this.camera = newCamera;
        };

        this.render = function () {
            this.renderer.render( this.scene, this.camera );
        };

        this.update = function ( timeDelta ) {
            this.render();
        };

        this.setCanvas = function ( canvasId ) {
            this.canvas = $( '#'+ canvasId );
        };

        this.setCanvasRenderer = function ( newRenderer ) {
            this.canvas.html( newRenderer.domElement );
        };

        this.isWebGLSupported = function () {
            try {
                var aCanvas = document.createElement( 'canvas' );
                if (window.WebGLRenderingContext && ( aCanvas.getContext( 'webgl' ) || aCanvas.getContext( 'experimental-webgl' ))) {
                    return true; 
                }
            } 
            catch( e ) { 
                return false; 
            } 
        };
    };

} );