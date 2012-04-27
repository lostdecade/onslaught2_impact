ig.module(
	"game.entities.reticle"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityReticle = ig.Entity.extend({

	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	size: {x: 32, y: 32},

	animSheet: new ig.AnimationSheet("media/entities/reticle.png", 32, 32),
	zIndex: -2,

	rotateSpeed: (Math.PI / 4),

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("idle", 1, [0]);
	},

	update: function () {

		// Follow the mouse cursor
		this.pos = {
			x: (ig.input.mouse.x + ig.game.screen.x - (this.size.x / 2)),
			y: (ig.input.mouse.y + ig.game.screen.y - (this.size.y / 2))
		};

		// Rotate
		this.currentAnim.angle += (this.rotateSpeed * ig.system.tick);

		this.parent();

	}

});

});
