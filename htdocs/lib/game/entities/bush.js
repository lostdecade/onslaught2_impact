ig.module(
	"game.entities.bush"
)
.requires(
	"game.entities.abstract.base"
)
.defines(function () {

EntityBush = EntityBase.extend({
	
	zIndex: 0,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet("media/entities/objects.png", 16, 16),

	sounds: {
		damage: new ig.Sound("media/sounds/goblin_damage.*"),
		death: new ig.Sound("media/sounds/goblin_death.*")
	},

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("idle", 1, [63]);
	}

});

});
