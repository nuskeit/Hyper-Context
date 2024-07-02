import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import CardItemEditor from "../../components/editors/card-item-editor"
import { useGeneralEditorSpaceSetter } from "../../contexts/use-general-editor-space"
import useItemEditorContext from "../../contexts/use-item-editor-context"
import useSystemModeContext from "../../contexts/use-system-mode-context"
import { createEditable, createRect } from "../../types/factory-from-data"
import { EditionType, I_CardItem, I_Rect, I_Vector2 } from "../../types/types"
import { getStylePropValue, isEditMode } from "../../util/util"
import TextSvg from "../svg/text.svg"
import "./card-item.scss"
import { HighlightContour } from "./highlight-contour"

export default function CardItemCpt({
	cardItem
}: {
	cardItem: I_CardItem
}) {

	const [systemMode] = useSystemModeContext()

	const [inferedTextRect, setInferedTextRect] = useState<I_Rect>(createRect())
	const [rectangle, setRectangle] = useState<I_Rect>(createRect())
	const [textPos, setTextPos] = useState<I_Vector2>(createRect())
	const [editingCardItem, setEditingCardItem] = useItemEditorContext()

	const [localItem, setLocalItem] = useState<I_CardItem>(cardItem)
	const setEditor = useGeneralEditorSpaceSetter()

	const originalLocation = cardItem.cardItemLayout.value

	useEffect(() => {
		if (!isEditMode(systemMode)) {
			setEditingCardItem(undefined)
			setEditor(undefined)
		}
	}, [systemMode]);

	// // DEBUG: AUTOSELECTS THE FIRST ELEMENT
	// useLayoutEffect(() => {
	// 	// console.log('cardItem.key',cardItem.key,cardItem.cardItemContent.value);
	// 	if (localItem.key === "start-2") {
	// 		handleSelectItem(localItem)
	// 	}
	// }, []);

	useEffect(() => {
		// Updates the rect when the text changes
		updateBBox(inferedTextRect)
	}, [inferedTextRect]);

	function updateBBox(newBBox: I_Rect) {
		let w = localItem.cardItemLayout.value.width
		if (w == 0)
			w = newBBox.width + 50

		let h = localItem.cardItemLayout.value.height
		if (h == 0)
			h = newBBox.height

		const r = {
			x: originalLocation.x - w / 2,
			y: originalLocation.y - h / 2,
			width: w,
			height: h
		}

		const t = {
			x: getTextAnchorShift(w),
			y: (r.height / 2 - newBBox.height / 2) - newBBox.y,
		}

		setRectangle(r)
		setTextPos(t)
	}

	function handleTextChange(newBBox: I_Rect) {
		setInferedTextRect(newBBox)
	}


	const getTextAnchorShift = (textWidth: number): number => {
		const textAnchor = getStylePropValue<string>(localItem.cardItemContent.style, "textAnchor", "middle")
		if (textAnchor === "start")
			return 0
		if (textAnchor === "end")
			return textWidth
		else
			return textWidth / 2
	}


	const isSelected = () => localItem.key === editingCardItem?.target.key

	const handleMouseDown = (e: React.MouseEvent<SVGGElement>) => {
		if (isEditMode(systemMode))
			handleSelectItem(localItem)
	}

	const handleChangesMadeInEditor = (ci: I_CardItem) => {
		setLocalItem(ci)
	}

	const handleSelectItem = (ci: I_CardItem) => {
		if (ci.key === editingCardItem?.target.key) {
			setEditingCardItem(undefined)
			setEditor(undefined)
		} else {
			setEditingCardItem(createEditable<I_CardItem>(ci, EditionType.MODIFY))
			setEditor(getEditor(localItem))
		}
	}

	const getEditor = (item: I_CardItem) => <CardItemEditor cardItem={item} onChange={handleChangesMadeInEditor} />

	const textJSX = useMemo(() => {
		// updates rect when layout changes
		updateBBox(inferedTextRect)

		return (
			<TextSvg updateBBox={handleTextChange}
				text={localItem.cardItemContent.value}
				style={localItem.cardItemContent.style}
			/>
		)
	}, [localItem])

	const layoutStyle = {
		transformOrigin: `${rectangle.width / 2}px ${rectangle.height / 2}px`,
		transform: `${getStylePropValue<string>(localItem.cardItemLayout.style, "transform", "")}`
	}

	const rectangleStyle = { ...localItem.cardItemLayout.style, transform: "" }

	const editContour = () => {
		if (isSelected())
			return <>
				<HighlightContour width={rectangle.width} height={rectangle.height} margin={20} />
			</>
		return <></>
	}

	return (
		<g transform={`translate(${rectangle.x}, ${rectangle.y})`} className="card-item"
			onMouseDown={handleMouseDown}
		>
			<g style={layoutStyle}>

				<rect className="bg-rect"
					x={0}
					y={0}
					width={rectangle.width}
					height={rectangle.height}
					style={rectangleStyle}
				/>

				{/* EDIT RECT */}
				{editContour()}


				<g transform={`translate(${textPos.x}, ${textPos.y})`} >
					{textJSX}
				</g>
			</g>
		</g>
	)
}



