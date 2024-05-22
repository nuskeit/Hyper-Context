import React, { useEffect, useMemo, useRef, useState } from "react";
import { createEditableNode } from "../../types/factory-from-data";
import { EditionType, I_TreeNode } from "../../types/types";
import useNodeEditorContext from "../../contexts/use-node-editor-context"
import "./node-toolstrip.scss"
import useBookStateContext from "../../contexts/use-book-context";
import { ActionType } from "../../custom-hooks/use-book-state";
import { createNodeTemplate } from "../../types/templates";
//import useNodeChildren from "../custom-hooks/use-node-children";

export default function (
	{
		node,
		onNewNode
	}: {
		node: I_TreeNode
		onNewNode: Function
	}) {
	const [book, dispatch] = useBookStateContext()
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [subMenu, setSubMenu] = useState<any>()

	//const [node, nodeChildren] = useNodeChildren(node.key)

	function handleUpdate(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		// setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE))
	}

	function handleDelete(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.DELETE_NODE))
	}

	function handleEditStyle(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE_STYLE))
	}

	function handleNew(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		if (subMenu === undefined) {
			setSubMenu(subMenuJSX)
		} else
			setSubMenu(undefined)
	}



	function handleNewNode(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()

		const newNode = createNodeTemplate()

		onNewNode(true)

		dispatch({ type: ActionType.ADD_NEW_NODE, payload: { parentKey: node.key, node: newNode } })

		setEditingNode(createEditableNode<I_TreeNode>(newNode, EditionType.MODIFY_NODE))
	}

	function handleNewTimeline(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		// setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.CREATE_NODE))
	}




	const renderCount = useRef(0)


	/* DEBUG */
	useEffect(() => {
		// if (node.card.name.value == "Formal" && editingNode === undefined) {
		// 	setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE))
		// 	console.log('FORMAL');
		// }
		renderCount.current++
	}, [node])

	const st = {
		rx: "20", ry: "20",
		stroke: "#0008",
		strokeWidth: "4"
	}

	const buttonLayout = {
		w: 140,
		h: 65,
		spacing: 20,
		fontSize: 56
	}

	const subMenuJSX = <>
		<g onClick={handleNewNode} className="button"  >
			<rect width={300} height={60} className="button new-node" />
			<text x={10} y={47} fontSize={buttonLayout.fontSize} className="button" >NODE</text>
		</g>
		<g onClick={handleNewTimeline} className="button"  >
			<rect y={80} width={300} height={60} className="button new-node" />
			<text x={10} y={127} fontSize={buttonLayout.fontSize} className="button" >TIMELINE</text>
		</g>
	</>



	// return useMemo<any>(() => (
	return (
		<>
			<g className="node-toolstrip simple-shadow"
				transform={`translate(
				${node.nodeLayout.value.x + node.nodeLayout.value.width / 2 - buttonLayout.w - buttonLayout.spacing / 2},
			 	${node.nodeLayout.value.y + node.nodeLayout.value.height  + 50})`}>
			 	{/* ${node.nodeLayout.value.y + node.nodeLayout.value.height - buttonLayout.h - buttonLayout.spacing / 2})`}> */}
				{/* <rect x={0} y={0} width={50} height={node.height} className="shadow-15"
					fill="#fd47" rx={6} ry={6}
					strokeWidth="3" /> */}

				<g onClick={handleNew} className="button"  >
					<rect width={buttonLayout.w} height={buttonLayout.h} className="button new" />
					<text x={10} y={50} fontSize={buttonLayout.fontSize} className="button">NEW</text>
				</g>

				<g transform={`translate(${buttonLayout.w + buttonLayout.spacing}, 0)`}
					onClick={handleUpdate} className="button" >
					<rect width={buttonLayout.w} height={buttonLayout.h} className="button mod" />
					<text x={10} y={50} fontSize={buttonLayout.fontSize} className="button">MOD</text>
				</g>

				<g transform={`translate(${0}, ${buttonLayout.h + buttonLayout.spacing})`}
					onClick={handleDelete} className="button" >
					<rect width={buttonLayout.w} height={buttonLayout.h} className="button del" />
					<text x={10} y={50} fontSize={buttonLayout.fontSize} className="button">DEL</text>
				</g>

				<g transform={`translate(${buttonLayout.w + buttonLayout.spacing}, ${buttonLayout.h + buttonLayout.spacing})`}
					onClick={handleEditStyle} className="button" >
					<rect width={buttonLayout.w} height={buttonLayout.h} className="button edit-style" />
					<text x={10} y={50} fontSize={buttonLayout.fontSize} className="button">STY</text>
				</g>

				<g transform={`translate(${0}, ${buttonLayout.h * 2 + buttonLayout.spacing + 50})`}>
					{subMenu}
				</g>

				{/* <text x={0} y={185}
					fill="#000" stroke="none" fontSize={40} fontWeight="bold"
					strokeWidth="20">render n: {renderCount.current++} </text> */}

				{/* <ActionsStripButton  action={()=>{}} image={getImgUrl("actions/full-story-open.png")} toolTip="More" /> */}
			</g >
		</>
	)
	// </>), [subMenu])
}



function SubMenu() {
	return (
		<>
			<text fontSize={100}>wqeeqweqweqwe</text>
		</>
	)
}
