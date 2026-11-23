"use strict";

// Construct's Mouse plugin only accepts pointer events reported as a mouse.
(() => {
	if (!window.PointerEvent) return;

	function getCanvas() {
		return document.querySelector("canvas");
	}

	function emit(type, event, buttons) {
		const canvas = getCanvas();
		if (!canvas) return;

		canvas.dispatchEvent(new PointerEvent(type, {
			bubbles: true,
			pointerId: event.pointerId,
			pointerType: "mouse",
			isPrimary: true,
			button: type === "pointerdown" || type === "pointerup" ? 0 : -1,
			buttons,
			clientX: event.clientX,
			clientY: event.clientY,
			pageX: event.pageX,
			pageY: event.pageY,
			screenX: event.screenX,
			screenY: event.screenY,
			pressure: buttons ? 0.5 : 0
		}));
	}

	document.addEventListener("pointerdown", event => {
		if (event.pointerType !== "touch") return;
		event.preventDefault();
		event.stopImmediatePropagation();
		emit("pointerdown", event, 1);
	}, true);
	document.addEventListener("pointermove", event => {
		if (event.pointerType !== "touch") return;
		event.preventDefault();
		event.stopImmediatePropagation();
		emit("pointermove", event, 1);
	}, true);
	document.addEventListener("pointerup", event => {
		if (event.pointerType !== "touch") return;
		event.preventDefault();
		event.stopImmediatePropagation();
		emit("pointerup", event, 0);
	}, true);
	document.addEventListener("pointercancel", event => {
		if (event.pointerType !== "touch") return;
		event.preventDefault();
		event.stopImmediatePropagation();
		emit("pointerup", event, 0);
	}, true);
})();
