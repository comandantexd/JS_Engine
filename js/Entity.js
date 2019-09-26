'use strict';

class Entity {
	constructor(obj = {
		id: 0,
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		velocity: 0,
		color: "black",
		rotation: 0,
		zIndex: 0,
		gravity : true,
		bounciness: 1,
		bounces: 1,
		active: true,
		animation : null
	}) {
		this.id = typeof obj.id === 'number' ?
			obj.id : 0;

		this.position = new Vector2d(
			typeof obj.x === 'number' ? obj.x : 0,
			typeof obj.y === 'number' ? obj.y : 0
		);

		this.direction = new Vector2d(
			typeof obj.vx === 'number' ? obj.vx : 0,
			typeof obj.vy === 'number' ? obj.vy : 0
		).normalize();

		this.color = typeof obj.color === 'string' ?
			obj.color : 'black';

		this.rotation = typeof obj.rotation === 'number' ?
			obj.rotation : 0;

		this.zIndex = typeof obj.zIndex === 'number' ?
			obj.zIndex : 0;

		this.gravity = typeof obj.gravity === 'boolean' ?
			obj.gravity : false;

		this.bounciness = typeof obj.bounciness === 'number' ?
			obj.bounciness : 1;
		this.bounces = typeof obj.bounces === 'number' ?
			obj.bounces : 1;

		this.animation = obj.animation instanceof Animation ?
			obj.animation : null;

		this._a = typeof obj.active === 'boolean' ?
			obj.active : true; //is active?
		this._bCount = this.bounces; //iteration for counting the bounces
		this._g = 1.2; //gravity Force
		this._f = false; //is falling?
	}

	get active() {
		return this._a;
	}

	set active(bool) {
		if (typeof bool !== 'boolean') {
			throw "Error: active propery must be either true or false";
		}
		this._a = bool;
	}

	get isFalling() {
		return this._f;
	}

	translate(newPosition) {
		this.position.add(newPosition);
	}

	applyForce(dir) {
		if (dir instanceof Vector2d) {
			this.direction.y += dir.y;
			this.direction.x += dir.x;
		} else {
			throw "Error: A Vector2d is needed for applying the force";
		}
	}

	getCenter() {
		return this.position;
	}

	rotate(context) {
		// Matriz de transformación
		let center = this.getCenter();

		context.translate(center.x, center.y);
		context.rotate(this.rotation);
		context.translate(-center.x, -center.y);
	}

	unrotate(context) {
		// Matriz de transformación
		let center = this.getCenter();

		context.translate(center.x, center.y);
		context.rotate(-this.rotation);
		context.translate(-center.x, -center.y);
	}

	update(canvas) {
		if (this.active) {
			if (this.animation instanceof Animation) {
				this.animation.play();
				this.position.add(this.direction.clone());
			} else if (this.gravity) {
				const G = this._g;
				const bottom = this instanceof Triangle ?
				canvas.height - (this.height / 2) : canvas.height - this.height;

				this.position.add(this.direction.clone());
				const Y = this.position.y;

				if (Y < bottom) {
					this.direction.y += G;
					this._f = true;
				} else if (this.bounciness > 1 && this._bCount > 0) {
					this._bCount--;
					this.direction.y -= this.direction.y * this.bounciness;
					this._f = false;
				} else {
					this._bCount = this.bounces;
					this.direction.y = 0;
					this.position.y = bottom;
					this._f = false;
				}
			} else {
				this.position.add(this.direction.clone());
			}
		}
	}

	draw(context) {
		this.rotate(context);

		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y, 4, 4);

		this.unrotate(context);
	}
}

class Rectangle extends Entity {
	constructor(obj) {

		if (typeof obj === 'object') {
			super(obj);
		} else {
			obj = {};
			super();
		}

		this.width = typeof obj.width === 'number' ? obj.width : 1;
		this.height = typeof obj.height === 'number' ? obj.height : 1;

		this.fill = typeof obj.fill === 'boolean' ? obj.fill : false;
	}

	getCenter() {
		let center = this.position.clone();
		center.x += this.width / 2;
		center.y += this.height / 2;

		return center;
	}

	draw(context) {

		this.rotate(context);

		if (this.fill) {
			context.fillStyle = this.color;
			context.fillRect(
				this.position.x, this.position.y,
				this.width, this.height
			);
		} else {
			context.strokeStyle = this.color;
			context.strokeRect(
				this.position.x, this.position.y,
				this.width, this.height
			);
		}

		this.unrotate(context);
	}
}

class Triangle extends Entity {
	constructor(obj) {
		if (typeof obj === 'object') {
			super(obj);
		} else {
			obj = {};
			super();
		}

		this.width = typeof obj.width === 'number' ?
			obj.width : 100;

		this.height = typeof obj.height === 'number' ?
			obj.height : 86.60254037844386;

		this.fill = typeof obj.fill === 'boolean' ?
			obj.fill : false;

		this.trigger = new Trigger(this.width, this.height);

		this._deriv;
		this.dotDerivation = typeof obj.dotDerivation === 'number' ?
			obj.dotDerivation : 0;
	}


	set dotDerivation(deriv) {
		if (typeof deriv === 'number') {
			if (deriv <= this.width / 2) {
				this._deriv = deriv;
			} else {
				throw "derivation must be smaller than the half of width";
			}
		}
	}

	get dotDerivation() {
		return this._deriv;
	}

	get dots() {
		let innerH = this.height / 2;
		let innerW = this.width / 2;

		return {
			upper: new Vector2d(
				this.position.x + this.dotDerivation,
				this.position.y - innerH
			),

			right: new Vector2d(
				this.position.x + innerW,
				this.position.y + innerH
			),

			left: new Vector2d(
				this.position.x - innerW,
				this.position.y + innerH
			)
		}
	}

	getCenter() {
		let x = (this.dots.upper.x + this.dots.left.x + this.dots.right.x) / 3;
		let y = (this.dots.upper.y + this.dots.left.y + this.dots.right.y) / 3;
		return new Vector2d(x, y);
	}

	draw(context) {
		this.rotate(context);

		context.beginPath();
		context.moveTo(this.dots.upper.x, this.dots.upper.y);
		context.lineTo(this.dots.right.x, this.dots.right.y);
		context.lineTo(this.dots.left.x, this.dots.left.y);
		context.lineTo(this.dots.upper.x, this.dots.upper.y);
		context.closePath();

		if (this.fill) {
			context.fillStyle = this.color;
			context.fill();
		} else {
			context.strokeStyle = this.color;
			context.stroke();
		}

		this.unrotate(context);
	}
}
