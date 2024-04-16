import useViewBoxContext from "../contexts/use-view-box-context";
import { ViewBox } from "../types/types";

export default function () {

	const [windowServices, setWindowServices] = useViewBoxContext()

	const changeOriginXYWH = (x: number, y: number, w: number, h: number) => {
		setWindowServices({ ...windowServices, viewBox: [x, y, w, h] })
	}

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
		const limitedLevel = Math.min(Math.max(level, .2), 4)

		setWindowServices({
			...windowServices,
			zoomLevel: limitedLevel
		})
	}

	//	let maxWidth = 0
	const austoAdjustViewBox = (newWidth: number) => {
		// console.log('AUTOADJUST SCREEN', newWidth, windowServices.viewBox);
		//		const z = async () => {
		if (newWidth > windowServices.viewBox[3]) {
			//				maxWidth = newWidth
			if (windowServices.zoomLevel < 2600 / newWidth)
				setWindowServices({ ...windowServices, zoomLevel: 2600 / newWidth })
		}

		//		}

		//		 z()

		// if (newWidth > maxWidth) {
		// 	maxWidth = newWidth
		// 	changeOriginXYWH(book.board.viewBox[0],
		// 		book.board.viewBox[1],
		// 		newWidth,
		// 		book.board.viewBox[3])
		// }
	}

	const viewBoxZoomPan = (): ViewBox => {
		const viewBox: ViewBox = [
			Math.trunc(windowServices.viewBox[0] * (1 / windowServices.zoomLevel)),
			Math.trunc(windowServices.scrollPos),
			Math.trunc(windowServices.viewBox[2] * (1 / windowServices.zoomLevel)),
			Math.trunc(windowServices.viewBox[3] * (1 / windowServices.zoomLevel))
		]
		return viewBox
	}



	return [viewBoxZoomPan, scrollAction, zoomAction, austoAdjustViewBox] as const

}


