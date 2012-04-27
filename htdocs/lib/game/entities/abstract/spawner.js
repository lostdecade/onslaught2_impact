ig.module(
	"game.entities.abstract.spawner"
)
.requires(
	"game.entities.abstract.base"
)
.defines(function () {

EntitySpawner = EntityBase.extend({

	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.BOTH,
	collides: ig.Entity.COLLIDES.FIXED,
	health: 10,
	zIndex: -1,

	// Set these properties via Weltmeister to control spawn behavior:
	spawnInterval: 5,
	spawnTimer: null,
	spawnEntity: null,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.spawnTimer = new ig.Timer(this.spawnInterval);
		if (this.animSheet) {
			this.addAnim("idle", 1, [0]);
			this.addAnim("pain", 1, [5]);
		}
	},

	update: function () {
		this.parent();
		if (this.spawnEntity != null && this.spawnTimer.delta() >= 0) {
			var e = ig.game.spawnEntity(
				this.spawnEntity,
				this.pos.x,
				this.pos.y
			);
			e.pushState(EntityBase.STATES.SPAWNING, 0.3);
			this.spawnTimer.reset();
		}
	},

	spawnCorpse: function () {
		var pos = {
			x: (this.pos.x - this.offset.x),
			y: (this.pos.y - this.offset.y)
		};
		var e = ig.game.spawnEntity(EntityCorpse, pos.x, pos.y, {
			animSheet: this.animSheet,
			size: {
				x: (this.size.x + this.offset.x),
				y: (this.size.y + this.offset.y)
			},
			frames: [1, 2, 3]
		});
	}

});

});
