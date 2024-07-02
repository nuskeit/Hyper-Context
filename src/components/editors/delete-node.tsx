import { useState } from "react"
import useBookStateContext from "../../contexts/use-book-context"
import useNodeEditorContext from "../../contexts/use-node-editor-context"
import { ActionType } from "../../custom-hooks/use-book-state"
import "./editors.scss"

export default function () {
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [book, bookDispatch] = useBookStateContext()

	const [confirm, setConfirm] = useState(false)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//		setEditingNode({ ...editingNode, target: { ...editingNode.target, card: { ...editingNode.target.card, name: createStyled<string> (e.target.value,e.target.style) } } })
	}

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		bookDispatch({ type: ActionType.UPDATE_NODE, payload: editingNode })
	}

	return (
		<div className="editor">
			<div>Node Editor</div>
			<div>
				<input type="text" value={editingNode?.target.name || ""} onChange={handleChange} />
				<button onClick={handleClick} />
			</div>

		</div>
	)
}
