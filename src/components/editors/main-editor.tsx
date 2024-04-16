import useBookStateContext from "../../contexts/use-book-context"
import { useEffect, useState } from "react"
import { ActionType } from "../../custom-hooks/use-book-state"
import useNodeEditorContext from "../../contexts/use-node-editor-context"
import "./editors.scss"
import useSystemModeContext from "../../contexts/use-system-mode-context"
import { EditionType, NodeType, SystemMode } from "../../types/types"
import TreeNodeEditor from "./tree-node-editor"
import { createEditableNode } from "types/factory-from-data"
import NodeStyleEditor from "./node-style-editor"

export default function () {
	// const [book, bookDispatch] = useBookStateContext()
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [systemMode, setSystemMode] = useSystemModeContext()

	// const [name, setName] = useState("")

	// function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
	// 	setEditingNode({ ...editingNode, target: { ...editingNode.target, name: e.target.value } })
	// }

	// function handleClick(e: React.MouseEvent<HTMLElement>) {
	// 	console.log('MAIN EDITOR BUTTON CLICK');
	// 	bookDispatch({ type: ActionType.UPDATE_NODE, payload: editingNode })
	// 	// setEditingNode({ ...editingNode, name: e.target.value })
	// }

	let autoStyle = "main-editor-wrapper--close"
	if (systemMode === SystemMode.EDIT && editingNode !== undefined)
		autoStyle = "main-editor-wrapper--open"

	let editor = <></>
	if (systemMode === SystemMode.EDIT && editingNode !== undefined) {
		switch (editingNode.editionType) {
			case EditionType.CREATE_NODE:
				editor = <>CREATE NODE</>
				break
			case EditionType.MODIFY_NODE:
				editor = < TreeNodeEditor />
				break
			case EditionType.DELETE_NODE:
				editor = <>DELETE NODE</>
				break
			case EditionType.MODIFY_NODE_STYLE:
				editor = < NodeStyleEditor />
				break
			default:
				editor = <> NONE </>
		}
	}

	return (
		<div className={`main-editor-wrapper ${autoStyle}`}>
			{editor}
		</div>
	)



	// if (systemMode === SystemMode.EDIT && editingNode !== undefined)
	// 	switch (editingNode.target.nodeType) {
	// 		case NodeType.NODE:
	// 			return (
	// 				<div className="main-editor-wrapper">
	// 					<TreeNodeEditor />
	// 				</div>
	// 			)
	// 		default:
	// 			return <> {editingNode.editionType}  NodeType: {NodeType.NODE} </>
	// 		// <TreeNodeEditor node={editingNode} updateNode={setEditingNode}/>
	// 	}

	// return <></>
}
