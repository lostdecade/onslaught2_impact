ig.module(
	"game.entities.location"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityLocation = ig.Entity.extend({

	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: "rgba(0, 255, 0, 0.5)",

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	size: {x: 16, y: 16}

});

});
