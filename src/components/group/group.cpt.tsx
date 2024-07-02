import { useEffect, useState } from "react";
import ConnectionCpt from "../../components/connection.cpt";
import usePositionedNodeChildren from "../../custom-hooks/auto-arrange/use-positioned-node-children";
import { isTimelineNode } from "../../types/type-safety";
import { I_Timeline, I_TreeNode, NodeKey, NodeType } from "../../types/types";
import NodeCpt from "./node.cpt";
import TimelineCpt from "./timeline.cpt";

export default function GroupCpt({
	minY,
	groupParentKey,
	parentNode
}: {
	minY: number
	groupParentKey: NodeKey
	parentNode?: I_TreeNode
}) {

	const [arrangedGroup, arrangedChildrenNodes, nextMinY] = usePositionedNodeChildren(groupParentKey, minY)

	const [selectedChildKey, setSelectedChildKey] = useState<NodeKey>("")

	const [groupRect, setGroupRect] = useState(<rect width={200} height={200} fill="#000" />)

	useEffect(() => {
		if (arrangedGroup !== undefined) {
			setGroupRect(
				<rect
					x={arrangedGroup.groupLayout.value.x}
					y={arrangedGroup.groupLayout.value.y}
					width={arrangedGroup.groupLayout.value.width}
					height={arrangedGroup.groupLayout.value.height}
					className="level-group simple-shadow"
					style={{
						// @ts-ignore : linter knows nothing about SVG
						rx: "60",
						ry: "60",
						strokeWidth: "4",
						stroke: "#2222",
						fill: "#af02"
					}}
				/>
			)

		}
	}, [arrangedGroup]);

	const showChildrenHandler = (k: NodeKey) => {
		if (selectedChildKey === k) {
			setSelectedChildKey("")
		} else {
			setSelectedChildKey(k)
		}
	}

	const children_r = () => {

		return arrangedChildrenNodes.map((n, i) => {
			if (isTimelineNode(n))

				return (
					<TimelineCpt key={i}
						minY={nextMinY}
						node={n as I_Timeline}
						showChildrenHandler={showChildrenHandler}
						showChildrenKey={selectedChildKey}
					/>
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
	}


	const connections = parentNode?.key !== undefined && arrangedChildrenNodes.map((e, i) => {
		let el1 = { ...parentNode?.nodeLayout.value }
		if (parentNode.nodeType === NodeType.TIMED)
			el1.x = parentNode?.nodeLayout.value.x + parentNode?.nodeLayout.value.width / 2
		return <ConnectionCpt
			el1={el1}
			el2={e}
			key={i} />
	})

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