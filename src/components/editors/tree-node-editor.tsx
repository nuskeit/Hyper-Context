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

	const handleChangeNode = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

		const o = { ...editingNode?.target }
		console.log("HANDLE CHANGE STYLE", field, e.target.value, (o as any)[field]);

	}

	async function dispatchAsync(o: any) {
		bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: o } })
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
				<div className="input-group">
					<div>name:</div><div><input type="text" value={localEditingNode?.name || ""} onChange={(e) => handleChangeNode("name", e)} /></div>
				</div>
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
