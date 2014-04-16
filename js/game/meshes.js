var MESHES =
{
    Type: { Cow:0, Elk:1, Fox:2, Parrot:3 },
    Names:[
        "assets/animals/cow.js",
        "assets/animals/elk.js",
        "assets/animals/fox.js",
        "assets/animals/parrot.js",
    ],
    morphsGeometry: [],
    morphs: [],
    loader: null,

    initialize: function()
    {
        this.loader = new THREE.JSONLoader();
    },

    Load: function( inType, inCallback )
    {
        if( inType >= 0 && inType < this.Names.length )
        {
            this.loader.load( this.Names[inType], inCallback );
            return true;
        }
        return false;
    },

    addMorph: function( inGeometry )
    {
        this.morphColorsToFaceColors( inGeometry );
        var mesh = this.createMorph( inGeometry, 0.55, 600, 0, 0, 0, false );
        this.morphs.push( mesh );
        this.morphsGeometry.push( inGeometry );
        return mesh;
    },

    createMorph: function( inGeometry, inSpeed, inDuration, inX, inY, inZ, inFudgeColor ) 
    {
        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, morphTargets: true, vertexColors: THREE.FaceColors, wrapAround: true, specular: 0xffffff } );

        if ( inFudgeColor )
            THREE.ColorUtils.adjustHSV( material.color, 0, 0.5 - Math.random(), 0.5 - Math.random() );     

        var meshAnim = new THREE.MorphAnimMesh( inGeometry, material );

        meshAnim.speed = inSpeed;
        meshAnim.duration = inDuration;
        meshAnim.time = 1000 * Math.random();

        meshAnim.position.set( inX, inY, inZ );

        meshAnim.castShadow = true;
        meshAnim.receiveShadow = true;
        
        return meshAnim;
    },

    morphColorsToFaceColors: function( inGeometry ) 
    {
        if ( inGeometry.morphColors && inGeometry.morphColors.length ) 
        {
            var colorMap = inGeometry.morphColors[ 0 ];
            
            for ( var i = 0; i < colorMap.colors.length; i ++ )
                inGeometry.faces[i].color = colorMap.colors[i];
        }
    },

    update: function( timeDelta )
    {
        for ( var i = 0; i < this.morphs.length; i++ ) 
        {
            morph = this.morphs[i];
            morph.updateAnimation( 1000 * timeDelta );
        }
    }
};