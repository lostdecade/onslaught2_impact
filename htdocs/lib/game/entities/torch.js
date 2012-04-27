ig.module(
	"game.entities.torch"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityTorch = ig.Entity.extend({

	animSheet: new ig.AnimationSheet("media/entities/objects.png", 16, 16),

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("idle", 0.2, [75, 74, 75, 73]);
	}

});

});
