ig.module(
	"game.entities.abstract.base"
)
.requires(
	"impact.entity",
	"game.entities.misc.corpse"
)
.defines(function () {

EntityBase = ig.Entity.extend({

	// ImpactJS properties
	size: {x: 16, y: 16},
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	health: 1,
	zIndex: 1,
	// Custom properties
	sounds: {},
	states: [],

	attackTimer: new ig.Timer(0),

	alpha: 1,

	pushState: function (state, duration) {
		if (!this.hasState(state)) {
			this.states.push({
				type: state,
				timer: new ig.Timer(duration)
			});
		}
	},

	hasState: function (type) {
		for (var i = 0, j = this.states.length; i < j; ++i) {
			if (this.states[i].type == type) {
				return true;
			}
		}
		return false;
	},

	updateStates: function () {
		var indices = [];
		for (var i = 0, j = this.states.length; i < j; ++i) {
			var state = this.states[i];
			if (state.timer.delta() >= 0) {
				// This state has expired
				indices.push(i);
			}
		}
		// Remove expired states
		for (var i = 0, j = indices.length; i < j; ++i) {
			this.states.splice(i, 1);
		}
	},

	getStateTimer: function (type) {
		for (var i = 0, j = this.states.length; i < j; ++i) {
			if (this.states[i].type == type) {
				return this.states[i].timer;
			}
		}
		// TODO: Good idea to return 0?
		return false;
	},

	getStateAnim: function () {
		var state = "idle";
		if (this.vel.x != 0 || this.vel.y != 0) {
			state = "move";
		}
		if (this.hasState(EntityBase.STATES.PAIN)) {
			state = "pain";
		}
		return state;
	},

	setAnim: function (anim, flip) {
		flip = flip || false;
		if (this.anims[anim] && this.currentAnim != this.anims[anim]) {
			this.currentAnim = this.anims[anim].rewind();
		}
		this.currentAnim.flip.x = flip;
	},

	updateAnim: function () {
		this.setAnim(this.getStateAnim());
	},

	update: function () {
		this.updateStates();
		this.updateAnim();
		if (this.currentAnim) {
			this.currentAnim.alpha = 1;
			var t = this.getStateTimer(EntityBase.STATES.SPAWNING);
			if (t) {
				var alpha = (1 - (t.delta() / -t.target));
				this.currentAnim.alpha = alpha.limit(0, 1);
			}
			t = this.getStateTimer(EntityBase.STATES.INVINCIBLE);
			if (t) {
				var alpha = Math.sin(20 * ig.Timer.time).map(-1, 1, 0.1, 1);
				this.currentAnim.alpha = alpha.limit(0, 1);
			}
		}
		this.parent();
	},

	triggerSound: function (sound) {
		if (this.sounds[sound]) {
			this.sounds[sound].play();
		}
	},

	receiveDamage: function (amount, from) {
		if (this.hasState(EntityBase.STATES.INVINCIBLE)) {
			return;
		}
		this.parent(amount, from);
		if (this.health <= 0) {
			this.triggerSound("death");
			this.spawnCorpse();
		} else {
			this.pushState(EntityBase.STATES.PAIN, 0.125);
			this.triggerSound("damage");
		}
	},

	spawnCorpse: function () {
		var pos = {
			x: (this.pos.x - this.offset.x),
			y: (this.pos.y - this.offset.y)
		};
		var e = ig.game.spawnEntity(EntityCorpse, pos.x, pos.y, {
			animSheet: this.animSheet,
			size: {
				x: (this.size.x + this.offset.x),
				y: (this.size.y + this.offset.y)
			},
			frames: [24, 25, 26]
		});
	},

	spawn: function (type) {
		var check = ig.Entity.TYPE.NONE;
		if (this.type == ig.Entity.TYPE.A) {
			check = ig.Entity.TYPE.B;
		} else if (this.type == ig.Entity.TYPE.B) {
			check = ig.Entity.TYPE.A;
		}
		var pos = {
			x: (this.pos.x + (this.size.x / 2)),
			y: (this.pos.y + (this.size.y / 2))
		};
		var e = ig.game.spawnEntity(type, pos.x, pos.y, {
			parent: this,
			type: this.type,
			checkAgainst: check,
			heading: this.heading
		});
		e.pos.x -= (e.size.x / 2);
		e.pos.y -= (e.size.y / 2);
		e.pos.x += (e.vel.x * ig.system.tick * 2);
		e.pos.y += (e.vel.y * ig.system.tick * 2);
	},

	attack: function () {
		if (this.attackTimer.delta() >= 0) {
			// TODO: Assign weapons to specific entities
			this.spawn(EntitySword);
			this.triggerSound("attack");
			this.attackTimer.set(0.25);
		}
	}

});

EntityBase.STATES = {
	PAIN: 0,
	SPAWNING: 1,
	INVINCIBLE: 2
};

});
