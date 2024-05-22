import { useLayoutEffect, useMemo, useRef, useState } from "react";

export function HighlightContour({ width, height, margin }: { width: number; height: number; margin: number; }) {

	const refPath = useRef<any>();
	const [pathLength, setPathLength] = useState<string>("");
	const [visibleClass, setVisibleClass] = useState<string>("");


	useLayoutEffect(() => {
		setPathLength(refPath.current.getTotalLength());
		setVisibleClass("edit-mode-selected");
	}, [width, height, margin]);



	const f: Function[] = [scribeCircle, rndRectPlygon, rndRectPlygon2];
	const option = useMemo(() => {
		// The same contour type remains until the item selection changes
		// return Math.floor(f.length * Math.random());
		return 0;
	}, []);

	const pathData = useMemo(() => {
		return f[option](width, height, margin);
	}, [width, height, margin]);

	return (
		<path ref={refPath} className={`edit-mode ${visibleClass}`} strokeLinecap="round"
			style={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
			d={pathData} />
	);
}



// --------------------------------------------------------
function rnd(factor: number) {
	const n = Math.random() * factor
	return n - factor / 2
}

function formatNum(n: number, min?: number, max?: number): number {
	let num = n
	if (min !== undefined)
		num = Math.max(num, min)
	if (max !== undefined)
		num = Math.min(num, max)
	return Math.round(num)
}


function rndRectPlygon(w: number, h: number, margin: number = 0): string {
	w = Number(w) + margin * 2
	h = Number(h) + margin * 2
	const aspectRatio = (w / h)
	const segmentsW = 20
	const segmentsH = Math.floor(segmentsW / aspectRatio)
	const wiggleFactorW = w / segmentsW / 6
	const wiggleFactorH = h / segmentsH / 6
	const top: string[] = []
	const bottom: string[] = []
	const left: string[] = []
	const right: string[] = []
	if (w > 0 && h > 0) {
		// top left corner
		top.push(`${formatNum(rnd(wiggleFactorW) - margin)} ${formatNum(rnd(wiggleFactorH) - margin)}`)
		const lateralShift = 0
		for (let i = w / segmentsW; i < w - margin; i += w / segmentsW) {
			top.push(
				formatNum(i + rnd(wiggleFactorW * lateralShift) - margin) + " " +
				formatNum(rnd(wiggleFactorH) - margin)
			)
			bottom.push(
				formatNum(w - i + rnd(wiggleFactorW) * lateralShift - margin) + " " +
				formatNum(h + rnd(wiggleFactorH) - margin)
			)
		}

		// top right corner
		top.push(`${formatNum(rnd(wiggleFactorW) + w - margin)} ${formatNum(rnd(wiggleFactorH) - margin)}`)
		// bottom left corner
		bottom.push(`${formatNum(rnd(wiggleFactorW) - margin)}  ${formatNum(h + rnd(wiggleFactorH) - margin)}`)

		for (let j = h / segmentsH; j < h; j += h / segmentsH) {
			left.push(
				formatNum(rnd(wiggleFactorW) - margin) + " " +
				formatNum(h - j + rnd(wiggleFactorH) * lateralShift - margin)
			)
			right.push(
				formatNum(w + rnd(wiggleFactorW) - margin) + " " +
				formatNum(j + rnd(wiggleFactorH) * lateralShift - margin)
			)
		}

		// bottom right corner
		right.push(`${formatNum(w + rnd(wiggleFactorW) - margin)} ${formatNum(h + rnd(wiggleFactorH) - margin)}`)

	}

	const rectArr: string[] = [...top, ...right, ...bottom, ...left]
	const r = `M${rectArr[0]} L` + rectArr.join(", ") + " z"

	return r
}

function rndRectPlygon2(w: number, h: number, margin: number = 0): string {
	w = Number(w) + margin * 2
	h = Number(h) + margin * 2
	const aspectRatio = (w / h)
	const segmentsW = 20
	const segmentsH = Math.floor(segmentsW / aspectRatio)
	const wiggleFactorW = w / segmentsW / 6
	const wiggleFactorH = h / segmentsH / 6
	const top: string[] = []
	const bottom: string[] = []
	const left: string[] = []
	const right: string[] = []
	if (w > 0 && h > 0) {
		// top left corner
		const excess = 10
		top.push(`${formatNum(rnd(wiggleFactorW) - margin - excess)} ${formatNum(rnd(wiggleFactorH) - margin)}`)
		bottom.push(`M${formatNum(w + rnd(wiggleFactorW) - margin + excess)}  ${formatNum(h + rnd(wiggleFactorH) - margin)}`)
		const lateralShift = 0
		for (let i = w / segmentsW; i < w; i += w / segmentsW) {
			top.push(
				formatNum(i + rnd(wiggleFactorW * lateralShift) - margin) + " " +
				formatNum(rnd(wiggleFactorH) - margin)
			)
			bottom.push(
				formatNum(w - i + rnd(wiggleFactorW) * lateralShift - margin) + " " +
				formatNum(h + rnd(wiggleFactorH) - margin)
			)
		}

		top.push(`${formatNum(rnd(wiggleFactorW) + w - margin + excess)} ${formatNum(rnd(wiggleFactorH) - margin)}`)

		right.push(`M${formatNum(w + rnd(wiggleFactorW) - margin)} ${formatNum(rnd(wiggleFactorH) - margin) - excess}`)
		bottom.push(`${formatNum(rnd(wiggleFactorW) - margin)}  ${formatNum(h + rnd(wiggleFactorH) - margin)}`)

		for (let j = h / segmentsH; j <= h; j += h / segmentsH) {
			left.push(
				formatNum(rnd(wiggleFactorW) - margin) + " " +
				formatNum(h - j + rnd(wiggleFactorH) * lateralShift - margin)
			)
			right.push(
				formatNum(w + rnd(wiggleFactorW) - margin) + " " +
				formatNum(j + rnd(wiggleFactorH) * lateralShift - margin)
			)
		}

		// bottom right corner
		right.push(`${formatNum(w + rnd(wiggleFactorW) - margin)} ${formatNum(h + rnd(wiggleFactorH) - margin + excess)}`)
		bottom.push(`${formatNum(rnd(wiggleFactorW) - margin - excess)}  ${formatNum(h + rnd(wiggleFactorH) - margin)}`)
		bottom.push(`M${formatNum(rnd(wiggleFactorW) - margin)}  ${formatNum(h + rnd(wiggleFactorH) - margin + excess)}`)
		left.push(`${formatNum(rnd(wiggleFactorW) - margin)} ${formatNum(rnd(wiggleFactorH) - margin) - excess}`)

	}

	const rectArr: string[] = [...top, ...right, ...bottom, ...left]
	const r = `M${rectArr[0]} L` + rectArr.join(", ")

	return r
}

function scribeCircle(w: number, h: number, margin: number = 0): string {
	margin = Number(margin)
	w = Number(w) + margin * 2
	h = Number(h) + margin * 2

	const adjustedW = w * 0.8
	const adjustedH = h * 0.8
	const r = `M${-adjustedW * .30 + rnd(5) - margin} ${adjustedH * 1.2 - margin}, 
				Q${-adjustedW * .15 + rnd(5) - margin} ${-adjustedH * .15 + rnd(5) - margin} ${adjustedW * .15 + rnd(5) - margin} ${-adjustedH * .50 + rnd(5) - margin},
				T${adjustedW * .9 + rnd(5) - margin} ${-adjustedH * .5 + rnd(5) - margin}, 
				${adjustedW * 1.4 + rnd(5) - margin} ${adjustedH * .5 + rnd(5) - margin}, 
				${adjustedW * 1.1 + rnd(5) - margin} ${adjustedH * 1.45 + rnd(5) - margin}, 
				${adjustedW * .29 + rnd(5) - margin} ${adjustedH * 1.5 + rnd(5) - margin},
				${-adjustedW * .25 + rnd(5) - margin} ${-adjustedH * .15 + rnd(5) - margin},
				`
	// const adjustedW = w * 0.8
	// const adjustedH = h * 0.8
	// const r = `M${-adjustedW * .30 - margin} ${adjustedH * 1.2 - margin}, 
	// 		Q${-adjustedW * .15 - margin} ${-adjustedH * .15 - margin} ${adjustedW * .15 - margin} ${-adjustedH * .50 - margin},
	// 		T${adjustedW * .8 - margin} ${-adjustedH * .5 - margin}, 
	// 		${adjustedW * 1.3 - margin} ${adjustedH * .5 - margin}, 
	// 		${adjustedW * 1.1 - margin} ${adjustedH * 1.45 - margin}, 
	// 		${adjustedW * .29 - margin} ${adjustedH * 1.5 - margin},
	// 		${-adjustedW * .25 - margin} ${-adjustedH * .15 - margin},
	// 		`
	return r
}