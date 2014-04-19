define( ["threeCore"], function ( THREE ) {
	return function Bullet () {
		this.material = new THREE.MeshBasicMaterial({color: 0x333333});
		this.geometry = new THREE.SphereGeometry(2, 6, 6);
		this.projector = new THREE.Projector();
		this.speed = 500;
		this.bullet = null;
		this.ray = null;

		this.initialize = function (movementX, movementY, fromObject) {
			var vector = new THREE.Vector3(movementX, movementY, 1);
			var sphere = new THREE.Mesh(this.geometry, this.material);
			
			this.projector.unprojectVector( vector, fromObject.camera );
			sphere.position.copy( fromObject.position );
			sphere.ray = new THREE.Ray( fromObject.position, vector.sub(fromObject.position).normalize() );
			this.ray = new THREE.Ray( fromObject.position, vector.sub(fromObject.position).normalize() );
			this.bullet = sphere;
		};

		this.update = function( timeDelta ) {
			var currentSpeed = timeDelta * this.speed;
			var direction = this.bullet.ray.direction;
			
			var hit = false;
			
			if (!hit) {
				this.bullet.translateX(currentSpeed * direction.x);
				this.bullet.translateY(currentSpeed * direction.y);
				this.bullet.translateZ(currentSpeed * direction.z);
			}
		};
	}
} );


/*


		bullets: [],
		sphereMaterial: new THREE.MeshBasicMaterial({color: 0x333333}),
		sphereGeo: new THREE.SphereGeometry(2, 6, 6),
		projector: new THREE.Projector(),
		moveSpeed: 500,

		createBullet: function (movementX, movementY, fromObject) {
			var vector = new THREE.Vector3(movementX, movementY, 1);
			var sphere = new THREE.Mesh(this.sphereGeo, this.sphereMaterial);
			
			this.projector.unprojectVector( vector, fromObject.camera );
			sphere.position.copy( fromObject.position );
			sphere.ray = new THREE.Ray( fromObject.position, vector.sub(fromObject.position).normalize() );

			this.bullets.push(sphere);
			//WORLD.scene.add(sphere);
			return sphere;
		},

		update: function( timeDelta ) {
			var speed = timeDelta * this.moveSpeed;
			for (var i = this.bullets.length-1; i >= 0; i--) {
				var bullet = this.bullets[i], p = bullet.position, direction = bullet.ray.direction;
				
				var hit = false;
				
				if (!hit) {
					bullet.translateX(speed * direction.x);
					bullet.translateY(speed * direction.y);
					bullet.translateZ(speed * direction.z);
				}
			}
		}




			if (checkWallCollision(p)) {
				bullets.splice(i, 1);
				scene.remove(b);
				continue;
			}
			*/

/*for (var j = ai.length-1; j >= 0; j--) {
				var a = ai[j];
				var v = a.geometry.vertices[0];
				var c = a.position;
				var x = Math.abs(v.x), z = Math.abs(v.z);
				//console.log(Math.round(p.x), Math.round(p.z), c.x, c.z, x, z);
				if (p.x < c.x + x && p.x > c.x - x &&
						p.z < c.z + z && p.z > c.z - z &&
						b.owner != a) {
					bullets.splice(i, 1);
					scene.remove(b);
					a.health -= PROJECTILEDAMAGE;
					var color = a.material.color, percent = a.health / 100;
					a.material.color.setRGB(
							percent * color.r,
							percent * color.g,
							percent * color.b
					);
					hit = true;
					break;
				}
			}
			// Bullet hits player
			if (distance(p.x, p.z, cam.position.x, cam.position.z) < 25 && b.owner != cam) {
				$('#hurt').fadeIn(75);
				health -= 10;
				if (health < 0) health = 0;
				val = health < 25 ? '<span style="color: darkRed">' + health + '</span>' : health;
				$('#health').html(val);
				bullets.splice(i, 1);
				scene.remove(b);
				$('#hurt').fadeOut(350);
			}
			*/