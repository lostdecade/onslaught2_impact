ig.module(
	"game.entities.spawn-cave"
)
.requires(
	"game.entities.abstract.spawner"
)
.defines(function () {

EntitySpawnCave = EntitySpawner.extend({

	health: 200,
	size: {x: 32, y: 32},
	animSheet: new ig.AnimationSheet("media/entities/spawner_alpha_03.png", 32, 32)

});

});
