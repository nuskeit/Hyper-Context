import useNodeEditorContext from "../../contexts/use-node-editor-context"
import { ActionType } from "../../custom-hooks/use-book-state"
import useBookStateContext from "../../contexts/use-book-context"
import "./editors.scss"
import { Editable, I_TreeNode } from "../../types/types"
import StyleEditor from "./style-editor/style-editor"
import { createStyled } from "../../types/factory"

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

		setEditingNode({ ...editingNode, target: { ...editingNode.target, card: { ...editingNode.target.card, name: e.target } } })

	}

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		console.log("HANDLE CLICK", editingNode.target);

		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: editingNode.target } })
		setEditingNode(undefined)

	}

	function styleChange(s: any) {
		console.log('VALUE CHANGE ON STYLE', s);
	}

	return (
		<>
			<div className="title">"{editingNode.target.card.name.value}" Style Editor</div>
			<div className="form-grid">
				<div>
					<h1>Probably should delete this entire control🤔</h1>
					{/* <StyleEditor editingStyle={{}} styleChange={styleChange} /> */}
				</div>
			</div>
			<div className="form-controls">
				<button onClick={handleClick}>SAVE</button>
			</div>

		</>
	)
}
