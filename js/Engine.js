'use strict';

class Engine {
	constructor(canvas, entities = []) {
		this.canvas = canvas;
		this.handler = window;
		this.context = canvas.getContext('2d');
		this.FPS = 120;

		this._l = [new Layer("foreground", 0), new Layer("game", 1), new Layer("background", 2)];

		// Preset width and height as screen dimmensions
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		(function () {
			var requestAnimationFrame = window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame;

			window.requestAnimationFrame = requestAnimationFrame;
		})();

		this.context.imageSmoothingEnabled = false;

	}

	get layers() {
		return this._l;
	}

	get entities() {
		return this.layers.flatMap(l => l.entities);
	}

	get visibleEntities() {
		return this.visibleLayers.flatMap(l => l.entities);
	}

	get visibleLayers() {
		return this.layers.filter(l =>
			l.active
		);
	}

	getEntityFromId(id) {
		if (typeof id === "number") {
			return this.entities.filter(e => e.id == id)[0];
		}
	}

	addEntities(entities, layer = 1) {
		let l;
		if (typeof layer === 'string') {
			l = this.layers.filter(l => l.name == layer)[0];
			l.entities = [...l.entities, ...entities];
		} else if (typeof layer === 'number' && layer >= 0 && layer <= 3) {
			l = this.layers.filter(l => l.id == layer)[0];
			l.entities = [...l.entities, ...entities];
		}
	}

	removeEntityFromId(id) {
		this._l[0].entities = this._l[0].entities.filter(e => e.id != id);
		this._l[1].entities = this._l[1].entities.filter(e => e.id != id);
		this._l[2].entities = this._l[2].entities.filter(e => e.id != id);
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// update entities data & draw them
	render() {
		let frontEntities = this.layers[0].entities;
		let gameEntities = this.layers[1].entities;
		let backEntities = this.layers[2].entities;

		frontEntities = Array.from(frontEntities).sort((ea, eb) =>
			ea.zIndex - eb.zIndex
		);
		gameEntities = Array.from(gameEntities).sort((ea, eb) =>
			ea.zIndex - eb.zIndex
		);
		backEntities = Array.from(backEntities).sort((ea, eb) =>
			ea.zIndex - eb.zIndex
		);

		backEntities.filter(entity => entity.active == true).forEach(entity => {
			entity.update(this.canvas);
			entity.draw(this.context);
		});
		gameEntities.filter(entity => entity.active == true).forEach(entity => {
			entity.update(this.canvas);
			entity.draw(this.context);
		});
		frontEntities.filter(entity => entity.active == true).forEach(entity => {
			entity.update(this.canvas);
			entity.draw(this.context);
		});
	}

	eachFrame() {
		this.canvas.dispatchEvent(new Event("update"));

		this.clear();
		this.render();

		// this.checkTriggers();
	}





	start() {
		this.canvas.dispatchEvent(new Event("setup"));
		this.startTime = performance.now();
		this.frameCount = 0;

		let lastTimestamp = null;
		const element = this.canvas;

		let currentFps = this.FPS;

		let lastInfoUpdate = 0;

		const frame = (timestamp) => {
			if (lastTimestamp === null) {
				lastTimestamp = timestamp;
			}

			var timeBetweenFrames = timestamp - lastTimestamp;
			lastTimestamp = timestamp;

			this.eachFrame();

			if ((performance.now() - lastInfoUpdate) > 250) {
				lastInfoUpdate = performance.now();

				currentFps = 1000 / timeBetweenFrames;

				currentFps = (currentFps).toFixed(2);
			}

			// DRAW FPS INFO
			this.context.font = "15px Consolas";
			this.context.fillStyle = "red";

			this.context.fillText(`FPS: ${currentFps.toString().padStart(6, ' ')} / ${this.FPS}`, this.canvas.width - 135, 15);
			this.context.fillText(`Frames: ${this.frameCount.toString().padStart(8, ' ')}`, this.canvas.width - 135, 30);

			this.frameCount++;

			window.setTimeout(function () {
				this.currentFrameId = window.requestAnimationFrame(frame, element);
			}, 1000 / this.FPS);
		}

		this.currentFrameId = window.requestAnimationFrame(frame, element);
	}



























	checkTriggers() {
		let ent = this.entities;
		let numEntities = ent["length"];
		let actual, dynamic, width, height, h;

		for (let i = 0; i < numEntities; i++) {
			actual = ent[i];
			for (let j = i + 1; j < numEntities; j++) {
				dynamic = ent[j];
				width = dynamic.trigger.width / 2;
				height = dynamic.trigger.height / 2;
				if (actual.position.x > dynamic.position.x - width && actual.position.x < dynamic.position.x + width &&
					actual.position.y > dynamic.position.y - height && actual.position.y < dynamic.position.y + height &&
					actual.layer == dynamic.layer && actual.trigger.enabled === true && dynamic.trigger.enabled === true) {


					// TODO: check the layers
					console.log("triggered");
					// h = new Entity("a", actual.position.x, actual.position.y, 0, 0, "red", 1);
					// h.trigger.enabled = false;
					// this.addEntities([h]);
				}
			}
		}
	}
}
