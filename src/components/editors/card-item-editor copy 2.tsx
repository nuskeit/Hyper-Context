// import { useEffect, useState } from "react"
// import useBookStateContext from "../../contexts/use-book-context"
// import useItemEditorContext from "../../contexts/use-item-editor-context"
// import { ActionType } from "../../custom-hooks/use-book-state"
// import { I_Card, I_CardItem } from "../../types/types"
// import "./editors.scss"
// import TextCtl from "./form-controls/text.ctl"
// import { createCardItem } from "../../types/factory-from-data"

// export default function (
// 	{
// 		cardItem
// 	}: {
// 		cardItem?: I_CardItem
// 	}) {
// 	const [editingItem, setEditingItem] = useItemEditorContext()
// 	const [book, bookDispatch] = useBookStateContext()

// 	const [localEditingItem, setLocalEditingItem] = useState<I_CardItem>(createCardItem())

// 	useEffect(() => {
// 		if (editingItem !== undefined)
// 			setLocalEditingItem({ ...editingItem.target })
// 	}, [])
// 	// }, [editingItem])

// 	const handleChange_FINAL = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 		console.log("HANDLE CHANGE FINAL", field, e.target.value);

// 		// const o = { ...editingNode.target }

// 		// // @ts-ignore
// 		// o.card[field].value = e.target.value

// 		// setLocalEditingItem(o)

// 		// await dispatchAsync(o)


// 		// // switch (field) {
// 		// // 	case "name":

// 		// // 		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, name: e.target.value } })
// 		// // 		break;

// 		// // 	default:
// 		// // 		break;
// 		// // }
// 	}

// 	const handleChange = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 		// console.log("HANDLE CHANGE", field, e.target.value);

// 		const o: I_CardItem = {
// 			...localEditingItem
// 		}

// 		// @ts-ignore
// 		o["cardItemContent"] = [field, e.target.value]

// 		// @ts-ignore
// 		console.log(`o[${field}]`, o["cardItemContent"][field]);

// 		// setLocalEditingItem(o)
// 		editingItem?.setterDelegate(o)
// 		// await dispatchAsync(o)
// 	}

// 	const handleChangeValue = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 		// console.log("HANDLE CHANGE", field, e.target.value);

// 		const o: I_CardItem = {
// 			...localEditingItem
// 		}

// 		// @ts-ignore
// 		o["cardItemContent"] = [field, e.target.value]

// 		// @ts-ignore
// 		console.log(`o[${field}]`, o["cardItemContent"][field]);

// 		// setLocalEditingItem(o)
// 		editingItem?.setterDelegate(o)
// 		// await dispatchAsync(o)
// 	}

// 	const handleChangeStyle = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

// 		// const o = { ...editingNode.target, card: { ...editingNode.target.card, background: { ...editingNode.target.card.background, style: { ...editingNode.target.card.background.style } } } }
// 		// console.log("HANDLE CHANGE STYLE", field, e.target.value, o.card.background.style[field]);

// 		// // @ts-ignore
// 		// o.card.background.style[field] = e.target.value

// 		// setLocalEditingNode(o)

// 		// await dispatchAsync(o)
// 	}

// 	async function dispatchAsync(o: any) {
// 		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: o } })
// 	}

// 	function handleChange_(e: React.ChangeEvent<HTMLInputElement>) {

// 		//		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, card: { ...localEditingNode.card, name: {...localEditingNode.card.name, value:e.target.value} } } })
// 	}

// 	function handleClick(e: React.MouseEvent<HTMLElement>) {
// 		console.log("HANDLE CLICK", localEditingItem);

// 		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { cardItem: localEditingItem } })
// 		setEditingItem(undefined)

// 	}

// 	return (
// 		<>
// 			<div className="title">Card Item Editor</div>
// 			<div className="form-grid">
// 				{/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
// 				<div className="input-group">
// 					<div>name:</div>
// 					<div><input type="text" value={localEditingItem?.cardItemContent.value || ""} onChange={(e) => handleChangeValue(e)} /></div>
// 				</div>

// 				{/* <div className="input-group">
// 					<div>Title:</div>
// 					<div><textarea value={localEditingNode?.card.title.value || ""} onChange={(e) => handleChange("title", e)} /></div>
// 				</div>

// 				<div className="input-group">
// 					<div>thumbnail:</div><div><input type="text" value={localEditingNode?.card.thumbnail.value || ""} onChange={(e) => handleChange("thumbnail", e)} /></div>
// 				</div> */}

// 			</div>
// 			<div className="form-grid">
// 				{/* {cardItemSelector} */}
// 			</div>
// 			<div className="form-controls-trip">
// 				<button onClick={handleClick}>SAVE</button>
// 			</div>

// 		</>
// 	)
// }
