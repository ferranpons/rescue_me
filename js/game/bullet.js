define( ["threeCore"], function ( THREE ) {
	return function Bullet () {
		this.material = new THREE.MeshBasicMaterial({color: 0x333333});
		this.geometry = new THREE.SphereGeometry(2, 6, 6);
		this.projector = new THREE.Projector();
		this.speed = 500;
		this.bullet = null;
		this.vector = null;

		this.initialize = function (movementX, movementY, fromObject) {
			this.vector = new THREE.Vector3(movementX, movementY, 1);
			this.bullet = new THREE.Mesh(this.geometry, this.material);
			
			this.projector.unprojectVector( this.vector, fromObject.camera );
			this.bullet.position.copy( fromObject.position );
			this.bullet.ray = new THREE.Ray( fromObject.position, this.vector.sub(fromObject.position).normalize() );
		};

		this.update = function( timeDelta ) {
			var currentSpeed = timeDelta * this.speed;
			var direction = this.bullet.ray.direction;

			this.bullet.translateX(currentSpeed * direction.x);
			this.bullet.translateY(currentSpeed * direction.y);
			this.bullet.translateZ(currentSpeed * direction.z);
		};
	}
} );