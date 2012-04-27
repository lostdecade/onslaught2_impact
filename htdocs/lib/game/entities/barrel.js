ig.module(
	"game.entities.barrel"
)
.requires(
	"game.entities.abstract.base"
)
.defines(function () {

EntityBarrel = EntityBase.extend({

	animSheet: new ig.AnimationSheet("media/tilesets/tileset.png", 16, 16),

	sounds: {
		damage: new ig.Sound("media/sounds/goblin_damage.*"),
		death: new ig.Sound("media/sounds/goblin_death.*")
	},

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("idle", 1, [20]);
	}

});

});
