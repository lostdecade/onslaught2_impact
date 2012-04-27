ig.module(
	"game.entities.save-point"
)
.requires(
	"game.entities.abstract.power-up"
)
.defines(function () {

EntitySavePoint = EntityPowerUp.extend({

	animSheet: new ig.AnimationSheet("media/entities/powerups.png", 16, 16),

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("active", 0.25, [0, 1, 2, 1]);
	},

	affect: function (hero) {
		// TODO: save the game
	}

});

});
