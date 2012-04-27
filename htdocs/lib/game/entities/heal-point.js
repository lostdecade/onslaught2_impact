ig.module(
	"game.entities.heal-point"
)
.requires(
	"game.entities.abstract.power-up"
)
.defines(function () {

EntityHealPoint = EntityPowerUp.extend({

	animSheet: new ig.AnimationSheet("media/entities/powerups.png", 16, 16),

	cooldownTimer: new ig.Timer(),
	active: true,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("active", 0.25, [14, 15, 16, 15]);
		this.addAnim("inactive", 1, [17]);
	},

	update: function () {
		if (!this.active && this.cooldownTimer.delta() >= 0) {
			this.active = true;
			this.currentAnim = this.anims.active.rewind();
		}
		this.parent();
	},

	affect: function (hero) {
		if (this.active) {
			// TODO: Implement: hero.heal(other.maxHealth);
			hero.health = 100;
			this.active = false;
			this.currentAnim = this.anims.inactive;
			this.cooldownTimer.set(30);
		}
	}

});

});
