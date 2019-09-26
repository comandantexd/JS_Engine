'use strict';

// TODO: remove debug variables
var publicEngine;

const ENUM = 50;

document.addEventListener('DOMContentLoaded', () => {

	const engine = new Engine(document.getElementById('playground'));

	engine.addEntities([
		new Rectangle({
			x: 0,
			y: 0,
			width: engine.canvas.width,
			height: engine.canvas.height,
			color: '#c4b851',
			fill: true
		})
	]);

	engine.addLayers(1);

	engine.addEntities([
		new Rectangle({
			x: 0,
			y: 0,
			vx: 0.5,
			vy: 0.5,
			velocity: 2,
			width: 50,
			height: 50,
			color: '#5179c4',
			fill: true,
			bounceOnWalls: true
		})
	])

	publicEngine = engine;

	engine.start();
});
