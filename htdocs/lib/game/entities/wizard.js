ig.module(
	"game.entities.wizard"
)
.requires(
	"game.entities.abstract.monster"
)
.defines(function () {

EntityWizard = EntityMonster.extend({

	health: 50,
	maxVel: {x: 50, y: 50},

	animSheet: new ig.AnimationSheet("media/entities/wizard.png", 16, 16),

	/*
	sounds: {
		damage: new ig.Sound("media/sounds/bat_damage.*"),
		death: new ig.Sound("media/sounds/bat_death.*")
	},
	*/

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
				this.gotoPhase("moveLeft");
			}
		});

	}

});

});
