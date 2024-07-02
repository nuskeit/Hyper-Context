import { useEffect, useRef, useState } from "react";
import useWindowControls from "../../custom-hooks/use-window-controls";
import EditModeButton from "../buttons/edit-mode-button.cpt";
import './board.scss';
import GroupCpt from "./group.cpt";

export default function () {
	const svgRef = useRef(null)
	const [viewBoxZoomPan, scrollAction, zoomAction, austoAdjustViewBox] = useWindowControls()

	function handleScrolling(event: WheelEvent) {
		event.stopPropagation()
		if (event.altKey)
			zoomAction(-event.deltaY)
		else
			scrollAction(event.deltaY)
	}


	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		requestAnimationFrame(() => setIsLoading(false))
	}, [])

	if (isLoading) {
		return <></>
	}
	const vb = viewBoxZoomPan()
	return (
		<>
			<div className="board" style={{
				backgroundPositionX: `50%`,
				backgroundPositionY: `${-vb[1]}px`,
				backgroundSize: `${200000 / vb[2]}% ${200000 / vb[2]}%`
			}}>
				{JSON.stringify(vb)}
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="board" ref={svgRef}
					viewBox={vb.join()} style={{ backgroundSize: `${2000000 / vb[2]}px`, backgroundPosition: `center ${viewBoxZoomPan()[1] / -5}px` }}
					preserveAspectRatio="xMinYMin slice"
					onWheel={(handleScrolling as any)}
				>
					<defs>
						<linearGradient id="header-shape-gradient" x2="0.35" y2="1">
							<stop offset="0%" stopColor="var(--color-stop)" />
							<stop offset="30%" stopColor="var(--color-stop)" />
							<stop offset="100%" stopColor="var(--color-bot)" />
						</linearGradient>
					</defs>


					<GroupCpt
						minY={150}
						groupParentKey={"root"}
					/>

				</svg>
				<EditModeButton />
			</div>
		</>
	)
}