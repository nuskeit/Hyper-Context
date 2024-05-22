// import React, { useEffect, useRef } from "react";
// import { createEditableNode } from "../../types/factory-from-data";
// import { EditionType, I_TreeNode } from "../../types/types";
// import useNodeEditorContext from "../../contexts/use-node-editor-context"
// import "./node-toolstrip.scss"
// //import useNodeChildren from "../custom-hooks/use-node-children";

// export default function (
// 	{
// 		node
// 	}: {
// 		node: I_TreeNode
// 	}) {
// 	const [editingNode, setEditingNode] = useNodeEditorContext()

// 	//const [node, nodeChildren] = useNodeChildren(node.key)

// 	function handleNew(e: React.MouseEvent) {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.CREATE_NODE))
// 	}

// 	function handleUpdate(e: React.MouseEvent) {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE))
// 	}

// 	function handleDelete(e: React.MouseEvent) {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.DELETE_NODE))
// 	}

// 	function handleEditStyle(e: React.MouseEvent) {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE_STYLE))
// 	}

// 	const renderCount = useRef(0)


// 	/* DEBUG */
// 	useEffect(() => {
// 		// if (node.card.name.value == "Formal" && editingNode === undefined) {
// 		// 	setEditingNode(createEditableNode<I_TreeNode>(node, EditionType.MODIFY_NODE))
// 		// 	console.log('FORMAL');
// 		// }
// 		renderCount.current++
// 	}, [node])

// 	const st = {
// 		rx: "20", ry: "20",
// 		stroke: "#0008",
// 		strokeWidth: "4"
// 	}

// 	const buttonLayout={
// 		w:140,
// 		h:65,
// 		spacing:20,
// 		fontSize:60
// 	}

// 	return (
// 		<>
// 			<g className="node-toolstrip simple-shadow"
// 				transform={`translate(
// 				${node.nodeLayout.value.x + node.nodeLayout.value.width / 2 - buttonLayout.w-buttonLayout.spacing/2},
// 			 	${node.nodeLayout.value.y + node.nodeLayout.value.height - buttonLayout.h-buttonLayout.spacing/2})`}>
// 				{/* <rect x={0} y={0} width={50} height={node.height} className="shadow-15"
// 					fill="#fd47" rx={6} ry={6}
// 					strokeWidth="3" /> */}

// 				<g onClick={handleNew} className="button"  >
// 					<rect width={buttonLayout.w} height={buttonLayout.h} className="new" style={st} />
// 					<text x={10} y={50} fontSize={buttonLayout.fontSize} >NEW</text>
// 				</g>

// 				<g transform={`translate(${buttonLayout.w + buttonLayout.spacing}, 0)`}
// 					onClick={handleUpdate} className="button" >
// 					<rect width={buttonLayout.w} height={buttonLayout.h} className="mod" style={st} />
// 					<text x={10} y={50} fontSize={buttonLayout.fontSize} >MOD</text>
// 				</g>

// 				<g transform={`translate(${0}, ${buttonLayout.h + buttonLayout.spacing})`}
// 					onClick={handleDelete} className="button" >
// 					<rect width={buttonLayout.w} height={buttonLayout.h} className="del" style={st} />
// 					<text x={10} y={50} fontSize={buttonLayout.fontSize} >DEL</text>
// 				</g>

// 				<g transform={`translate(${buttonLayout.w + buttonLayout.spacing}, ${buttonLayout.h + buttonLayout.spacing})`}
// 					onClick={handleEditStyle} className="button" >
// 					<rect width={buttonLayout.w} height={buttonLayout.h} className="edit-style" style={st} />
// 					<text x={10} y={50} fontSize={buttonLayout.fontSize} >STY</text>
// 				</g>

// 			</g>
// 			<text x={0} y={-30}
// 				fill="#000" stroke="none" fontSize={20} fontWeight="bold"
// 				strokeWidth="20">render n: {renderCount.current} </text>
// 			{/* <ActionsStripButton  action={()=>{}} image={getImgUrl("actions/full-story-open.png")} toolTip="More" /> */}
// 		</>
// 	)
// }