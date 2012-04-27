ig.module(
	"game.entities.spawn-invis"
)
.requires(
	"game.entities.abstract.spawner"
)
.defines(function () {

EntitySpawnInvis = EntitySpawner.extend({

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	health: 1,

	_wmDrawBox: true,
	_wmBoxColor: "rgba(255, 0, 0, 0.5)"

});

});
