ig.module(
	"game.entities.coin"
)
.requires(
	"game.entities.abstract.power-up"
)
.defines(function () {

EntityCoin = EntityPowerUp.extend({

	animSheet: new ig.AnimationSheet("media/entities/powerups.png", 16, 16),
	pickupSound: new ig.Sound("media/sounds/pickup_coin.*"),

	goldValue: 10,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("idle", 0.15, [21, 22, 23, 24, 25, 26, 23, 27]);
		this.pickupSound.volume = 0.1;
	},

	affect: function (hero) {
		hero.gold += this.goldValue;
		this.pickupSound.play();
		this.kill();
	}

});

});
