import React, { useEffect, useState } from "react";
import useActiveFullStoryContext from "../custom-hooks/use-active-full-story-context";
import usePositionedNode from "../custom-hooks/usePositionedNode";
import { createPosition } from "../types/factory";
import { isTimedNode, isTimelineNode } from "../types/type-safety";
import { I_NodeGroup, I_Position, I_Positioned, NodeKey, NodeType, TimedNode, Timeline, TreeNode } from "../types/types";
import ConnectionCpt from "./connection.cpt";
import LayoutTimedNodeCpt from "./layout-timed-node.cpt";
import LayoutTreeNodeCpt from "./layout-tree-node.cpt";
import TimelineCpt from "./timeline.cpt";

function NodeCpt({
	group,
	nodeKey,
	position,
	onClick,
	showChildren,
	changeViewBoxDelegate
}: {
	group: I_NodeGroup,
	nodeKey: NodeKey,
	position: I_Position,
	onClick: Function,
	showChildren: boolean,
	changeViewBoxDelegate: Function
}) {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedChild, setSelectedChild] = useState<TreeNode | undefined>()
	// const [node, children] = useNodeChildren(nodeKey)
	const [node, childrensGroup, positionedChildren] = usePositionedNode(nodeKey, group)
	const [activeFullStory, setActiveFullStory] = useActiveFullStoryContext()

	// /* DEBUG */
	// useEffect(() => {
	// 	// if (node.children.length > 0 && isTimelineNode(node.children[0]))
	// 	const n = node as TreeNode
	// 	if (n.name === "Education" || n.name === "Informal" || n.name === "YouTube")
	// 		if (!showChildren)
	// 			onClick(n)
	// }, [node])

	useEffect(() => {
		changeViewBoxDelegate(group.width)
	}, [group.width])


	function childrenClickHandler(n: TreeNode) {
		if (showChildren && selectedChild?.key === n.key) {
			setSelectedChild(undefined)
		} else {
			setSelectedChild(n)
		}
	}

	const childrensGroupWithSpaceForTags =
		(positionedChildren.find(positionedNode => positionedNode.element.nodeType === NodeType.TIMELINE)) ?
			{ ...childrensGroup, height: childrensGroup.height + 130 }
			: childrensGroup

	const childrenJSX = showChildren &&
		positionedChildren.map((positionedNode, i) => {
			if (isTimelineNode(positionedNode.element)) {
				return <TimelineCpt
					group={childrensGroupWithSpaceForTags}
					nodeKey={positionedNode.element.key}
					position={positionedNode}
					onClick={childrenClickHandler}
					showChildren={selectedChild?.key == positionedNode.element.key}
					changeViewBoxDelegate={changeViewBoxDelegate}
					key={i} />
			}
			else {
				return <NodeCpt
					group={childrensGroupWithSpaceForTags}
					nodeKey={positionedNode.element.key}
					position={positionedNode}
					onClick={childrenClickHandler}
					showChildren={selectedChild?.key == positionedNode.element.key}
					changeViewBoxDelegate={changeViewBoxDelegate}
					key={i} />
			}
		})


	const connections = showChildren && positionedChildren.map((e, i) => {
		// if (!isTimedNode(e)) //PROPABLY SHOULD'T BE HERE // neither this comment, I know, shut up
		return <ConnectionCpt
			el1={createPosition({ x: position.x, y: position.y, width: position.width, height: position.height })}
			el2={e}
			key={i} />
	})

	const handleLocalClick = (e: any) => {
		e.stopPropagation()

		if (positionedChildren.length == 0) {
			if ((node as TreeNode).fullStory != undefined) {
				setActiveFullStory(node)
			}
		} else {
			setActiveFullStory(undefined)
			onClick(node)
		}
	}

	useEffect(() => {
		const fn1 = async () => {
			const fn2 = async () => {
				requestAnimationFrame(() => setIsLoading(false))
			}
			await fn2()
		}
		fn1()
	}, [])

	if (isLoading) return <></>
	if (isTimedNode(node)) {
		return <LayoutTimedNodeCpt positionedNode={{ ...position, element: node as Timeline }} group={childrensGroupWithSpaceForTags} showChildren={showChildren} handleLocalClick={handleLocalClick}
			childrenJSX={childrenJSX} children={positionedChildren as I_Positioned<TimedNode>[]} connections={connections} />
	} else {
		return <LayoutTreeNodeCpt positionedNode={{ ...position, element: node as TreeNode }} group={childrensGroupWithSpaceForTags} showChildren={showChildren} handleLocalClick={handleLocalClick}
			childrenJSX={childrenJSX} children={positionedChildren as I_Positioned<TreeNode>[]} connections={connections} />
	}
}

// export default NodeCpt

export default React.memo(NodeCpt, (prev, next) => {
	return prev.group === next.group && prev.nodeKey === next.nodeKey
})
