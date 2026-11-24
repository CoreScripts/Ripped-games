"use strict";

// Construct's Mouse plugin only accepts pointer events reported as a mouse.
// This converts touch pointer events into mouse-type pointer events on the canvas.
(() => {
	if (!window.PointerEvent) return;

	// Stop the browser from taking over touches for scrolling/zooming,
	// which would fire pointercancel and cut the press short.
	const style = document.createElement("style");
	style.textContent = "html, body, canvas { touch-action: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }";
	(document.head || document.documentElement).appendChild(style);

	const MOUSE_ID = 1;   // a real mouse is always pointer 1
	let activeId = null;  // the one finger that drives the "mouse"

	function getCanvas() {
		return document.querySelector("canvas");
	}

	function emit(type, event, buttons) {
		const canvas = getCanvas();
		if (!canvas) return;

		canvas.dispatchEvent(new PointerEvent(type, {
			bubbles: true,
			pointerId: MOUSE_ID,
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

	function swallow(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	document.addEventListener("pointerdown", event => {
		if (event.pointerType !== "touch") return;
		swallow(event);
		// Ignore extra fingers, but let a new first touch take over a stale one
		if (activeId !== null && !event.isPrimary) return;
		activeId = event.pointerId;
		emit("pointermove", event, 0);  // put the cursor under the finger first
		emit("pointerdown", event, 1);
	}, true);

	document.addEventListener("pointermove", event => {
		if (event.pointerType !== "touch") return;
		swallow(event);
		if (event.pointerId !== activeId) return;
		emit("pointermove", event, 1);
	}, true);

	function release(event) {
		if (event.pointerType !== "touch") return;
		swallow(event);
		if (event.pointerId !== activeId) return;
		activeId = null;
		emit("pointerup", event, 0);
	}
	document.addEventListener("pointerup", release, true);
	document.addEventListener("pointercancel", release, true);

	// Don't leave a finger "stuck" if the page loses focus mid-touch
	window.addEventListener("blur", () => { activeId = null; });
})();
