ig.module(
	"game.entities.abstract.mob"
)
.requires(
	"game.entities.abstract.base",
	"math.vector"
)
.defines(function () {

EntityMob = EntityBase.extend({

	collides: ig.Entity.COLLIDES.PASSIVE,
	size: {x: 12, y: 8},
	offset: {x: 2, y: 8},
	zIndex: 2,

	heading: new Vector(0, 1),
	waypoints: null,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.initAnimation();
	},

	initAnimation: function () {

		var idleDelay = 0.4;
		var moveDelay = 0.25;

		this.addAnim("idleDown", idleDelay, [0, 1]);
		this.addAnim("idleUp", idleDelay, [4, 5]);
		this.addAnim("idleLeft", idleDelay, [8, 9]);

		this.addAnim("moveDown", moveDelay, [0, 1]);
		this.addAnim("moveUp", moveDelay, [4, 5]);
		this.addAnim("moveLeft", moveDelay, [8, 9]);

		this.addAnim("painDown", moveDelay, [12, 13]);
		this.addAnim("painUp", moveDelay, [16, 17]);
		this.addAnim("painLeft", moveDelay, [20, 21]);

	},

	updateAnim: function () {

		var dir;
		var flip = false;
		var h = this.heading;

		dir = "Down";

		if (h.y < 0) {
			dir = "Up";
		} else if (h.y > 0) {
			dir = "Down";
		}

		if (h.x < 0) {
			if (h.x < h.y) {
				dir = "Left";
			}
		} else if (h.x > 0) {
			if (h.x > h.y) {
				dir = "Left";
				flip = true;
			}
		}

		var state = this.getStateAnim();
		this.setAnim(state + dir, flip);

	},

	update: function () {

		// Handle waypoints
		if (this.waypoints !== null) {
			var point = new Vector().set(this.waypoints[0]);
			var pos = new Vector(this.pos).subtract(this.offset);
			var distance = point.clone().subtract(pos);
			if (distance.getLength() < 2) {
				// Snap to waypoint and remove it
				this.pos.x = (point.x + this.offset.x - 1);
				this.pos.y = (point.y + this.offset.y - 1);
				this.waypoints.shift();
			} else {
				distance.normalize();
				this.vel.x = (this.maxVel.x * distance.x);
				this.vel.y = (this.maxVel.y * distance.y);
			}
		}

		// Update heading based on velocity
		if (this.vel.x !== 0 || this.vel.y !== 0) {
			this.heading.set(this.vel).normalize();
		}

		this.parent();

	}

});

});
