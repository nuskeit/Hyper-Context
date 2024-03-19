import React, { useEffect, useRef } from "react";
import { createEditableNode } from "../types/factory-from-data";
import { EditionType, I_TreeNode } from "../types/types";
import useNodeEditorContext from "../contexts/use-node-editor-context"
import "./node-toolstrip.scss"
//import useNodeChildren from "../custom-hooks/use-node-children";

export default function (props: {
	node: I_TreeNode
}) {
	const [editingNode, setEditingNode] = useNodeEditorContext()

	//const [node, nodeChildren] = useNodeChildren(props.node.key)


	function handleNew(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.CREATE_NODE))
	}

	function handleUpdate(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.MODIFY_NODE))
	}

	function handleDelete(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.DELETE_NODE))
	}

	function handleEditStyle(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.MODIFY_NODE_STYLE))
	}

	const renderCount = useRef(0)


	/* DEBUG */
	useEffect(() => {
		if (props.node.card.name.value == "Education" && editingNode === undefined)
			setEditingNode(createEditableNode(props.node, EditionType.MODIFY_NODE_STYLE))

		renderCount.current++
	}, [props.node])

	return (
		<>
			<g className="node-toolstrip" transform={`translate(${props.node.width / 2 - 70}, ${props.node.height / 2 - 40})`}>
				{/* <rect x={0} y={0} width={50} height={props.node.height} className="shadow-15"
					fill="#fd47" rx={6} ry={6}
					strokeWidth="3" /> */}

				<g onClick={handleNew} className="button"  >
					<rect width={70} height="40" className="new" />
					<text x="12" y="28" fontSize={24} >NEW</text>
				</g>

				<g transform={`translate(${70}, 0)`}
					onClick={handleUpdate} className="button" >
					<rect width={70} height="40" className="mod" />
					<text x="12" y="28" fontSize={24} >MOD</text>
				</g>

				<g transform={`translate(${0}, 40)`}
					onClick={handleDelete} className="button" >
					<rect width={70} height="40" className="del" />
					<text x="12" y="28" fontSize={24} >DEL</text>
				</g>

				<g transform={`translate(${70}, 40)`}
					onClick={handleEditStyle} className="button" >
					<rect width={70} height="40" className="edit-style" />
					<text x="12" y="28" fontSize={24} >STY</text>
				</g>

			</g>
			<text x={0} y={-30}
				fill="#000" stroke="none" fontSize={20} fontWeight="bold"
				strokeWidth="20">render n: {renderCount.current} </text>
			{/* <ActionsStripButton  action={()=>{}} image={getImgUrl("actions/full-story-open.png")} toolTip="More" /> */}
		</>
	)
}