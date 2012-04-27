ig.module(
	"game.entities.food"
)
.requires(
	"game.entities.abstract.power-up"
)
.defines(function () {

EntityFood = EntityPowerUp.extend({

	pickupSound: new ig.Sound("media/sounds/pickup_food.*"),

	check: function (other) {
		other.health += 10;
		this.pickupSound.play();
		this.kill();
	}

});

});
