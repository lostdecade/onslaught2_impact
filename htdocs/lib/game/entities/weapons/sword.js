ig.module(
	"game.entities.weapons.sword"
)
.requires(
	"game.entities.abstract.weapon"
)
.defines(function () {

EntitySword = EntityWeapon.extend({

	damage: 5,

	init: function (x, y, settings) {
		this.addAnim("idle", 1, [0]);
		this.parent(x, y, settings);
	}

});

});
