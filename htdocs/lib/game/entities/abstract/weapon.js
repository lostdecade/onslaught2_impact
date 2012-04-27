ig.module(
	"game.entities.abstract.weapon"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityWeapon = ig.Entity.extend({

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	size: {x: 8, y: 8},
	offset: {x: 4, y: 4},
	maxVel: {x: 150, y: 150},
	animSheet: new ig.AnimationSheet("media/entities/weapons.png", 16, 16),
	zIndex: 1,

	damage: 1,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		if (settings.heading) {
			this.vel = {
				x: settings.heading.x * this.maxVel.x,
				y: settings.heading.y * this.maxVel.y
			};
		}
		if (this.currentAnim) {
			this.currentAnim.angle = this.heading.getAngle();
		}
	},

	handleMovementTrace: function (res) {
		if (res.collision.x || res.collision.y) {
			if (
				(res.collision.x && res.tile.x == 2)
				|| (res.collision.y && res.tile.y == 2)
			) {
				// Keep moving
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
				return;
			}
			this.kill();
		}
		this.parent(res);
	},

	check: function (other) {
		other.receiveDamage(this.damage, this);
		this.kill();
	},

	collideWith: function (other, axis)  {
		if (other.type != this.type) {
			other.receiveDamage(this.damage, this);
			this.kill();
		}
		this.parent(other, axis);
	}

});

});
