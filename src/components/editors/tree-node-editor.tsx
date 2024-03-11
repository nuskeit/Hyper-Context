import useNodeEditorContext from "../../contexts/use-node-editor-context"
import { ActionType } from "../../custom-hooks/use-book-state"
import useBookStateContext from "../../contexts/use-book-context"
import "./editors.scss"
import { Editable, TreeNode } from "types/types"

export default function () {
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [book, bookDispatch] = useBookStateContext()

	const handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("HANDLE CHANGE", field);
		const o: Editable<TreeNode> = { ...editingNode, target: { ...editingNode.target } }
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

		setEditingNode({ ...editingNode, target: { ...editingNode.target, name: e.target.value } })
		
	}

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		console.log("HANDLE CLICK", editingNode.target);

		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: editingNode.target } })
		setEditingNode(undefined)

	}

	return (
		<div className="editor-all">
			<div>Node Editor</div>
			<div>
				{/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
				<div>name:</div><div><input type="text" value={editingNode?.target.name || ""} onChange={(e) => handleChange("name", e)} /></div>
				<div>shortText:</div><div><input type="text" value={editingNode?.target.shortText || ""} onChange={(e) => handleChange("shortText", e)} /></div>
				<div>thumbnail:</div><div><input type="text" value={editingNode?.target.thumbnail || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				<button onClick={handleClick} />
			</div>

		</div>
	)
}
