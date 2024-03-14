import { useEffect, useState } from "react";

export default function (svgAccessor: Function, updateOnlyOnAnimationFrame = false) {

	const [viewBoxTuple, setViewBoxTuple] = useState<[number, number, number, number]>([-1000, 0, 2000, 2000])
	const [viewBox, setViewBox] = useState("-1000,0,2000,2000")
	const [scrollPos, setScrollPos] = useState(0)
	const [zoomLevel, setZoomLevel] = useState(1)

	const changeOriginXYWH = (x: number, y: number, w: number, h: number) => {		
		setViewBoxTuple([x, y, w, h])
		setViewBox([x, y, w, h].join())
	}

	const scrollVertical = (deltaY: number) => {
		const newYpos = Math.max(scrollPos + deltaY, 0)
		if (newYpos != scrollPos) {
			setViewBoxTuple([viewBoxTuple[0], -newYpos / 12, viewBoxTuple[2], viewBoxTuple[3]])
			setScrollPos(newYpos)
		}
	}

	const zoom = (deltaY: number) => {
		const dir = deltaY > 0 ? 1 : -1
		const level = zoomLevel + (zoomLevel / 20) * dir
		const limitedLevel = Math.min(Math.max(level, .2), 4)
		setZoomLevel(limitedLevel)
	}

	useEffect(() => {
		const b = [
			Number(viewBoxTuple[0]) * (1 / zoomLevel),
			Number(scrollPos),
			Number(viewBoxTuple[2]) * (1 / zoomLevel),
			Number(viewBoxTuple[3]) * (1 / zoomLevel)
		]
		setViewBox(b.join())

	}, [scrollPos, zoomLevel])

	return [viewBox, viewBoxTuple, changeOriginXYWH, scrollVertical, zoom, setZoomLevel] as const

}