import { useEffect, useState } from "react"
import { createNodeGroup, createPositionedElement } from "../types/factory"
import { I_Node, I_NodeGroup, I_Positioned, NodeKey } from "../types/types"
import useNodeChildren from "./use-node-children"
import useGlobalOptions from "./useGlobalOptions"

export default function usePositionedNode(nodeKey: NodeKey, group: I_NodeGroup) {

	const [node, nodeChildren] = useNodeChildren(nodeKey)
	const globalOptions = useGlobalOptions()

	const [positionedChildren, setPositionedChildren] = useState<I_Positioned<I_Node>[]>([])
	const [childrensGroup, setChildrensGroup] = useState(createNodeGroup(undefined))

	useEffect(() => {
		if (nodeChildren.length > 0) {
			let childrensGroupWidth = nodeChildren.map(n => n.width).reduce((acc, val) => acc + val, 0) + globalOptions.node.spacingX * (nodeChildren.length - 1)
			let childrensGroupHeight = Math.max(0, ...nodeChildren.map(n => n.y + n.height)) //+ globalOptions.group.spacingY

			setChildrensGroup(createNodeGroup({
				width: childrensGroupWidth,
				height: childrensGroupHeight,
				x: -childrensGroupWidth / 2,
				y: group.y + group.height + globalOptions.group.spacingY,
			}))

			let prevX = 0

			setPositionedChildren(nodeChildren.map(n => {

				const newNode = createPositionedElement<I_Node>(n, {
					x: prevX - childrensGroupWidth / 2,
					y: group.y + group.height + n.y + globalOptions.group.spacingY,
					width: n.width,
					height: n.height
				})

				prevX += n.width + globalOptions.node.spacingX
				return newNode
			}))
		}
	}, [nodeChildren, group])

	return [node, childrensGroup, positionedChildren] as const
}