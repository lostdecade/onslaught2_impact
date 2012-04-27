ig.module(
	"game.entities.abstract.monster"
)
.requires(
	"game.entities.abstract.mob",
	"math.vector"
)
.defines(function () {

EntityMonster = EntityMob.extend({

	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,

	damage: 1,

	// Phases
	phases: {},
	currentPhase: null,
	phaseTimer: null,

	check: function (other) {
		other.receiveDamage(this.damage, this);
	},

	handleMovementTrace: function (res) {
		// Change direction when a wall is it
		if (res.collision.x || res.collision.y) {
			if (res.collision.x) {
				this.vel.x *= -1;
			}
			if (res.collision.y) {
				this.vel.y *= -1;
			}
		}
		this.pos = res.pos;
	},

	moveRandom: function () {
		var r = Math.random().map(0, 1, 0, Math.PI * 2);
		var v = Vector.fromAngle(r);
		this.vel = {
			x: (this.maxVel.x * v.x),
			y: (this.maxVel.y * v.y)
		};
	},

	update: function () {
		var phase = this.currentPhase;
		if (phase != null) {
			if (phase.update) {
				phase.update.call(this);
			}
			if (
				this.phaseTimer != null
				&& this.phaseTimer.delta() >= 0
				&& phase.end
			) {
				phase.end.call(this);
			}
		}
		this.parent();
	},

	addPhase: function (id, phase) {
		this.phases[id] = phase;
		if (this.currentPhase == null) {
			this.gotoPhase(id);
		}
	},

	gotoPhase: function (id) {
		var phase = this.currentPhase = this.phases[id];
		if (phase.init) {
			// Init the new phase
			phase.init.call(this);
		}
		if (phase.duration) {
			if (typeof phase.duration == "object") {
				// Randomize duration within the given range
				var duration = Math.random().map(
					0, 1,
					phase.duration.min,
					phase.duration.max
				);
			} else {
				var duration = phase.duration;
			}
			this.phaseTimer = new ig.Timer(duration);
		} else {
			// Phase has no timed duration; it's up to the 
			// specific phase code to determine it's exit
			// conditions and call .gotoPhase().
			this.phaseTimer = null;
		}
	}

});

});
