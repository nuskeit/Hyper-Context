import { useEffect, useState } from "react"
import useBookStateContext from "../../contexts/use-book-context"
import useNodeEditorContext from "../../contexts/use-node-editor-context"
import { ActionType } from "../../custom-hooks/use-book-state"
import { I_CardItem, I_TreeNode } from "../../types/types"
import "./editors.scss"
import TextCtl from "./form-controls/text.ctl"

export default function () {
	const [editingNode, setEditingNode] = useNodeEditorContext()
	const [book, bookDispatch] = useBookStateContext()

	const [localEditingNode, setLocalEditingNode] = useState<I_TreeNode | undefined>()

	useEffect(() => {
		if (editingNode !== undefined)
			setLocalEditingNode({ ...editingNode.target })
	}, [editingNode])

	const handleChange = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log("HANDLE CHANGE", field, e.target.value);

		const o = { ...editingNode?.target }

		// @ts-ignore
		// o.card[field].value = e.target.value

		// setLocalEditingNode(o)

		// await dispatchAsync(o)


		// switch (field) {
		// 	case "name":

		// 		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, name: e.target.value } })
		// 		break;

		// 	default:
		// 		break;
		// }
	}

	const handleChangeNode = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

		const o = { ...editingNode?.target }
		console.log("HANDLE CHANGE STYLE", field, e.target.value, (o as any)[field]);

		// // @ts-ignore
		// o[field] = e.target.value

		// setLocalEditingNode(o)

		// await dispatchAsync(o)
	}

	const handleChangeStyle = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

		// const o = { ...editingNode.target, card: { ...editingNode.target.card, background: { ...editingNode.target.card.background, style: { ...editingNode.target.card.background.style } } } }
		// console.log("HANDLE CHANGE STYLE", field, e.target.value, o.card.background.style[field]);

		// // @ts-ignore
		// o.card.background.style[field] = e.target.value

		// setLocalEditingNode(o)

		// await dispatchAsync(o)
	}

	async function dispatchAsync(o: any) {
		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: o } })
	}

	function handleChange_(e: React.ChangeEvent<HTMLInputElement>) {

		//		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, card: { ...localEditingNode.card, name: {...localEditingNode.card.name, value:e.target.value} } } })
	}

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		console.log("HANDLE CLICK", localEditingNode);

		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: localEditingNode } })
		setEditingNode(undefined)

	}

	const cardItemSelector =
		(localEditingNode === undefined) ? <></> :
			<CardItemSelector cardItems={localEditingNode?.card.cardItems} />


	return (
		<>
			<div className="title">Node Editor</div>
			<div className="form-grid">
				{/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
				<div className="input-group">
					<div>name:</div><div><input type="text" value={localEditingNode?.name || ""} onChange={(e) => handleChangeNode("name", e)} /></div>
				</div>

				{/* <div className="input-group">
					<div>Title:</div>
					<div><textarea value={localEditingNode?.card.title.value || ""} onChange={(e) => handleChange("title", e)} /></div>
				</div>

				<div className="input-group">
					<div>thumbnail:</div><div><input type="text" value={localEditingNode?.card.thumbnail.value || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
				</div> */}

			</div>
			<div className="form-grid">
				{cardItemSelector}
			</div>
			<div className="form-controls-trip">
				<button onClick={handleClick}>SAVE</button>
			</div>

		</>
	)
}



function CardItemSelector(
	{
		cardItems
	}: {
		cardItems: I_CardItem[]
	}
) {
	const handleChange = (e: any) => {
		console.log('e', e.target.value);
	}

	const items = cardItems.map((styleItem, i) => {
		return (
			<div className="input-group" key={i}>
				{/* <div>{styleItem.cardItemType}:</div><div><input type="text" value={getStylePropValue( styleItem.cardItemContent.style,"sds" , "") || ""} onChange={(e) => handleChangeStyle(styleKey, e)} /></div> */}
				<div>{styleItem.cardItemType}</div>
				<div><TextCtl value={styleItem.cardItemContent.value} onChange={handleChange} /></div>
			</div>
		)
	})

	return (
		<div>
			<div>CARD ITEM SELECTOR</div>
			{items}
		</div>
	)
}




// function CardItemEditor() {



// 	return (
// 		<div>CARD ITEM EDITOR</div>
// 	)
// }
