ig.module(
	"game.entities.misc.corpse"
)
.requires(
	"impact.entity"
)
.defines(function () {

EntityCorpse = ig.Entity.extend({

	zIndex: 0,

	ttlTimer: null,

	init: function (x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim("death", 0.25, settings.frames, true);
		this.ttlTimer = new ig.Timer(2.5);
	},

	update: function () {

		this.parent();

		var delta = this.ttlTimer.delta();

		// Fade out during the last second of ttl
		if (delta >= -1 && delta <= 0) {
			this.currentAnim.alpha = (delta / -1);
		}

		if (delta >= 0) {
			this.kill();
		}

	}

});

});
