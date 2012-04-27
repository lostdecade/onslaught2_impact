ig.module(
	"game.entities.warp"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityWarp = ig.Entity.extend({

	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: "rgba(0, 0, 255, 0.5)",

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	size: {x: 16, y: 16},

	level: null,
	location: null,

	check: function (other) {
		if (
			other instanceof EntityHero
			&& this.level != null
			&& ig.global[this.level]
			&& this.location != null
		) {
			ig.game.warp(ig.global[this.level], this.location);
		}
	}

});

});
