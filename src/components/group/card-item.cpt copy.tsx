// import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
// import useSystemModeContext from "../../contexts/use-system-mode-context"
// import { createEditable, createRect } from "../../types/factory-from-data"
// import { EditionType, I_CardItem, I_Rect, I_Vector2 } from "../../types/types"
// import { getStylePropValue, ifExists, isEditMode } from "../../util/util"
// import TextSvg from "../svg/text.svg"
// import "./card-item.scss"
// import useItemEditorContext from "../../contexts/use-item-editor-context"
// import useGeneralEditorSpace, { useGeneralEditorSpaceSetter } from "../../contexts/use-general-editor-space"
// import CardItemEditor from "../../components/editors/card-item-editor"

// export default function CardItemCpt({
// 	cardItem
// }: {
// 	cardItem: I_CardItem
// }) {

// 	const [isLoading, setIsLoading] = useState(true)

// 	const [systemMode] = useSystemModeContext()

// 	const [inferedTextRect, setInferedTextRect] = useState<I_Rect>(createRect())
// 	const [rectangle, setRectangle] = useState<I_Rect>(createRect())
// 	const [textBBox, setTextBBox] = useState<I_Rect>(createRect())
// 	const [textPos, setTextPos] = useState<I_Vector2>(createRect())
// 	const [editingCardItem, setEditingCardItem] = useItemEditorContext()

// 	const [localItem, setLocalItem] = useState<I_CardItem>(cardItem)
// 	const setEditor = useGeneralEditorSpaceSetter()

// 	const originalLocation = cardItem.cardItemLayout.value

// 	useEffect(() => {
// 		if (!isEditMode(systemMode)) {
// 			// onSelect(undefined)
// 			setEditingCardItem(undefined)
// 			setEditor(undefined)
// 		}
// 	}, [systemMode]);

// 	// DEBUG
// 	useLayoutEffect(() => {
// 		// console.log('cardItem.key',cardItem.key,cardItem.cardItemContent.value);
// 		if (localItem.key === "start-2") {
// 			handleSelectItem(localItem)
// 		}
// 	}, []);

// 	useEffect(() => {
// 		// Updates the rect when the text changes
// 		updateBBox(inferedTextRect)
// 	}, [inferedTextRect]);

// 	function updateBBox(newBBox: I_Rect) {
// 		let w = localItem.cardItemLayout.value.width
// 		if (w == 0)
// 			w = newBBox.width + 50

// 		let h = localItem.cardItemLayout.value.height
// 		if (h == 0)
// 			h = newBBox.height

// 		const r = {
// 			x: originalLocation.x - w / 2,
// 			y: originalLocation.y - h / 2,
// 			width: w,
// 			height: h
// 		}

// 		const t = {
// 			x: getTextAnchorShift(w),
// 			y: (r.height / 2 - newBBox.height / 2) - newBBox.y,
// 		}

// 		setTextBBox(newBBox)
// 		setRectangle(r)
// 		setTextPos(t)
// 		setIsLoading(false)
// 	}

// 	function handleTextChange(newBBox: I_Rect) {
// 		setInferedTextRect(newBBox)
// 	}


// 	const getTextAnchorShift = (textWidth: number): number => {
// 		const textAnchor = getStylePropValue<string>(localItem.cardItemContent.style, "textAnchor", "middle")
// 		if (textAnchor === "start")
// 			return 0
// 		if (textAnchor === "end")
// 			return textWidth
// 		else
// 			return textWidth / 2
// 	}


// 	// const editModeStyle = () => isEditMode(systemMode) ? "-selected" : ""
// 	// const isSelected = () => Object.is(localItem, editingCardItem?.target) ? "-selected" : ""
// 	// const isSelected = () => localItem.key === editingCardItem?.target.key ? "-selected" : ""
// 	const isSelected = () => localItem.key === editingCardItem?.target.key


// 	const handleMouseDown = (e: React.MouseEvent<SVGGElement>) => {
// 		// e.stopPropagation()
// 		if (isEditMode(systemMode))
// 			//onSelect(localItem)
// 			handleSelectItem(localItem)
// 	}

// 	const handleChangesMadeInEditor = (ci: I_CardItem) => {
// 		setLocalItem(ci)
// 	}

// 	const handleSelectItem = (ci: I_CardItem) => {
// 		// if (Object.is(ci, editingCardItem?.target)) {
// 		if (ci.key === editingCardItem?.target.key) {
// 			setEditingCardItem(undefined)
// 			setEditor(undefined)
// 		} else {
// 			setEditingCardItem(createEditable<I_CardItem>(ci, EditionType.MODIFY))
// 			// setEditor(<CardItemEditor cardItem={localItem} onChange={handleChangesMadeInEditor} />)
// 			setEditor(getEditor(localItem))
// 		}
// 	}

// 	const getEditor = (item: I_CardItem) => <CardItemEditor cardItem={item} onChange={handleChangesMadeInEditor} />



// 	const textJSX = useMemo(() => {
// 		// updates rect when layout changes
// 		updateBBox(inferedTextRect)

// 		return (
// 			<TextSvg updateBBox={handleTextChange}
// 				text={localItem.cardItemContent.value}
// 				style={localItem.cardItemContent.style}
// 			/>
// 		)
// 	}, [localItem])

// 	const layoutStyle = {
// 		transformOrigin: `${rectangle.width / 2}px ${rectangle.height / 2}px`,
// 		transform: `${getStylePropValue<string>(localItem.cardItemLayout.style, "transform", "")}`
// 	}

// 	const rectangleStyle = { ...localItem.cardItemLayout.style, transform: "" }

// 	function rnd(factor: number) {
// 		const n = Math.random() * factor
// 		return n - factor / 2
// 	}

// 	function rndRectPlygon(w: number, h: number): string {
// 		const aspectRation = w / h
// 		const precisionW = Math.round((w / 20))
// 		const precisionH = Math.round((h / 20))
// 		const factorW = w / precisionW / 1
// 		const factorH = h / precisionH / 1
// 		const top: number[][] = []
// 		const bottom: number[][] = []
// 		const left: number[][] = []
// 		const right: number[][] = []
// 		if (w > 0 && h > 0) {
// 			const lateralShift = 0
// 			for (let i = 0; i <= w; i += w / precisionW) {
// 				top.push([i + rnd(factorW * lateralShift), rnd(factorH)])
// 				bottom.push([w - i + rnd(factorW) * lateralShift, h + rnd(factorH)])
// 			}

// 			for (let j = 0; j < h; j += h / precisionH) {
// 				left.push([rnd(factorW), h - j + rnd(factorH) * lateralShift])
// 				right.push([w + rnd(factorW), j + rnd(factorH) * lateralShift])
// 			}
// 		}
// 		"M 10 80 Q 52.5 10, 95 80 T 180 80"
// 		const rectArr: number[][] = [...top, ...right, ...bottom, ...left]
// 		return rectArr.flat(0).join(" ")
// 	}

// 	function rndRect_T(w: number, h: number): string {
// 		const aspectRation = w / h
// 		const precisionW = Math.round((w / 200))
// 		const precisionH = Math.round((h / 200))
// 		const factorW = 10.5 //w / precisionW / 1
// 		const factorH = 10.5 //h / precisionH / 1
// 		const top: string[] = []
// 		const bottom: string[] = []
// 		const left: string[] = []
// 		const right: string[] = []

// 		if (w > 0 && h > 0) {
// 			const lateralShift = 1
// 			for (let i = 0; i <= w; i += w / precisionW) {
// 				top.push(Math.round(i + rnd(factorW * lateralShift)) + " " + Math.round(rnd(factorH)))
// 				bottom.push(Math.round(w - i + rnd(factorW) * lateralShift) + " " + Math.round(h + rnd(factorH)))
// 			}

// 			for (let j = 0; j < h; j += h / precisionH) {
// 				left.push(Math.round(rnd(factorW)) + " " + Math.round(h - j + rnd(factorH) * lateralShift))
// 				right.push(Math.round(w + rnd(factorW)) + " " + Math.round(j + rnd(factorH) * lateralShift))
// 			}
// 		}
// 		//		"M 10 80 Q 52.5 10, 95 80 T 180 80"
// 		const rectArr: string[] = [...top, ...right, ...bottom, ...left]
// 		// if(rectArr.length>0) 
// 		// 	rectArr[rectArr.length-2]="T"+rectArr[rectArr.length-2]
// 		//		const r = `M0 0, T` + rectArr.join(", ")  + " Z"
// 		const r = `M-20 -20, T200 0, 200 200, 0 200, 20 -40  `
// 		console.log('r', r);

// 		return r //`M0 0 Q` + rectArr.flat(1).join(" ")  + " Z"
// 	}

// 	function rndRect(w: number, h: number): string {
// 		const aspectRation = w / h
// 		const precisionW = 6 //Math.round((w / 200))
// 		const precisionH = 3 //Math.round((h / 200))
// 		const factorW = 10.5 //w / precisionW / 1
// 		const factorH = 10.5 //h / precisionH / 1
// 		const top: string[] = []
// 		const bottom: string[] = []
// 		const left: string[] = []
// 		const right: string[] = []

// 		if (w > 0 && h > 0) {
// 			const lateralShift = 0
// 			for (let i = w / precisionW; i < w; i += w / precisionW) {
// 				top.push(Math.round(i + rnd(factorW * lateralShift)) + " " + Math.round(rnd(factorH)))
// 				bottom.push(Math.round(w - i + rnd(factorW) * lateralShift) + " " + Math.round(h + rnd(factorH)))
// 			}

// 			for (let j = h / precisionH; j < h; j += h / precisionH) {
// 				left.push(Math.round(rnd(factorW)) + " " + Math.round(h - j + rnd(factorH) * lateralShift))
// 				right.push(Math.round(w + rnd(factorW)) + " " + Math.round(j + rnd(factorH) * lateralShift))
// 			}
// 		}
// 		//		"M 10 80 Q 52.5 10, 95 80 T 180 80"
// 		const rectArr: string[] = [...top, ...right, ...bottom, ...left]
// 		// if(rectArr.length>0) 
// 		// 	rectArr[rectArr.length-2]="T"+rectArr[rectArr.length-2]
// 		// const r = `M-250 -20, Q0 0 -50 -20, T` + rectArr.join(", ") + " "
// 		const r = `M-70 70, Q0 0 ${w/2} -20, T${w+20} ${h/2}, ${w/2} ${h+20}, -20 ${h/2}, 50 -40  `
// 		console.log('r', r);

// 		return r //`M0 0 Q` + rectArr.flat(1).join(" ")  + " Z"
// 	}

// 	const editContour = () => {
// 		if (isSelected())
// 			return <path className="edit-mode-selected" d={rndRect(rectangle.width, rectangle.height)} />
// 		// return <polygon className="edit-mode-selected"
// 		// 	points={rndRect(rectangle.width, rectangle.height)}
// 		// />
// 		return <></>
// 	}

// 	return (
// 		<g transform={`translate(${rectangle.x}, ${rectangle.y})`} className="card-item"
// 			onMouseDown={handleMouseDown}
// 		>
// 			<g style={layoutStyle}>

// 				<rect className="bg-rect"
// 					x={0}
// 					y={0}
// 					width={rectangle.width}
// 					height={rectangle.height}
// 					style={rectangleStyle}
// 				/>

// 				{/* EDIT RECT */}
// 				{editContour()}
// 				{/* <rect className={`edit-mode${isSelected()}`}
// 					x={0}
// 					y={0}
// 					width={rectangle.width}
// 					height={rectangle.height}
// 					rx={ifExists(rectangleStyle, "rx", 0)}
// 					ry={ifExists(rectangleStyle, "ry", 0)}
// 				/> */}


// 				<g transform={`translate(${textPos.x}, ${textPos.y})`} >
// 					{/* <rect x={textBBox.x}
// 						y={textBBox.y}
// 						width={`${textBBox.width}`}
// 						height={`${textBBox.height}`}
// 						style={{ transform: "", fill: "#00f0", stroke: "#f0f", strokeWidth: "3", strokeDasharray: "15 10" }}
// 						fill="#00f0"
// 					/> */}
// 					{textJSX}
// 				</g>
// 			</g>
// 		</g>
// 	)
// }
