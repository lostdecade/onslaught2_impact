ig.module(
	"math.vector"
)
.defines(function () {

	Vector = function (x, y) {
		if (x && x.x) {
			this.set({
				x: x.x,
				y: x.y
			});
		} else {
			this.set({
				x: x,
				y: y
			});
		}
	};

	Vector.fromAngle = function (a, len) {
		len = Number(len) || 1;
		return new Vector(
			Math.sin(a),
			-Math.cos(a)
		).scale(len);
	};

	Vector.prototype.clone = function () {
		return new Vector(this.x, this.y);
	};

	Vector.prototype.getLength = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	Vector.prototype.getAngle = function () {
		return Math.atan2(this.x, -this.y);
	};

	Vector.prototype.set = function (v) {
		if (v) {
			this.x = Number(v.x) || 0;
			this.y = Number(v.y) || 0;
			return this;
		} else {
			return this.zero();
		}
	};

	Vector.prototype.add = function (v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	};

	Vector.prototype.subtract = function (v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};

	Vector.prototype.scale = function (n) {
		this.x *= n;
		this.y *= n;
		return this;
	};

	Vector.prototype.normalize = function () {
		var length = this.getLength();
		if (length === 0) {
			return this;
		} else {
			return this.scale(1 / length);
		}
	};

	Vector.prototype.zero = function () {
		this.x = 0;
		this.y = 0;
		return this;
	};

});
