import { useEffect, useState } from "react";
import usePositionedTimeline from "../../custom-hooks/auto-arrange/use-positioned-timeline";
import { I_Timeline, NodeKey } from "../../types/types";
import TimelineRuler from "../timeline-ruler.cpt";
import NodeCpt from "./node.cpt";

function TimelineCpt({
	minY,
	node,
	showChildrenHandler,
	showChildrenKey
}: {
	minY: number,
	node: I_Timeline
	showChildrenHandler: Function
	showChildrenKey: NodeKey
}) {

	const [isLoading, setIsLoading] = useState(true)
	const [group, positionedTimeline, positionedChildren] = usePositionedTimeline(node as I_Timeline)

	const childrenJSX = () => {
		console.log('showChildrenKey', showChildrenKey);
		return positionedChildren.map((positionedNode, i) => {
			return <NodeCpt key={i}
				minY={minY}
				node={positionedNode}
				showChildrenHandler={showChildrenHandler}
				showChildren={showChildrenKey === positionedNode.key}
			/>

		})
	}

	useEffect(() => {
		setIsLoading(false)
	}, [])

	if (isLoading) return <></>
	return (
		<g className="timeline-node">

			<g transform={`translate(${group.groupLayout.value.x}, ${group.groupLayout.value.y})`}>

				<rect x={0} y={0}
					className="timeline-node-base"
					style={{ fill: "#00f5" }}
					width={group.groupLayout.value.width}
					height={group.groupLayout.value.height}
					rx="9" ry="9" />

			</g>

			<TimelineRuler positionedNode={positionedTimeline} children={positionedChildren} group={group} />

			{childrenJSX()}
		</g>
	)
}

export default TimelineCpt
