ig.module(
	"game.entities.bat"
)
.requires(
	"game.entities.abstract.monster"
)
.defines(function () {

EntityBat = EntityMonster.extend({

	health: 1,
	maxVel: {x: 50, y: 50},

	animSheet: new ig.AnimationSheet("media/entities/bat.png", 16, 16),

	sounds: {
		damage: new ig.Sound("media/sounds/bat_damage.*"),
		death: new ig.Sound("media/sounds/bat_death.*")
	},

	moveChangeTimer: null,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		var delay = Math.random().map(0, 1, 1.5, 3);
		this.moveChangeTimer = new ig.Timer(delay);
		this.moveRandom();
	},

	update: function () {

		if (this.moveChangeTimer.delta() >= 0) {
			this.moveRandom();
			this.moveChangeTimer.reset();
		}

		this.parent();

	},

	handleMovementTrace: function (res) {
		if (res.collision.x || res.collision.y) {
			this.moveChangeTimer.reset();
		}
		this.parent(res);
	}

});

});
