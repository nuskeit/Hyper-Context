import { useEffect, useState } from "react";
import { I_CardItem } from "../../types/types"
import "./editors.scss"
import { ColorCtl } from "./style-editor/color.ctl";
import { isNumeric } from "../../util/util";

export default function (
	{
		cardItem,
		onChange
	}: {
		cardItem: I_CardItem
		onChange: Function
	}) {
	const [localItem, setLocalItem] = useState<I_CardItem>(cardItem)


	useEffect(() => {
		setLocalItem(cardItem)
	}, [cardItem]);

	const handleChangeValue = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const o: I_CardItem = {
			...localItem
		}

		// @t s-ignore
		o["cardItemContent"]["value"] = e.target.value

		setLocalItem(o)
		onChange(o)
	}

	const handleChangeLayout = async (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const o: I_CardItem = {
			...localItem
		}
		let val = e.target.value

		if (val !== "" && !isNumeric(val))
			return

		// @ts-ignore
		o["cardItemLayout"]["value"][field] = val

		setLocalItem(o)
		onChange(o)
	}

	const handleChangeStyle = async (elementType: ElementType, field: string, value: string) => {
		const o: I_CardItem = { ...localItem }
		if (elementType === ElementType.CONTENT)
			o["cardItemContent"]["style"] = { ...o["cardItemContent"]["style"], ...JSON.parse(`{ "${field}": "${value}" }`) }
		else if (elementType === ElementType.LAYOUT)
			o["cardItemLayout"]["style"] = { ...o["cardItemLayout"]["style"], ...JSON.parse(`{ "${field}": "${value}" }`) }


		setLocalItem(o)
		onChange(o)
	}

	// async function dispatchAsync(o: any) {
	// 	bookDispatch({ type: ActionType.UPDATE_NODE, payload: { treeNode: o } })
	// }

	// async function dispatchAsync() {
	// 	editingItem?.setterDelegate(localEditingItem)
	// }

	// function handleChange_(e: React.ChangeEvent<HTMLInputElement>) {

	// 	//		setEditingNode({ ...localEditingNode, target: { ...localEditingNode, card: { ...localEditingNode.card, name: {...localEditingNode.card.name, value:e.target.value} } } })
	// }

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		console.log("HANDLE CLICK", localItem);

		// bookDispatch({ type: ActionType.UPDATE_NODE, payload: { cardItem: localEditingItem } })
		// setEditingItem(undefined)

	}

	const layoutEditorPlainText = (label: string, field: string) => {
		let element = localItem.cardItemLayout.value

		return (
			<div className="input-group">
				<div className="left-label">{label}:</div>
				<div className="editable"><input
					value={(element as any)[field] || ""}
					onChange={(e) => handleChangeLayout(field, e)}
				/></div>
			</div>
		)
	}

	const styleEditorPlainText = (elementType: ElementType, label: string, field: string) => {
		let style = localItem.cardItemContent.style
		if (elementType === ElementType.LAYOUT)
			style = localItem.cardItemLayout.style

		return (
			<div className="input-group">
				<div className="left-label">{label}:</div>
				<div className="editable"><input
					value={(style as any)[field] || ""}
					onChange={(e) => handleChangeStyle(elementType, field, e.target.value)}
				/></div>
			</div>
		)
	}

	const styleEditorColor = (elementType: ElementType, label: string, field: string) => {
		let style = localItem.cardItemContent.style
		if (elementType === ElementType.LAYOUT)
			style = localItem.cardItemLayout.style

		return (
			<div className="input-group">
				<div className="left-label">{label}:</div>
				<div className="editable">
					<ColorCtl value={(style as any)[field] || ""} setValue={(e) => handleChangeStyle(elementType, field, e)} />
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="title">Card Item Editor</div>
			<div className="form-container">
				<div className="form-grid">
					<div className="input-group input-group-no-width">
						<div className="left-label">Text:</div>
						<div className="editable"><textarea value={localItem.cardItemContent.value}
							wrap="off"
							onChange={handleChangeValue}
						/></div>
					</div>

					{layoutEditorPlainText("X", "x")}
					{layoutEditorPlainText("Y", "y")}
					{layoutEditorPlainText("Width", "width")}
					{layoutEditorPlainText("Height", "height")}

					{styleEditorPlainText(ElementType.CONTENT, "Font Size", "fontSize")}
					{styleEditorPlainText(ElementType.CONTENT, "Line Height", "lineHeight")}

					{styleEditorColor(ElementType.CONTENT, "Text Color", "fill")}


					{styleEditorPlainText(ElementType.CONTENT, "Text Border Width", "strokeWidth")}
					{/* Border Color  */}
					{styleEditorColor(ElementType.CONTENT, "Border Color", "stroke")}


					{styleEditorPlainText(ElementType.LAYOUT, "Transform", "transform")}
					{styleEditorColor(ElementType.LAYOUT, "BG Color", "fill")}

					{styleEditorPlainText(ElementType.LAYOUT, "Border Width", "strokeWidth")}
					{styleEditorColor(ElementType.LAYOUT, "Border Color", "stroke")}

					{styleEditorPlainText(ElementType.LAYOUT, "Border RX", "rx")}
					{styleEditorPlainText(ElementType.LAYOUT, "Border RY", "ry")}


				</div>
			</div>
			<div className="form-controls-trip">
				<button onClick={handleClick}>SAVE</button>
			</div>

		</>
	)
}

enum ElementType {
	CONTENT,
	LAYOUT
}

