import { useEffect, useState } from "react"
import useBookStateContext from "../../contexts/use-book-context"
import useNodeEditorContext from "../../contexts/use-node-editor-context"
import { ActionType } from "../../custom-hooks/use-book-state"
import { createStyled } from "../../types/factory"
import { Editable, I_TreeNode } from "../../types/types"
import "./editors.scss"

export default function () {
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [book, bookDispatch] = useBookStateContext()

	const [localEditingNode, setLocalEditingNode] = useState<I_TreeNode | undefined>()

	useEffect(() => {
		setLocalEditingNode({ ...editingNode.target })
	}, [editingNode])

	const handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log("HANDLE CHANGE", field, e.target.value);

		const o = { ...editingNode.target }

		// @ts-ignore
		o.card[field].value = e.target.value

		setLocalEditingNode(o)



		// switch (field) {
		// 	case "name":

		// 		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, name: e.target.value } })
		// 		break;

		// 	default:
		// 		break;
		// }
	}

	function handleChange_(e: React.ChangeEvent<HTMLInputElement>) {

		//		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, card: { ...localEditingNode.card, name: {...localEditingNode.card.name, value:e.target.value} } } })
	}

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		console.log("HANDLE CLICK", localEditingNode);

		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: localEditingNode  } })
		setEditingNode(undefined)

	}

	return (
		<>
			<div className="title">Node Editor</div>
			<div className="form-grid">
				{/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
				<div className="input-group">
					<div>name:</div><div><input type="text" value={localEditingNode?.card.name.value || ""} onChange={(e) => handleChange("name", e)} /></div>
				</div>

				<div className="input-group">
					<div>Title:</div>
					{/* <div><input type="text" value={localEditingNode?.shortText || ""} onChange={(e) => handleChange("shortText", e)} /></div> */}
					<div><textarea value={localEditingNode?.card.title.value || ""} onChange={(e) => handleChange("title", e)} /></div>
				</div>

				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={localEditingNode?.card.thumbnail.value || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
			</div>
			<div className="form-controls">
				<button onClick={handleClick}>SAVE</button>
			</div>

		</>
	)
}
