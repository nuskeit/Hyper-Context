import useViewBoxContext from "../contexts/use-view-box-context";
import { ViewBox } from "../types/types";

export default function () {

	const [windowServices, setWindowServices] = useViewBoxContext()

	const scrollAction = (deltaY: number) => {
		const newYpos = Math.max(windowServices.scrollPos + deltaY, 0)
		if (newYpos != windowServices.scrollPos) {

			setWindowServices({
				...windowServices,
				scrollPos: newYpos
			})

		}
	}

	const zoomAction = (deltaY: number) => {
		const dir = deltaY > 0 ? 1 : -1
		const level = windowServices.zoomLevel + (windowServices.zoomLevel / 20) * dir
		const limitedLevel = Math.min(Math.max(level, .01), 8)

		setWindowServices({
			...windowServices,
			zoomLevel: limitedLevel
		})
	}

	const austoAdjustViewBox = (newWidth: number) => {
		if (newWidth > windowServices.viewBox[3]) {
			if (windowServices.zoomLevel < 2600 / newWidth)
				setWindowServices({ ...windowServices, zoomLevel: 2600 / newWidth })
		}
	}

	const viewBoxZoomPan = (): ViewBox => {
		const viewBox: ViewBox = [
			Math.trunc(windowServices.viewBox[0] * (1 / windowServices.zoomLevel)),
			Math.trunc(windowServices.scrollPos),
			Math.trunc(windowServices.viewBox[2] * (1 / windowServices.zoomLevel)),
			Math.trunc(windowServices.viewBox[3] * (1 / windowServices.zoomLevel))
		]
		localStorage.setItem("viewBox", viewBox.join(","))

		return viewBox
	}

	return [viewBoxZoomPan, scrollAction, zoomAction, austoAdjustViewBox] as const

}


