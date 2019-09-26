'use strict';

class Trigger {
	constructor(width = 0, height = 0) {
		this.width = width;
		this.height = height;
		this.enabled = true;
		this.triggered = false;
	}

	enter() {
		document.dispatchEvent(new Event('enter'));
	}

	exit() {
		document.dispatchEvent(new Event('exit'));
	}
}
