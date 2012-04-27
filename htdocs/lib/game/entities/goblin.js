ig.module(
	"game.entities.goblin"
)
.requires(
	"game.entities.abstract.monster"
)
.defines(function () {

EntityGoblin = EntityMonster.extend({

	health: 10,
	maxVel: {x: 50, y: 50},

	animSheet: new ig.AnimationSheet("media/entities/goblin.png", 16, 16),

	sounds: {
		attack: new ig.Sound("media/sounds/goblin_attacks.*"),
		damage: new ig.Sound("media/sounds/goblin_damage.*"),
		death: new ig.Sound("media/sounds/goblin_death.*")
	},

	pathTimer: null,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.pathTimer = new ig.Timer(Math.random().map(0, 1, 0.5, 1.5));
	},

	update: function () {

		if (!this.hasState(EntityBase.STATES.SPAWNING)) {
			// TODO: Move this whole AI bit to the EntityMonster object
			if (this.waypoints == null || this.pathTimer.delta() >= 0) {
				var player = ig.game.getPlayer();
				if (player) {
					var distance = new Vector(this.pos).subtract(player.pos);
					// TODO: Create a variable for this number, such as "aggroDistance"
					if (distance.getLength() < 200) {
						this.waypoints = ig.game.tracePath(this, player);
					} else {
						// TODO: Wander or something?
						this.waypoints = null;
						this.vel.x = 0;
						this.vel.y = 0;
					}
				}
				this.pathTimer.reset();
			}
		}

		this.parent();

	}

});

});
