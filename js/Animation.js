'use strict';

class Animation {
	constructor(entity, secuence) {
		this.milis = 0;
		this._e = entity;
		this._s = [secuence].flat();
		this._i;
	}

	set entity(entity) {
		if (entity instanceof Entity) {
			this._e = entity;
		} else {
			throw "Error: Entity must be an instance of Entity";
		}
	}

	get entity() {
		return this._e;
 	}

	set secuence(secuence) {
		this._s = [secuence].flat();
	}

	get secuence() {
		return this._s;
	}

	play() {
		let entity = this.entity;
		let secuence = this.secuence;
		let l = secuence.length;
		let i = 0;
		this._i = setInterval(() => {
			eval(secuence[i++]);
			if (i == l) i = 0;
		}, this.milis);
	}

	stop() {
		clearInterval(this._i);
	}
}
