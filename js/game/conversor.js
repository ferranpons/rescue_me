define( ["threeCore"], function ( THREE ) {
    var CONVERSOR =
    {
        ms_WorldRatio: 0.0,
        ms_WorldOffsetX: 0.0,
        ms_WorldOffsetY: 0.0,
        ms_WorldOffsetZ: 0.0,
        
        To3D: function( inCoord )
        {
            inCoord.z = this.ms_WorldOffsetZ - inCoord.x * this.ms_WorldRatio;
            inCoord.y = this.ms_WorldOffsetY + inCoord.y * this.ms_WorldRatio;
            inCoord.x = this.ms_WorldOffsetX;
        },
        
        To3DS: function( inCoord )
        {
            inCoord.z = this.ms_WorldOffsetZ - inCoord.x * this.ms_WorldRatio;
            inCoord.y = inCoord.y * this.ms_WorldRatio;
            inCoord.x = this.ms_WorldOffsetX;
        },
        
        ToVector3D: function( inCoord )
        {
            this.To3D( inCoord );
            return new THREE.Vector3( inCoord.x, inCoord.y, inCoord.z );
        },
        ToVector2D: function( inCoord )
        {
            this.To3D( inCoord );
            return new THREE.Vector2( inCoord.z, inCoord.y );
        },
        
        XTo3D: function( inX ) { return this.ms_WorldOffsetZ - inX * this.ms_WorldRatio; },
        YTo3D: function( inY ) { return this.ms_WorldOffsetY + inY * this.ms_WorldRatio; },
        GetX: function() { return this.ms_WorldOffsetX; },
        
        SizeTo3D: function( inSize ) { return ( inSize || 1 ) * this.ms_WorldRatio }
    }
    return CONVERSOR;
});