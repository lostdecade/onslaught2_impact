ig.module(
	"game.entities.weapons.spear"
)
.requires(
	"game.entities.abstract.weapon"
)
.defines(function () {

EntitySpear = EntityWeapon.extend({

	damage: 10,
	maxVel: {x: 250, y: 250},

	init: function (x, y, settings) {
		this.addAnim("idle", 1, [12]);
		this.parent(x, y, settings);
	}

});

});
