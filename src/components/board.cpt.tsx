import { useEffect, useRef, useState } from "react";
import useWindowControls from "../custom-hooks/use-window-controls";
import usePositionedNode from "../custom-hooks/usePositionedNode";
import { createNodeGroup } from "../types/factory-from-data";
import { isTimelineNode } from "../types/type-safety";
import { I_TreeNode } from "../types/types";
import './board.scss';
import EditModeButton from "./buttons/edit-mode-button.cpt";
import NodeCpt from "./node.cpt";

export default function () {
	const svgRef = useRef(null)
	// const [viewBox, viewBoxTuple, changeOriginXYWH, scrollAction, zoomAction, zoomLevel, setZoomLevel, austoAdjustViewBox] = useWindowResize(() => svgRef.current)
	const [viewBoxZoomPan, scrollAction, zoomAction, austoAdjustViewBox] = useWindowControls()

	const [firstNodeGroup, setFirstNodeGroup] = useState(createNodeGroup(undefined))
	const [node, positionedGroup, positionedChildren] = usePositionedNode("", firstNodeGroup)

	const clickHandler = (n: I_TreeNode) => {
		//changeOrigin(n)
	}

	function handleScrolling(event: WheelEvent) {
		// event.preventDefault()
		event.stopPropagation()
		if (event.altKey)
			zoomAction(-event.deltaY)
		else
			scrollAction(event.deltaY)
	}

	const childrenJSX = () => {
		return positionedChildren.map((positionedNode, i) => {

			if (isTimelineNode(positionedNode.element)) {
				return <></>
				// return <TimelineCpt group={{ ...positionedGroup, y: positionedGroup.y + offsetY }} timeline={positionedNode as I_Timeline} onClick={childrenClickHandler} key={i} />
			}
			else {
				return (
					<NodeCpt
						group={positionedGroup}
						nodeKey={positionedNode.element.key} onClick={clickHandler}
						position={positionedNode}
						showChildren={true} key={i}
						changeViewBoxDelegate={austoAdjustViewBox}
					/>
				)
			}

		})
	}


	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const fn1 = async () => {
			const fn2 = async () => {
				requestAnimationFrame(() => setIsLoading(false))
				// setTimeout(() => setIsLoading(false), 0)
			}
			await fn2()
		}
		fn1()
	}, [])

	if (isLoading) {
		return <></>
	}
	return (
		<>
			{/* {JSON.stringify(viewBoxZoomPan())} */}
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="board" ref={svgRef}
				viewBox={viewBoxZoomPan().join()} style={{ backgroundSize: `${2000000 / viewBoxZoomPan()[2]}px`, backgroundPosition: `center ${viewBoxZoomPan()[1] / -5}px` }}
				preserveAspectRatio="xMinYMin slice"
				onWheel={(handleScrolling as any)}
			>
				{childrenJSX()}

				{/* <AllSeingEyeCpt x={-100} y={0} open={true} blink={true} /> */}
			</svg>
			<EditModeButton />
		</>
	)
}