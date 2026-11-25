"use strict";

// Construct's Mouse plugin only accepts pointer events reported as a mouse.
// Touch -> mouse model:
//   touch down  = mouse hover
//   lift (tap)  = mouse button down + up at the lift position
//   move > DRAG_THRESHOLD = mouse drag (button held from the start position)
(() => {
	if (!window.PointerEvent) return;

	const DRAG_THRESHOLD = 12;      // px of movement before a touch counts as a drag
	const STEP_MS = 50;             // gap between hover -> down -> up on a tap
	const LEAVE_AFTER_CLICK = true; // move the "mouse" away after, so hover effects reset
	const LEAVE_DELAY_MS = 120;

	const style = document.createElement("style");
	style.textContent = "html, body, canvas { touch-action: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }";
	(document.head || document.documentElement).appendChild(style);

	const MOUSE_ID = 1;   // a real mouse is always pointer 1
	const FAR = { clientX: -10000, clientY: -10000, pageX: -10000, pageY: -10000, screenX: -10000, screenY: -10000 };

	let activeId = null;  // the one finger that drives the "mouse"
	let startPos = null;
	let dragging = false;
	let pending = [];     // delayed steps of a tap, flushed if a new touch starts

	function getCanvas() {
		return document.querySelector("canvas");
	}

	function snap(t) {
		return { clientX: t.clientX, clientY: t.clientY, pageX: t.pageX, pageY: t.pageY, screenX: t.screenX, screenY: t.screenY };
	}

	function emit(type, pos, buttons) {
		const canvas = getCanvas();
		if (!canvas) return;
		canvas.dispatchEvent(new PointerEvent(type, {
			bubbles: true,
			pointerId: MOUSE_ID,
			pointerType: "mouse",
			isPrimary: true,
			button: type === "pointerdown" || type === "pointerup" ? 0 : -1,
			buttons,
			clientX: pos.clientX,
			clientY: pos.clientY,
			pageX: pos.pageX,
			pageY: pos.pageY,
			screenX: pos.screenX,
			screenY: pos.screenY,
			pressure: buttons ? 0.5 : 0
		}));
	}

	function later(fn, ms) {
		const item = { fn };
		item.id = setTimeout(() => {
			pending = pending.filter(x => x !== item);
			fn();
		}, ms);
		pending.push(item);
	}

	// Run any unfinished steps right now, in order (so a fast second tap isn't lost)
	function flush() {
		const items = pending;
		pending = [];
		for (const item of items) {
			clearTimeout(item.id);
			item.fn();
		}
	}

	function scheduleLeave(delay) {
		if (LEAVE_AFTER_CLICK) later(() => emit("pointermove", FAR, 0), delay + LEAVE_DELAY_MS);
	}

	function findActive(touchList) {
		for (const t of touchList) {
			if (t.identifier === activeId) return t;
		}
		return null;
	}

	// Swallow the browser's own touch-type pointer events so nothing else reacts.
	for (const type of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) {
		document.addEventListener(type, event => {
			if (event.pointerType !== "touch") return;
			event.preventDefault();
			event.stopImmediatePropagation();
		}, true);
	}

	document.addEventListener("touchstart", event => {
		event.preventDefault(); // stops scrolling/zooming and the pointercancel that follows
		if (activeId !== null) return; // ignore extra fingers
		flush();
		const t = event.changedTouches[0];
		activeId = t.identifier;
		startPos = snap(t);
		dragging = false;
		emit("pointermove", startPos, 0); // hover only, no press yet
	}, { capture: true, passive: false });

	document.addEventListener("touchmove", event => {
		event.preventDefault();
		const t = findActive(event.changedTouches);
		if (!t) return;
		const p = snap(t);
		if (!dragging && Math.hypot(p.clientX - startPos.clientX, p.clientY - startPos.clientY) > DRAG_THRESHOLD) {
			dragging = true;
			emit("pointerdown", startPos, 1); // grab whatever was under the first touch
		}
		emit("pointermove", p, dragging ? 1 : 0);
	}, { capture: true, passive: false });

	function release(event) {
		event.preventDefault();
		const t = findActive(event.changedTouches);
		if (!t) return;
		activeId = null;
		const p = snap(t);

		if (dragging) {
			dragging = false;
			emit("pointerup", p, 0);
			scheduleLeave(0);
			return;
		}
		if (event.type === "touchcancel") {
			scheduleLeave(0);
			return;
		}
		// Tap: click at the lift position, with gaps so the game sees each step
		emit("pointermove", p, 0);
		later(() => emit("pointerdown", p, 1), STEP_MS);
		later(() => emit("pointerup", p, 0), STEP_MS * 2);
		scheduleLeave(STEP_MS * 2);
	}
	document.addEventListener("touchend", release, { capture: true, passive: false });
	document.addEventListener("touchcancel", release, { capture: true, passive: false });

	// Don't leave a finger "stuck" if the page loses focus mid-touch
	window.addEventListener("blur", () => {
		activeId = null;
		dragging = false;
		flush();
	});
})();
