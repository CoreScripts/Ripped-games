"use strict";

// Construct's Mouse plugin only accepts pointer events reported as a mouse.
// Touches are converted into mouse-type pointer events on the canvas.
(() => {
	if (!window.PointerEvent) return;

	// After you lift your finger, move the "mouse" off the canvas so hover
	// effects (buttons that expand) reset like a mouse leaving. Set to false
	// to leave the cursor where the finger was, like a real mouse would.
	const LEAVE_AFTER_RELEASE = true;
	const LEAVE_DELAY_MS = 80;

	const style = document.createElement("style");
	style.textContent = "html, body, canvas { touch-action: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }";
	(document.head || document.documentElement).appendChild(style);

	const MOUSE_ID = 1;   // a real mouse is always pointer 1
	let activeId = null;  // the one finger that drives the "mouse"
	let leaveTimer = 0;

	function getCanvas() {
		return document.querySelector("canvas");
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
		const t = event.changedTouches[0];
		activeId = t.identifier;
		clearTimeout(leaveTimer);
		emit("pointermove", t, 0); // cursor under the finger first (hover)
		emit("pointerdown", t, 1);
	}, { capture: true, passive: false });

	document.addEventListener("touchmove", event => {
		event.preventDefault();
		const t = findActive(event.changedTouches);
		if (t) emit("pointermove", t, 1);
	}, { capture: true, passive: false });

	function release(event) {
		event.preventDefault();
		const t = findActive(event.changedTouches);
		if (!t) return;
		activeId = null;
		emit("pointerup", t, 0);
		if (LEAVE_AFTER_RELEASE) {
			leaveTimer = setTimeout(() => {
				emit("pointermove", { clientX: -10000, clientY: -10000, pageX: -10000, pageY: -10000, screenX: -10000, screenY: -10000 }, 0);
			}, LEAVE_DELAY_MS);
		}
	}
	document.addEventListener("touchend", release, { capture: true, passive: false });
	document.addEventListener("touchcancel", release, { capture: true, passive: false });

	// Don't leave a finger "stuck" if the page loses focus mid-touch
	window.addEventListener("blur", () => { activeId = null; });
})();
