import { useEffect, useState } from "react"
import { createNodeGroup, createPositionedElement } from "../types/factory"
import { I_TreeNode, I_NodeGroup, I_Positioned, NodeKey } from "../types/types"
import useNodeChildren from "./use-node-children"
import useGlobalOptions from "./useGlobalOptions"

export default function usePositionedNode(nodeKey: NodeKey, prevGroup: I_NodeGroup) {

	const [node, nodeChildren] = useNodeChildren(nodeKey)
	const globalOptions = useGlobalOptions()

	const [positionedChildren, setPositionedChildren] = useState<I_Positioned<I_TreeNode>[]>([])
	const [childrensGroup, setChildrensGroup] = useState(createNodeGroup(undefined))

	useEffect(() => {
		if (nodeChildren.length > 0) {

			let childrensGroupWidth = globalOptions.node.spacingX * (nodeChildren.length - 1)
			let childrensGroupHeight = 0

			// If tha only member is offset, offset the entire group
			let minChildrensYPosition = Number.MAX_SAFE_INTEGER
			nodeChildren.forEach(ch => {
				// Prevent node's negative y offset
				const y = Math.max(ch.y, 0)
				minChildrensYPosition = Math.min(minChildrensYPosition, y)
				childrensGroupWidth += ch.width
				childrensGroupHeight = Math.max(childrensGroupHeight, y + ch.height)
			})

			setChildrensGroup(createNodeGroup({
				width: childrensGroupWidth,
				height: childrensGroupHeight - minChildrensYPosition,
				x: -childrensGroupWidth / 2,
				y: prevGroup.y + prevGroup.height + globalOptions.group.spacingY + minChildrensYPosition,
			}))

			let prevX = 0

			setPositionedChildren(nodeChildren.map(n => {

				const newNode = createPositionedElement<I_TreeNode>(n, {
					x: prevX - childrensGroupWidth / 2,
					y: prevGroup.y + prevGroup.height + Math.max(n.y, 0) + globalOptions.group.spacingY,
					width: n.width,
					height: n.height
				})

				prevX += n.width + globalOptions.node.spacingX
				return newNode
			}))
		}
	}, [nodeChildren, prevGroup])

	return [node, childrensGroup, positionedChildren] as const
}