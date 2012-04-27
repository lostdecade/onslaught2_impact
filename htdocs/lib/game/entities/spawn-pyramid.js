ig.module(
	"game.entities.spawn-pyramid"
)
.requires(
	"game.entities.abstract.spawner"
)
.defines(function () {

EntitySpawnPyramid = EntitySpawner.extend({

	health: 100,
	animSheet: new ig.AnimationSheet("media/entities/spawner_alpha.png", 16, 16)

});

});
