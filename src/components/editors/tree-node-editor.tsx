import useNodeEditorContext from "../../contexts/use-node-editor-context"
import { ActionType } from "../../custom-hooks/use-book-state"
import useBookStateContext from "../../contexts/use-book-context"
import "./editors.scss"
import { Editable, I_TreeNode } from "types/types"

export default function () {
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [book, bookDispatch] = useBookStateContext()

	const handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log("HANDLE CHANGE", field);
		const o: Editable<I_TreeNode> = { ...editingNode, target: { ...editingNode.target } }
		// @ts-ignore
		o.target[field] = e.target.value
		setEditingNode(o)


		// switch (field) {
		// 	case "name":

		// 		setEditingNode({ ...editingNode, target: { ...editingNode.target, name: e.target.value } })
		// 		break;

		// 	default:
		// 		break;
		// }
	}

	function handleChange_(e: React.ChangeEvent<HTMLInputElement>) {
		console.log("HANDLE CHANGE");

		setEditingNode({ ...editingNode, target: { ...editingNode.target, card: { ...editingNode.target.card, name: e.target.value } } })

	}

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		console.log("HANDLE CLICK", editingNode.target);

		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: editingNode.target } })
		setEditingNode(undefined)

	}

	return (
		<>
			<div className="title">Node Editor</div>
			<div className="form-grid">
				{/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
				<div className="input-group">
					<div>name:</div><div><input type="text" value={editingNode?.target.card.name || ""} onChange={(e) => handleChange("name", e)} /></div>
				</div>

				<div className="input-group">
					<div>shortText:</div>
					{/* <div><input type="text" value={editingNode?.target.shortText || ""} onChange={(e) => handleChange("shortText", e)} /></div> */}
					<div><textarea value={editingNode?.target.card.shortText || ""} onChange={(e) => handleChange("shortText", e)} /></div>
				</div>

				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={editingNode?.target.card.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div>
			</div>
			<div className="form-controls">
				<button onClick={handleClick}>SAVE</button>
			</div>

		</>
	)
}
