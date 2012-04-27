ig.module(
	"game.entities.abstract.hero"
)
.requires(
	"game.entities.abstract.mob"
)
.defines(function () {

EntityHero = EntityMob.extend({

	type: ig.Entity.TYPE.A,
	health: 100,

	sounds: {
		attack: new ig.Sound("media/sounds/hero_attacks.*"),
		damage: new ig.Sound("media/sounds/hero_damage.*"),
		death: new ig.Sound("media/sounds/hero_death.*")
	},

	gold: 0,

	update: function () {

		if (ig.input.state("left")) {
			this.vel.x = -75;
		} else if (ig.input.state("right")) {
			this.vel.x = 75;
		} else {
			this.vel.x = 0;
		}

		if (ig.input.state("up")) {
			this.vel.y = -75;
		} else if (ig.input.state("down")) {
			this.vel.y = 75;
		} else {
			this.vel.y = 0;
		}

		this.parent();

		if (ig.input.state("shoot")) {
			var reticle = ig.game.getEntitiesByType(EntityReticle)[0];
			var r = new Vector(reticle.pos).add(new Vector(reticle.size).scale(0.5));
			var m = new Vector(this.pos).add(new Vector(this.size).scale(0.5));
			this.heading = r.subtract(m).normalize();
			this.attack();
		}

	},

	receiveDamage: function (damage, from) {
		this.parent(damage, from);
		if (!this.hasState(EntityBase.STATES.INVINCIBLE)) {
			this.pushState(EntityBase.STATES.INVINCIBLE, 2.5);
		}
	}

});

});
