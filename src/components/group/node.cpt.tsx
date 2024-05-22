import { useEffect, useRef, useState } from "react";
import useNodeEditorContext, { useEditingNode } from "../../contexts/use-node-editor-context";
import useSystemModeContext from "../../contexts/use-system-mode-context";
import { isTimedNode } from "../../types/type-safety";
import { EditionType, I_Timeline, I_TreeNode, SystemMode } from "../../types/types";
import NodeToolstripCpt from "../menus/node-toolstrip.cpt";
import GroupCpt from "./group.cpt";
import LayoutTimedNodeCpt from "./layout-timed-node.cpt";
import LayoutTreeNodeCpt from "./layout-tree-node.cpt";
import { isEditMode } from "../../util/util";
import { createEditableNode } from "../../types/factory-from-data";

function NodeCpt({
	minY,
	node,
	showChildrenHandler,
	showChildren
}: {
	minY: number,
	node: I_TreeNode
	showChildrenHandler: Function
	showChildren: boolean
}) {
	const [systemMode, setSystemMode] = useSystemModeContext()
	const [editingNode, setEditingNode] = useNodeEditorContext()

	const [isLoading, setIsLoading] = useState(true)

	const conta = useRef(0)

	const groupJSX = node !== undefined && showChildren && (
		<GroupCpt
			groupParentKey={node.key}
			minY={minY}
			parentNode={node}
		/>
	)

	const handleLocalClick = (e: any) => {
		e.stopPropagation()
		if (node.childrenGroup.children.length > 0) // To avoid showing children when there´s nothing to show
			if (systemMode === SystemMode.DEFAULT) // Only toggle "showChildren" when not in EDIT mode
				showChildrenHandler(node.key)
			else if (systemMode === SystemMode.EDIT)
				setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE))

	}

	const handleOnNewNode = (visible: boolean) => {
		if (!showChildren)
			if (visible)
				showChildrenHandler(node.key)
			else
				showChildrenHandler(undefined)
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

	const editorStrip = () => {
		if (node !== undefined && isEditMode(systemMode)) {
			return (
				<NodeToolstripCpt node={node} onNewNode={handleOnNewNode} />
			)
		} else
			return <></>
	}


	const editMode = isEditMode(systemMode)
		&& editingNode?.target.key === node.key
		&& (
			<g transform={`translate(${node.nodeLayout.value.x}, ${node.nodeLayout.value.y + node.nodeLayout.value.height / 2})`}>
				{/* <rect style={{ pointerEvents: "none" }}
					fill="#0000" stroke="#fff" strokeDasharray="25" strokeWidth={4}
					x={-node.nodeLayout.value.width / 2}
					y={-node.nodeLayout.value.height / 2}
					width={node.nodeLayout.value.width}
					height={node.nodeLayout.value.height} /> */}
				<text fontSize={50} x={-node.nodeLayout.value.width / 2} y={-node.nodeLayout.value.height / 2 - 50}>
					{node.name}
				</text>
			</g>
		)



	// return useMemo(() => {
	if (isLoading || node === undefined) return <></>
	else if (isTimedNode(node)) {
		return <>
			<LayoutTimedNodeCpt
				node={node as I_Timeline}
				handleLocalClick={handleLocalClick} >
				<g transform={`translate(0 ${-300})`} >
					{editorStrip()}
				</g>
				{groupJSX}
			</LayoutTimedNodeCpt>
		</>
	} else {
		return <>
			<LayoutTreeNodeCpt
				node={node}
				handleLocalClick={handleLocalClick}
			>
				{groupJSX}
			</LayoutTreeNodeCpt>
			{editorStrip()}
			{/* SHOW ONLY ON EDIT MODE */}
			{editMode}
			<text fontSize={150} x={250} y={500}>{conta.current++}</text>
		</>
	}
	// }, [node, positionedChildren, isLoading])

}

export default NodeCpt
