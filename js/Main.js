'use strict';

// TODO: remove debug variables
var publicEngine;
var ent;
var a;

const ENUM = 50;

document.addEventListener('DOMContentLoaded', () => {

	const engine = new Engine(document.getElementById('playground'));
	const handler = engine.handler;

	let entities = [
		new Triangle({
			id : 1,
			x: 400,
			y: 100,
			color: 'red',
			gravity: false,
			fill: true,
			bounciness: 0,
			bounces: 0
		})
	];

	entities = engine.addEntities(entities);
	publicEngine = engine;

	engine.start();

	ent = engine.entities[0];
	a = new Animation(ent);
	a.milis = 200;
	a.secuence = [
		"entity.direction.y = 0",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.direction.y = 0",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,-0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
		"entity.applyForce(new Vector2d(0,+0.5))",
	]

	handler.addEventListener('DOMContentLoaded',f => {
		a.play();
	});

	// handler.onkeydown = f => {
	// 	if (f.code == "Space" && ent.isFalling === false) {
	// 		ent.applyForce(new Vector2d(0,-20));
	// 	}
	// 	if (f.code == "KeyA") {
	// 		engine.entities[0].direction.x = -10;
	// 	}
	// 	if (f.code == "KeyD") {
	// 		engine.entities[0].direction.x = 10;
	// 	}
	// }
	//
	// document.onkeyup = f => {
	// 	if (f.code == "KeyA") {
	// 		engine.entities[0].direction.x = 0;
	// 	}
	// 	if (f.code == "KeyD") {
	// 		engine.entities[0].direction.x = 0;
	// 	}
	// }
});
