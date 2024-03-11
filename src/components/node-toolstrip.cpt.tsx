import React, { useEffect, useRef } from "react";
import { createEditableNode } from "../types/factory";
import { EditionType, TreeNode } from "../types/types";
import useNodeEditorContext from "../contexts/use-node-editor-context"
//import useNodeChildren from "../custom-hooks/use-node-children";

export default function (props: {
	node: TreeNode
}) {
	const [editingNode, setEditingNode] = useNodeEditorContext()

	//const [node, nodeChildren] = useNodeChildren(props.node.key)


	function handleNew(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.ADD))
	}

	function handleUpdate(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.UPDATE))
	}

	function handleDelete(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setEditingNode(createEditableNode(props.node, EditionType.DELETE))
	}

	const renderCount = useRef(0)


	/* DEBUG */
	useEffect(() => {
		renderCount.current++
	}, [props.node])

	return (
		<>
			<g transform={`translate(${props.node.width + 10} 0)`}>
				<rect x={0} y={0} width={50} height={props.node.height} className="shadow-15"
					fill="#fd47" rx={6} ry={6}
					strokeWidth="3" />

				<rect x={5} y={5} width={40} height={40}
					fill="#3A0" rx={6} ry={6}
					strokeWidth="1"
					onClick={handleNew} />

				<rect x={5} y={50} width={40} height={40}
					fill="#05c" rx={6} ry={6}
					strokeWidth="1"
					onClick={handleUpdate} />

				<rect x={5} y={95} width={40} height={40}
					fill="#f30" rx={6} ry={6}
					strokeWidth="1"
					onClick={handleDelete} />

			</g>
			<text x={0} y={-props.node.width - 70} transform="rotate(90)"
				fill="#000" stroke="none" fontSize={20} fontWeight="bold"
				strokeWidth="20">debug: {renderCount.current} </text>
			{/* <ActionsStripButton  action={()=>{}} image={getImgUrl("actions/full-story-open.png")} toolTip="More" /> */}
		</>
	)
}