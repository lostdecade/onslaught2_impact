ig.module(
	"game.entities.cube"
)
.requires(
	"game.entities.abstract.monster"
)
.defines(function () {

EntityCube = EntityMonster.extend({

	health: 500,
	maxVel: {x: 50, y: 50},

	size: {x: 24, y: 24},
	offset: {x: 4, y: 6},
	animSheet: new ig.AnimationSheet("media/entities/cube.png", 32, 32),

	sounds: {
		damage: new ig.Sound("media/sounds/cube_damage.*"),
		death: new ig.Sound("media/sounds/cube_death.*")
	},

	init: function (x, y, settings) {
		this.parent(x, y, settings);

		this.addPhase("moveLeft", {
			duration: 2,
			init: function () {
				this.vel = {x: -this.maxVel.x, y: 0};
			},
			end: function () {
				this.gotoPhase("moveRight");
			}
		});

		this.addPhase("moveRight", {
			duration: 2,
			init: function () {
				this.vel = {x: this.maxVel.x, y: 0};
			},
			end: function () {
				this.gotoPhase("moveDown");
			}
		});

		this.addPhase("moveDown", {
			duration: 2,
			init: function () {
				this.vel = {x: 0, y: this.maxVel.y};
			},
			end: function () {
				this.gotoPhase("moveLeft");
			}
		});

	}

});

});
