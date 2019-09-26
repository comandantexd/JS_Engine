'use strict';

class Layer {
	constructor(name, id, entities = []) {
		this.name = name;
		this.id = id;
		this.active = true;
		this.entities = entities;
	}

	addEntities(entities) {
		this.entities = [...this.entities, ...entities];

		return this.entities;
	}

	removeEntity(entityId) {
		this.entities = this.entities.filter(e => e.id != entityId);
	}
}
