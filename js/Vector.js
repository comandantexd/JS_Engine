'use strict';

class Vector2d {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	negative() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	negativeX() {
		this.x = -this.x;
		return this;
	}

	negativeY() {
		this.y = -this.y;
		return this;
	}

	add(v) {
		if (v instanceof Vector2d) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}

		return this;
	}

	subtract(v) {
		if (v instanceof Vector2d) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= v;
			this.y -= v;
		}

		return this;
	}

	multiply(v) {
		if (v instanceof Vector2d) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;
		}

		return this;
	}

	divide(v) {
		if (v instanceof Vector2d) {
			if (v.x != 0) this.x /= v.x;
			if (v.y != 0) this.y /= v.y;
		} else {
			if (v != 0) {
				this.x /= v;
				this.y /= v;
			}
		}

		return this;
	}

	equals(v) {
		return this.x == v.x && this.y == v.y;
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	cross(v) {
		return this.x * v.y - this.y * v.x
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	normalize() {
		return this.divide(this.length());
	}

	abs() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);

		return this;
	}

	distance(v) {
		const x = Math.pow(Math.abs(this.x - v.x), 2);
		const y = Math.pow(Math.abs(this.y - v.y), 2);

		return Math.sqrt(x + y);
	}

	min() {
		return Math.min(this.x, this.y);
	}

	max() {
		return Math.max(this.x, this.y);
	}

	toAngles() {
		return -Math.atan2(-this.y, this.x);
	}

	angleTo(a) {
		return Math.acos(this.dot(a) / (this.length() * a.length()));
	}

	toArray() {
		return [this.x, this.y];
	}

	clone() {
		return new Vector2d(this.x, this.y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;

		return this;
	}
};

/* STATIC METHODS
Vector2d.negative = function(v) {
	return new Vector2d(-v.x, -v.y);
};
Vector2d.add = function(a, b) {
	if (b instanceof Vector2d) return new Vector2d(a.x + b.x, a.y + b.y);
	else return new Vector2d(a.x + b, a.y + b);
};
Vector2d.subtract = function(a, b) {
	if (b instanceof Vector2d) return new Vector2d(a.x - b.x, a.y - b.y);
	else return new Vector2d(a.x - b, a.y - b);
};

Vector2d.multiply = function(a, b) {
	if (b instanceof Vector2d) return new Vector2d(a.x * b.x, a.y * b.y);
	else return new Vector2d(a.x * b, a.y * b);
};
Vector2d.divide = function(a, b) {
	if (b instanceof Vector2d) return new Vector2d(a.x / b.x, a.y / b.y);
	else return new Vector2d(a.x / b, a.y / b);
};
Vector2d.equals = function(a, b) {
	return a.x == b.x && a.y == b.y;
};

Vector2d.dot = function(a, b) {
	return a.x * b.x + a.y * b.y;
};

Vector2d.cross = function(a, b) {
	return a.x * b.y - a.y * b.x;
};
*/
