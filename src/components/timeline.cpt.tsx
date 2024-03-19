import React, { useEffect, useState } from "react";
import useNodeChildren from "../custom-hooks/use-node-children";
import usePositionedTimeline from "../custom-hooks/usePositionedTimeline";
import { I_NodeGroup, I_Vector2, NodeKey, I_TimedNode, I_Timeline, I_TreeNode } from "../types/types";
import NodeCpt from "./node.cpt";
import TimelineRuler from "./timeline-ruler.cpt";

function TimelineCpt({
	group,
	nodeKey,
	position,
	onClick,
	showChildren,
	changeViewBoxDelegate
}: {
	group: I_NodeGroup,
	nodeKey: NodeKey,
	position: { x: number, y: number, height: number, width: number },
	onClick: Function,
	showChildren: boolean,
	changeViewBoxDelegate: Function
}) {

	const [isLoading, setIsLoading] = useState(true)
	const [selectedChild, setSelectedChild] = useState<I_TimedNode | undefined>()
	const [node, children] = useNodeChildren(nodeKey)
	const [positionedGroup, positionedTimeline, positionedChildren] = usePositionedTimeline(node as I_Timeline, children as I_TimedNode[], group, position)
	/* DEBUG */
	// useEffect(() => {
	// 	// if (timeline.children.length == 1)
	// 	// childrenClickHandler(timeline.children[5])
	// 	setSelectedChild(timeline.children[0])
	// }, [timeline])

	const childrenClickHandler = (n: I_TimedNode) => {
		if (showChildren && selectedChild?.key === n.key) {
			setSelectedChild(undefined)
		} else {
			setSelectedChild(n)
		}
		if (!showChildren)
			onClick(node as I_Timeline, "TIMELINE")
	}

	const childrenJSX = () => {
		return positionedChildren.map((positionedNode, i) => {
			return <NodeCpt group={{ ...positionedGroup, height: group.height + positionedGroup.margin.bottom }}
				nodeKey={positionedNode.element.key}
				position={positionedNode}
				onClick={childrenClickHandler}
				showChildren={showChildren && (selectedChild?.key == positionedNode.element.key)}
				changeViewBoxDelegate={changeViewBoxDelegate}
				key={i} />
		})

	}

	useEffect(() => {

		setIsLoading(false)
	}, [])

	if (isLoading) return <></>
	return (
		<>
			<g className="timeline-node">

				<g transform={`translate(${positionedGroup.x}, ${positionedGroup.y})`}>

					<rect x={-30} y={-30} className="timeline-node-base"
						width={positionedGroup.width + 60} height={positionedGroup.height + 60} rx="9" ry="9" />

					<text x="0" y="-10" fontSize={40}>{positionedTimeline.element.card.name.value}</text>
				</g>

				<TimelineRuler positionedNode={positionedTimeline} children={positionedChildren} group={positionedGroup} />

			</g>

			{childrenJSX()}

		</>
	)
}

export default React.memo(TimelineCpt, (prev, next) => {
	return prev.group === next.group && prev.nodeKey === next.nodeKey
})
