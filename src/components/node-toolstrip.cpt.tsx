import React, { useEffect, useRef } from "react";
import { createEditableNode } from "../types/factory";
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

	const renderCount = useRef(0)


	/* DEBUG */
	useEffect(() => {
		renderCount.current++
	}, [props.node])

	return (
		<>
			<g className="node-toolstrip" transform={`translate(${props.node.width + 10} 0)`}>
				{/* <rect x={0} y={0} width={50} height={props.node.height} className="shadow-15"
					fill="#fd47" rx={6} ry={6}
					strokeWidth="3" /> */}

				<g onClick={handleNew} className="button">
					<rect x={5} y={0} width={40}
						height={props.node.height / 3 - 5}
						className="new"
						strokeWidth="1" />
					<text transform="rotate(90)"
						x={props.node.height / 3 / 2 - 24} y="-17"
						fontSize={24} >NEW</text>
				</g>

				<g transform={`translate(${5}, ${props.node.height / 3})`}
					onClick={handleUpdate} className="button">
					<rect width={40} height={props.node.height / 3 - 5}
						className="mod"
						strokeWidth="1" />
					<text transform="rotate(90)"
						x={props.node.height / 3 / 2 - 22} y="-12"
						fontSize={24} >MOD</text>
				</g>

				<g transform={`translate(${5}, ${props.node.height / 1.5})`}
					onClick={handleDelete} className="button">
					<rect width={40} height={props.node.height / 3 - 5}
						className="del"
						strokeWidth="1" />
					<text transform="rotate(90)"
						x={props.node.height / 3 / 2 - 22} y="-12"
						fontSize={24} >DEL</text>
				</g>

			</g>
			<text x={0} y={-props.node.width - 70} transform="rotate(90)"
				fill="#000" stroke="none" fontSize={20} fontWeight="bold"
				strokeWidth="20">debug: {renderCount.current} </text>
			{/* <ActionsStripButton  action={()=>{}} image={getImgUrl("actions/full-story-open.png")} toolTip="More" /> */}
		</>
	)
}