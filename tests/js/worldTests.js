define( ["order!threeCore", "order!conversor", "order!world"], function ( THREE, CONVERSOR, World ) {
	var MyWorld;
	var clock = new THREE.Clock();
	var timeDelta = clock.getDelta();

	testStart(function() {
		 MyWorld = new World();
	});

	testDone(function() {
	});


	test( "World - class exists", function() {
		ok( MyWorld != NaN, "World class does not exist." );
	});

	test( "World - scene exists", function() {
		notStrictEqual( MyWorld.scene, new THREE.Scene(), "World Scene does not exist." );
	});

	test( "World - create new Scene with Objects", function() {
		mesh1 = new THREE.Mesh();
		mesh2 = new THREE.Mesh();
		mesh3 = new THREE.Mesh();
		MyWorld.createNewSceneWithObjects([mesh1, mesh2, mesh3]);
		equal( MyWorld.scene.children.length, 3, "World Scene has not been created correctly." );
	});

	test( "World - camera exists", function() {
		var newCamera = new THREE.PerspectiveCamera( 55.0, window.innerWidth / window.innerHeight, 0.01, 20000 );
		MyWorld.setNewCamera( newCamera );
		strictEqual( MyWorld.camera, newCamera, "World Scene does not exist." );
	});

	test( "World - set CanvasRenderer to renderer", function() {
		MyWorld.renderer = new THREE.CanvasRenderer();
		notStrictEqual( MyWorld.renderer, new THREE.CanvasRenderer(), "World Renderer does not exist." );
	});

	test( "World - is WebGL Supported", function() {
		equal( MyWorld.isWebGLSupported(), true, "World WebGL Renderer not supported." );
	});

	test( "World - canvas exists", function() {
		notEqual( MyWorld.canvas, undefined, "World Canvas does not exist." );
	});

	test( "World - set new canvas", function() {
		MyWorld.setCanvas( 'canvas' );
		ok( MyWorld.canvas, "World Canvas not set properly." );
	});

	test( "World - set renderer to canvas", function() {
		MyWorld.setCanvas( 'canvas' );
		MyWorld.setCanvasRenderer(MyWorld.renderer);
		ok( MyWorld.canvas.html, "World Canvas hasn't got renderer." );
	});

	test( "World - can initialize Renderer", function() {
		MyWorld.initializeRenderer();
		notStrictEqual( MyWorld.renderer, undefined, "World cannot initialize the Renderer." );
	});

	test( "World - can initialize with canvas", function() {
		MyWorld.initializeWith( 'canvas' );
		notStrictEqual( MyWorld.renderer, undefined, "World cannot initialize the Renderer." );
		ok( MyWorld.canvas, "World Canvas not set properly." );
		ok( MyWorld.canvas.html, "World Canvas hasn't got renderer." );
	});

	test( "World - renderer scene", function() {
		MyWorld.render();
		ok( MyWorld.renderer, "World cannot render." );
		ok( MyWorld.camera, "World cannot render." );
	});

	test( "World - update", function() {
		MyWorld.update( timeDelta );
		ok( MyWorld.renderer, "World cannot render." );
		ok( MyWorld.camera, "World cannot render." );
	});
} );