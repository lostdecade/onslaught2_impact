ig.module(
	"game.entities.abstract.power-up"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityPowerUp = ig.Entity.extend({

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	size: {x: 16, y: 16},
	zIndex: -1,

	check: function (other) {
		if (other instanceof EntityXam) {
			this.affect(other);
		}
	},

	affect: function (other) {
		// Affect the player somehow
	}

});

});
