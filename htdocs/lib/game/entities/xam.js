ig.module(
	"game.entities.xam"
)
.requires(
	"game.entities.abstract.hero"
)
.defines(function () {

EntityXam = EntityHero.extend({

	animSheet: new ig.AnimationSheet("media/entities/xam.png", 16, 16)

});

});
