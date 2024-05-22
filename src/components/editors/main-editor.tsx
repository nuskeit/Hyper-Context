import { useMemo } from "react"
import { useGeneralEditorSpaceGetter } from "../../contexts/use-general-editor-space"
import useItemEditorContext from "../../contexts/use-item-editor-context"
import useNodeEditorContext from "../../contexts/use-node-editor-context"
import useSystemModeContext from "../../contexts/use-system-mode-context"
import { isEditMode } from "../../util/util"
import "./editors.scss"

export default function () {
	// const [book, bookDispatch] = useBookStateContext()
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [editingItem, setEditingItem] = useItemEditorContext()
	const editor = useGeneralEditorSpaceGetter()
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
	// if (isEditMode(systemMode) && editingNode !== undefined)
	if (isEditMode(systemMode) && editor !== undefined)
		autoStyle = "main-editor-wrapper--open"

	let editorJSX = useMemo(
		() => {
			// DEBUG
			return editor
			// if (isEditMode(systemMode) && editingNode !== undefined) {

			// 	if (editor!==undefined)
			// 		return editor
			// 	else
			// 		switch (editingItem?.editionType) {
			// 			case EditionType.MODIFY:
			// 				// editorJSX = editor || <></>
			// 				return <>NO EDITOR</> //< CardItemEditor />
			// 				// if (editor !== undefined)
			// 				// 	return editor
			// 				break
			// 			default:
			// 				switch (editingNode?.editionType) {
			// 					case EditionType.CREATE_NODE:
			// 						return < TreeNodeEditor />
			// 						// return <>CREATE NODE</>
			// 						break
			// 					case EditionType.MODIFY_NODE:
			// 						return < TreeNodeEditor />
			// 						break
			// 					case EditionType.DELETE_NODE:
			// 						return <>DELETE NODE</>
			// 						break
			// 					case EditionType.MODIFY_NODE_STYLE:
			// 						return < NodeStyleEditor />
			// 						break
			// 					default:
			// 						return <> NONE </>
			// 				}
			// 		}
			// }

		}, [editor])

	// if (isEditMode(systemMode) && editingNode !== undefined) {
	// 	switch (editingNode.editionType) {
	// 		case EditionType.CREATE_NODE:
	// 			editorJSX = < TreeNodeEditor />
	// 			// editorJSX = <>CREATE NODE</>
	// 			break
	// 		case EditionType.MODIFY_NODE:
	// 			editorJSX = < TreeNodeEditor />
	// 			break
	// 		case EditionType.DELETE_NODE:
	// 			editorJSX = <>DELETE NODE</>
	// 			break
	// 		case EditionType.MODIFY_NODE_STYLE:
	// 			editorJSX = < NodeStyleEditor />
	// 			break
	// 		default:
	// 			editorJSX = <> NONE </>
	// 	}
	// }

	return (
		<div className={`main-editor-wrapper ${autoStyle}`}>
			{editorJSX}
		</div>
	)



	// if (isEditMode(systemMode) && editingNode !== undefined)
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
