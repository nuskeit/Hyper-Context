import { useCallback, useEffect, useState } from "react";
import ConnectionCpt from "../../components/connection.cpt";
import usePositionedNodeChildren from "../../custom-hooks/auto-arrange/use-positioned-node-children";
import { createPosition } from "../../types/factory-from-data";
import { isTimedNode, isTimelineNode } from "../../types/type-safety";
import { I_Timeline, I_TreeNode, NodeKey, NodeType } from "../../types/types";
import NodeCpt from "./node.cpt";
import TimelineCpt from "./timeline.cpt";

export default function GroupCpt({
	minY,
	groupParentKey,
	parentNode
	// children
}: {
	minY: number
	groupParentKey: NodeKey
	parentNode?: I_TreeNode
	// children: ReactElement<any, string | JSXElementConstructor<any>>[]
}) {
	const [arrangedGroup, arrangedChildrenNodes, nextMinY] = usePositionedNodeChildren(groupParentKey, minY)

	const [selectedChildKey, setSelectedChildKey] = useState<NodeKey>("")

	const [groupRect, setGroupRect] = useState(<rect width={200} height={200} fill="#000" />)

	useEffect(() => {
		if (arrangedGroup !== undefined) {
			// const [ch, g, groupRect] = autoArrangeChildren(nodeGroup, childrenNodes)
			// setArrangedGroup(g)
			// setArrangedChildrenNodes(ch)
			// setArrangedGroup(nodeGroup)
			// setArrangedChildrenNodes(childrenNodes)

			setGroupRect(
				<rect
					x={arrangedGroup.groupLayout.value.x}
					y={arrangedGroup.groupLayout.value.y}
					width={arrangedGroup.groupLayout.value.width}
					height={arrangedGroup.groupLayout.value.height}
					className="level-group simple-shadow"
					style={{
						// @ts-ignore 
						rx: "60",
						ry: "60",
						strokeWidth: "4",
						stroke: "#222",
						fill: "#af05"
					}}
				/>
			)

		}
	}, [arrangedGroup]);

	const showChildrenHandler = (k: NodeKey) => {
		console.log('GROUP - showChildrenHandler', k);
		if (selectedChildKey === k) {
			setSelectedChildKey("")
		} else {
			setSelectedChildKey(k)
		}
	}

	const children_r = useCallback(() => {

		return arrangedChildrenNodes.map((n, i) => {
			if (isTimelineNode(n))
				//		return <text x="-1500" y="500" fontSize="200">TIMELINE</text>

				return (
					<TimelineCpt key={i}
						minY={nextMinY}
						node={n as I_Timeline}
						showChildrenHandler={showChildrenHandler}
						showChildrenKey={selectedChildKey}
					/>
					// <TimelineCpt key={i}
					// 	minY={nextMinY}
					// 	positionedNode={n}
					// 	showChildrenHandler={ ()=>{}}
					// 	showChildren={showChildren(n.key)}
					// />
				)
			else
				return (<g key={i}>
					<NodeCpt key={i}
						minY={nextMinY}
						node={n}
						showChildrenHandler={showChildrenHandler}
						showChildren={showChildren(n.key)}
					/>
				</g>
				)
		})
	}, [arrangedChildrenNodes, selectedChildKey]);


	const connections = parentNode?.key !== undefined && arrangedChildrenNodes.map((e, i) => {
		// if (!isTimedNode(e)) //PROPABLY SHOULD'T BE HERE // neither this comment, I know, shut up
		let el1 = { ...parentNode?.nodeLayout.value }
		if (parentNode.nodeType === NodeType.TIMED)
			el1.x = parentNode?.nodeLayout.value.x + parentNode?.nodeLayout.value.width / 2
		return <ConnectionCpt
			el1={el1}
			el2={e}
			key={i} />
	})

	// const showChildren = (key: NodeKey) => { return true }
	const showChildren = (key: NodeKey) => { return selectedChildKey === key }

	if (arrangedGroup === undefined)
		return <></>
	return <>
		{groupRect}
		{children_r()}
		<g className={"connections"} >
			{connections}
		</g>
	</>

}