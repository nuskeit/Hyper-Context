import { useEffect, useState } from "react"
import { createMargin, createNodeGroup, createRect } from "../../types/factory-from-data"
import { I_Margin, I_NodeGroup, I_Rect, I_TreeNode, NodeKey, NodeType } from "../../types/types"
import { ifExists } from "../../util/util"
import useChildren from "../use-children"
import useGlobalOptions from "../use-global-options"
import useGroup from "../use-group"

export default function usePositionedNodeChildren(nodeKey: NodeKey, minY: number = 0) {

	const globalOptions = useGlobalOptions()

	const [nodeChildren] = useChildren<I_TreeNode>(nodeKey)
	const [nodeGroup] = useGroup(nodeKey)

	const [childrensGroup, setChildrensGroup] = useState<I_NodeGroup>()
	const [positionedChildren, setPositionedChildren] = useState<I_TreeNode[]>([])

	const [nextMinY, setNextMinY] = useState(minY || 0)

	const getMargin = (nodeType: NodeType | undefined) => {
		if (nodeType !== undefined && nodeType === NodeType.TIMELINE)
			return ifExists<I_Margin>(ifExists<any>(globalOptions, "timeline", undefined), "margin", createMargin())
		else
			return ifExists<I_Margin>(ifExists<any>(globalOptions, "node", undefined), "margin", createMargin())
	}

	useEffect(() => {
		if (nodeGroup !== undefined && nodeChildren !== undefined && nodeChildren.length > 0) {
			// Add only the spaces between nodes
			const nodeMargin = getMargin(nodeChildren.find(e => e.nodeType === NodeType.TIMELINE)?.nodeType)

			const nodeSpacingX = ifExists<number>(ifExists<any>(globalOptions,
				"node", undefined),
				"spacingX", 0)
				+ nodeMargin.left
				+ nodeMargin.right

			const groupSpacingY = ifExists<number>(ifExists<any>(globalOptions,
				"group", undefined),
				"spacingY", 0)
				+ nodeMargin.top
				+ nodeMargin.bottom

			let childrensGroupWidth = nodeSpacingX * (nodeChildren.length - 1)
			let childrensGroupHeight = 0

			// If tha only member is offset, offset the entire group
			let minChildrensYPosition = Number.MAX_SAFE_INTEGER
			nodeChildren.forEach(ch => {

				const chMargin = ifExists<any>(ch.nodeLayout.value, "margin", nodeMargin)
				// Prevent node's negative y offset
				const y = Math.max(ch.nodeLayout.value.y, 0)
				minChildrensYPosition = Math.min(minChildrensYPosition, y)
				childrensGroupWidth += ch.nodeLayout.value.width + chMargin.left + chMargin.right
				childrensGroupHeight = Math.max(childrensGroupHeight, y + ch.nodeLayout.value.height + chMargin.top + chMargin.bottom)
			})



			//------------------------------------------------------------------


			let prevX = -childrensGroupWidth / 2

			setPositionedChildren(nodeChildren.map(n => {
				const chMargin = ifExists<any>(n.nodeLayout.value, "margin", nodeMargin)

				const x = prevX + n.nodeLayout.value.width / 2
					+ chMargin.left
				const y = Math.max(n.nodeLayout.value.y, 0)
					+ groupSpacingY
					+ chMargin.top
					+ minY

				const newNode = {
					...n, nodeLayout: {
						...n.nodeLayout, value: {
							...n.nodeLayout.value, ...{
								x,
								y,
								width: n.nodeLayout.value.width,
								height: n.nodeLayout.value.height
							}
						}
					}
				}


				prevX += n.nodeLayout.value.width + nodeSpacingX + chMargin.left + chMargin.right
				return newNode
			}))



			//------------------------------------------------------------------


			// Group padding
			let paddingOri = ifExists<I_Margin>(globalOptions.group, "defaultPadding", createMargin())

			// Combine the specific group padding with the default padding
			const padding = {
				left: nodeGroup.groupLayout.value.padding.left || paddingOri.left,
				right: nodeGroup.groupLayout.value.padding.right || paddingOri.right,
				top: nodeGroup.groupLayout.value.padding.top || paddingOri.top,
				bottom: nodeGroup.groupLayout.value.padding.bottom || paddingOri.bottom
			}


			//Set the group Y position to the result of the contenst height

			const groupX = -childrensGroupWidth / 2
			const groupY = nodeGroup.groupLayout.value.y
				+ groupSpacingY
				+ minChildrensYPosition
				+ minY
			const groupWidth = childrensGroupWidth
			const groupHeight = childrensGroupHeight - minChildrensYPosition

			setNextMinY(groupY + groupHeight + padding.bottom)

			const groupRect = applyPadding({
				width: groupWidth,
				height: groupHeight,
				x: groupX,
				y: groupY,
			}, padding)

			setChildrensGroup(createNodeGroup(
				{
					groupLayout: {
						value: groupRect
					}
				}))

		}
	}, [nodeChildren, nodeGroup, globalOptions])


	function applyPadding(g: I_Rect | undefined, padding: I_Margin): I_Rect {
		if (g === undefined) return createRect()
		return {
			x: g.x - padding.left,
			y: g.y - padding.top,
			width: g.width + padding.left + padding.right,
			height: g.height + padding.top + padding.bottom
		}
	}




	return [childrensGroup, positionedChildren, nextMinY] as const
}